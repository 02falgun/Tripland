# TripLand Image Assets Wire-In — ✅ COMPLETE

## Step 1: Copy images to `public/images/<subfolders>/` with clean filenames
- [x] Create `public/images/badges/` directory
- [x] Copy `18yrs logo.png` → `public/images/badges/18yrs-logo.png`
- [x] Copy `Associated with IATA.jpeg` → `public/images/footer/associated-with-iata.jpeg`
- [x] Copy `china eastern.jpg` → `public/images/airlines/china-eastern.jpg`
- [x] Copy `Emirates.jpg` → `public/images/airlines/emirates.jpg`
- [x] Copy `Etihad.jpg` → `public/images/airlines/etihad.jpg`
- [x] Copy `Nepal airlines.jpg` → `public/images/airlines/nepal-airlines.jpg`
- [x] Copy `Oman aur.jpg` → `public/images/airlines/oman-air.jpg`
- [x] Copy `Qatar airlines.jpg` → `public/images/airlines/qatar-airways.jpg`
- [x] Copy `turkish .jpg` → `public/images/airlines/turkish.jpg`
- [x] Copy `connectips.png` → `public/images/payments/connectips.png`
- [x] Copy `esewa1.png` → `public/images/payments/esewa1.png`
- [x] Copy `khalti.png` → `public/images/payments/khalti.png`
- [x] Copy `master.jpg` → `public/images/payments/mastercard.jpg`
- [x] Copy `visa,esewa,khalti.jpg` → `public/images/payments/visa-esewa-khalti.jpg`

## Step 2: Update `data/affiliateAirlines.json`
- [x] Replace SVG entries with 7 JPG airline entries (remove flydubai, add Oman Air)

## Step 3: Update `src/components/Footer.tsx`
- [x] Replace `associated-with.svg` → `associated-with-iata.jpeg` in "Associated With" section
- [x] Update "We Accept" section: combined tile for visa-esewa-khalti, separate connectips.png, mastercard.jpg, bank.svg

## Step 4: Update `src/components/Header.tsx`
- [x] Replace `badge-18-years.png` → `badges/18yrs-logo.png`

## Step 5: Update `src/app/page.tsx`
- [x] Replace `badge-18-years.png` → `badges/18yrs-logo.png` in hero section

## Step 6: Verification ✅
- [x] Build succeeds with no errors (Next.js build completed)
- [x] All 7 airlines updated with real JPG logos
- [x] Footer IATA strip points to associated-with-iata.jpeg
- [x] "We Accept" uses real images (visa-esewa-khalti.jpg, connectips.png, mastercard.jpg, bank.svg)
- [x] 18-Years badge uses real 18yrs-logo.png in header + hero
- [x] No broken image paths (build completed successfully)
