# CubixGears public website

Marketing and workshop onboarding website for CubixGears, built with **Next.js 16, React 19, TypeScript and Tailwind CSS 4**.

## Pages

| Route | Purpose |
|---|---|
| / | Public product home |
| /features | Feature modules |
| /how-it-works | Workshop service process |
| /for-workshops | Workshop types |
| /pricing | Feature-credit billing overview |
| /contact | Contact and onboarding |
| /signup | New workshop registration |
| /signup/success | Registration next steps |
| /api/signup | Server-side Django signup proxy |

The public website intentionally has **no login page or login CTA**. Sign-in and password setup belong to the Company Panel.

## Local development

Install Node.js 22 and run:

    npm ci
    cp .env.example .env.local
    npm run dev

Open http://localhost:3000.

## Backend

Server-only environment variables:

    BACKEND_API_URL=http://127.0.0.1:8000/api/v1
    BACKEND_SIGNUP_PATH=/auth/signup

For local signup, start Django first (typically `python manage.py runserver 127.0.0.1:8000`).
The public website calls its own `POST /api/signup` Next.js route, which forwards to
`POST http://127.0.0.1:8000/api/v1/auth/signup`. Check that the backend is
available by opening `http://127.0.0.1:8000/api/v1/health/`.
The development server defaults to the local backend if `BACKEND_API_URL` is
not set; an explicitly configured value always takes precedence.

**For a deployed public website (e.g. Vercel):** set `BACKEND_API_URL` as a
server-side environment variable to the real **publicly reachable HTTPS**
Django API base ending in `/api/v1`. Set `BACKEND_SIGNUP_PATH=/auth/signup`.
Do not use `localhost`, `127.0.0.1`, an old hosting example domain or a
Company Panel website URL as the deployed backend URL. Redeploy after changing
environment variables; the website deployment must be able to reach Django from
its own server runtime. Check `https://YOUR_BACKEND_HOST/api/v1/health/`
from outside your machine before submitting a registration.

The proxy returns `SIGNUP_BACKEND_NOT_CONFIGURED` (503) when production env
is missing, `SIGNUP_BACKEND_UNREACHABLE` (502) on connection failures and
`SIGNUP_BACKEND_TIMEOUT` (504) on timeout. Check Next.js server logs for the
upstream host and failure category only; personal signup data is not logged.
The proxy never retries failed signup POSTs to avoid duplicate workshops.

Optional production variables:

    SITE_URL=https://your-real-domain.example
    CONTACT_EMAIL=your-real-support-email@example.com

Never expose backend URLs or secrets in NEXT_PUBLIC_ variables. Only set a real contact email if it is monitored; otherwise, the Contact page shows product and signup links.

The public form sends workshop name, owner name, mobile and email to /api/signup. The Next.js server forwards the mapped fields to Django. The form does **not** ask for a country, state or city.

Django is responsible for account creation and secure password setup email. Configure its production SMTP and Company Panel password setup URL separately.

## Validation

    npm run lint
    npx tsc --noEmit
    node --test tests/signup-no-location.test.mjs
    npm run build

GitHub Actions runs these checks on pull requests.

## Production checklist

- Configure the live Django API URL, correct signup path and working email delivery.
- Set the real SITE_URL and optionally CONTACT_EMAIL.
- Test navigation, signup success/failure, email and password setup against a staging backend.
- Confirm live pricing and credit rules before publishing numeric claims.
- Publish approved privacy policy, terms and verified business contact details before launch.
- Perform keyboard, mobile-device, and cross-browser accessibility testing.
- Merge only after CI passes and the changes are reviewed.

## Deploy

This application requires a supported Node.js server runtime; it is not configured as a static export. Build using npm ci then npm run build, and serve using npm start. Never commit .env.local.
