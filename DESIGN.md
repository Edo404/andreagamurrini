---
name: dr.gam
description: The official site of dr.gam, laid out as the opened gatefold sleeve of the live LP "Live in Rome".
colors:
  red: "#bf2716"
  red-deep: "#a92112"
  blue: "#1f3dac"
  blue-tint: "#c9d3f5"
  ink: "#18141f"
  ink-2: "#4a4652"
  paper: "#e5e7e9"
  paper-2: "#d5d8dc"
  sheet: "#f3f4f6"
typography:
  display:
    fontFamily: "Archivo, Arial Narrow, system-ui, sans-serif"
    fontSize: "clamp(3.2rem, 1.2rem + 7vw, 6rem)"
    fontWeight: 900
    lineHeight: 0.9
    letterSpacing: "-0.035em"
    fontVariation: "'wdth' 125"
  headline:
    fontFamily: "Archivo, Arial Narrow, system-ui, sans-serif"
    fontSize: "clamp(2.3rem, 1.3rem + 4vw, 4.6rem)"
    fontWeight: 900
    lineHeight: 1
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 125"
  headline-section:
    fontFamily: "Archivo, Arial Narrow, system-ui, sans-serif"
    fontSize: "clamp(1.9rem, 1.2rem + 2.6vw, 3.4rem)"
    fontWeight: 900
    lineHeight: 1
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 125"
  title:
    fontFamily: "Archivo, Arial Narrow, system-ui, sans-serif"
    fontSize: "clamp(1.3rem, 1.05rem + 1vw, 1.85rem)"
    fontWeight: 900
    lineHeight: 1.05
    letterSpacing: "-0.015em"
    fontVariation: "'wdth' 125"
  title-soft:
    fontFamily: "Archivo, Arial Narrow, system-ui, sans-serif"
    fontWeight: 500
    letterSpacing: "-0.01em"
    fontVariation: "'wdth' 100"
  lead:
    fontFamily: "Archivo, Arial Narrow, system-ui, sans-serif"
    fontSize: "clamp(1.1rem, 1rem + 0.45vw, 1.35rem)"
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: "Archivo, Arial Narrow, system-ui, sans-serif"
    fontSize: "clamp(1rem, 0.96rem + 0.2vw, 1.125rem)"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Archivo, Arial Narrow, system-ui, sans-serif"
    fontSize: "0.78rem"
    fontWeight: 800
    lineHeight: 1.3
  button:
    fontFamily: "Archivo, Arial Narrow, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 800
    lineHeight: 1.1
rounded:
  none: "0px"
  record: "50%"
spacing:
  gutter: "clamp(20px, 4vw, 56px)"
  section: "clamp(72px, 9vw, 136px)"
  wrap: "1320px"
  header: "64px"
components:
  button-paper:
    backgroundColor: "{colors.sheet}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "0 22px"
    height: "50px"
  button-paper-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.sheet}"
  button-red:
    backgroundColor: "{colors.red}"
    textColor: "{colors.sheet}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "0 22px"
    height: "50px"
  button-red-hover:
    backgroundColor: "{colors.red-deep}"
    textColor: "{colors.sheet}"
  button-ghost:
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "0 18px"
    height: "44px"
  button-ghost-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  input-field:
    backgroundColor: "{colors.sheet}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "13px 14px"
  tag-event:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    padding: "2px 8px"
  tag-event-live:
    backgroundColor: "{colors.red}"
    textColor: "{colors.sheet}"
  tag-event-radio:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.sheet}"
  page-hero:
    backgroundColor: "{colors.red}"
    textColor: "{colors.sheet}"
    typography: "{typography.headline}"
  menu-overlay:
    backgroundColor: "{colors.red}"
    textColor: "{colors.sheet}"
---

# Design System: dr.gam

## Overview

**Creative North Star: "Gatefold Live"**

