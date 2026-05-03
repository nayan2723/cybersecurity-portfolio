// Serverless API route for contact form submissions
// Compatible with Vercel serverless functions
// Uses Node.js runtime for MongoDB connection

import type { VercelRequest, VercelResponse } from '@vercel/node';
import type { Db } from 'mongodb';
import { MongoClient } from 'mongodb';

function errorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return String(error);
}

function errorStack(error: unknown): string | undefined {
  if (error instanceof Error) return error.stack;
  return undefined;
}

function errorName(error: unknown): string {
  if (error instanceof Error) return error.name;
  return '';
}

// MongoDB connection - using environment variable
// Note: MONGODB_URI should be set in Vercel environment variables
const getMongoConfig = () => {
  const uri = process.env.MONGODB_URI;
  const db = process.env.MONGODB_DB || 'portfolio';
  
  if (!uri) {
    throw new Error('MONGODB_URI environment variable is not set. Please configure it in Vercel.');
  }
  
  return { uri, db };
};

// Cached connection to reuse across invocations
let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

async function connectToDatabase() {
  // Reuse cached connection if available and still connected
  if (cachedClient && cachedDb) {
    try {
      // Ping the database to check if connection is still alive
      await cachedDb.admin().ping();
      return { client: cachedClient, db: cachedDb };
    } catch (pingError) {
      // Connection is dead, reset cache and reconnect
      console.warn('[MongoDB] Cached connection is dead, reconnecting...', {
        error: pingError instanceof Error ? pingError.message : 'Unknown error'
      });
      cachedClient = null;
      cachedDb = null;
    }
  }

  // Get MongoDB configuration
  let uri: string;
  let dbName: string;
  try {
    const config = getMongoConfig();
    uri = config.uri;
    dbName = config.db;
  } catch (configError: unknown) {
    console.error('[MongoDB Config Error]', {
      error: errorMessage(configError),
      hasUri: !!process.env.MONGODB_URI,
      uriLength: process.env.MONGODB_URI?.length || 0,
      dbName: process.env.MONGODB_DB || 'portfolio (default)'
    });
    throw new Error('MongoDB configuration error. Please check environment variables.');
  }

  // Create new connection
  console.log('[MongoDB] Creating new connection...', {
    uriLength: uri.length,
    dbName: dbName,
    uriPreview: uri.substring(0, 30) + '...' // Don't log full URI for security
  });

  try {
    const client = new MongoClient(uri, {
      serverSelectionTimeoutMS: 10000, // 10 second timeout
      connectTimeoutMS: 10000,
    });
    
    await client.connect();
    console.log('[MongoDB] Successfully connected to database');
    
    const db = client.db(dbName);
    
    // Verify database is accessible
    await db.admin().ping();
    console.log('[MongoDB] Database ping successful');

    // Cache the connection
    cachedClient = client;
    cachedDb = db;

    return { client, db };
  } catch (connectionError: unknown) {
    console.error('[MongoDB Connection Error]', {
      error: errorMessage(connectionError),
      errorName: errorName(connectionError),
      errorStack: errorStack(connectionError),
      uriLength: uri.length,
      dbName: dbName,
      // Don't log full URI for security
    });
    
    // Provide more specific error message
    const msg = errorMessage(connectionError);
    if (msg.includes('authentication')) {
      throw new Error('MongoDB authentication failed. Please check your credentials.');
    } else if (msg.includes('timeout')) {
      throw new Error('MongoDB connection timeout. Please check your network and IP whitelist.');
    } else if (msg.includes('ENOTFOUND') || msg.includes('DNS')) {
      throw new Error('MongoDB host not found. Please check your connection string.');
    } else {
      throw new Error(`MongoDB connection failed: ${msg}`);
    }
  }
}

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Rate limiting: simple in-memory store (for serverless, consider Redis for production)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const oneHour = 60 * 60 * 1000;
  
  const record = rateLimitMap.get(ip);
  
  if (!record || now > record.resetTime) {
    // Reset or create new record
    rateLimitMap.set(ip, { count: 1, resetTime: now + oneHour });
    return true;
  }
  
  if (record.count >= 3) {
    return false; // Rate limit exceeded
  }
  
  record.count++;
  return true;
}

