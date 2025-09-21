# Vercel Deployment Guide for Feastly

## Issues Fixed

### 1. CLERK_PUBLISHABLE_KEY Error

**Problem:** `CLERK_PUBLISHABLE_KEY is not set`
**Solution:** Set environment variable in Vercel

### 2. Asset Loading Error (404)

**Problem:** `Failed to load resource: the server responded with a status of 404`
**Solution:** Fixed favicon path in index.html

## Deployment Steps

### Step 1: Set Up Clerk Environment Variable

1. **Get your Clerk Publishable Key:**

   - Go to [Clerk Dashboard](https://dashboard.clerk.com)
   - Select your project
   - Navigate to "API Keys" section
   - Copy your "Publishable key"

2. **Add Environment Variable in Vercel:**
   - Go to your Vercel dashboard
   - Select your Feastly project
   - Go to "Settings" → "Environment Variables"
   - Click "Add New"
   - Set:
     - **Name:** `VITE_CLERK_PUBLISHABLE_KEY`
     - **Value:** Your actual Clerk publishable key
     - **Environment:** Production (and Preview if desired)
   - Click "Save"

### Step 2: Redeploy Your Project

1. **Option A: Automatic Redeploy**

   - Push your latest changes to your connected Git repository
   - Vercel will automatically redeploy

2. **Option B: Manual Redeploy**
   - Go to your Vercel dashboard
   - Click on your project
   - Go to "Deployments" tab
   - Click "Redeploy" on the latest deployment

### Step 3: Verify the Fix

After redeployment, check:

1. ✅ No more `CLERK_PUBLISHABLE_KEY is not set` error
2. ✅ No more 404 errors for assets
3. ✅ Authentication works properly
4. ✅ All images load correctly

## Local Development Setup

If you want to test locally with the same environment:

1. **Create a `.env` file in your project root:**

   ```
   VITE_CLERK_PUBLISHABLE_KEY=your_actual_clerk_key_here
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

## Troubleshooting

### If you still get Clerk errors:

- Double-check the environment variable name: `VITE_CLERK_PUBLISHABLE_KEY`
- Make sure you're using the **Publishable** key, not the Secret key
- Ensure the environment variable is set for the correct environment (Production)

### If you still get asset errors:

- Check that all images are properly imported in your components
- Verify that the favicon is in the `public` folder
- Clear your browser cache and try again

## Files Modified

- ✅ `index.html` - Fixed favicon path
- ✅ `public/feastly.png` - Added favicon to public folder
- ✅ Environment variable configuration in Vercel

Your Feastly app should now deploy successfully on Vercel! 🎉
