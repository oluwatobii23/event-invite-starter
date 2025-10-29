# Event Invite & RSVP Starter (Next.js 14 + Prisma + Tailwind)

A production-ready starter you can deploy to **Vercel** in one go. It ships with:

- **Next.js 14 (App Router) + TypeScript**
- **Tailwind CSS**
- **Prisma** (Postgres) with **memory fallback** so it runs without a DB (perfect for instant Vercel deploys)
- API routes for **Invites** and **RSVPs**
- Simple **Dashboard** (admin) + **Public Invite Page** with **Countdown** + RSVP form
- Ready for future add-ons: NextAuth, Stripe, Uploads, Realtime chat (placeholders in code & ENV)

## Quick Start

1. **Install** (locally)
   ```bash
   pnpm i   # or npm i / yarn
   ```

2. **Run** (dev, with memory DB fallback):
   ```bash
   pnpm dev
   ```

3. **Deploy to Vercel**
   - Push this repo to GitHub.
   - Import the repo in Vercel.
   - Set `DATABASE_URL` to a Postgres URL (or leave empty to use memory mode for demo).

> Memory mode is perfect for a quick demo, but it does **not persist** data between Vercel deployments/instances. For production, set `DATABASE_URL` to Vercel Postgres (recommended).

## ENV

Copy `.env.example` to `.env` and fill as needed.

- `DATABASE_URL` → Postgres URL (e.g., Vercel Postgres)
- `NEXTAUTH_URL`, `NEXTAUTH_SECRET` → auth (future)
- `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` → monetization (future)
- `UPLOADTHING_SECRET`, `UPLOADTHING_APP_ID` → file uploads (future)
- `PUSHER_KEY`, `PUSHER_CLUSTER` → chat (future)

## Prisma

If you provide a `DATABASE_URL`, run:

```bash
pnpm dlx prisma migrate dev
pnpm dlx prisma generate
```

## Scripts

- `dev`: run next dev
- `build`: next build
- `start`: next start
- `lint`: next lint

## Project Structure

```
app/
  (site)/
    page.tsx             # Marketing/Landing
  dashboard/
    page.tsx             # Admin dashboard (list + create invites)
  invite/[slug]/
    page.tsx             # Public invite page (countdown + RSVP form)
  api/
    invites/route.ts     # CRUD (create/list in memory or DB)
    rsvp/route.ts        # Create RSVP
components/
  Countdown.tsx
  Navbar.tsx
  RSVPForm.tsx
  Footer.tsx
lib/
  db.ts                  # Memory store + Prisma client wrapper
  utils.ts               # helpers
prisma/
  schema.prisma
```

## License

MIT


## Theming & Custom Fields

On **/dashboard**, when creating an invite you can now set:
- **Primary/Accent Colors** (hex)
- **Font** (System, Inter, Playfair, Bebas Neue)
- **Cover Image URL** (shown at the top of the invite page)
- **Guest Fields** to collect (Name, Email, Group, Phone, Dietary, Arrival Date, Notes)

On the public invite page, colors and fonts are applied via CSS variables, and the **Countdown** uses your start date/time.
