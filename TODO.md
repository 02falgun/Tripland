# Price Masking Implementation Plan

## Steps to Complete

### Step 1: ✅ Create a price masking utility function (`src/lib/maskPrice.ts`)
- Function to mask numeric prices (e.g., `48500` → `"48xxx"`)
- Function to mask string prices with currency (e.g., `"NPR 34,999"` → `"NPR 34,xxx"`)
- Keep leading 1-2 significant digits, replace rest with `x`

### Step 2: ✅ Update JSON data files
- [x] `data/flightDeals.json` — mask all `startingPrice` values
- [x] `data/holidayPackages.json` — mask all `price` string values  
- [x] `data/outboundPackages.json` — mask all non-zero `price` values (keep `0` as-is for "Price on Request")

### Step 3: ✅ Update TypeScript types (`src/types/index.ts`)
- [x] `FlightDeal.startingPrice`: `number` → `string | number`
- [x] `OutboundPackage.price`: `number` → `string | number`

### Step 4: ✅ Update component display logic
- [x] `src/app/page.tsx` — Home page flight deals & holiday packages
- [x] `src/app/flights/page.tsx` — Flight deals tables
- [x] `src/app/holidays/page.tsx` — Holiday package cards (uses `{pkg.price}` directly — no changes needed)
- [x] `src/app/packages/page.tsx` — Outbound package listing
- [x] `src/app/package/[slug]/page.tsx` — Package detail page + SEO metadata
- [x] `src/app/admin/page.tsx` — Admin table displays & form

### Step 5: ✅ Verify
- [x] Build project — compiled successfully with no TypeScript errors
- [x] No broken functionality — all 41 static pages generated successfully
- [x] Currency prefixes preserved (NPR, USD, Rs.)
- [x] `price: 0` still shows "Price on Request"

