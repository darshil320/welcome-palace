# UX & animation pass

- **Skill:** `charles-ux-animation`, installed globally at `~/.claude/skills/charles-ux-animation` on 2026-11-13
  (pre-existing; install step skipped). Markdown only, no executables.
- **Branch:** `ux/animation-pass` (not pushed, not deployed).
- **Date:** 2026-11-14.

## Stack

| | |
|---|---|
| Framework | Next.js 16.2.9 App Router, React 19.2; all routes static (SSG), `/rooms/[slug]` via `generateStaticParams` |
| Styling | Tailwind v4 (`@theme inline` in `app/globals.css`) + hand-written CSS |
| Primitives | none; native `<dialog>` for modals, lucide-react icons |
| Animation | CSS transitions/keyframes; IntersectionObserver reveals; rAF scroll handlers (hero parallax, header, mosaic, footer statement, progress bar). No Motion/GSAP |
| Scripts | npm; `build`, `lint` (eslint), typecheck via `tsc --noEmit`; **no test suite** |

## Interaction inventory

| Interaction | Trigger | Frequency / person | Must tell them |
|---|---|---|---|
| Loader | page load | first load per session (was: every load) | nothing (decorative) |
| Hero headline + CTAs | page load | every page | what this is, where next |
| Scroll reveals | scroll | dozens | content arriving in order |
| Nav underline | hover / route | many | where you are, what's clickable |
| Mobile menu | tap | few | navigation opened/closed |
| Room selector → booking → cart dialogs | tap | few | step opened; item added |
| Stay-slot / booking-type chips | tap | few | which is selected |
| Form submit (booking, catering, banquet, shaadi) | tap | once | sent, or what's wrong |
| Remove from cart | tap | rare | it's gone, and can come back |
| FAQ / policy accordions | tap | few | answer opened |
| Spaces carousel, PDP gallery | tap / swipe | few | position in set |
| Offer popup | timer | once / session | long-stay offer |
| Press / hover | pointer | many | press registered |

## Findings

Sev: **B** broken · **F** friction · **P** polish. Status: applied / proposed→decided / skipped.

