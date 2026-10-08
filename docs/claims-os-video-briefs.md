# ClaimsOS Video Generation Briefs

Documented generation briefs for owner-submitted video assets on the ClaimsOS product route (`/claims-os`). Conforms to the abstract, non-interface cinematic standard established in [PRODUCT.md](file:///d:/spotter.ai/PRODUCT.md) and [DESIGN.md](file:///d:/spotter.ai/DESIGN.md) (no fabricated interface chrome, no human portraits, no vehicle photos).

---

## 1. Incident to Resolution Velocity (`claims-triage`)

- **ID**: `claims-triage`
- **Route Chapter**: Chapter 01 (`Overview` / Hero)
- **Role**: Visual anchor for the centralized claims lifecycle.
- **Prompt**:
  > Abstract kinetic visualization of multi-stream freight data converging into alignment. Glowing deep teal (`#008080`) and pale cyan (`#BBDDDE`) luminous laser lines trace along geometric slate-teal architectural blocks (`#102A2B`). Subtle coral (`#F8485F`) status nodes pulse softly as disordered pathways straighten into streamlined, parallel vectors. Smooth cinematic forward tracking shot, matte ceramic and brushed metallic textures, volumetric soft rim lighting, dark moody background. No text, no numbers, no fake software UI, no human figures, no trucks.
- **Aspect Ratio**: `16:9` (1920 × 1080)
- **Target Duration**: `6 seconds`
- **Loop**: `yes`
- **Poster Frame**: First frame begins with glowing teal and pale cyan vectors intersecting across dark matte slate planes with a soft coral focal point.
- **Encoding Instruction**: Encode with `-g 1 -keyint_min 1 -sc_threshold 0` in x264/FFmpeg for scroll-scrub readiness:
  ```bash
  ffmpeg -i input.mp4 -vf "scale=-2:1080" -an \
    -c:v libx264 -preset slow -crf 20 \
    -g 1 -keyint_min 1 -sc_threshold 0 \
    -pix_fmt yuv420p -movflags +faststart claims-triage.mp4
  ```

---

## 2. Financial Equilibrium & Liability Resolution (`liability-resolution`)

- **ID**: `liability-resolution`
- **Route Chapter**: Chapter 03 (`Financial Control`)
- **Role**: Expresses cargo liability settlement, salvage reconciliation, and balanced financial ledger recovery.
- **Prompt**:
  > Abstract sculptural balance of interlocking translucent glass discs and polished porcelain rings in deep dark teal (`#102A2B`), mint teal (`#008080`), and warm coral accents (`#F8485F`). Minimalist kinetic sculpture gently rotating into balanced equilibrium against a clean studio dark backdrop. Soft specular highlights, subtle depth of field, slow ambient camera orbit, zero abrupt jerks or cuts. No simulated dashboard charts, no currency symbols, no people, no vehicles.
- **Aspect Ratio**: `16:9` (1920 × 1080)
- **Target Duration**: `5 seconds`
- **Loop**: `yes`
- **Poster Frame**: Stable sculptural arrangement of floating teal glass discs and porcelain ring resting in serene balance over dark gradient surface.
- **Encoding Instruction**: Same all-intra GOP=1 encode as above.
