# Product preview images (Products slider)

The home "Products / Automatic" section (`src/sections/Featured.tsx`) is a
horizontal slider. Each card shows a preview image if the file below exists;
otherwise it falls back to a styled placeholder with the product name (no
error, no layout shift). Recommended ratio **16:10** (e.g. 1200×750).

| Product                | Expected file             |
| ---------------------- | ------------------------- |
| x402 Endpoint          | `public/products/endpoint.png` |
| x402 Autonomous Agent  | `public/products/aa.png`       |
| Onchain Stock Data     | `public/products/osd.png`      |
| Japan Inflation Nowcast| `public/products/jin.png`      |

## Notes / unresolved

- **No preview images are placed yet** — all cards render the placeholder.
  Drop the files above in to enable previews.
- Live sites: **x402 Endpoint → https://endpoint.x402jp.com/** and
  **Onchain Stock Data → https://osd.x402jp.com/** (linked as "Visit site").
  **x402 Autonomous Agent** and **Japan Inflation Nowcast** are marked
  "Coming soon" (no external link) until their public sites are ready.
