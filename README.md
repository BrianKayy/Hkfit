# HKFitness apparel store

Next.js apparel storefront with responsive collections, product variants, a persistent shopping bag, and Supabase customer accounts.

## Run

- `npm install`
- `npm run dev`
- `npm run lint`
- `npm run build`

## Enable customer accounts

Copy `.env.example` to `.env.local` and fill in your Supabase project URL and publishable key. Never use a service-role or secret key in a NEXT_PUBLIC variable. Restart the server after changing configuration.

In Supabase Authentication, enable Email authentication and configure the Site URL for your deployed domain. Add `http://localhost:3000/account` and your production `/account` URL to the redirect allowlist. Configure production SMTP for confirmation and password recovery emails.

The account page supports signup, email confirmation, password sign-in, persisted provider sessions, sign-out, recovery email, and password updates. The SDK handles session renewal. No order data or private database tables are exposed by this implementation. Add server-side identity verification and RLS before connecting private customer data.

Reference: https://supabase.com/docs/guides/auth/passwords

## Catalog and commerce

Edit `data/apparel.ts` for the catalog. Existing zero prices are displayed as “Price on request”; set real prices before connecting checkout. Product images use local cover images and existing Supabase galleries. Checkout is not connected. Customer care opens a prepared email in the visitor's email app and does not claim to submit an enquiry.

## Verification before launch

With a configured Supabase test project, verify signup and confirmation, incorrect-password handling, sign-in and reload persistence, sign-out, and the complete password recovery email flow. Live authentication cannot be verified without project configuration.
