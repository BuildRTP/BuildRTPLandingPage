# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js landing page for BuildRTP, a student-driven organization in the Research Triangle Park area. The site promotes their LaunchUP pitch competition and provides information about the organization.

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design tokens
- **UI Components**: shadcn/ui component library
- **Icons**: Lucide React
- **Analytics**: Vercel Analytics
- **Font**: Montserrat (Google Fonts)

## Development Commands

```bash
# Start development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with Montserrat font
│   ├── page.tsx           # Home page with all main components
│   └── launchup/          # LaunchUP event detail page
│       └── page.tsx
├── components/            # React components
│   ├── ui/               # shadcn/ui base components
│   ├── header.tsx        # Site navigation
│   ├── hero-section.tsx  # Main hero banner
│   ├── event-card.tsx    # Event promotion component
│   ├── about-section.tsx # About BuildRTP
│   ├── sponsors-section.tsx # Sponsor showcase
│   └── footer.tsx        # Site footer
└── lib/
    └── utils.ts          # Utility functions (cn helper)
```

## Design System

### Colors
- `mainblue`: #00a8cc (primary brand color)
- `secondaryblue`: #006699 (secondary brand color)  
- `orange`: #ff6600 (accent color for CTAs)

### Typography
- Primary font: Montserrat (weights: 400, 700)
- Font variable: `--font-montserrat`

## Key Features

### Event Management
- Event details are hardcoded in `src/app/page.tsx` (EventCard component)
- LaunchUP specific page at `/launchup` with detailed event information
- Registration links point to external forms (Tally)

### Navigation
- Redirect from `/eventproposal` to Google Docs form (configured in `next.config.ts`)
- Static header navigation

### Analytics
- Vercel Analytics integrated in root layout

## Component Architecture

- **Modular Design**: Each section is a separate component
- **shadcn/ui Integration**: Uses shadcn/ui for consistent base components (Button, Card, Badge)
- **Responsive**: Mobile-first responsive design with Tailwind classes
- **Type Safety**: Full TypeScript coverage

## Development Notes

- Uses Next.js App Router (not Pages Router)
- ESLint configured with Next.js and TypeScript rules
- No testing framework currently configured
- No custom API routes - purely static content
- Images stored in `public/` directory
- Uses path aliases: `@/*` maps to `./src/*`

## Content Updates

- Event information in `src/app/page.tsx` and `src/app/launchup/page.tsx`
- Sponsor logos in `public/logos/`
- Site metadata in `src/app/layout.tsx`