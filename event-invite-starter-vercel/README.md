
# Event Invite Starter (React + Vite + Tailwind + PWA)

Ready to `npm run dev`.

## Quickstart
```bash
npm i
npm run dev
```

- React + TypeScript + Vite
- TailwindCSS
- React Router (Home, RSVP, Admin)
- PWA (vite-plugin-pwa) with service worker & manifest
- ESLint + Prettier + EditorConfig
- Example RSVP form with token-based prefill (mocked)
- Countdown component and site footer

### Configure
- Update countdown target in `src/pages/Home.tsx`.
- Replace mock RSVP memory with your backend/Firebase.
- Adjust brand colors in `tailwind.config.js` and `src/styles.css`.


## Deploy to Vercel

1. Push this folder to GitHub/GitLab/Bitbucket.
2. In Vercel, **Add New Project** → import this repo.
3. Framework preset: **Vite**  
   Build command: `npm run build`  
   Output directory: `dist`
4. SPA routing is handled by `vercel.json`:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```
5. (Optional CLI)
```bash
npm i -g vercel
vercel       # first deploy
vercel --prod
```