The site is the opened gatefold sleeve of the live LP "Live in Rome". The ground is uncoated cool-grey board, and everything on it is printed in two spot inks: Rome red and stage blue, with a near-black that reads as the two overprinted. Photos are printed in one ink and develop as they come into view. Sections are parts of the record: the opened sleeve with the vinyl half pulled out, the liner notes, the back cover with side A and side B, the blue stage with its screen and setlist, a full red field for the manifesto quote, a booklet page, the contact sheet on black, pasted press clippings, and the blue back cover as the footer. Inner pages open on a red panel with the fold shadow along one edge.

The system works like print. Everything is cut square and only records are round. Depth comes from paper on paper: soft cast shadows under pasted sheets, a fold crease and a faint board grain. There is one family, Archivo. Titles are set wide and black. Everything meant to be read is set at normal width. The round red and white logo appears only as the centre label of a vinyl, and it is never redrawn, recoloured or cropped.

Density is generous between sections (the section rhythm is the `section` spacing token) and tight inside them: lists, credits and contact frames sit close, the way a sleeve packs its information.

**Key Characteristics:**
- Cool-grey board ground with two spot inks (red, blue) and overprint black.
- Full-bleed colour fields (red, blue, black) mark sections, the way a sleeve changes panel.
- Photos are printed in one ink (blue, red or black) and develop to colour or full tone on interaction or on view.
- One variable family: wide 900 for titles, normal width for reading.
- Square-cut everything, round records only.
- Paper physics: pasted sheets cast a soft shadow, clippings and stamps sit slightly crooked, and the fold is a shadow crease.

## Colors

Two spot inks on grey board, with an overprint black for type and for one dark field.

### Primary
- **Rome Red** (red): the action ink and the big fields. It is used for primary buttons, the opened-sleeve panel, the manifesto field, page-hero panels, the mobile menu, the A/B side letters, the archive years, drop caps, pull quotes, nav underlines and text selection. Text on it is Sheet; secondary text on it is Paper.
- **Deep Rome Red** (red-deep): the hover state of red buttons, and the only red allowed for small text on Paper-2 (sold-out stamps, review sources), where it holds AA contrast.

### Secondary
- **Stage Blue** (blue): the stage section, the footer back cover, the default ink for halftone photos and contact-sheet frames, the radio event tag, and the focus ring on light grounds.
- **Stage Blue Tint** (blue-tint): secondary text and rules on blue.

