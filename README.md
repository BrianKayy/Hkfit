# HKFitness apparel store

Next.js apparel storefront with responsive collections, product variants, a persistent shopping bag, and Supabase customer accounts.

## Run

- `npm install`
- `npm run dev`
- `npm run lint`
- `npm run build`

## Enable customer accounts

The local `.env.local` now connects to project `pwipbjkeudawdteblpbt` with its browser-safe publishable key. Email/password signups and email confirmation are enabled. The Site URL is `https://www.hkfitness.ae`; allowed callbacks are `https://www.hkfitness.ae/account` and `http://localhost:3000/account`. Set the same NEXT_PUBLIC environment variables in the deployment host before building for production. Customers can also resend their confirmation email from the sign-in page.

**Outstanding:** configure custom SMTP in Supabase Authentication → Emails → SMTP Settings for public customer emails. The default Supabase sender is restricted to project-team addresses. Then complete signup, confirmation, sign-in and recovery testing using an inbox you control. No real account or outgoing test email has been created during this setup.

Copy `.env.example` to `.env.local` and fill in your Supabase project URL and publishable key. Never use a service-role or secret key in a NEXT_PUBLIC variable. Restart the server after changing configuration.

In Supabase Authentication, enable Email authentication and configure the Site URL for your deployed domain. Add `http://localhost:3000/account` and your production `/account` URL to the redirect allowlist. Configure production SMTP for confirmation and password recovery emails.

The account page supports signup, email confirmation, password sign-in, persisted provider sessions, sign-out, recovery email, and password updates. The SDK handles session renewal. No order data or private database tables are exposed by this implementation. Add server-side identity verification and RLS before connecting private customer data.

Reference: https://supabase.com/docs/guides/auth/passwords

## Catalog and commerce

Edit `data/apparel.ts` for the eight-product catalog, AED prices, colour-to-photo mappings and confirmed S–XL size range. `data/product-images.json` contains the exact filenames of 129 photos in the public Supabase `store images` bucket. Preserve filename casing and spaces. After uploading additional photography, add the filenames to this manifest and update the product colour mappings.

Galleries support thumbnails and previous/next navigation. Colour selection switches to the corresponding photograph. Product photos are precompressed WebP assets in `public/images/catalog`, mapped by `data/optimized-images.json`. Next.js serves responsive sizes from these local assets, including small gallery thumbnails; shoppers do not download the original Supabase PNGs. The supplied local logo and campaign photograph are retained. Saved bags reconcile prices and variants against the current catalog.

After updating `data/product-images.json`, run `npm run images:optimize` with network access before building. The script downloads only uncached originals, scales them to at most 1600×2000, and writes WebP copies at quality 80. It preserves the Supabase originals and records missing uploads as null so broken images are excluded from galleries. Commit the generated assets and manifest with the catalog changes. The October 2 optimization produced 123 available photos totaling about 6.3 MB; six listed uploads were missing. To replace an existing photo, use a new storage filename and update the source manifest so caches also receive a new URL.

Checkout is not connected. Customer care opens a prepared email in the visitor's email app and does not claim to submit an enquiry.

## Verification before launch

With a configured Supabase test project, verify signup and confirmation, incorrect-password handling, sign-in and reload persistence, sign-out, and the complete password recovery email flow. Live authentication cannot be verified without project configuration.
