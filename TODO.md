# TripLand Fixes — 18-Years Badge, Inbound/Outbound Split, Grayscale Logos

## Fix 1 — 18-Years Badge Size
### Header.tsx (top bar)
- [x] Increase badge wrapper from `h-4.5 w-4.5` → `h-7 w-7` (28px)
- [x] Increase top bar `py-1.5` → `py-2.5` to accommodate larger badge
### page.tsx (hero section)
- [x] Increase badge wrapper from `h-10.5 w-10.5` → `h-16 w-16` (64px) on desktop
- [x] Add responsive sizing: `h-12 w-12` on mobile (`sm:h-16 sm:w-16`)

## Fix 2 — Packages Inbound/Outbound Split on Home Page
- [x] Destructure `holidayPackages` from `useTravelStore()` in `page.tsx`
- [x] Add Inbound/Outbound tab toggle to the packages section (same styling as holidays page)
- [x] Replace `outboundPackages` carousel with data from `holidayPackages.inbound` / `holidayPackages.outbound`
- [x] Keep "Explore All Packages" link to `/packages`

## Fix 3 — Grayscale Logos in Footer
- [x] Remove `grayscale hover:grayscale-0` from "Associated With" Image in Footer.tsx
- [x] Remove `grayscale hover:grayscale-0` from all "We Accept" payment Image elements in Footer.tsx

## Verification
- [x] Build succeeds with `npm run build`
- [x] All badges, packages, and logos render correctly
