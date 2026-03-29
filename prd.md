# Beanstalk Coffee — PRD v3

## Purpose
An **Awwwards-grade** single-page landing site for Beanstalk Coffee — a nature-inspired, vegetarian café on Gandhi Path Road, Jaipur. The experience must rival Apple product pages and luxury boutique commercials.

## Core Design Philosophy
- **True WebGL 3D scroll** — Replaces standard DOM with a fixed React Three Fiber `<Canvas>` rendering a 3D coffee cup and physics.
- **Sensory 3D Engine** — As the user scrolls, the cup physically translates through 3D space recursively, while naturally tumbling via a continuous `rotateY` 360° rotation.
- **"Live Vibes" utility** — real-time (simulated) CSS busy meter layered over the 3D canvas.
- **Parallax storytelling** — layered depth in The Vibe section built in the HTML layer.
- **Glassmorphism** — frosted glass text overlays float above the 3D WebGL context, allowing the cup to be seen through them.

## Sections

### Hero (HTML Layer)
- Massive typographic entrance: "Beanstalk" (Playfair Display, bold) + italic "Coffee" in gold
- Subline: "A Jaipur Hidden Gem."
- **BusyMeter widget**: Translucent badge showing current café capacity
- Scroll indicator

### The Vibe (HTML Layer)
- Nature-friendly atmosphere, living greenery, earthy interiors, resident cats
- Glassmorphism overlays on text blocks to reveal the 3D canvas beneath
- Features: "Nature, Everywhere" / "The Resident Cats" / "Crafted Intentionally"

### Menu (HTML Layer)
- 100% Vegetarian promise
- CSS Grid card layout with 3D tilt on hover (Framer Motion rotateX/Y)
- Price tags in gold

### Social Proof (HTML Layer)
- 4.5-star rating badge (112 reviews) — glassmorphism card
- Testimonial cards with staggered scroll-reveal

### Footer (HTML Layer)
- Dark minimalist layout, address, and hours

## The True 3D WebGL Engine (Canvas)
- **`Scene3D.tsx`**: A full-screen `<Canvas>` positioned fixed at z-index 0 to reside beneath all HTML. Soft directional lighting and environment maps ensure the cup looks ceramic/photorealistic.
- **Procedural Model (`CoffeeCup3D.tsx`)**: Utilizes Three.js cylinder and torus geometries to construct a highly detailed placeholder model. Features two materials: a shiny clearcoat ceramic white and a dark glossy espresso liquid.
- **Spatial Scroll Tracking**: Driven by framer-motion-3d or `useScroll`. The cup's world `[x,y,z]` position updates deterministically based on scroll progress.
- **Environment Physics (`CoffeeParticles3D.tsx`)**: Replaces the HTML emojis with actual 3D geometries (mini brown spheres) that scatter as the cup moves through them.

## Live Vibes Widget (Zustand)
- State: `busyLevel` = "Quiet" | "Buzzing" | "Packed"
- Wait time: 0 | 15 min | 30+ min
- Auto-cycles every 45 seconds (simulated)
- UI: Pulsing indicator dot + status text + wait estimate

## QuickOrder FAB (localStorage)
- Fixed floating button bottom-right
- Reads `localStorage.getItem('lastOrder')` on mount
- Shows "Order Again: [item name]" if returning user
- Falls back to "Start your order →" for new users
- Fades in after 2s delay
