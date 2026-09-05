# LinkVault — Private URL Shortener & Ad Monetization Platform

A production-ready Next.js application for creating short links with a 2-step visitor redirection flow designed for high CPM ad monetization.

## Features

- **Private Admin Dashboard** — No public registration; protected by a secret key
- **2-Step Redirect Flow** — Maximizes ad impressions with countdown timers
- **Security First** — Destination URLs are never exposed in HTML/JS bundles
- **HMAC Session Tokens** — Single-use, time-limited tokens prevent bypass
- **Rate Limiting** — IP-based throttling prevents automated scraping
- **Analytics** — Step-level view tracking (Step 1 vs Step 2 completion)
- **Ad Ready** — Clean placeholder components for Monetag, Adsterra, AdSense

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 3
- **Database**: Prisma ORM (SQLite dev / PostgreSQL prod)
- **Auth**: HMAC-SHA256 signed tokens + HTTP-only cookies

---

## Quick Start (Local Development)

### Prerequisites

- Node.js 18+
- npm or yarn

### 1. Clone and install

```bash
git clone <your-repo>
cd url-shortener
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

Edit `.env`:
```env
DATABASE_URL="file:./dev.db"
ADMIN_SECRET_KEY="your-strong-secret-key"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 3. Initialize database

```bash
npx prisma db push
```

### 4. Start dev server

```bash
npm run dev
```

### 5. Access the dashboard

Open [http://localhost:3000/admin](http://localhost:3000/admin) and enter your `ADMIN_SECRET_KEY`.

---

## Deploying to Vercel

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

### 2. Import in Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Set the **Build Command** to: `prisma generate && next build`
4. Set the **Install Command** to: `npm install`

### 3. Environment Variables

Add these in the Vercel dashboard → Settings → Environment Variables:

| Variable | Value |
|---|---|
| `DATABASE_URL` | Your PostgreSQL connection string (see below) |
| `ADMIN_SECRET_KEY` | A strong random secret (`openssl rand -base64 32`) |
| `NEXT_PUBLIC_APP_URL` | `https://your-app.vercel.app` |

### 4. Database (PostgreSQL)

For production, switch from SQLite to PostgreSQL:

**Option A: Vercel Postgres**
- Go to Vercel Dashboard → Storage → Create Database → Postgres
- Connection string is auto-configured

**Option B: External (Neon, Supabase, Railway)**
- Get your PostgreSQL connection string
- Set it as `DATABASE_URL`

**Update Prisma schema** for PostgreSQL:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

### 5. Deploy

```bash
vercel --prod
```

---

## Ad Integration

### Banner Ads

Edit `components/BannerAd.tsx` and replace the placeholder with your ad network code:

```tsx
// Inside BannerAd component, replace the placeholder div with:
<ins
  className="adsbygoogle"
  style={{ display: 'block' }}
  data-ad-client="ca-pub-XXXXXXXX"
  data-ad-slot={zoneId}
  data-ad-format="auto"
/>
```

### Popunder Ads

Edit `components/PopunderAd.tsx` and insert your popunder script:

```tsx
// Replace the placeholder with:
<Script
  strategy="afterInteractive"
  src="https://your-ad-network.com/script.js"
  data-zone="YOUR_ZONE_ID"
/>
```

---

## Project Structure

```
├── app/
│   ├── admin/page.tsx          # Admin dashboard (login + link management)
│   ├── s/[code]/
│   │   ├── page.tsx            # Step 1: 8-second countdown + ads
│   │   ├── Step1Client.tsx     # Step 1 client component
│   │   └── step-2/
│   │       ├── page.tsx        # Step 2: 5-second countdown
│   │       └── Step2Client.tsx # Step 2 client component
│   ├── api/
│   │   ├── admin/login/        # Admin authentication
│   │   ├── admin/links/        # CRUD for short links
│   │   └── get-destination/    # Secure destination resolver
│   ├── globals.css             # Tailwind + custom styles
│   ├── layout.tsx              # Root layout
│   └── not-found.tsx           # Custom 404
├── components/
│   ├── BannerAd.tsx            # Banner ad placeholder
│   ├── PopunderAd.tsx          # Popunder ad placeholder
│   ├── CountdownTimer.tsx      # Animated SVG countdown
│   └── CopyButton.tsx         # Copy-to-clipboard
├── lib/
│   ├── prisma.ts               # Prisma singleton
│   ├── tokens.ts               # HMAC token generation/verification
│   └── rate-limit.ts           # In-memory rate limiter
└── prisma/
    └── schema.prisma           # Database schema
```

---

## Security

| Layer | Protection |
|---|---|
| Destination URL | Never in HTML/JS; served only via POST with valid token |
| Session Tokens | HMAC-SHA256 signed, single-use, 5-min expiry, code-bound |
| Admin Auth | Constant-time comparison, HTTP-only secure cookie |
| Rate Limiting | 5 req/min per IP on `/api/get-destination` |
| Scraping | POST-only API, token + rate limit enforcement |

---

## License

Private use. Not for redistribution.
