This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Firebase phone sign-in

Phone sign-in requires a Firebase project with the Phone authentication provider enabled. Add these public Firebase web-app settings to `.env.local` (get them from Firebase Console → Project settings → Your apps):

- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`

Restart the Next.js development server after changing environment variables. If these values are missing, the app remains usable and phone sign-in displays a configuration error instead of crashing during page load.

## Product catalog

The product catalog requires a MongoDB database. Set `MONGODB_URI` in `.env.local` to your MongoDB connection string and restart the Next.js server. Products must exist in that database and have `isActive: true` to appear in the storefront.

If the MongoDB SRV lookup fails with a DNS error, set `MONGODB_DNS_SERVERS` in `.env.local` to the comma-separated DNS server addresses configured for your machine, then restart the server.

## Admin sign-in

Set `ADMIN_USERNAME` and `ADMIN_PASSWORD` in `.env.local` to credentials of your choice. Admin sign-in also requires `MONGODB_URI` and `JWT_SECRET`. Restart the Next.js server after changing these values. Do not use default or example passwords in a deployed environment.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
