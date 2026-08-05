# Tool logos (Services section)

The Services section (`src/sections/Services.tsx`) shows a "使用ツール / Tools"
row per card. Each tool is defined once in the `TOOLS` object there as
`{ name, src, alt, href? }`.

## Drop-in convention

Place an image at the `src` path below and the badge switches from plain text
to the image automatically. **No file present = text-only badge** (the `<img>`
`onError` keeps the `name` text; there is no error and no layout shift).

| Tool         | Expected file                    |
| ------------ | -------------------------------- |
| Claude       | `public/logos/claude.svg`        |
| Claude Code  | `public/logos/claude-code.svg`   |
| Vercel       | `public/logos/vercel.svg`        |
| Higgsfield   | `public/logos/higgsfield.svg`    |

Use each vendor's own brand asset within its brand guidelines. Do not recolor,
alter, or combine the marks with ours. The label is "使用ツール / Tools" only —
it does not imply partnership, certification, or endorsement.

## Unresolved (per work order §6/§7)

- **Logo image files are not placed.** All four badges currently render as text.
  This is intentional and self-standing; drop the files above in to enable images.
- **Tool selection** is limited to what is verifiable from the repo/environment:
  Claude (used across products), Claude Code (this site + the services), Vercel
  (every product is deployed on `*.vercel.app`), and Higgsfield (the connected
  video-generation integration, matching the video service). **Excluded as
  unconfirmed:** Next.js, Figma, Kling, HeyGen — no usage evidence in the
  codebase. Add them to `TOOLS` only once their use is confirmed.
