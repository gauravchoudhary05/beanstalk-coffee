# Design System: Beanstalk Coffee v4

## 1. Visual Theme & Atmosphere
**Nature-Boutique with Frosted Luxury.** The aesthetic is dense and moody — dark espresso grounds contrasted by jewel-toned forest greens and warm parchment cream. Glassmorphism surfaces float above the darkness like morning mist over coffee. Every surface breathes: grain overlays on deep backgrounds, soft glows on golden accents, and blur-driven depth on text overlays.

**Dark mode** uses deep charcoal (#1C1C1E) and zinc (#27272A) with amber accents (#D4A843) for a sleek, premium evening experience.

## 2. Color Palette & Roles

| Token         | Hex         | Role                                          |
|---------------|-------------|-----------------------------------------------|
| `espresso`    | `#2C1B18`   | Primary hero/section background               |
| `forest`      | `#1E3D33`   | Accent color, CTAs, TheVibe section bg        |
| `parchment`   | `#F9F4EE`   | Light text, card backgrounds                  |
| `gold`        | `#C9A96E`   | Stars, highlights, "Coffee" italic, prices    |
| `bark`        | `#5C3D2E`   | Secondary text on light sections              |
| `sage`        | `#7BA68C`   | Subtle green accents, section labels          |
| `smoke`       | `#1A1210`   | Footer — deepest background                   |
| `cream`       | `#FDF8F0`   | Light-mode content wrapper background         |
| `warm-stone`  | `#E8DDD0`   | Cards, tab backgrounds, subtle surfaces       |
| `latte`       | `#D4C5B0`   | Borders, secondary card surfaces              |
| `mocha`       | `#A38B73`   | Muted text, decorative elements               |
| `charcoal`    | `#1C1C1E`   | Dark-mode body background                     |
| `zinc-deep`   | `#27272A`   | Dark-mode card surfaces                       |
| `zinc-mid`    | `#3F3F46`   | Dark-mode borders                             |
| `amber-accent`| `#D4A843`   | Dark-mode primary accent (replaces gold)      |

## 3. Typography Rules
- **Display / Headings**: `Playfair Display` — large, dramatic serif. Bold for `h1`/`h2`, italic normal-weight for emphasis
- **Body / UI**: `Inter` — clean, airy, 400–500 weight. No decorative elements.
- **Overlines**: Inter, weight 500, tracking `0.3em`, uppercase, 11–13px, sage or gold
- **Prices**: Playfair Display, semibold, gold color with ₹ prefix
- Letter-spacing for headings: `tracking-tight` to `leading-[0.9]` for dramatic compression

## 4. Component Stylings
- **Buttons/CTAs**: Pill-shaped (`rounded-full`), gold border, parchment text, `hover:bg-gold` transition
- **Cards**: Generously rounded (`rounded-2xl`), frosted glass (`.glass-card` utility: `bg-parchment/6 backdrop-blur-16 border-parchment/10`)
- **Menu Tabs**: Pill-shaped, horizontal scrollable row. Active = gold bg + espresso text + gold shadow. Inactive = warm-stone/40 bg
- **Menu Item Cards**: 3D tilt on hover (rotateX/Y up to 8°), cream bg (light) / zinc-deep bg (dark), gold price, steam lines on hover
- **BusyMeter**: Translucent (`bg-espresso/60 backdrop-blur-sm`), thin border `border-parchment/20`
- **FAB**: Circular (`rounded-full`), gold background, espresso text, `shadow-2xl`

## 5. Layout Principles
- **Generous whitespace**: sections `py-24 md:py-36` (menu), `py-32 md:py-44` (vibe/reviews)
- **Max width container**: `max-w-6xl mx-auto px-6`
- **Menu grid**: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` for items within subcategories
- **Tab navigation**: Flexbox wrap, centered, gap-2/3
- **Cup**: `position: fixed`, z-50, pointer-events-none — floats above all content

## 6. Animations
- **Steam**: CSS `@keyframes steam` — 2s ease-in infinite, 3 staggered lines
- **Float**: 4s ease-in-out infinite translateY bounce
- **Shimmer**: 3s ease-in-out infinite translateX sweep for badge highlights
- **Tab transitions**: Framer Motion AnimatePresence fade+slide (0.35s easeOut)
- **Card elevation**: `card-elevate` class — translateY(-4px) + shadow on hover
- **Divider grow**: Width animation from 0→100% for gold hero divider
- **Scroll indicator**: Mouse icon with bouncing dot + chevron

## 7. Menu Structure (4 Tabs, 14 Subcategories, 108 Items)
1. **Beverages & Shakes** — Shakes (13), Frappé (4), Hot Beverages (4), Tea (5), Mocktails (10)
2. **Quick Bites** — Sandwiches (5), Burgers & Breads (7), French Fries (4), Maggi (5), Subs (2), Buns (3)
3. **Mains & Chinese** — Pizza (6), Pasta (4), Chinese (15)
4. **Health & Desserts** — Diet (3), Desserts (7)

## 8. Design System Notes for Stitch Generation
Generate screens using this palette: Deep espresso brown (#2C1B18) hero backgrounds, Forest green (#1E3D33) accent sections, Cream (#FDF8F0) content wrappers. Typography uses Playfair Display serif for headings and Inter sans-serif for body. Cards use frosted glass effects (`.glass-card` utility). Gold (#C9A96E) is used for ratings, prices, tab highlights, and italicised heading accents. Menu uses pill tabs with animated transitions. Dark mode uses Charcoal (#1C1C1E) body with Zinc (#27272A) surfaces and Amber (#D4A843) accents. The atmosphere is "cozy luxury boutique" — think premium coffee bar meets Japanese garden.
