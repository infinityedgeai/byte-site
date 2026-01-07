# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
npm run dev          # Start dev server with Turbopack
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
npm run test         # Run Jest unit tests
npm run test:watch   # Run Jest in watch mode
npm run cypress:open # Open Cypress for interactive E2E testing
npm run cypress      # Run Cypress E2E tests headless
```

E2E tests require the app to be running (`npm run start` or `npm run dev`).

## Architecture

This is a Next.js 15 site using the App Router with React 19, Tailwind CSS 4, and TypeScript.

### Project Structure

- `src/app/` - Next.js App Router pages and layouts
- `src/app/lib/utils.tsx` - Utility functions (includes `cn()` for Tailwind class merging)
- `src/components/` - React components (SlideOne through SlideFour, MenuBar, ThemeToggle)
- `__tests__/` - Jest unit tests
- `cypress/e2e/` - Cypress E2E tests

### Key Patterns

- **Client Components**: All components use `'use client'` directive
- **Theming**: Uses `next-themes` with ThemeProvider wrapping the app. Components access theme via `useTheme()` hook
- **Animations**: GSAP with TextPlugin for text animations
- **UI Components**: Radix UI primitives (e.g., `@radix-ui/react-toggle`)
- **Icons**: lucide-react
- **Path Alias**: `@/*` maps to `./src/*`

### Testing

- Unit tests use React Testing Library with Jest
- Unit test files go in `__tests__/` directory with `.test.tsx` extension
- Mock `next-themes` and other providers in unit tests
- E2E tests use Cypress, located in `cypress/e2e/`