### Neutral
- **Overprint Black** (ink): body text, rules, the header underline, the contact-sheet field, the black-ink halftone, and the ink half of each title (the wordmark's ".gam" and the soft half of titles on red).
- **Faded Ink** (ink-2): secondary text on board (meta lines, notes, credit labels).
- **Sleeve Board** (paper): the page ground.
- **Back Board** (paper-2): one step down, for the back-cover tracklist and the reviews wall.
- **Pasted Sheet** (sheet): the lighter paper pasted onto the board (clippings, review cards, form fields, the paper button). It also serves as the text colour on red, blue and black.

### Named Rules
**The Two Inks Rule.** The only chromatic colours are red and blue. Black is their overprint. A third hue never enters; the only tint is blue-tint, for secondary text on blue.

**The Small Red Rule.** Red text smaller than a title on Paper-2 uses red-deep. Rome Red is reserved for titles, fields and buttons.

## Typography

**Display Font:** Archivo variable (with Arial Narrow, system-ui), at wdth 125 and weight 900
**Body Font:** Archivo variable, normal width

**Character:** one family split by width rather than by face. The wide black cut is the stamped title on the sleeve, and the normal width is the liner-notes text.

### Hierarchy
- **Display** (900, wdth 125, fluid 3.2rem to 6rem, line-height 0.9): the "dr.gam" wordmark on the opened sleeve.
- **Headline** (900, wdth 125, fluid 2.3rem to 4.6rem, line-height 1): page-hero titles, the footer call to action, archive years.
- **Headline Section** (900, wdth 125, fluid 1.9rem to 3.4rem): home section titles and the manifesto quote (which uses weight 800 at line-height 1.12, capped at 24ch).
- **Title** (900, wdth 125, fluid 1.3rem to 1.85rem): record titles, pull quotes, studio label captions.
- **Lead** (400, fluid 1.1rem to 1.35rem, line-height 1.5, max 60ch): intros under titles.
- **Body** (400, fluid 1rem to 1.125rem, line-height 1.6, prose max 68ch).
- **Label** (800, 0.78rem): event tags and sold-out stamps (stamps at 900 and wdth 125).

### Named Rules
**The Two Widths Rule.** Section titles pair a soft half (500, wdth 100) with a hard half (900, wdth 125) in the same family, for example "All the **music**". Emphasis comes from width and weight, never from a second typeface.

**The Read Narrow Rule.** Anything longer than a line is set at normal width. The wide axis is only for titles, letters, years and stamps.

## Layout

Content sits in a 1320px wrap with a fluid gutter. Sections run full-bleed as colour fields (paper, paper-2, blue, red, black), with section-token vertical padding. The home page reads in sleeve order. The opened sleeve is a two-column grid at desktop (blue halftone photo on the left, red panel on the right), capped at the viewport height minus the 64px sticky header and at 860px. Below 1024px it stacks with the photo on top, and on phones the listen button stays above the fold. Other two-column splits (stage 1.65:1, booklet 1:1, story 240px aside plus prose, contact 1:1.2) collapse to one column at 1023px. Grids drop from four to two columns (contact sheet) and from three to two to one (facts, clippings) at 760px and 600px. Inline nav gives way to the menu button below 1100px.

## Elevation & Depth

Depth is paper on paper, not interface layering. Pasted sheets (clippings, reviews, record covers, the vinyl) cast one soft, downward shadow. They lift slightly further on hover. The sleeve's fold is a 28px ink gradient along the inner edge of the red panel (22px and vertical once stacked). A fixed fractal-noise grain at 8% multiply sits over everything as board texture.

### Shadow Vocabulary
- **Pasted** (`box-shadow: 0 10px 24px -12px rgb(24 20 31 / 0.45)`): clippings, review cards, track covers, the vinyl.
- **Lifted** (`box-shadow: 0 18px 36px -16px rgb(24 20 31 / 0.5)`): the sleeve cover above its vinyl, and a clipping on hover.
- **Fold crease** (`linear-gradient(90deg, rgb(24 20 31 / 0.28), transparent)`, 28px wide): the inner edge of the opened-sleeve panel and of every page hero.

### Named Rules
**The Paper Physics Rule.** Shadows are always soft and fall downward, the way a real sheet sits on board. Only pasted paper and records cast one. Fields, buttons and inputs stay flat.

## Shapes

Every edge is cut square (0 radius): buttons, fields, tags, frames, panels, clippings. Only records are round: the vinyl, its centre label and the studio-label discs. Crooked placement is part of the shape language. Clippings rotate between -1.4 and 1.6 degrees, reviews by about ±0.7 degrees, and sold-out stamps by -3 degrees.

### Named Rules
**The Only Records Are Round Rule.** A circle means a record. No pill buttons, round avatars or rounded cards.

## Components

### Buttons
Rectangular stamps, flat, 800 weight.
- **Shape:** square-cut (0), 50px tall, 22px side padding, icon gap 0.55em; they press down 1px on active.
- **Paper:** a sheet-on-ink button that turns ink on hover. It is the listen action on the red sleeve panel.
- **Red:** the primary action on board, darkening to red-deep on hover.
- **Ghost:** 44px tall, with a 2px inset border in the current colour. It fills with ink on hover, or with sheet on blue and black fields. Used for streaming links and the "Others" expanders.
- **Underlined link:** 800 weight with a 2px underline that thickens to 4px on hover.

### Inputs / Fields
- **Style:** sheet fill, 2px ink border, square, 13px by 14px padding, red caret.
- **Focus:** 3px blue outline, offset 2px.
- **Error:** red border with a 1px inset red line, and a red status line below. A sent status is blue.

### Navigation
A sticky board header with a 2px ink rule beneath it. The wordmark sits left, with ".gam" in red. Nav links are 700 weight, and a 3px red underline draws in from the left on hover and on the current page. The language switch is square 36px cells, with the current language reversed out in ink. Below 1100px an ink menu button opens a full red overlay. Its links are set wide 900 and slap in one after another, and the current page is shown in ink.

### Tags
Square 0.78rem/800 labels with 2px by 8px padding. They are ink by default, red for concerts and blue for radio.

### The Sleeve and Vinyl (signature)
The cover image sits above a vinyl that is pulled out 80% to the right, so the round logo label stays fully visible. On load the vinyl slides out of the sleeve. While the listen button is hovered or focused, the label spins. The vinyl is drawn as grooves with a soft pasted shadow, and the logo image sits unaltered at its centre.

### Halftone Photo (signature)
A greyscale photo, contrast-lifted and screen-blended over a field of blue, red or black, so the darks take the ink and the lights stay paper. Photos develop from 12% opacity and a 1.04 scale as they scroll into view. Contact-sheet frames and stage video thumbnails print in blue or black and develop to full colour on hover and focus.

### Tracklist Sides (signature)
Back-cover columns with a huge red "A" or "B" in the margin. Each row is a 64px pasted cover, a title and meta line, and a red arrow that nudges up and right on hover. Sold-out releases carry a crooked outlined stamp in red-deep.

### Press Clippings (signature)
Sheet cards on board, each slightly rotated and softly shadowed. The outlet logo is printed grey (multiply). On hover the card lifts, straightens toward 0.6 degrees and the logo returns to colour. Clippings slap in as they enter view.

### Page Hero
A red panel with the fold crease on its left edge. It carries a two-width title, with the soft half in ink, and a lead in paper.

### Footer (back cover)
A full blue field. It opens with a wide call to action ("Write to dr.gam" with an arrow that nudges on hover), then credit columns under a 2px blue-tint rule. The call to action is hidden on the contact page.

### Motion
One ease (`cubic-bezier(0.16, 1, 0.3, 1)`). Slap-in rises 14px from 1.02 scale for revealed list items, menu links and clippings. Photos develop on view. The vinyl pulls out over 1.1s, and its label spins (1.8s per turn) while the listen button is hovered. The lightbox fades in over 0.25s. Under `prefers-reduced-motion: reduce` every animation and transition collapses to an instant change.

## Do's and Don'ts

### Do:
- **Do** set every title in Archivo 900 at wdth 125, and every readable text in the same family at normal width.
- **Do** keep the black embossed damask (`/media/damask.webp`, `--damask`) to two grounds only: as-is behind the contact sheet, and multiplied at 40% over Rome red behind the manifesto as club velvet. Never behind body text on board, never in the hero.
- **Do** print photos in one ink (blue by default, black for the booklet portrait, red for the live photo inside the Story), and let them develop on view or on hover.
- **Do** show the round logo only as the vinyl's centre label, exactly as supplied.
- **Do** use red-deep for small red text on Paper-2, and Sheet for text on red, blue and black fields.
- **Do** give pasted paper the pasted shadow (clippings, reviews, covers) and tilt only clippings, reviews and stamps slightly; keep everything else flat and straight.
- **Do** open inner pages on a red page-hero panel with the fold crease.
- **Do** switch focus rings to Sheet on red, blue and black fields.

### Don't:
- **Don't** introduce a third hue, gradients between the inks, or tints outside blue-tint.
- **Don't** round any corner except on records.
- **Don't** use a second typeface, or set paragraphs at the wide width.
- **Don't** recolour, redraw, crop or restyle the round red and white logo.
- **Don't** show a live or portrait photo in full colour at rest. Colour is its developed state. Release artwork (record covers) is the exception: it is a reproduction of another printed object.
- **Don't** use hard offset shadows or glows. Depth is the soft pasted shadow and the fold crease only.
- **Don't** ship motion without its reduced-motion fallback.
