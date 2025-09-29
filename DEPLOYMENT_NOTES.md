# Deployment Notes for Email Capture Feature

## Environment Variables (Add to Vercel/Cloudflare)

**DO NOT COMMIT THIS FILE - FOR YOUR REFERENCE ONLY**

Add these to your deployment platform's environment variables:

```
RESEND_API_KEY=(check .env.local file locally)
RESEND_FROM_EMAIL=hello@kotadb.io
RESEND_ADMIN_EMAIL=admin@kotadb.io
```

## Production Supabase Migration

Run this in your Supabase SQL editor:

- Path: `supabase/migrations/20250902_create_waitlist_table.sql`

## Security Notes

- Never commit .env files with real API keys
- Always use environment variables in deployment platforms
- Rotate API keys immediately if exposed
- The Supabase URL and anon key are okay to be public (they're meant for client-side use)

## Testing

After deployment:

1. Test email capture on production site
2. Check Supabase dashboard for new entries
3. Verify emails are being sent via Resend dashboard