// Note: Rate limiting uses in-memory storage which resets on serverless cold starts
// For production with high traffic, consider using Redis or MongoDB-based rate limiting

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get client IP for rate limiting
    const clientIP = req.headers['x-forwarded-for']?.split(',')[0] || 
                     req.headers['x-real-ip'] || 
                     req.socket?.remoteAddress || 
                     'unknown';

    // Check rate limiting
    if (!checkRateLimit(clientIP)) {
      console.log(`[Rate Limit] IP ${clientIP} exceeded limit`);
      return res.status(429).json({ 
        error: 'Rate limit exceeded. Please wait before submitting another message.' 
      });
    }

    // Parse request body - Vercel with @vercel/node auto-parses JSON, but handle edge cases
    let formData: ContactFormData;
    try {
      // Check if body exists
      if (req.body === undefined || req.body === null) {
        console.error('[Parse Error] Request body is undefined or null:', {
          method: req.method,
          contentType: req.headers['content-type'],
          hasBody: req.body !== undefined
        });
        return res.status(400).json({ 
          error: 'Invalid request format. Request body is missing.' 
        });
      }

      // Vercel with @vercel/node typically auto-parses JSON bodies
      // If body is already a parsed object, use it directly
      if (typeof req.body === 'object' && !Buffer.isBuffer(req.body) && !Array.isArray(req.body)) {
        formData = req.body as ContactFormData;
      } 
      // If body is a string, parse it
      else if (typeof req.body === 'string') {
        if (req.body.trim() === '' || req.body === 'undefined' || req.body === 'null') {
          console.error('[Parse Error] Request body is empty or invalid string:', {
            bodyLength: req.body.length,
            bodyPreview: req.body.substring(0, 50)
          });
          return res.status(400).json({ 
            error: 'Invalid request format. Request body cannot be empty.' 
          });
        }
        formData = JSON.parse(req.body) as ContactFormData;
      }
      // Unexpected body type
      else {
        console.error('[Parse Error] Unexpected body type:', {
          bodyType: typeof req.body,
          isBuffer: Buffer.isBuffer(req.body),
          isArray: Array.isArray(req.body),
          contentType: req.headers['content-type']
        });
        return res.status(400).json({ 
          error: 'Invalid request format. Please ensure Content-Type is application/json.' 
        });
      }
    } catch (parseError: unknown) {
      console.error('[Parse Error] Failed to parse request body:', {
        error: errorMessage(parseError),
        errorStack: errorStack(parseError),
        bodyType: typeof req.body,
        bodyPreview: typeof req.body === 'string' ? req.body.substring(0, 100) : 'not a string',
        contentType: req.headers['content-type'],
        bodyIsUndefined: req.body === undefined,
        bodyIsNull: req.body === null
      });
      return res.status(400).json({ 
        error: 'Invalid request format. Please ensure Content-Type is application/json and body is valid JSON.' 
      });
    }

    // Server-side validation with detailed logging
    if (!formData || typeof formData !== 'object') {
      console.error('[Validation Error] formData is not an object:', { formData });
      return res.status(400).json({ error: 'Invalid request data' });
    }

    if (!formData.name?.trim() || formData.name.length > 100) {
      console.error('[Validation Error] Invalid name:', { name: formData.name, length: formData.name?.length });
      return res.status(400).json({ error: 'Invalid name' });
    }
    
    // Check for suspicious patterns in name
    if (/[<>"'`&]/.test(formData.name) || /javascript:|data:|vbscript:/i.test(formData.name)) {
      console.error('[Validation Error] Suspicious patterns in name:', { name: formData.name });
      return res.status(400).json({ error: 'Invalid name format' });
    }
    
    if (!formData.email?.trim() || formData.email.length > 254 || !formData.email.includes('@')) {
      console.error('[Validation Error] Invalid email:', { email: formData.email });
      return res.status(400).json({ error: 'Invalid email' });
    }
    
    // Enhanced email validation
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      console.error('[Validation Error] Invalid email format:', { email: formData.email });
      return res.status(400).json({ error: 'Invalid email format' });
    }
    
    if (!formData.subject?.trim() || formData.subject.length > 200) {
      console.error('[Validation Error] Invalid subject:', { subject: formData.subject, length: formData.subject?.length });
      return res.status(400).json({ error: 'Invalid subject' });
    }
    
    // Check for suspicious patterns in subject and message
    if (/[<>]/.test(formData.subject) || /javascript:|data:|vbscript:/i.test(formData.subject)) {
      console.error('[Validation Error] Suspicious patterns in subject:', { subject: formData.subject });
      return res.status(400).json({ error: 'Invalid subject format' });
    }
    
    if (!formData.message?.trim() || formData.message.length < 10 || formData.message.length > 5000) {
      console.error('[Validation Error] Invalid message:', { messageLength: formData.message?.length });
      return res.status(400).json({ error: 'Invalid message' });
    }
    
    if (/javascript:|data:|vbscript:|<script|<iframe|<object/i.test(formData.message)) {
      console.error('[Validation Error] Suspicious patterns in message');
      return res.status(400).json({ error: 'Message contains invalid content' });
    }

    // Connect to MongoDB
    console.log('[MongoDB] Attempting to connect to database...');
    let db;
    try {
      const dbResult = await connectToDatabase();
      db = dbResult.db;
      console.log('[MongoDB] Connected successfully');
    } catch (dbError: unknown) {
      console.error('[MongoDB Connection Failed]', {
        error: errorMessage(dbError),
        errorName: errorName(dbError),
        timestamp: new Date().toISOString()
      });
      // Re-throw with more context
      throw new Error(`Database connection failed: ${errorMessage(dbError)}`);
    }

    // Insert contact submission
    const contactSubmission = {
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      subject: formData.subject.trim(),
      message: formData.message.trim(),
      createdAt: new Date(),
      ipAddress: clientIP // Store IP for potential abuse tracking (optional)
    };

    console.log('[MongoDB] Inserting contact submission:', {
      name: contactSubmission.name,
      email: contactSubmission.email,
      subject: contactSubmission.subject,
      messageLength: contactSubmission.message.length,
      ip: clientIP
    });

    let result;
    try {
      result = await db.collection('contacts').insertOne(contactSubmission);
    } catch (insertError: unknown) {
      const code =
        insertError !== null &&
        typeof insertError === 'object' &&
        'code' in insertError
          ? (insertError as { code?: unknown }).code
          : undefined;
      console.error('[MongoDB Insert Error]', {
        error: errorMessage(insertError),
        errorName: errorName(insertError),
        errorCode: code,
        collection: 'contacts',
        documentPreview: {
          name: contactSubmission.name,
          email: contactSubmission.email,
          subject: contactSubmission.subject
        }
      });
      throw new Error(`Failed to save contact submission: ${insertError.message}`);
    }

    if (!result.insertedId) {
      console.error('[MongoDB] Insert failed - no insertedId returned', {
        acknowledged: result.acknowledged,
        result: result
      });
      throw new Error('Failed to save contact submission - no ID returned');
    }

    console.log('[MongoDB] Successfully inserted contact submission:', { 
      insertedId: result.insertedId,
      acknowledged: result.acknowledged 
    });

    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');

    return res.status(200).json({ 
      success: true, 
      message: 'Contact form submitted successfully' 
    });

  } catch (error: unknown) {
    // Detailed error logging for debugging
    const errorId = crypto.randomUUID();
    const errorDetails = {
      errorId,
      message: errorMessage(error),
      stack: errorStack(error),
      name: errorName(error),
      timestamp: new Date().toISOString(),
      ip: req.headers['x-forwarded-for']?.split(',')[0] || req.headers['x-real-ip'] || 'unknown'
    };
    
    console.error('[Contact Form Error]', errorDetails);
    
    // Check if it's a MongoDB connection error
    const em = errorMessage(error);
    if (em.includes('MONGODB_URI') || em.includes('MongoClient') || em.includes('connection')) {
      console.error('[MongoDB Connection Error]', {
        hasUri: !!process.env.MONGODB_URI,
        uriLength: process.env.MONGODB_URI?.length || 0,
        dbName: process.env.MONGODB_DB
      });
    }
    
    // Generic user-facing message (detailed error logged server-side)
    const publicErrorMessage = em.includes('Invalid') || em.includes('Rate limit') 
      ? em 
      : 'An error occurred while processing your request. Please try again later.';
    
    // Return appropriate status code
    const statusCode = em.includes('Invalid') || em.includes('Rate limit') ? 400 : 500;
    
    return res.status(statusCode).json({ 
      error: publicErrorMessage,
      errorId: errorId // Include errorId for support purposes
    });
  }
}
