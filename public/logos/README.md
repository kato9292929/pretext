# Logos

Drop logo PNG/SVG files here to have them embedded into exports/boards.html.

- `jcba.png`  — 日本暗号資産ビジネス協会 (Japan Cryptoasset Business Association)
- Company logos for the ecosystem chips can be added as `<name>.png`
  (e.g. visa.png, mastercard.png, stripe.png, crossmint.png ...).

The board builder (exports/build-boards.mjs) reads any present files and
embeds them as data URIs; missing logos fall back to text.
