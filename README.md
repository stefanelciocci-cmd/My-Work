# Stefan Ciocirlan — Portfolio

Personal portfolio built with **Next.js 16**, **Tailwind CSS v4**, **Motion** and **React Bits Pro**.

## Getting started

```bash
npm install
npm run dev
```

Create `.env.local` with:

```bash
RESEND_API_KEY=...            # contact form emails (https://resend.com)
REACTBITS_LICENSE_KEY=...     # only needed to install more React Bits Pro items
```

## Structure

- `lib/content.ts` – all copy: profile, skills, projects, recommendations. Edit content here.
- `app/page.tsx` – section order.
- `components/site/` – the sections:
  - `navigation.tsx` – floating glass pill with an active-section indicator and scroll progress (from React Bits `navigation-12`)
  - `hero.tsx` – split hero over the `GrainWave` shader, name animated with `StaggeredText`, notched video card (from `hero-1`)
  - `about.tsx` – interests as `ParallaxPills`, story revealed with `BlurHighlight`
  - `skills.tsx` – skill groups and the tech stack on a `BendingMarquee`
  - `work.tsx` – project index with a sticky crossfading preview (from `showcase-7`)
  - `testimonials.tsx` – spotlight recommendations with timed rotation (from `social-proof-15`)
  - `play.tsx` – memory game with 3D card flips
  - `contact.tsx` – contact form posting to `/api/contact` (from `contact-8`)
  - `footer.tsx` – link cards and wordmark (from `footer-1`)
  - `motion.tsx` – the shared motion system: `Reveal`, `Section`, `SectionHeader`, one easing
  - `smooth-scroll.tsx` – Lenis smooth scrolling and `scrollToId`
- `components/react-bits/` – React Bits Pro components (editable source).
- `app/api/contact/route.ts` – sends the contact email through Resend (input is validated and escaped, with a honeypot against bots).

## Assets

- `public/images/projects/` – real screenshots of the live projects (Ozas, The Population Project), shown in a browser frame. Private projects get a terminal-style cover generated from `terminal` in `lib/content.ts`.
- The hero editor window (`components/site/code-window.tsx`) is rendered in code, no video or image.
- `app/icon.svg`, `app/apple-icon.tsx` and `app/opengraph-image.tsx` generate the favicon, iOS icon and link-preview image.

## Motion

Only the navigation and hero animate on load; everything else reveals once as it scrolls into view.
All animations respect `prefers-reduced-motion`.

## Adding React Bits Pro items

The registries are configured in `components.json`. With the license key in `.env.local`:

```bash
npx shadcn@latest add @reactbits-starter/<component>-tw
npx shadcn@latest add @reactbits-pro/<block>
```
