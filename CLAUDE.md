# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 application with TypeScript, showcasing an interactive word animation component with physics. The project displays cycling word pairs in Russian with animated transitions and physics-based falling words using Matter.js.

## Development Commands

```bash
# Run development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint
```

## Architecture

### Tech Stack
- **Next.js 15.3.2** with App Router
- **React 19** with TypeScript
- **Tailwind CSS v4** for styling
- **Framer Motion** for animations
- **Matter.js** for physics simulation

### Project Structure
- `/app` - Next.js App Router pages and components
  - `page.tsx` - Main page component
  - `layout.tsx` - Root layout with font configuration
  - `globals.css` - Global styles and Tailwind imports
  - `/components` - React components
    - `WordCyclingPhysics.tsx` - Main interactive component with physics

### Key Component: WordCyclingPhysics

The main component combines:
1. **Word cycling animation** - Displays pairs of Russian words that cycle every 6 seconds
2. **Physics simulation** - Previous words fall with realistic physics using Matter.js
3. **Interactive dragging** - Users can drag and throw falling words
4. **Dynamic fonts** - Each word uses a random serif font from a predefined list

### Font System
The app uses multiple Google Fonts configured in `layout.tsx`:
- Playfair Display
- Roboto Slab
- Merriweather
- Lora
- Crimson Text
- Source Serif Pro
- PT Serif
- Libre Baskerville
- EB Garamond
- Cormorant Garamond
- Anonymous Pro (for logo/headers)

## Development Notes

- The app uses Tailwind CSS v4 with PostCSS configuration
- Physics bodies are synced with DOM elements via requestAnimationFrame
- Falling words are automatically cleaned up after 30 seconds to prevent memory leaks
- The component handles both mouse and touch interactions for cross-device compatibility