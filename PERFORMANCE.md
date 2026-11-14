# Performance

## Method

- Production build (`next build` + `next start`) served locally on `:3200`.
- Lighthouse 12.8.2, Chrome 157, mobile form factor, default simulated throttling (4x CPU, slow 4G), performance category only.
- 3 runs per route, median reported. TBT is the INP proxy.
- Routes: `/` (home), `/rooms`, `/banquet`, `/catering`.
- Local TTFB is ~450ms simulated; real-world TTFB on Vercel will differ.

## Baseline — 2026-11-14, branch `ux/animation-pass` @ `5494ea4` (no UX changes yet)

| Route | Perf | LCP s | CLS | TBT ms | JS KB (transferred) |
|---|---|---|---|---|---|
| home | 71 | 7.05 | 0.000 | 14 | 353 |
| rooms | 72 | 6.05 | 0.000 | 64 | 353 |
| banquet | 76 | 5.58 | 0.000 | 46 | 353 |
| catering | 74 | 5.57 | 0.000 | 44 | 353 |

Notes:

- Every route already misses the LCP ≤ 2.5s and Lighthouse ≥ 90 budgets before any change.
- LCP element is the hero `<video>` on every route. Lighthouse attributes ~5s to **render delay**, not load: the
  resource is ready early but paints late. The full-screen `LoadingScreen` (≈2.1s curtain + 0.9s wipe, on every
  full page load) and the hero headline's mount-time mask reveal are the likely contributors.
- CLS is 0 everywhere.

## After UX pass — 2026-11-14, branch `ux/animation-pass` @ `07e6162`

Identical setup (same machine, Lighthouse 12.8.2, mobile, simulated throttling, 3 runs, median).

| Route | Perf (before → after) | LCP s | CLS | TBT ms | JS KB |
|---|---|---|---|---|---|
| home | 71 → 72 | 7.05 → 7.20 (+2.1%) | 0 → 0 | 14 → 13 | 353 → 355 |
| rooms | 72 → 74 | 6.05 → 6.17 (+2.0%) | 0 → 0 | 64 → 8 | 353 → 355 |
| banquet | 76 → 77 | 5.58 → 5.46 (−2.2%) | 0 → 0 | 46 → 12 | 353 → 355 |
| catering | 74 → 75 | 5.57 → 5.71 (+2.5%) | 0 → 0 | 44 → 19 | 353 → 355 |

- No metric regressed past noise (~5%). LCP moves are within ±2.5% run-to-run variance; TBT (INP proxy)
  dropped 73–88% on three routes (loader progress no longer re-renders React ~112 times; CountUp no longer
  re-renders per frame). JS +2KB (+0.6%) from the Undo/notice/focus code.
- Nothing reverted.
- Lighthouse always runs in a fresh session, so it still sees the first-visit loader; repeat page loads in a
  session now skip it entirely (not measured by Lighthouse).

### Experiment (not committed): loader removed entirely

| Route | Perf | LCP s | TBT ms |
|---|---|---|---|
| home | 77 | 6.57 | 12 |
| rooms | 79 | 5.71 | 6 |

Removing the loader is worth about +5 score and −0.5s LCP. It is **not** what keeps LCP at 5.5–7s.

### Root cause of slow LCP (outside this pass)

The LCP element is the hero `<video>`, and its poster images 404 on Cloudinary:

- `welcome-palace/images/hero-poster.jpg` (home hero)
- `welcome-palace/images/banquet-hall-tour-poster.jpg`
- `welcome-palace/images/ambient-jacuzzi-poster.jpg`

PageHero videos on inner pages have no poster at all. Without a poster, LCP waits for the first decoded video
frame of a `preload="auto"` MP4 over slow 4G. Uploading the posters (or pointing `poster` at an existing
image), adding posters to PageHero, and using `preload="metadata"` is the change most likely to bring LCP
under 2.5s and the score over 90.

## Final — loader removed + mosaic transform-only, branch `ux/animation-pass` @ `53de86a`

Same setup. Home shows a bimodal LCP (6.5s or 7.5s, depending on when the hero video's first frame paints), so
home is the median of 6 runs; other routes median of 3.

| Route | Perf (baseline → final) | LCP s | CLS | TBT ms | JS KB |
|---|---|---|---|---|---|
| home | 71 → 76 | 7.05 → 6.59 (−6.5%) | 0 → 0 | 14 → 14 | 353 → 353 |
| rooms | 72 → 79 | 6.05 → 5.67 (−6.3%) | 0 → 0 | 64 → 13 | 353 → 353 |
| banquet | 76 → 81 | 5.58 → 5.16 (−7.5%) | 0 → 0 | 46 → 18 | 353 → 353 |
| catering | 74 → 78 | 5.57 → 5.37 (−3.6%) | 0 → 0 | 44 → 36 | 353 → 353 |

- Every route improved; nothing regressed past noise; nothing reverted.
- Still short of LCP ≤ 2.5s / score ≥ 90: the remaining lever is the missing hero video posters (above).

## Posters + video weight — branch `perf/hero-posters`

Missing Cloudinary posters (`hero-poster`, `banquet-hall-tour-poster`, `ambient-jacuzzi-poster`,
`romantic-decor-poster`) now point at existing photos; every PageHero has a poster. Below-the-fold autoplay
videos (jacuzzi, banquet tour) attach their source only near the viewport. Hero videos are served with
`q_auto,w_1280` (hero.mp4 2.3MB → 0.7MB; the 85MB Pariwar Niwas / Chandni Chowk originals → 8MB / 15MB).

| Route | Perf (live → branch) | LCP s | TBT ms | Page weight |
|---|---|---|---|---|
| home (median of 6) | 76 → 76 | 6.59 → 6.25 | 14 → 43 | ~8MB+ → 2.0MB |
| rooms | 79 → 77 | 5.67 → 6.33 | 13 → 6 | → 1.6MB |
| banquet | 81 → 85 | 5.16 → 4.42 | 18 → 19 | |
| catering | 78 → 82 | 5.37 → 4.56 | 36 → 40 | |

LCP is now the hero video's first decoded frame (Chrome counts it), so it tracks video bytes: under
Lighthouse's slow-4G model even 0.7MB takes ~5s. Rooms/home LCP moves are within this run-to-run spread
(5.1–6.4s across runs). Next lever: shorter/lighter hero loops (e.g. `q_auto:eco,w_960,du_15`: hero.mp4
0.43MB, Pariwar Niwas 1.05MB) — trims the clips, so it needs an owner decision.
