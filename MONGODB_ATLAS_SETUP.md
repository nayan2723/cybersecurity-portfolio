# MongoDB Atlas Setup Guide

Complete step-by-step instructions for setting up MongoDB Atlas for your contact form.

---

## Step 1: Create MongoDB Atlas Account

1. Go to https://www.mongodb.com/cloud/atlas
2. Click **"Try Free"** or **"Sign In"**
3. Create account or sign in with Google/GitHub

---

## Step 2: Create a Free Cluster

1. After logging in, click **"Create"** or **"Build a Database"**
2. Choose **"M0 FREE"** (Free Shared Cluster)
3. Select a cloud provider:
   - **AWS** (recommended)
   - **Google Cloud**
   - **Azure**
4. Select a region closest to your Vercel deployment:
   - For US: `N. Virginia (us-east-1)`
   - For EU: `Ireland (eu-west-1)`
   - For Asia: `Mumbai (ap-south-1)`
5. Click **"Create Cluster"**
6. Wait 3-5 minutes for cluster to be created

---

## Step 3: Create Database User

1. In the **"Security"** section, click **"Database Access"**
2. Click **"Add New Database User"**
3. Choose authentication method: **"Password"**
4. Enter:
   - **Username**: `nayankshitij128_db_user` (or your preferred username)
   - **Password**: Click **"Autogenerate Secure Password"** or create your own
   - **⚠️ IMPORTANT**: Save the password immediately - you won't see it again!
5. Under **"Database User Privileges"**, select: **"Atlas admin"** (or "Read and write to any database")
6. Click **"Add User"**

---

## Step 4: Configure Network Access (CRITICAL)

This allows Vercel to connect to your MongoDB database.

### Option A: Allow All IPs (Easiest for Development)
1. In **"Security"** section, click **"Network Access"**
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"**
4. This sets IP to `0.0.0.0/0`
5. Click **"Confirm"**

**⚠️ Security Note**: This allows any IP to connect. For production, consider Option B.

### Option B: Whitelist Vercel IPs (More Secure)
1. In **"Security"** section, click **"Network Access"**
2. Click **"Add IP Address"**
3. Add these Vercel IP ranges:
   ```
   76.76.21.21
   76.223.126.116
   ```
   (Vercel uses dynamic IPs, so Option A is recommended)
4. Click **"Confirm"**

---

## Step 5: Get Connection String

1. In the main dashboard, click **"Connect"** on your cluster
2. Choose **"Connect your application"**
3. Select:
   - **Driver**: `Node.js`
   - **Version**: `5.5 or later` (or latest)
4. Copy the connection string - it looks like:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. **Replace placeholders**:
   - Replace `<username>` with your database username (e.g., `nayankshitij128_db_user`)
   - Replace `<password>` with your database password (URL-encode special characters)
   - Add database name: After `.net/` add `portfolio?` (before the `?`)
   
   **Final format**:
   ```
   mongodb+srv://nayankshitij128_db_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority&appName=portfolio
   ```

---

## Step 6: Set Environment Variables

### In Vercel Dashboard:

1. Go to your Vercel project dashboard
2. Click **"Settings"** → **"Environment Variables"**
3. Add these variables:

   **Variable 1:**
   - **Key**: `MONGODB_URI`
   - **Value**: Your full connection string from Step 5
   - **Environment**: Select all (Production, Preview, Development)
   - Click **"Save"**

   **Variable 2:**
   - **Key**: `MONGODB_DB`
   - **Value**: `portfolio`
   - **Environment**: Select all
   - Click **"Save"**

4. **Redeploy** your application:
   - Go to **"Deployments"**
   - Click the **"..."** menu on latest deployment
   - Click **"Redeploy"**

### In Local Development (.env.local):

Create `.env.local` file in your project root:

```env
MONGODB_URI="mongodb+srv://nayankshitij128_db_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority&appName=portfolio"
MONGODB_DB="portfolio"
```

**⚠️ Important**: 
- Never commit `.env.local` to git (it's already in `.gitignore`)
- Replace `YOUR_PASSWORD` with your actual password
- URL-encode special characters in password (e.g., `@` becomes `%40`)

---

## Step 7: Verify Database and Collection

### Database:
- **Name**: `portfolio`
- Created automatically on first insert

### Collection:
- **Name**: `contacts`
- Created automatically on first insert

### Document Structure:
Each contact submission creates a document like:
```json
{
  "_id": ObjectId("..."),
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Hello",
  "message": "This is a test message",
  "createdAt": ISODate("2026-01-26T..."),
  "ipAddress": "123.456.789.0"
}
```

---

## Step 8: Test the Connection

### Option A: Test via Contact Form
1. Deploy your site to Vercel
2. Submit the contact form
3. Check MongoDB Atlas:
   - Go to **"Database"** → **"Browse Collections"**
   - Select `portfolio` database
   - Select `contacts` collection
   - Verify your submission appears

### Option B: Test via MongoDB Compass (Optional)
1. Download MongoDB Compass: https://www.mongodb.com/try/download/compass
2. Use your connection string to connect
3. Browse to `portfolio.contacts` collection
4. Verify documents appear after form submissions

---

## Troubleshooting

### Issue: "MongoDB authentication failed"
**Solution**: 
- Verify username and password are correct
- Check password doesn't have special characters that need URL encoding
- Verify database user has proper permissions

### Issue: "MongoDB connection timeout"
**Solution**:
- Check Network Access - ensure `0.0.0.0/0` is whitelisted (or Vercel IPs)
- Verify connection string is correct
- Check cluster is running (not paused)

### Issue: "MongoDB host not found"
**Solution**:
- Verify connection string format is correct
- Check cluster name in connection string matches your actual cluster
- Ensure cluster is not deleted or paused

### Issue: "Database/Collection doesn't exist"
**Solution**:
- This is normal! MongoDB creates them automatically on first insert
- Just submit the contact form once, and they'll be created

---

## Security Best Practices

1. **Use Strong Passwords**: Generate secure passwords for database users
2. **Limit Network Access**: For production, consider whitelisting specific IPs instead of `0.0.0.0/0`
3. **Rotate Passwords**: Periodically change database user passwords
4. **Monitor Access**: Check MongoDB Atlas logs for suspicious activity
5. **Backup Data**: Enable automatic backups in MongoDB Atlas (available on paid tiers)

---

## Free Tier Limits

MongoDB Atlas Free Tier (M0) includes:
- ✅ 512 MB storage
- ✅ Shared RAM and vCPU
- ✅ No credit card required
- ✅ Perfect for portfolio contact forms

**Limits**:
- 512 MB storage (plenty for contact form submissions)
- Shared resources (may be slower during peak times)

---

## Support

If you encounter issues:
1. Check Vercel function logs for detailed error messages
2. Check MongoDB Atlas → Monitoring for connection issues
3. Verify all environment variables are set correctly
4. Test connection string in MongoDB Compass

---

## Summary Checklist

- [ ] Created MongoDB Atlas account
- [ ] Created free cluster (M0)
- [ ] Created database user with password
- [ ] Configured Network Access (`0.0.0.0/0` or specific IPs)
- [ ] Got connection string and replaced placeholders
- [ ] Set `MONGODB_URI` in Vercel environment variables
- [ ] Set `MONGODB_DB` in Vercel environment variables (optional, defaults to "portfolio")
- [ ] Redeployed Vercel application
- [ ] Tested contact form submission
- [ ] Verified submission appears in MongoDB Atlas

---

**You're all set!** Your contact form should now successfully save submissions to MongoDB Atlas.
