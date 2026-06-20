# Trip Land Travels — Luxury UI/UX Design System & Experience Specification

**Document Version:** 1.0  
**Date:** June 20, 2026  
**Prepared For:** UI/UX Designers · Frontend Developers · Brand Team  
**Client:** Trip Land Travels & Tours Pvt. Ltd.  
**Companion Document:** [TRIPLAND-PRD.md](./TRIPLAND-PRD.md)  
**Design Codename:** TripLand Atelier  

---

## Table of Contents

1. [Creative Direction & Brand Strategy](#1-creative-direction--brand-strategy)
2. [Design System](#2-design-system)
3. [UI Component Library](#3-ui-component-library)
4. [Layout System](#4-layout-system)
5. [Wireframes](#5-wireframes)
6. [Homepage UX Specification](#6-homepage-ux-specification)
7. [Package Detail Page UX](#7-package-detail-page-ux)
8. [Destination Page UX](#8-destination-page-ux)
9. [Mobile Design System](#9-mobile-design-system)
10. [Animation Guidelines](#10-animation-guidelines)
11. [Accessibility Guidelines](#11-accessibility-guidelines)
12. [Conversion Optimization](#12-conversion-optimization)
13. [Premium Branding Recommendations](#13-premium-branding-recommendations)
14. [Developer Handoff](#14-developer-handoff)

---

# 1. Creative Direction & Brand Strategy

## 1.1 Design North Star

> **"The Himalayas meet the concierge desk."**

Trip Land's digital experience should feel like opening a private travel folio from a world-class expedition house — cinematic, calm, and irresistibly actionable. Visitors should think: *"Wow. I want to book my next trip immediately."*

## 1.2 Inspiration Synthesis

| Brand | What We Borrow | What We Avoid |
|-------|----------------|---------------|
| **Airbnb** | Card discovery, trust micro-signals, clean grid rhythm | Rental-market casualness |
| **National Geographic Expeditions** | Editorial storytelling, expedition authority, map-forward UX | Academic dryness |
| **Four Seasons** | Quiet luxury, generous whitespace, service language | Hotel-only framing |
| **Aman Resorts** | Cinematic stillness, restrained palette, ritual-like pacing | Ultra-minimal opacity (hurts conversion) |
| **Luxury Escapes** | Offer framing, aspirational photography, deal urgency (ethical) | Discount-heavy tone |
| **Emirates Holidays** | International polish, premium package cards, global confidence | Airline-centric layout |

## 1.3 Competitive Design Leap

| Element | Sasa / Pangolin | TripLand Target |
|---------|-----------------|-----------------|
| Hero | Stock slider, promotional noise | Full-bleed cinematic video, single message |
| Navigation | Cluttered mega-menus / booking widgets | Glass nav, editorial hierarchy |
| Cards | Flat thumbnails, heavy borders | Glassmorphic premium cards, soft depth |
| Trust | Footer badges | Floating trust bar + contextual proof |
| CTA | Generic "Book Now" | Concierge language: "Plan Your Journey" |
| Motion | Carousel autoplay | Intentional scroll choreography |
| Mobile | Shrunk desktop | Thumb-zone conversion architecture |

## 1.4 Brand Personality Expression

| Trait | Visual Expression | Copy Tone |
|-------|-------------------|-----------|
| Premium | Gold accents, serif display type, slow reveals | "Curated," "bespoke," "personally designed" |
| Elegant | 80px+ section padding, 1.6 line-height, muted shadows | Complete sentences, no exclamation spam |
| Sophisticated | Dark primary `#0F172A`, restrained color count | Expert, assured, never salesy |
| Adventurous | Full-bleed landscape photography, dynamic diagonals | Active verbs: "Trek," "Discover," "Ascend" |
| Modern | Glass surfaces, fluid type, micro-interactions | Contemporary, international English |
| Friendly | Warm gold, rounded 12–16px radii, human testimonials | "We're here to guide you" |
| International | Dual Nepal + world map motifs, multi-currency hints | Global accessibility, local expertise |

## 1.5 Emotional Design Targets

```
First 3 seconds  → Awe (cinematic hero)
3–10 seconds     → Trust (credentials, calm UI)
10–30 seconds    → Desire (package/destination cards)
30–90 seconds    → Confidence (itinerary depth, testimonials)
90+ seconds      → Action (WhatsApp / inquiry CTA)
```

---

# 2. Design System

## 2.1 Color System

### Core Palette

| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| `--color-primary` | `#0F172A` | 15, 23, 42 | Headers, nav (scrolled), primary text on light, footer bg |
| `--color-primary-soft` | `#1E293B` | 30, 41, 59 | Secondary dark surfaces, card text |
| `--color-secondary` | `#D4AF37` | 212, 175, 55 | Primary CTA, active nav, key accents |
| `--color-luxury-gold` | `#C8A95B` | 200, 169, 91 | Hover states, badges, dividers, icons |
| `--color-accent` | `#F8FAFC` | 248, 250, 252 | Section backgrounds, input fills |
| `--color-background` | `#FFFFFF` | 255, 255, 255 | Page base, card surfaces |
| `--color-surface-glass` | `rgba(255,255,255,0.72)` | — | Glass cards, nav (transparent state) |
| `--color-surface-glass-dark` | `rgba(15,23,42,0.65)` | — | Hero overlays, video scrim |

### Extended Semantic Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-success` | `#16A34A` | Form success, availability |
| `--color-warning` | `#CA8A04` | Seasonal alerts |
| `--color-error` | `#DC2626` | Form errors |
| `--color-info` | `#2563EB` | Info badges |
| `--color-muted` | `#64748B` | Secondary text, captions |
| `--color-border` | `#E2E8F0` | Subtle dividers (use sparingly) |
| `--color-border-gold` | `rgba(200,169,91,0.35)` | Premium card outlines |

### Gradient System

```css
/* Hero overlay — cinematic depth */
--gradient-hero: linear-gradient(
  180deg,
  rgba(15, 23, 42, 0.15) 0%,
  rgba(15, 23, 42, 0.45) 55%,
  rgba(15, 23, 42, 0.82) 100%
);

/* Gold shimmer — CTA hover, badge highlights */
--gradient-gold: linear-gradient(
  135deg,
  #D4AF37 0%,
  #C8A95B 50%,
  #E8D5A3 100%
);

/* Section ambient — soft luxury wash */
--gradient-section: linear-gradient(
  180deg,
  #FFFFFF 0%,
  #F8FAFC 100%
);

/* Glass border — premium card edge */
--gradient-glass-border: linear-gradient(
  135deg,
  rgba(255,255,255,0.8) 0%,
  rgba(200,169,91,0.25) 50%,
  rgba(255,255,255,0.4) 100%
);
```

### Color Usage Rules

1. **60%** white/off-white backgrounds — breathing room
2. **25%** primary dark — authority moments (footer, scrolled nav, hero text)
3. **10%** accent `#F8FAFC` — section alternation
4. **5%** gold — CTAs, badges, micro-accents only (never large gold fields)
5. Never use pure `#000000` — always `#0F172A`
6. Photography carries color; UI stays restrained

### Dark Mode (Phase 2 — Optional)

Not in MVP. If added: invert to `#0B1120` base, gold accents unchanged, glass surfaces at `rgba(30,41,59,0.75)`.

---

## 2.2 Typography

### Font Stack

| Role | Font | Fallback | Source | Rationale |
|------|------|----------|--------|-----------|
| **Display** | **Cormorant Garamond** | Georgia, serif | Google Fonts | Editorial luxury; Nat Geo / Aman energy |
| **Heading** | **DM Sans** | system-ui, sans-serif | Google Fonts | Modern geometric authority |
| **Body** | **Inter** | system-ui, sans-serif | Google Fonts | Best-in-class readability at small sizes |

### Font Loading Strategy

```html
<!-- next/font/google -->
Cormorant_Garamond: weights 400, 500, 600, 700 — display, h1, h2
DM_Sans: weights 500, 600, 700 — h3, h4, nav, buttons
Inter: weights 400, 500, 600 — body, forms, captions
```

`font-display: swap` on all. Subset Latin only for MVP.

### Type Scale (Fluid)

| Token | Desktop | Mobile | Weight | Font | Line Height | Letter Spacing |
|-------|---------|--------|--------|------|-------------|----------------|
| `display-xl` | clamp(3.5rem, 6vw, 5.5rem) | clamp(2.5rem, 8vw, 3.5rem) | 500 | Cormorant | 1.05 | -0.02em |
| `display-lg` | clamp(2.75rem, 4vw, 4rem) | clamp(2rem, 6vw, 2.75rem) | 500 | Cormorant | 1.1 | -0.015em |
| `h1` | clamp(2.25rem, 3vw, 3rem) | clamp(1.75rem, 5vw, 2.25rem) | 600 | DM Sans | 1.15 | -0.01em |
| `h2` | clamp(1.75rem, 2.5vw, 2.25rem) | clamp(1.5rem, 4vw, 1.75rem) | 600 | DM Sans | 1.2 | -0.01em |
| `h3` | clamp(1.375rem, 1.5vw, 1.625rem) | 1.25rem | 600 | DM Sans | 1.3 | 0 |
| `h4` | 1.125rem | 1.0625rem | 600 | DM Sans | 1.35 | 0 |
| `body-lg` | 1.125rem | 1.0625rem | 400 | Inter | 1.7 | 0 |
| `body` | 1rem | 1rem | 400 | Inter | 1.65 | 0 |
| `body-sm` | 0.875rem | 0.875rem | 400 | Inter | 1.6 | 0 |
| `caption` | 0.75rem | 0.75rem | 500 | Inter | 1.5 | 0.04em |
| `overline` | 0.6875rem | 0.6875rem | 600 | DM Sans | 1.4 | 0.12em |
| `button` | 0.9375rem | 0.9375rem | 600 | DM Sans | 1 | 0.02em |
| `button-sm` | 0.8125rem | 0.8125rem | 600 | DM Sans | 1 | 0.03em |

### Typography Rules

- **Display font:** Hero headlines, section emotional hooks only (max 2 per page)
- **DM Sans:** All functional headings, navigation, buttons, labels
- **Inter:** Paragraphs, form text, metadata, FAQ answers
- **Overline pattern:** `DISCOVER NEPAL` — uppercase, gold, above section titles
- **Max line width:** 65ch for body copy; 45ch for hero subheads
- **Paragraph spacing:** `margin-bottom: 1.25em`
- **Heading spacing:** `margin-bottom: 0.5em` (tight coupling to subhead)

### Responsive Typography Behavior

```
Mobile (< 640px):   display-xl → display-lg cap; body stays 16px min (no zoom on iOS)
Tablet (640–1024):  Intermediate clamp values
Desktop (> 1024):   Full scale; display font allowed at display-xl
Wide (> 1440):      Content max-width constrains type — no further scaling
```

---

## 2.3 Spacing & Grid

### Spacing Scale (4px base)

| Token | Value | Usage |
|-------|-------|-------|
| `--space-1` | 4px | Icon gaps |
| `--space-2` | 8px | Tight inline |
| `--space-3` | 12px | Badge padding |
| `--space-4` | 16px | Card inner sm |
| `--space-5` | 20px | Form field gaps |
| `--space-6` | 24px | Card padding mobile |
| `--space-8` | 32px | Card padding desktop |
| `--space-10` | 40px | Section title margins |
| `--space-12` | 48px | Component gaps |
| `--space-16` | 64px | Section padding mobile |
| `--space-20` | 80px | Section padding tablet |
| `--space-24` | 96px | Section padding desktop |
| `--space-32` | 128px | Hero/footer major zones |

### Grid System

| Breakpoint | Columns | Gutter | Margin | Max Content |
|------------|---------|--------|--------|-------------|
| `< 640px` | 4 | 16px | 20px | 100% |
| `640–1024px` | 8 | 24px | 32px | 100% |
| `1024–1280px` | 12 | 24px | 48px | 1200px |
| `> 1280px` | 12 | 32px | auto | 1280px |
| `> 1536px` | 12 | 32px | auto | 1400px (hero/full-bleed exempt) |

### Elevation / Shadow System

```css
--shadow-xs:  0 1px 2px rgba(15, 23, 42, 0.04);
--shadow-sm:  0 2px 8px rgba(15, 23, 42, 0.06);
--shadow-md:  0 8px 24px rgba(15, 23, 42, 0.08);
--shadow-lg:  0 16px 48px rgba(15, 23, 42, 0.10);
--shadow-xl:  0 24px 64px rgba(15, 23, 42, 0.12);
--shadow-gold: 0 8px 32px rgba(212, 175, 55, 0.18);
--shadow-glass: 0 8px 32px rgba(15, 23, 42, 0.06), inset 0 1px 0 rgba(255,255,255,0.6);
```

**Rule:** Prefer glass + subtle shadow over hard borders. Max elevation on hover: `--shadow-lg`.

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | 8px | Badges, chips |
| `--radius-md` | 12px | Buttons, inputs |
| `--radius-lg` | 16px | Cards |
| `--radius-xl` | 24px | Modals, hero search bar |
| `--radius-2xl` | 32px | Feature panels |
| `--radius-full` | 9999px | Pills, avatars |

### Glassmorphism Recipe

```css
.glass-surface {
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow: var(--shadow-glass);
}

.glass-surface-dark {
  background: rgba(15, 23, 42, 0.65);
  backdrop-filter: blur(24px) saturate(150%);
  border: 1px solid rgba(255, 255, 255, 0.08);
}
```

**Performance note:** Limit concurrent glass panels to 3 per viewport. Use static fallback (`background: #FFFFFF`) when `prefers-reduced-transparency`.

---

## 2.4 Iconography

- **Library:** Lucide React (1.5px stroke, rounded caps)
- **Sizes:** 16px (inline), 20px (buttons), 24px (nav), 32px (feature icons)
- **Color:** `--color-primary` default; `--color-luxury-gold` on dark surfaces
- **Custom:** Nepal mountain silhouette mark for favicon and watermark (subtle, 5% opacity on section backgrounds)

---

# 3. UI Component Library

## 3.1 Buttons

### Primary (Gold CTA)

```
Background: --gradient-gold
Text: #0F172A
Padding: 14px 28px (desktop) / 16px 24px (mobile, full-width option)
Radius: --radius-md
Shadow: --shadow-gold (rest), --shadow-lg (hover)
Font: button / DM Sans 600

Hover: brightness(1.05), translateY(-1px), 200ms ease-out
Active: translateY(0), brightness(0.98)
Focus: 2px solid #0F172A, 2px offset
Disabled: opacity 0.5, no shadow
```

### Secondary (Dark Outline)

```
Background: transparent
Border: 1.5px solid #0F172A
Text: #0F172A
Padding: 14px 28px
Hover: bg #0F172A, text #FFFFFF
```

### Ghost (On Dark / Hero)

```
Background: rgba(255,255,255,0.12)
Border: 1px solid rgba(255,255,255,0.3)
Text: #FFFFFF
Backdrop-filter: blur(8px)
Hover: rgba(255,255,255,0.22)
```

### WhatsApp Button

```
Background: #25D366
Text: #FFFFFF
Icon: WhatsApp logo left, 20px
Padding: 14px 24px
Radius: --radius-md
Label: "Chat on WhatsApp"

Mobile sticky variant: icon + "Chat" (compact)
```

### Icon Button

```
Size: 44×44px (touch target)
Radius: --radius-full
Background: glass-surface
Icon: 20px
```

### Button Hierarchy Per Context

| Context | Primary | Secondary |
|---------|---------|-----------|
| Hero | Plan Your Journey | Explore Packages |
| Package page | Inquire About This Trip | WhatsApp |
| Section end | View All Packages | — |
| Mobile sticky | WhatsApp | Call |

---

## 3.2 Cards

### Package Card (Premium)

```
Structure:
┌─────────────────────────────────┐
│  [Image 16:10, rounded-t-lg]    │
│  ┌──────┐                       │
│  │ 14D  │  ★ Featured (optional)│
│  └──────┘                       │
├─────────────────────────────────┤
│  OVERLINE: TREKKING             │
│  Everest Base Camp Trek         │
│  ⏱ 14 Days  ·  ◆ Challenging    │
│  From USD 1,450                 │
│  [View Journey →]               │
└─────────────────────────────────┘

Surface: #FFFFFF
Radius: --radius-lg
Shadow: --shadow-sm → --shadow-lg on hover
Hover: translateY(-4px), image scale(1.04), 400ms cubic-bezier(0.22, 1, 0.36, 1)
Image: object-cover, overflow hidden
Badge (duration): glass-surface, top-left overlay
Price: DM Sans 600, --color-primary; "From" in caption muted
```

### Destination Card

```
Structure:
┌─────────────────────────────────┐
│  [Full-bleed image, 4:5 ratio]  │
│                                 │
│  ▓▓▓▓ gradient overlay bottom   │
│  Everest Region                 │
│  12 curated journeys            │
│  [Explore →]                    │
└─────────────────────────────────┘

Hover: overlay deepens, title translateY(-4px), arrow slides right 4px
Min-height: 380px desktop, 280px mobile
```

### Glass Stat Card (Hero Floating)

```
┌──────────────────┐
│  15+             │
│  Years Experience│
└──────────────────┘

Background: glass-surface-dark
Text: #FFFFFF
Number: Cormorant display, 2rem, gold
Label: caption, rgba(255,255,255,0.75)
Padding: 20px 24px
Radius: --radius-lg
```

### Testimonial Card

```
┌─────────────────────────────────┐
│  " Quote text in Cormorant      │
│    italic, 1.25rem..."          │
│                                 │
│  [Avatar]  Sarah Mitchell       │
│            London · EBC Trek    │
│            ★★★★★                │
└─────────────────────────────────┘

Background: --color-accent
Border-left: 3px solid --color-luxury-gold
Padding: 32px
Radius: --radius-lg
```

### Blog Card

```
Horizontal on desktop (image 40% | content 60%)
Vertical stack on mobile
Category pill: gold outline
Read time + date in caption
Hover: title color → --color-luxury-gold
```

---

## 3.3 Forms & Inputs

### Text Input

```
Height: 52px
Padding: 0 16px
Background: --color-accent (#F8FAFC)
Border: 1px solid transparent
Radius: --radius-md
Font: Inter 400, 1rem
Placeholder: --color-muted

Focus: border --color-luxury-gold, bg #FFFFFF, shadow --shadow-sm
Error: border --color-error, helper text below in error color
```

### Select / Dropdown

```
Same dimensions as text input
Chevron icon right
Custom styled (Shadcn Select)
```

### Textarea

```
Min-height: 120px
Padding: 16px
Resize: vertical only
```

### Checkbox / Radio

```
Size: 20px
Checked: fill --color-secondary, check #0F172A
Label: Inter 400, 16px, 8px gap
```

### Form Layout

```
Desktop: 2-column grid for name/email, phone/dates; full-width message
Mobile: single column, 16px gaps
Submit: full-width primary button mobile; inline right desktop
```

### Inquiry Form (Package Page — Sidebar)

```
Sticky on desktop (top: 100px)
Glass surface card
Fields: Name*, Email*, Phone* (country code), Travel Date, Group Size, Message*
Preferred contact: radio (WhatsApp / Email / Phone)
CTA: "Request Custom Quote"
Microcopy: "We respond within 2 hours during business hours"
```

---

## 3.4 Navigation

### Desktop Header (Transparent → Solid)

**State A — Hero (transparent):**
```
┌────────────────────────────────────────────────────────────────────┐
│ [Logo white]   Destinations▾  Nepal Tours▾  Intl▾  Services▾     │
│                About  Blog          [WhatsApp] [Plan Journey ●]    │
└────────────────────────────────────────────────────────────────────┘
Background: transparent
Text: #FFFFFF
Height: 80px
```

**State B — Scrolled (glass):**
```
Background: glass-surface (white)
Text: --color-primary
Shadow: --shadow-sm
Height: 72px
Transition: 300ms ease
Logo: dark variant
```

### Mega Menu (Destinations)

```
┌─────────────────────────────────────────────────────────┐
│  NEPAL DESTINATIONS          │  QUICK LINKS             │
│  ┌────┐ Everest Region       │  All Destinations        │
│  │img│ Annapurna Region      │  Trekking Packages       │
│  └────┘ Langtang · Mustang   │  View Gallery            │
│  ...9 items in 3-col grid    │                          │
└─────────────────────────────────────────────────────────┘

Width: 720px
Padding: 32px
Animation: fade + translateY(8px → 0), 250ms
```

### Mobile Navigation

```
┌────────────────────────┐
│ [Logo]          [≡]    │  ← Header 64px
├────────────────────────┤
│ Full-screen overlay    │
│ glass-surface-dark     │
│                        │
│ Destinations      [+]  │
│ Nepal Tours       [+]  │
│ International     [+]  │
│ Services          [+]  │
│ About                  │
│ Blog                   │
│ Contact                │
│ ─────────────────────  │
│ [WhatsApp — full width]│
│ [Plan Your Journey]    │
│                        │
│ 📞 +977 9851126300     │
└────────────────────────┘

Accordion sub-menus
Body scroll locked when open
Enter: slide from right, 350ms
```

### Breadcrumbs

```
Home  /  Trekking Packages  /  Everest Base Camp Trek
      ↑ gold on hover    ↑ muted   ↑ primary, truncated
Font: caption, Inter 500
```

---

## 3.5 Badges & Chips

| Variant | Style |
|---------|-------|
| **Category** | Overline text, `TREKKING`, gold text, no bg |
| **Difficulty Easy** | bg `#DCFCE7`, text `#166534` |
| **Difficulty Moderate** | bg `#FEF9C3`, text `#854D0E` |
| **Difficulty Challenging** | bg `#FFEDD5`, text `#9A3412` |
| **Difficulty Extreme** | bg `#FEE2E2`, text `#991B1B` |
| **Featured** | `--gradient-gold` bg, dark text, star icon |
| **Best Seller** | glass + gold border |
| **New** | primary bg, white text |
| **NATTA** | outline gold, shield icon |

```
Padding: 6px 12px
Radius: --radius-full
Font: overline / caption
```

---

## 3.6 Modals

### Inquiry Modal (Homepage quick capture)

```
┌─────────────────────────────────────────┐
│  Plan Your Journey               [×]    │
│  ─────────────────────────────────────  │
│  Tell us about your dream trip.         │
│  Our concierge will craft a personalized│
│  itinerary within 2 hours.             │
│                                         │
│  [Name]  [Email]                        │
│  [Phone] [Interest ▾]                   │
│  [Message]                              │
│                                         │
│  [Request Consultation — full width]    │
│  Prefer WhatsApp? [Chat now]            │
└─────────────────────────────────────────┘

Overlay: rgba(15,23,42,0.6), backdrop-blur(4px)
Modal: white, radius --radius-xl, max-width 560px
Padding: 40px
Enter: scale(0.96→1) + fade, 300ms
Focus trap enabled
```

### Image Lightbox (Gallery)

```
Full viewport, bg rgba(15,23,42,0.92)
Image: max 90vw/85vh, contain
Nav arrows: glass icon buttons
Caption: bottom, white, caption font
Swipe on mobile
Pinch zoom optional (Phase 2)
```

---

## 3.7 Toasts

```
┌────────────────────────────────┐
│ ✓  Inquiry sent successfully   │
│    We'll respond within 2 hrs  │
└────────────────────────────────┘

Position: bottom-right (desktop), bottom-center (mobile, above sticky bar)
Background: #0F172A
Text: #FFFFFF
Accent bar: left 3px gold (success) / red (error)
Duration: 5s auto-dismiss
Animation: slide up + fade
```

---

# 4. Layout System

## 4.1 Page Shell

```
┌──────────────────────────────────────────────┐
│  Announcement bar (optional, admin-controlled)│
├──────────────────────────────────────────────┤
│  Navigation (sticky)                          │
├──────────────────────────────────────────────┤
│  Main Content                                 │
│  (sections alternate white / accent)          │
├──────────────────────────────────────────────┤
│  Pre-footer CTA band (dark primary)           │
├──────────────────────────────────────────────┤
│  Footer (primary dark)                        │
├──────────────────────────────────────────────┤
│  Mobile sticky CTA bar (mobile only)          │
└──────────────────────────────────────────────┘
```

## 4.2 Section Patterns

| Pattern | Layout | Use |
|---------|--------|-----|
| **A — Full Bleed** | 100vw, no max-width | Hero, cinematic bands |
| **B — Contained** | max 1280px centered | Most content sections |
| **C — Split 50/50** | Image left / text right (swap on alternate) | Why Choose Us, Luxury Experiences |
| **D — Carousel** | 3-up desktop, 1.2-up mobile peek | Testimonials, packages |
| **E — Masonry Grid** | 2–4 col gallery | Travel Gallery |
| **F — Sidebar** | 65% content / 35% sticky sidebar | Package detail |

## 4.3 Section Rhythm

```
Hero:           100vh (min 600px, max 900px)
Major section:  padding-y 96px desktop / 64px mobile
Minor section:  padding-y 64px desktop / 48px mobile
CTA band:       padding-y 80px, bg --color-primary
Footer:         padding-y 64px
```

Alternate backgrounds: `#FFFFFF` → `#F8FAFC` → `#FFFFFF` for visual cadence.

---

# 5. Wireframes

## 5.1 Homepage — Desktop Wireframe

```
┌──────────────────────────────────────────────────────────────────────────┐
│ ░░░░░░░░░░░░░░░░ FULL-SCREEN HERO VIDEO ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
│ ░  [Nav transparent]                                                     │
│ ░                                                                        │
│ ░     Curated Journeys Across                                            │
│ ░     Nepal & the World          ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐       │
│ ░     [subhead]                  │ 15+ │ │500+ │ │ 9   │ │24/7 │       │
│ ░                                │ Yrs │ │Trav │ │Dest │ │Sup  │       │
│ ░  ┌────────────────────────┐  └─────┘ └─────┘ └─────┘ └─────┘       │
│ ░  │ 🔍 Where to?  [Search]  │  floating glass stats                   │
│ ░  └────────────────────────┘                                            │
│ ░  [Plan Your Journey]  [Explore Packages]                               │
│ ░                              ↓ scroll indicator (animated)            │
├──────────────────────────────────────────────────────────────────────────┤
│  POPULAR PACKAGES                                         [View All →]  │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐                        │
│  │ Pkg 1   │ │ Pkg 2   │ │ Pkg 3   │ │ Pkg 4   │   ← horizontal scroll│
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘     mobile / 4-col desk│
├──────────────────────────────────────────────────────────────────────────┤
│  FEATURED DESTINATIONS                                                   │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐                                 │
│  │ Everest  │ │ Annapurna│ │ Mustang  │                                 │
│  └──────────┘ └──────────┘ └──────────┘                                 │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐                                 │
│  │ Pokhara  │ │ Chitwan  │ │ Lumbini  │                                 │
│  └──────────┘ └──────────┘ └──────────┘                                 │
├──────────────────────────────────────────────────────────────────────────┤
│  WHY CHOOSE US (Split layout)                                            │
│  ┌─────────────────┐  Expert-Guided    Bespoke Itineraries              │
│  │                 │  Safety First     Transparent Pricing              │
│  │  [Team photo]   │  [icon] [icon] [icon] [icon]                       │
│  └─────────────────┘  [Meet Our Team →]                                  │
├──────────────────────────────────────────────────────────────────────────┤
│  INTERNATIONAL PACKAGES                                                  │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐                       │
│  │Dubai│Thai│Bali│Sing│Maly│Japan│Eur│   ← pill tabs + package cards   │
│  └────┘ └────┘ └────┘ └────┘ └────┘ └────┘ └────┘                       │
├──────────────────────────────────────────────────────────────────────────┤
│  LUXURY EXPERIENCES (Dark band, gold accents)                             │
│  ┌──────────────────────────────────────────────────────────┐           │
│  │  [Large feature image]  │  Helicopter · Premium Lodges   │           │
│  │                         │  Private Guides · VIP Transfers  │           │
│  └──────────────────────────────────────────────────────────┘           │
├──────────────────────────────────────────────────────────────────────────┤
│  TESTIMONIALS                              ← • • • carousel dots        │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐                     │
│  │  Quote 1     │ │  Quote 2     │ │  Quote 3     │                     │
│  └──────────────┘ └──────────────┘ └──────────────┘                     │
├──────────────────────────────────────────────────────────────────────────┤
│  TRAVEL GALLERY                                        [View Gallery →]   │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐                                            │
│  │    │ │    │ │    │ │    │  masonry, hover zoom                      │
│  └────┘ └────┘ └────┘ └────┘                                            │
├──────────────────────────────────────────────────────────────────────────┤
│  FROM THE JOURNAL                                         [All Posts →]  │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐                     │
│  │ Blog 1       │ │ Blog 2       │ │ Blog 3       │                     │
│  └──────────────┘ └──────────────┘ └──────────────┘                     │
├──────────────────────────────────────────────────────────────────────────┤
│  NEWSLETTER (accent bg)                                                   │
│  ┌────────────────────────────────────────────────────────┐             │
│  │  Journey Notes — monthly inspiration    [email] [→]   │             │
│  └────────────────────────────────────────────────────────┘             │
├──────────────────────────────────────────────────────────────────────────┤
│  CONTACT CTA (primary dark)                                              │
│  Ready to begin?  [Plan Your Journey]  [WhatsApp]  [Call]               │
├──────────────────────────────────────────────────────────────────────────┤
│  FOOTER — 5 columns, NATTA badge, social, legal                          │
└──────────────────────────────────────────────────────────────────────────┘
```

## 5.2 Package Detail — Desktop Wireframe

```
┌──────────────────────────────────────────────────────────────────────────┐
│  [Hero Image 60vh — parallax subtle]                                     │
│  Home / Trekking / Everest Base Camp Trek                                │
│  Everest Base Camp Trek                                                  │
│  ⏱ 14D  ◆ Challenging  👥 2–12  📍 Everest Region                       │
├────────────────────────────────────────────┬─────────────────────────────┤
│  MAIN (65%)                                │  SIDEBAR (35%) STICKY       │
│                                            │  ┌───────────────────────┐  │
│  From USD 1,450 / person                   │  │ Request Custom Quote  │  │
│  [★ Highlights chips]                      │  │ [Name]                │  │
│                                            │  │ [Email]               │  │
│  Overview paragraph...                     │  │ [Phone]               │  │
│                                            │  │ [Dates] [Group size]  │  │
│  ── ITINERARY TIMELINE ──                  │  │ [Message]             │  │
│  ● Day 1 — Arrival Kathmandu              │  │ [Submit]              │  │
│  │  Description...                         │  │ ─────────────────────  │  │
│  ● Day 2 — Fly to Lukla                   │  │ [WhatsApp — green]    │  │
│  │  ...                                   │  │ 📞 Call expert        │  │
│  ● Day 3 ...                               │  └───────────────────────┘  │
│                                            │                             │
│  ── GALLERY GRID ──                        │                             │
│  ── MAP ──                                 │                             │
│  ── INCLUDED / EXCLUDED (2 col) ──         │                             │
│  ── FAQ ACCORDION ──                       │                             │
│  ── RELATED PACKAGES ──                    │                             │
├────────────────────────────────────────────┴─────────────────────────────┤
│  MOBILE: Sidebar becomes bottom sheet triggered by sticky "Get Quote"    │
└──────────────────────────────────────────────────────────────────────────┘
```

## 5.3 Destination Page — Wireframe

```
┌──────────────────────────────────────────────────────────────────────────┐
│  [Destination Hero — 70vh, region name overlay]                          │
│  EVEREST REGION                                                          │
│  Where legends are made. 12 curated journeys.                            │
├──────────────────────────────────────────────────────────────────────────┤
│  OVERVIEW (centered, max 720px)                                          │
│  Long-form editorial intro...                                            │
├──────────────────────────────────────────────────────────────────────────┤
│  TRAVEL HIGHLIGHTS                                                       │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐                            │
│  │ Icon   │ │ Icon   │ │ Icon   │ │ Icon   │                            │
│  │ EBC    │ │ Gokyo  │ │ Heli   │ │ Culture│                            │
│  └────────┘ └────────┘ └────────┘ └────────┘                            │
├──────────────────────────────────────────────────────────────────────────┤
│  BEST TIME TO VISIT — visual month bar (green = ideal)                   │
├──────────────────────────────────────────────────────────────────────────┤
│  RELATED PACKAGES (filterable grid)                                      │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐                                    │
├──────────────────────────────────────────────────────────────────────────┤
│  DESTINATION GALLERY                                                     │
├──────────────────────────────────────────────────────────────────────────┤
│  PRACTICAL INFO + FAQ                                                    │
├──────────────────────────────────────────────────────────────────────────┤
│  CTA: Explore Everest Packages                                           │
└──────────────────────────────────────────────────────────────────────────┘
```

## 5.4 International Destination — Variation

Same structure with additions:
- Visa quick-info card
- Flight duration from Kathmandu
- Currency / budget orientation bar
- "Popular with NRNs" social proof tag (optional)
- Sample 5D/4N itinerary teaser

---

# 6. Homepage UX Specification

## 6.1 Section 1 — Full-Screen Hero

### Purpose
Instant emotional impact + dual CTA (search intent + direct inquiry).

### Specifications

| Element | Specification |
|---------|---------------|
| **Video** | 15–30s loop, muted, autoplay, `playsInline`, WebM + MP4 fallback, poster image for LCP |
| **Content** | Everest golden hour OR Annapurna panorama — no shaky handheld |
| **Overlay** | `--gradient-hero` + subtle vignette |
| **Headline** | Cormorant `display-xl`, white, max 2 lines: "Curated Journeys Across Nepal & the World" |
| **Subhead** | Inter `body-lg`, white 85% opacity, max 480px |
| **Animation** | Headline: word stagger fade-up, 80ms delay, 600ms duration, ease `[0.22, 1, 0.36, 1]` |

### Hero Search Bar (Airbnb-inspired)

```
┌─────────────────────────────────────────────────────────────┐
│  Where to?          │  Experience  │  Duration  │  [Search] │
└─────────────────────────────────────────────────────────────┘

Glass surface, radius --radius-xl, height 64px
Fields: destination dropdown, category select, duration select
Search CTA: gold button, right-aligned
Mobile: collapses to single "Find Your Journey" button → opens filter modal
```

**Search behavior (MVP):** Client-side redirect to filtered package listing — not live availability.

### Hero CTAs

1. **Primary:** "Plan Your Journey" → opens inquiry modal
2. **Secondary:** "Explore Packages" → smooth scroll to Popular Packages (`#packages`)

### Floating Stats (4 glass cards)

| Stat | Value | Source |
|------|-------|--------|
| Years | 15+ | Admin settings |
| Travelers | 500+ | Conservative verified |
| Destinations | 9+ | Nepal regions |
| Support | 24/7 | Service promise |

**Position:** bottom-right desktop, below CTAs mobile  
**Animation:** fade-up stagger after headline, 200ms offset each  
**Interaction:** subtle float animation (translateY ±4px, 4s loop) — disabled on reduced-motion

### Scroll Indicator

```
Animated chevron, white, bottom center
Bounce: translateY(0 → 8px → 0), 2s infinite
Label: "Discover" in caption
Click: scroll to Popular Packages
```

---

## 6.2 Section 2 — Popular Packages

| Attribute | Spec |
|-----------|------|
| **Overline** | CURATED FOR YOU |
| **Title** | Popular Packages |
| **Source** | Admin `featuredPackageSlugs` (max 6) |
| **Layout** | 4-col grid desktop; horizontal scroll snap mobile |
| **Card** | Package Card (§3.2) |
| **Footer CTA** | View All Packages → `/trekking-packages` |
| **Animation** | Cards scroll-reveal, stagger 100ms |

---

## 6.3 Section 3 — Featured Destinations

| Attribute | Spec |
|-----------|------|
| **Overline** | EXPLORE NEPAL |
| **Title** | Featured Destinations |
| **Layout** | 3×3 grid desktop (9 destinations), 2-col mobile |
| **Card** | Destination Card (§3.2), 4:5 aspect |
| **Hover** | Image zoom 1.06, gradient intensify |
| **Link** | Each → `/destinations/[slug]` |

---

## 6.4 Section 4 — Why Choose Us

| Attribute | Spec |
|-----------|------|
| **Layout** | Pattern C — Split 50/50 |
| **Left** | Team/office photography (authentic, not stock handshake) |
| **Right** | 4 pillars with Lucide icons |

**Pillars:**
1. **Expert-Guided Journeys** — Licensed guides, decades of Himalayan expertise
2. **Bespoke Itineraries** — Every trip personally designed, never cookie-cutter
3. **Safety & Support** — 24/7 assistance, comprehensive pre-trek briefings
4. **Transparent Value** — Clear inclusions, honest pricing, no hidden fees

| Attribute | Spec |
|-----------|------|
| **Trust bar** | NATTA Member 881/24 badge inline |
| **CTA** | Meet Our Team → `/about-us` |
| **Background** | `#F8FAFC` |

---

## 6.5 Section 5 — International Packages

| Attribute | Spec |
|-----------|------|
| **Overline** | BEYOND BORDERS |
| **Title** | International Packages |
| **Subhead** | Dubai to Japan — world-class holidays planned from Kathmandu |
| **Navigation** | Horizontal pill tabs: Dubai, Thailand, Bali, Singapore, Malaysia, Japan, Europe |
| **Content** | Tab switches package cards without page reload |
| **Card variant** | Package card + flag icon + "from NPR/USD" |
| **CTA** | Explore All International → `/international-tours` |

---

## 6.6 Section 6 — Luxury Experiences

| Attribute | Spec |
|-----------|------|
| **Background** | `--color-primary` (#0F172A) full-width band |
| **Text** | White + gold accents |
| **Layout** | Large feature image (60%) + stacked luxury offerings (40%) |
| **Items** | Helicopter Tours, Premium Lodges, Private Guides, VIP Airport Transfers |
| **Interaction** | Each item expands on hover (desktop) / tap (mobile) with 1-line detail |
| **CTA** | Discover Luxury → `/luxury-tours` (gold button) |
| **Photography** | Helicopter over Everest or Dwarika's-style lodge interior |

---

## 6.7 Section 7 — Customer Testimonials

| Attribute | Spec |
|-----------|------|
| **Overline** | TRAVELER STORIES |
| **Title** | What Our Guests Say |
| **Layout** | 3-card carousel desktop; 1-card swipe mobile |
| **Card** | Testimonial Card (§3.2) |
| **Navigation** | Dots + arrow buttons (glass) |
| **Autoplay** | 8s, pause on hover/focus |
| **Link** | Read All Reviews → `/testimonials` |

---

## 6.8 Section 8 — Travel Gallery

| Attribute | Spec |
|-----------|------|
| **Overline** | VISUAL JOURNEYS |
| **Title** | Travel Gallery |
| **Layout** | Masonry 4-col desktop, 2-col mobile, varied heights |
| **Interaction** | Hover: subtle zoom + dark overlay + caption fade-in |
| **Click** | Opens lightbox |
| **CTA** | View Full Gallery → `/gallery` |
| **Performance** | Lazy load below fold, blur-up placeholder |

---

## 6.9 Section 9 — Blog Section

| Attribute | Spec |
|-----------|------|
| **Overline** | FROM THE JOURNAL |
| **Title** | Travel Insights & Guides |
| **Layout** | 3 blog cards, equal height |
| **Content** | Latest 3 published posts from JSON |
| **CTA** | Read All Articles → `/blog` |

---

## 6.10 Section 10 — Newsletter

| Attribute | Spec |
|-----------|------|
| **Background** | `--color-accent` with subtle gold gradient corner accent |
| **Layout** | Centered, max 600px |
| **Headline** | Journey Notes |
| **Subhead** | Monthly inspiration, seasonal offers, and expert travel tips |
| **Input** | Email + gold submit arrow button inline |
| **Privacy** | "We respect your privacy. Unsubscribe anytime." caption link |
| **Success** | Inline toast, no page reload |

---

## 6.11 Section 11 — Contact CTA Band

| Attribute | Spec |
|-----------|------|
| **Background** | `--color-primary` with subtle topographic line pattern (5% opacity gold) |
| **Headline** | Cormorant display-lg, white: "Your Next Journey Begins Here" |
| **Subhead** | Speak with our Kathmandu concierge team today |
| **CTAs** | Plan Your Journey (gold) · WhatsApp (green) · Call (ghost) |
| **Response promise** | "Average response time: under 2 hours" |

---

## 6.12 Section 12 — Footer

```
┌──────────────────────────────────────────────────────────────────────────┐
│  [Logo white]                                                            │
│  Curated journeys across Nepal and the world.                            │
│  [NATTA badge]  [Social icons]                                           │
│                                                                          │
│  Nepal Tours      International    Company         Contact               │
│  Trekking         Dubai            About Us        Gaushala, Ratopul     │
│  Adventure        Thailand         Testimonials    Kathmandu, Nepal      │
│  Luxury           Bali             Blog            +977 9851126300       │
│  Helicopter       Japan            FAQ             triplandtravel@...    │
│  Pilgrimage       Europe           Gallery                               │
│                                                                          │
│  ──────────────────────────────────────────────────────────────────────  │
│  © 2026 Trip Land Travels & Tours Pvt. Ltd.   Privacy  |  Terms         │
└──────────────────────────────────────────────────────────────────────────┘

Background: #0F172A
Text: rgba(255,255,255,0.75)
Links hover: --color-luxury-gold
Padding: 64px 0 32px
```

---

# 7. Package Detail Page UX

## 7.1 Page Goals

1. Inspire with cinematic hero
2. Answer every pre-purchase question
3. Convert via sticky inquiry sidebar + WhatsApp

## 7.2 Hero Banner

| Element | Spec |
|---------|------|
| Height | 60vh desktop, 50vh mobile |
| Image | Package `heroImage`, full-bleed |
| Overlay | Gradient bottom-heavy |
| Title | Cormorant display-lg, white, bottom-left |
| Meta chips | Duration, difficulty badge, group size, region — glass pills |
| Parallax | Background moves at 0.85× scroll speed (subtle, max 40px) |

## 7.3 Price Section

```
From USD 1,450
per person · twin sharing
Group of 6+: USD 1,350 pp

Font: price in DM Sans 700, 2rem
Note: caption muted
Optional: "Contact for custom quote" if `displayPrice: false`
```

Position: immediately below hero meta on mobile; top of main column desktop.

## 7.4 Highlights

Horizontal scroll chips (mobile) / 2×3 grid (desktop):
```
✦ Stand at Everest Base Camp (5,364m)
✦ Sunrise from Kala Patthar
✦ Sherpa culture in Namche Bazaar
...
```
Gold bullet icon, `--color-accent` bg chips.

## 7.5 Itinerary Timeline

```
│
●  Day 1 — Arrival in Kathmandu
│  ├─ Altitude: 1,400m
│  ├─ Trekking: — 
│  ├─ Meals: Dinner
│  └─ Description paragraph...
│
●  Day 2 — Fly to Lukla · Trek to Phakding
│  ├─ Altitude: 2,610m
│  ...
```

**Design:**
- Vertical line: 2px, `--color-luxury-gold` at 30% opacity
- Nodes: 12px gold circles
- Day title: DM Sans 600, h4
- Metadata: icon + caption row
- **Accordion on mobile:** Days collapsed, expand on tap (Day 1 open by default)
- **Animation:** Timeline draws on scroll (line height 0→100%, 800ms)

## 7.6 Gallery

- 2×3 grid, gap 8px
- Click → lightbox
- First image = hero alternate angle

## 7.7 Map Section

- Embedded Google Map or static Mapbox image with route overlay
- "View full map" expand button
- Altitude profile chart (Phase 2 — nice-to-have)

## 7.8 Included / Excluded

```
┌─────────────────────┐  ┌─────────────────────┐
│  ✓ Included         │  │  ✗ Not Included     │
│  • Airport transfers│  │  • Intl flights     │
│  • Lukla flights    │  │  • Visa fees        │
│  ...                │  │  ...                │
└─────────────────────┘  └─────────────────────┘
```

Included: green check icons; Excluded: muted X icons. Glass cards.

## 7.9 FAQ Accordion

- Shadcn Accordion, single-expand
- FAQPage schema markup
- Min 4 questions per package

## 7.10 Inquiry Sidebar (Desktop)

Sticky `top: 100px`. Glass card. Form spec in §3.3.

## 7.11 WhatsApp CTA

```
Pre-filled message:
"Hi Trip Land! I'm interested in the [Package Name] ([Duration]).
Travel dates: [flexible]. Group size: [not specified].
Page: [URL]"
```

**Placement:** Sidebar (primary), floating button mobile, end-of-page repeat.

## 7.12 Related Packages

3 cards, same category preferred. Section title: "You May Also Like".

---

# 8. Destination Page UX

## 8.1 Nepal Destination Template

### Hero
- Region-specific cinematic image (Everest: Khumbu icefall distant view; Mustang: red cliffs)
- Name: Cormorant display-xl
- Subhead: one evocative sentence
- CTA: Explore [Region] Packages

### Overview
- 400–600 word editorial (Nat Geo tone)
- Drop cap on first letter (Cormorant, gold, 3-line float)
- Pull quote mid-article (guest or guide quote)

### Travel Highlights
4–6 icon cards:
- Icon (Lucide): Mountain, Camera, Temple, Binoculars, etc.
- Title + 2-line description

### Best Time to Visit
Visual month selector bar:
```
Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec
     ███ ███ ███     ███ ███
     Ideal    Monsoon    Ideal
```
Green = ideal, amber = possible, gray = avoid

### Related Packages
- Filter bar: All · Trekking · Luxury · Helicopter · Cultural
- Package grid, 3-col
- Sort: Featured first, then duration

### Gallery
- 6–12 curated images, masonry
- Category tag filter

### FAQ
- 5 destination-specific questions
- Schema markup

### Bottom CTA
Full-width band: "Ready to explore [Destination]?" + dual CTA

---

## 8.2 International Destination Template

### Additional Elements (vs Nepal)

| Element | Spec |
|---------|------|
| **Flag + skyline hero** | Composite or destination landmark |
| **Quick facts bar** | Flight time from KTM · Visa required Y/N · Best season · Avg budget |
| **Visa card** | Link to `/visa-services#[country]` |
| **Sample itinerary** | Collapsible 5-day teaser |
| **NRN badge** | "Popular with Nepal diaspora" (optional) |
| **Currency note** | "Prices shown in USD / NPR" |

### International Hero Example — Dubai

```
Headline: Dubai — Where Desert Meets the Future
Subhead: 5-star escapes, curated from Kathmandu
Quick facts: ✈ 4.5h from KTM  ·  Visa on arrival  ·  Best: Nov–Mar
```

---

# 9. Mobile Design System

## 9.1 Mobile-First Principles

1. **Thumb zone sacred** — all CTAs in bottom 40% of screen
2. **One action per screen fold** — no competing CTAs above fold
3. **Touch targets** — minimum 44×44px, 8px gap between
4. **Performance budget** — hero poster image LCP < 2s; defer video on mobile data (respect `save-data`)
5. **Reduced chrome** — collapsed nav, sticky CTA bar

## 9.2 Mobile Navigation

- Header: 64px, logo left, hamburger right
- Full-screen overlay menu (spec §3.4)
- No mega-menu — accordion only
- Close: X top-right or swipe down (Phase 2)

## 9.3 Mobile Hero

```
┌─────────────────────────┐
│ [Logo]            [≡]   │
│                         │
│   Curated Journeys      │
│   Across Nepal &        │
│   the World             │
│                         │
│ [Find Your Journey]     │  ← opens filter sheet
│                         │
│ [Plan Your Journey]     │  ← full width gold
│                         │
│ ┌────┐┌────┐┌────┐┌────┐│
│ │15+ ││500+││ 9  ││24/7││  2×2 stat grid
│ └────┘└────┘└────┘└────┘│
│           ↓             │
└─────────────────────────┘

Height: 100svh (small viewport — accounts for mobile browser chrome)
Video: poster image default; play button overlay optional
Headline: display-lg, not display-xl
```

## 9.4 Mobile Package Cards

- Width: 85vw in horizontal scroll carousel
- `scroll-snap-type: x mandatory`
- Peek next card 16px
- Full-width single column in listing pages

## 9.5 Mobile Inquiry Form

**Option A — Bottom Sheet (Package pages):**
```
┌─────────────────────────┐
│  ─── (drag handle)      │
│  Get a Custom Quote     │
│  [Name]                 │
│  [Phone]                │
│  [Message]              │
│  [Submit]               │
│  [WhatsApp]             │
└─────────────────────────┘

Triggered by sticky "Get Quote" bar
Sheet: 85vh max, glass top radius 24px
```

**Option B — Dedicated Contact Page:** Full form, single column.

## 9.6 Mobile Sticky CTA Bar

```
┌─────────────────────────────────────────┐
│  [💬 WhatsApp]  │  [📞 Call]  │ [Quote] │
└─────────────────────────────────────────┘

Height: 64px + safe-area-inset-bottom
Background: #0F172A
Position: fixed bottom
z-index: 50
Hide on scroll down, show on scroll up (optional)
```

## 9.7 Mobile Typography Adjustments

- Minimum 16px body (prevent iOS zoom)
- Display font capped at display-lg
- Section padding: 64px vertical (not 96px)
- Line length: full width with 20px margins

## 9.8 Mobile Gesture Map

| Gesture | Action |
|---------|--------|
| Swipe horizontal | Package/testimonial carousel |
| Pull down | Close bottom sheet |
| Tap sticky WhatsApp | Open wa.me with context |
| Long press image | None (no download menu) |

---

# 10. Animation Guidelines

## 10.1 Motion Principles

1. **Intentional, never decorative-only** — motion guides attention toward CTAs
2. **Ease curve:** `cubic-bezier(0.22, 1, 0.36, 1)` for enters; `cubic-bezier(0.4, 0, 0.2, 1)` for exits
3. **Duration scale:** Micro 150ms · Standard 300ms · Emphasis 600ms · Hero 800ms
4. **Stagger:** 80–120ms between sibling elements
5. **Respect `prefers-reduced-motion`** — instant state changes, no parallax, no float loops

## 10.2 Animation Catalog

### Hero Reveal Sequence

```
0ms     Video poster visible (LCP)
200ms   Overlay fade in (300ms)
400ms   Headline word 1 fade-up
480ms   Headline word 2 fade-up
560ms   Headline word 3...
800ms   Subhead fade-up
1000ms  Search bar / CTAs fade-up
1200ms  Stats cards stagger in
1400ms  Scroll indicator fade in
```

### Text Animation — Split Reveal

```typescript
// Framer Motion variant
const wordVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  })
};
```

Use on: hero headline, section titles (max once per viewport).

### Card Hover Effects

```css
.package-card {
  transition: transform 400ms cubic-bezier(0.22, 1, 0.36, 1),
              box-shadow 400ms ease;
}
.package-card:hover {
  transform: translateY(-4px);
}
.package-card:hover .card-image {
  transform: scale(1.04);
}
```

### Scroll Animations (Framer Motion `whileInView`)

```typescript
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};
// viewport: { once: true, margin: "-80px" }
```

Apply to: section titles, cards, timeline items. **Max 12 animated elements per section.**

### Page Transitions

```typescript
// App Router template.tsx
const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } }
};
```

Subtle crossfade only — no slide transitions (hurts perceived performance).

### Loading States

**Initial page load:**
- Hero poster image = LCP (no skeleton on hero)
- Below-fold sections: skeleton placeholders

**Skeleton loader spec:**
```
Background: linear-gradient(90deg, #F1F5F9 25%, #E2E8F0 50%, #F1F5F9 75%)
Animation: shimmer translateX, 1.5s infinite
Border-radius: matches final component
```

**Button loading:**
- Spinner: 16px, gold, replaces label
- Button width locked (no layout shift)
- `aria-busy="true"`

### Floating Effects

```css
@keyframes gentle-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
}
.hero-stat-card {
  animation: gentle-float 4s ease-in-out infinite;
}
.hero-stat-card:nth-child(2) { animation-delay: 0.5s; }
/* Disable with prefers-reduced-motion: reduce */
```

### Image Zoom Effects

| Context | Behavior |
|---------|----------|
| Card hover | `scale(1.04)`, 400ms, `overflow: hidden` |
| Gallery hover | `scale(1.06)` + overlay fade |
| Lightbox open | `scale(0.95 → 1)`, 300ms |
| Hero parallax | `translateY(scroll * 0.15)`, max 40px |

## 10.3 Performance Guardrails

- Animate only `transform` and `opacity` (GPU-composited)
- No animation on `width`, `height`, `top`, `left`
- Intersection Observer for scroll triggers (not scroll listeners)
- Max 3 simultaneous glass blur surfaces
- Disable video autoplay on `prefers-reduced-motion` and `navigator.connection.saveData`

---

# 11. Accessibility Guidelines

## 11.1 WCAG 2.1 AA Compliance Targets

| Criterion | Requirement | Implementation |
|-----------|-------------|----------------|
| Color contrast | 4.5:1 text, 3:1 large text | Gold on white fails for small text — use gold only on large/display or dark bg |
| Touch targets | 44×44px min | All buttons, nav items, carousel dots |
| Keyboard nav | Full site operable | Focus order logical; skip-to-content link |
| Focus visible | 2px outline | Gold outline on dark, primary outline on light |
| Alt text | All images | Enforced in admin CMS |
| Form labels | Visible or aria-label | No placeholder-only labels |
| Motion | User control | `prefers-reduced-motion` respected |
| Video | No autoplay audio | Muted hero; pause button provided |

## 11.2 Gold Contrast Fix

`#D4AF37` on `#FFFFFF` = ~2.5:1 ❌

**Rules:**
- Gold text only at `display` sizes (≥24px) on white, OR
- Use `#92700C` (darker gold) for small text on white: 4.6:1 ✓
- Preferred: gold as accent (borders, icons, backgrounds), dark text on gold buttons

## 11.3 Semantic Structure

```html
<header> → <nav> → <main> → <section aria-labelledby> → <footer>
```

- One `<h1>` per page
- Heading hierarchy never skips levels
- Carousels: `aria-roledescription="carousel"`, live region for slide changes

## 11.4 Screen Reader Patterns

- WhatsApp button: "Chat with Trip Land on WhatsApp about [Package Name]"
- Price: "Starting from 1,450 US dollars per person"
- Difficulty badge: "Difficulty level: Challenging"
- Timeline: ordered list with `aria-expanded` on accordion

## 11.5 Accessibility Checklist (Release Gate)

- [ ] axe DevTools 0 critical violations
- [ ] Keyboard-only navigation test (Tab through entire homepage)
- [ ] VoiceOver (iOS) + NVDA (Windows) smoke test
- [ ] Color contrast audit on all text/background pairs
- [ ] Form error announcements (`aria-live="polite"`)
- [ ] Reduced motion test
- [ ] 200% browser zoom — no content loss

---

# 12. Conversion Optimization

## 12.1 CTA Psychology

| Instead of | Use | Why |
|------------|-----|-----|
| Book Now | Plan Your Journey | No online booking — sets consultation expectation |
| Submit | Request Custom Quote | Value-forward, personalized |
| Contact Us | Speak With Our Concierge | Premium service framing |
| Learn More | View Journey Details | Adventure emotional hook |
| Sign Up | Get Journey Notes | Aspirational newsletter framing |

## 12.2 Trust Placement Matrix

| Trust Element | Position | Page |
|---------------|----------|------|
| NATTA badge | Hero stats area + footer + About | Global |
| Response time promise | Inquiry form, contact CTA | Conversion points |
| Testimonial snippet | Below package hero | Package detail |
| Phone number | Header utility, sticky bar, footer | Global |
| Named reviews | Testimonial section | Homepage, dedicated page |
| Executive photo | Why Choose Us | Homepage, About |

## 12.3 Friction Reduction

1. **5-field max** on first inquiry touch (name, email, phone, interest, message)
2. **WhatsApp pre-fill** eliminates typing on mobile
3. **Country code auto-detect** on phone field (geo-IP hint)
4. **No CAPTCHA** at launch — honeypot + rate limit instead
5. **Inline validation** — errors on blur, not submit only
6. **Success state** — clear next step: "We'll WhatsApp you within 2 hours"

## 12.4 Urgency (Ethical)

- "Peak season (Oct–Nov) — inquire early to secure preferred dates"
- Admin announcement bar for seasonal promos
- Never fake countdown timers

## 12.5 A/B Test Roadmap (Post-Launch)

| Test | Variant A | Variant B |
|------|-----------|-----------|
| Hero CTA | Plan Your Journey | Get Free Consultation |
| Package CTA position | Sticky sidebar | Bottom sheet only |
| Price display | Show "From USD X" | "Request Quote" only |
| Testimonial format | Cards | Single large quote |

## 12.6 Heatmap Hypotheses

- Hero CTA receives 40%+ of first-fold clicks
- WhatsApp outperforms form 2:1 on mobile
- Itinerary section = highest scroll depth on package pages
- International tab clicks spike during festival seasons (Dashain/Tihar)

---

# 13. Premium Branding Recommendations

## 13.1 Logo Direction

**Wordmark:** "Trip Land" in Cormorant Garamond, "TRAVELS & TOURS" in DM Sans overline below  
**Icon:** Abstract mountain peak formed by two intersecting gold lines (minimal, not clipart)  
**Variants:** Full color (dark on light), reversed (white on dark), gold monogram (favicon)

## 13.2 Photography Direction

| Category | Direction | Avoid |
|----------|-----------|-------|
| Hero | Golden hour, atmospheric, single focal point | Over-saturated HDR |
| Trekking | Real trekkers (back to camera OK), authentic trails | Stock models with clean shoes on "summit" |
| Luxury | Lodge interiors, helicopter, fine dining setup | Generic 5-star lobby |
| Cultural | Respectful ceremony distance, vibrant but not exploitative | Staged poverty tourism |
| International | Iconic landmarks, fewer crowds | Passport + boarding pass cliché |
| Team | Mr. Vijay Jaiswal + staff in office/natural setting | Handshake stock |

**Technical:** WebP/AVIF, 2400px max wide, subtle color grade (lifted shadows, warm highlights).

## 13.3 Voice & Tone

```
Headlines:  Aspirational, concise. "Where the Himalayas Meet the Horizon."
Body:       Warm expert. "Our guides have led hundreds of trekkers to Base Camp safely."
CTAs:       Action-oriented, personal. "Plan Your Journey" not "Click Here."
Avoid:      Exclamation marks, "cheap," "deal," "discount," "best price guaranteed."
```

## 13.4 Brand Patterns

- **Topographic contour lines** — 3% opacity gold, section backgrounds (Contact CTA, footer)
- **Gold rule** — 48px horizontal gold line before section overlines
- **Editorial margins** — pull quotes, drop caps on long-form destination copy

## 13.5 Social ↔ Web Alignment

| Channel | Alignment |
|---------|-----------|
| Facebook | Use same card templates, gold typography, Cormorant headlines on post graphics |
| WhatsApp | Profile photo = logo; quick replies match site CTA language |
| Instagram | Gallery imagery feeds from same `/gallery` JSON source |

---

# 14. Developer Handoff

## 14.1 Tailwind CSS Token Export

```typescript
// tailwind.config.ts — extend theme
const theme = {
  colors: {
    primary: { DEFAULT: '#0F172A', soft: '#1E293B' },
    secondary: { DEFAULT: '#D4AF37', dark: '#92700C' },
    luxury: { gold: '#C8A95B', light: '#E8D5A3' },
    accent: '#F8FAFC',
  },
  fontFamily: {
    display: ['var(--font-cormorant)', 'Georgia', 'serif'],
    heading: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
    body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
  },
  borderRadius: {
    'lg': '16px',
    'xl': '24px',
    '2xl': '32px',
  },
  boxShadow: {
    'glass': '0 8px 32px rgba(15,23,42,0.06), inset 0 1px 0 rgba(255,255,255,0.6)',
    'gold': '0 8px 32px rgba(212,175,55,0.18)',
  },
  animation: {
    'float': 'gentle-float 4s ease-in-out infinite',
    'shimmer': 'shimmer 1.5s infinite',
  },
};
```

## 14.2 Shadcn Component Mapping

| Design Component | Shadcn Base |
|------------------|-------------|
| Buttons | `Button` (custom variants: gold, ghost-dark, whatsapp) |
| Inputs | `Input`, `Textarea`, `Select` |
| Modal | `Dialog` |
| Accordion | `Accordion` |
| Toast | `Sonner` |
| Tabs | `Tabs` (international packages) |
| Carousel | `Carousel` (Embla) |
| Badge | `Badge` (custom difficulty variants) |
| Sheet | `Sheet` (mobile inquiry) |

## 14.3 Design Deliverables Checklist

### For Design Team
- [ ] Figma file with design system tokens
- [ ] Homepage desktop + mobile hi-fi mockups
- [ ] Package detail desktop + mobile hi-fi
- [ ] Destination page hi-fi (Nepal + International)
- [ ] Component library page in Figma
- [ ] Iconography set
- [ ] Photography mood board (10 reference images)
- [ ] Logo concepts (3 directions)

### For Dev Team
- [ ] This document + PRD approved
- [ ] Tailwind config tokens implemented
- [ ] Font files via `next/font`
- [ ] Framer Motion variants library (`/lib/motion.ts`)
- [ ] Glass surface utility class
- [ ] All Shadcn variants extended
- [ ] Lighthouse ≥ 95 on homepage stub

## 14.4 File Structure (Design Assets)

```
/public
  /brand
    logo-dark.svg
    logo-light.svg
    favicon.ico
  /images
    /hero
    /destinations
    /packages
    /gallery
    /team
  /video
    hero-nepal.webm
    hero-nepal.mp4
    hero-nepal-poster.webp
```

---

## Document Status

| Deliverable | Status |
|-------------|--------|
| 1. Design System | ✅ Complete |
| 2. UI Component Library | ✅ Complete |
| 3. Layout System | ✅ Complete |
| 4. Wireframes | ✅ Complete |
| 5. Homepage UX | ✅ Complete |
| 6. Package Page UX | ✅ Complete |
| 7. Destination Page UX | ✅ Complete |
| 8. Mobile Design System | ✅ Complete |
| 9. Animation Guidelines | ✅ Complete |
| 10. Accessibility Guidelines | ✅ Complete |
| 11. Conversion Optimization | ✅ Complete |
| 12. Premium Branding | ✅ Complete |

**Next Step:** Figma hi-fi mockups from this spec → development scaffold in Next.js 15.

---

*Prepared for Trip Land Travels & Tours Pvt. Ltd. — TripLand Atelier Design System v1.0*
