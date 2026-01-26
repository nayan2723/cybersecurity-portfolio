# Migration from Supabase to MongoDB

## Summary
This project has been migrated from Supabase to MongoDB for the contact form backend.

## Changes Made

### Backend
- **New API Route**: `api/contact.ts` - Serverless function compatible with Vercel
- **Database**: MongoDB Atlas (configure via `MONGODB_URI` environment variable)
- **Collection**: `contacts` - stores contact form submissions

### Removed
- Supabase client integration (`src/integrations/supabase/`)
- Supabase Edge Functions (`supabase/functions/`)
- Supabase migrations (`supabase/migrations/`)
- Supabase dependencies from `package.json`
- Supabase environment variables from `.env`

### Updated Files
- `src/components/Contact.tsx` - Now calls `/api/contact` instead of Supabase function
- `src/components/EasterEggs.tsx` - Removed Supabase dependency, uses fallback
- `src/components/Projects.tsx` - Replaced "Supabase" with "Backend" in tech stack
- `src/components/EnhancedProjects.tsx` - Replaced "Supabase" with "Backend" in tech stack
- `src/components/CuratedProjects.tsx` - Replaced "Supabase" with "Backend" in tech stack
- `index.html` - Removed Supabase URL from CSP
- `.env` - Replaced Supabase vars with MongoDB vars

### Environment Variables Required

Add these to your Vercel project settings (or `.env.local` for local development):

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
MONGODB_DB=portfolio
```

### MongoDB Setup

1. Create a MongoDB Atlas account at https://cloud.mongodb.com
2. Create a new cluster (free tier available)
3. Create a database user
4. Whitelist IP addresses (or use 0.0.0.0/0 for Vercel)
5. Get connection string and set as `MONGODB_URI`
6. The API will automatically create the `contacts` collection on first use

### Contact Schema

The contact form saves documents with this structure:
```typescript
{
  name: string,
  email: string,
  subject: string,
  message: string,
  createdAt: Date,
  ipAddress: string (optional, for abuse tracking)
}
```

### Rate Limiting

The API includes basic rate limiting (3 submissions per hour per IP). For production, consider using Redis or MongoDB-based rate limiting for better persistence across serverless invocations.

### Testing

1. Set up MongoDB Atlas and get connection string
2. Add `MONGODB_URI` to Vercel environment variables
3. Deploy to Vercel
4. Test contact form submission

### Notes

- The API route uses connection pooling/caching to optimize MongoDB connections in serverless environment
- Rate limiting uses in-memory storage (resets on cold starts) - consider upgrading for production
- All security validations from the original Supabase function are preserved