| # | Sev | Principle | Where | Before → After | Status |
|---|---|---|---|---|---|
| 1 | B | Q1 first paint | `components/Hero.tsx` | headline words hidden then rising, CTAs invisible 700ms (+1s fade); never visible without JS → final state in static HTML | applied |
| 2 | B | Q1 first paint | `components/PageHero.tsx` | mount-time mask on page titles → static | applied |
| 3 | B | No-JS | `app/globals.css` reveal rules | content `opacity:0` in base CSS → hidden pose only via `.is-pending`, set by JS on below-fold elements | applied |
| 4 | B | No-JS | `LoadingScreen.tsx` | loader covers site forever without JS → `@media (scripting: none)` hides it | applied |
| 5 | B | Q4 Jakob / a11y | `Header.tsx` | menu: no Esc, focus not moved/trapped/restored → labelled modal, inert when closed, Esc, trap, restore | applied |
| 6 | B | Q4 a11y | `Faq`, `FaqBlock`, `PolicyAccordion` | no aria-expanded; collapsed answers read → aria-expanded/controls, `inert` closed panels | applied |
| 7 | B | Q4 a11y | `PdpGallery.tsx` | arrows invisible on keyboard focus → `focus-visible:opacity-100` | applied |
| 8 | B | Q5 errors | `BookingModal`, `PariwarNiwasBooking` | `alert()` → message beside field, focus, 360ms shake, clears when valid | applied |
| 9 | B | Q5 Postel | phone fields | placeholder `+91 98765 43210` untypeable (`maxLength 10`) → parse +91/0/spaces/dashes, store 10 digits | proposed → **decided: applied** |
| 10 | F | Q1 Doherty | `LoadingScreen.tsx` | ~3s loader every load → once per session, skipped under reduced motion | proposed → **decided: once/session applied; full removal is your call** |
| 11 | F | Q3 properties | `LoadingScreen.tsx` | width + 112 state updates → scaleX + `@property` counter, no JS per frame | applied |
| 12 | F | Q2 staging | `OfferPopup.tsx` | interrupts at 2.5s → 8s | proposed → **decided: applied (8s)** |
| 13 | F | Q3 press | ~20 CTAs | no press state → `press` (0.96, 150ms) / `press-surface` for full-width | applied |
| 14 | F | Verify: reduced motion | site-wide | dialog/menu/accordion still animated → global layer; `.motion-keep` for progress | applied |
| 15 | F | Q4 hit area | close/remove buttons, Book/View pills, header phone, popup close | 28–42px → 44px zones | applied (PDP dots skipped, below) |
| 16 | F | Q4 focus | `fields.tsx`, Pariwar inputs | colour-only focus → 3px ring | applied |
| 17 | F | Q5 Parkinson | all enquiry forms | no autocomplete → name/tel/address-level2 | applied |
| 18 | F | Q5 recover | `EnquiryCart.tsx` | instant remove, no undo → 5s Undo, restores in place, focus to Undo | proposed → **decided: applied** |
| 19 | F | Q5 peak-end | enquiry forms + cart | bare jump to WhatsApp → status line "WhatsApp opened… reply within 2 hours" | proposed → **decided: applied** |
| 20 | F | Q3 performance | `WelcomeSection` mosaic | gap/max-width/radius re-laid out every scroll frame → transform-only rework | proposed → **decided: deferred** (L effort, redesigns the effect) |
| 21 | P | Q2 stagger | `Header.tsx` | links stagger inside fading overlay → arrive with it | applied |
| 22 | P | Q3 exits | `globals.css` dialogs | 280ms keyframe in, instant out → 220/160 transitions, interruptible, content kept while leaving | applied |
| 23 | P | Q3 properties | `Header.tsx` underline | `transition-all` width → scaleX | applied |
| 24 | P | Q3 properties | 7 sites | `transition-all` (cart animated padding) → named properties | applied |
| 25 | P | Q3 properties | `.btn-shimmer` | animated `left` → `translate` | applied |
| 26 | P | Q3 timing | reveals, masks | 0.7–1s, 22px, 8px blur → 450ms / 12px / 3px; masks 500ms, on tokens | applied |
| 27 | P | Q3 expanders | accordions | 380ms; icon rotation never animated (listed `transform`, Tailwind v4 uses `rotate`) → 250/190, icon 250ms | applied |
| 28 | P | Q3 icon swap | header menu icon | instant swap | skipped: the X state is covered by the full-screen overlay, never visible |
| 29 | P | Q3 meaning | cart badge bump | no signal on add | skipped: cart opens automatically after add (now staged after the booking dialog leaves) |
| 30 | P | Q3 timing | header bg | 400ms → 250ms token | applied |
| 31 | P | Q3 performance | `CountUp.tsx` | setState per frame → textContent, tabular-nums, starts at 0 only below fold | applied |
| — | F | Q2 staging | `RoomsClient`, `PdpBooking` | selector→booking→cart dialogs opened simultaneously → each waits for the previous exit (160ms) | applied (found during implementation) |
| — | F | Q4 hover on touch | `RoomCategorySection` | hover via mouseenter state (fires on tap) → CSS group-hover + focus-visible | applied (found during implementation) |

**Skipped with reason:** PDP mobile dots hit area (24px zones would collide with the counter pill on the
11-photo gallery at 375px; swipe + counter are the primary controls) · film grain overlay, slow image hover
zooms (brand look) · remaining scroll listeners (progress bar, parallax, footer statement — not reveals;
scroll-driven CSS would drop Firefox) · theme switch (site has none).

**Bugs outside the principles:** three Cloudinary poster images 404 (`hero-poster.jpg`,
`banquet-hall-tour-poster.jpg`, `ambient-jacuzzi-poster.jpg`) — the main cause of slow LCP, see PERFORMANCE.md.

## Tokens added (`app/globals.css`)

