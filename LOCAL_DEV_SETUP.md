# Local Development Setup

## Option 1: Using Vercel Dev (Recommended)

For local development with API routes, use Vercel's dev server:

```bash
npm run dev:vercel
```

This will:
- Run the Vite frontend
- Run the serverless API functions locally
- Handle `/api/contact` automatically

The API will be available at `http://localhost:3000/api/contact`

## Option 2: Using Vite Dev Server Only

If you only want to run the frontend:

```bash
npm run dev
```

**Note**: The `/api/contact` endpoint will NOT work in this mode. The Vite proxy is configured to forward API requests to `http://localhost:3000` (where `vercel dev` runs), but if `vercel dev` is not running, API calls will fail.

## Environment Variables for Local Development

Create a `.env.local` file (this file is gitignored):

```env
MONGODB_URI="mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority&appName=portfolio"
MONGODB_DB="portfolio"
```

**Important**: Never commit `.env.local` to git. It's already in `.gitignore`.

## Testing the Contact Form Locally

1. Start Vercel dev server: `npm run dev:vercel`
2. Open `http://localhost:3000` (or the port shown in terminal)
3. Navigate to the contact form
4. Submit a test message
5. Check MongoDB Atlas to verify the submission was saved

## Troubleshooting

### API returns 404
- Make sure `vercel dev` is running
- Check that `api/contact.ts` exists
- Verify the proxy target in `vite.config.ts`

### MongoDB connection errors
- Verify `MONGODB_URI` is set in `.env.local`
- Check MongoDB Atlas IP whitelist (add `0.0.0.0/0` for local testing)
- Ensure the connection string is correct

### CORS errors
- The API already handles CORS
- If you see CORS errors, check the API response headers
