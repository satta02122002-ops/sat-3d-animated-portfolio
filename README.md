# Sattanathan Chandran — 3D Animated Portfolio

A premium, fully responsive, 3D-animated personal portfolio for **Sattanathan Chandran**, a Supply Chain & Logistics Professional based in Dubai, UAE. The site fuses a Fortune-500 executive aesthetic with a futuristic logistics-control-center feel.

## Tech Stack

- **Next.js 15** (App Router) · **React 19** · **TypeScript**
- **Tailwind CSS** with a custom dark executive theme
- **Framer Motion** for choreographed motion
- **Three.js + React Three Fiber + Drei** for the 3D globe and warehouse twin
- **GSAP** (available for advanced timelines)
- **Lucide Icons**

## Highlights

- Rotating 3D globe with major logistics hubs (Dubai, Singapore, Rotterdam, Shanghai, Hamburg, New York) and animated trade-route pulses
- 3D warehouse digital twin (racking, containers, autonomous forklift) inside the Command Center section
- Interactive vertical experience timeline with expandable role cards
- Holographic skills "command stack" with animated proficiency bars
- Live KPI ring charts, animated bar chart, and area-line trend chart
- 3D tilt project cards with magnetic CTAs
- Custom cursor, scroll progress, loading screen, back-to-top, animated background grid
- Full SEO: metadata, Open Graph, structured data (Person schema), `sitemap.ts`, `robots.ts`
- Accessible: keyboard-navigable, respects `prefers-reduced-motion`, semantic HTML

## Project Structure

```
src/
  app/                    # Next.js App Router (layout, page, sitemap, robots, globals)
  components/
    hero/                 # Hero + 3D globe + rotating titles
    about/                # Executive about cards
    experience/           # Interactive timeline
    skills/               # Holographic skill panels
    command/              # 3D warehouse twin
    analytics/            # KPI rings + charts
    projects/             # 3D-tilt project cards
    achievements/         # Counters + awards + certifications
    personal/             # Holographic profile frame
    contact/              # Contact form + comms hub
    nav/                  # Navbar + footer
    ui/                   # Reusable primitives (cursor, magnetic button, etc.)
  data/portfolio.ts       # All copy and CV content
  lib/utils.ts            # Helpers (cn, lat/lng → vector3)
public/
  robots.txt
  resume.pdf              # Replace placeholder with the real CV
```

## Getting Started

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Production Build

```bash
npm run build
npm run start
```

### Deployment

Recommended: deploy to **Vercel** — it natively supports Next.js 15 / React 19. Push the repository, import on Vercel, and set the root directory to the project root. No custom build settings required.

Replace `https://satteches.com` in `src/app/layout.tsx`, `src/app/robots.ts`, and `src/app/sitemap.ts` if the production domain differs.

### Adding the Resume

Drop `resume.pdf` into `/public/` — the Download Resume CTAs in the Hero and Navbar will automatically wire up.

## Accessibility & Performance

- All animations honour `prefers-reduced-motion`
- Three.js scenes are lazy-loaded with `next/dynamic` and only mount on the client
- Optimised package imports for `lucide-react`, `framer-motion`, `@react-three/drei`
- Static metadata generation and `image/avif`, `image/webp` formats configured in `next.config.ts`

## Author

**Sattanathan Chandran** · Dubai, UAE · [linkedin.com/in/sat-logistics](https://linkedin.com/in/sat-logistics) · sattanathan.chandran@gmail.com
