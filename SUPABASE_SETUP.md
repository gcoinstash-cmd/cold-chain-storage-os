# Turnkey Supabase Setup — COLD CHAIN STORAGE OS

Deploy your PostgreSQL database backend with Row Level Security (RLS) in 3 minutes.

## Step 1: Create Supabase Project
1. Log in to [Supabase](https://supabase.com).
2. Click **New Project** and name it `cold-chain-storage-db`.

## Step 2: Run SQL Schema
1. Open the **SQL Editor** tab in your Supabase Dashboard.
2. Open `schema.sql` from this directory, paste into the editor, and click **RUN**.
3. (Optional) Open `seed.sql`, paste and click **RUN** to seed mock production data.

## Step 3: Connect Environment Variables
Add your keys to your `.env` file or hosting provider:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## 1-Click Admin Access
Visit `/admin` on your deployed web app and click **Auto-Fill** with passcode:
```
coldchain2026
```