- Curves (`@theme`, new names so Tailwind's `ease-*` keep their timing): `--ease-enter`
  `cubic-bezier(.32,.72,0,1)`, `--ease-exit` `cubic-bezier(.55,0,1,.45)`, `--ease-move`
  `cubic-bezier(.77,0,.175,1)`, `--ease-swap` `cubic-bezier(.25,.1,0,1)`.
- Durations (`:root`): `--dur-press` 150ms, `--dur-hover` 150ms, `--dur-state` 250ms, `--dur-modal-in` 220ms,
  `--dur-modal-out` 160ms, `--dur-expand-in` 250ms, `--dur-expand-out` 190ms, `--dur-reveal` 450ms,
  `--dur-mask` 500ms, `--dur-shake` 360ms, `--stagger-piece` 90ms, `--reveal-rise` 12px, `--reveal-blur` 3px.
- JS mirror: `lib/motion.ts` (`MOTION.modalOutMs`, `shakeMs`, `undoMs`).
- Utilities: `press`, `press-surface`, `hit-area`; `.motion-keep` opt-out from the reduced-motion layer.
- Storyboard: `LoadingScreen.tsx` (`TIMING`).

## Verify

Automated with Playwright against the production build (`/tmp/uxverify/verify.mjs`, not committed): **49/49 pass.**

| Check | Result |
|---|---|
| Static HTML of 7 routes has no hidden-at-paint state | pass |
| No JS: loader hidden, all reveal content visible | pass |
| Loader plays on first load, unmounts, absent on second load in session | pass |
| Reduced motion: loader skipped, reveals visible at once, transitions ≈0 | pass |
| Below-the-fold reveals: 40 pending → 0 after scrolling (IO, once) | pass |
| Mobile menu: inert closed, focus to first link, Tab trapped, Esc closes + restores focus | pass (failed first run; fixed in `07e6162`) |
| Booking flow: blank name / bad phone show inline errors with focus; errors clear when valid; `+91 98765-43210` stored as `9876543210`; dialogs open one at a time; remove → Undo focused → restores; cart ends on sent line | pass |
| Scrub at 10% speed: dialog opacity rises monotonically 0.26 → 0.97 | pass |
| Interrupt mid-open: closing turns around from current opacity | pass |
| Accordions: aria-expanded matches inert panels | pass |
| Hit areas at 375px: taps 21px off-centre on 36px controls land on them | pass |
| No horizontal overflow at 375px and 1440px (5 routes) | pass |
| Hover rules gated behind `(hover: hover)` | pass |
| Animated properties: no `transition-all`, no width/height/top/left/margin/padding transitions (grep) | pass |
| Typecheck / build | pass |
| Lint | same 4 errors + 2 warnings as baseline (files untouched by intent); 0 new |
| Tests | none exist |

**Not run, and what they would have caught:**
- **Network ≥1s throttle:** forms hand off to WhatsApp synchronously, so there is no in-app round trip to make a
  spinner flash; would catch slow-image layout jumps on the PDP gallery.
- **Hammer the keyboard** through the carousels: would catch a highlight lagging behind arrow keys (none use
  transitions on focus, by inspection).
- **Paste messy input** beyond phone (dates, guest counts): dates use native pickers; would catch locale issues
  on the catering/banquet free-text guest counts.
- **Theme switch:** the site has no theme switch.
- **Tenth use** was judged by reading durations (all within the timing table), not by a human run.
- **Real devices:** iOS Safari `@starting-style` / `allow-discrete` dialog exits need Safari 18+; older Safari
  simply snaps (by design).

## Before / after metrics

See `PERFORMANCE.md`. Summary (median of 3, mobile):

| Route | Perf | LCP s | TBT ms |
|---|---|---|---|
| home | 71 → 72 | 7.05 → 7.20 | 14 → 13 |
| rooms | 72 → 74 | 6.05 → 6.17 | 64 → 8 |
| banquet | 76 → 77 | 5.58 → 5.46 | 46 → 12 |
| catering | 74 → 75 | 5.57 → 5.71 | 44 → 19 |

No regressions past noise; nothing reverted. Budgets (LCP ≤ 2.5s, score ≥ 90) were already missed at baseline;
the poster 404s are the lever.
