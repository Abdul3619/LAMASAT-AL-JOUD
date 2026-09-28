# Lamasat Al Jood – Salon Website

I built this bilingual (English / Arabic) website for Lamasat Al Jood, a beauty salon in Bisha, Saudi Arabia. Clients can browse the services and book an appointment online.

## Stack

- React 19, Vite, Tailwind CSS 4, Motion, Embla Carousel
- Firebase Authentication (Google sign-in) and Cloud Firestore (appointments)

The page is prerendered at build time (`src/entry-server.tsx` + `scripts/prerender.mjs`), so `dist/index.html` contains the full page content; the browser then hydrates it.

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build in dist/
npm run lint     # type-check
```

## Deployment

Static site. Framework: Vite · Build command: `npm run build` · Output directory: `dist`.

No environment variables are required. The Firebase web configuration lives in `firebase-config.json` (these values are public by design; access is controlled by `firestore.rules`).

For Google sign-in to work on a deployed domain, add that domain under Firebase Console → Authentication → Settings → Authorized domains.

## Bookings

Bookings are stored in the `appointments` Firestore collection with status `pending`. Time slots follow the salon's opening hours (Sunday–Thursday from 10:00, Friday–Saturday from 14:00, Saudi time), and slots in the past cannot be booked.
