---
name: dr.gam
description: The official site of dr.gam, painted by hand like a sun-faded beach-bar sign on the Atlantic.
colors:
  sea-900: "#0f2d52"
  sea-800: "#16396a"
  sea-700: "#1e4a86"
  wash: "#f7eedc"
  wash-2: "#bfd1ea"
  sun: "#ffc845"
  sun-hover: "#ffd979"
  bloom: "#ff6fae"
  bloom-ink: "#9c1457"
  ink: "#0f2d52"
typography:
  display:
    fontFamily: "Shrikhand, Cooper Black, Georgia, serif"
    fontSize: "clamp(4.4rem, 1rem + 13vw, 12.5rem)"
    fontWeight: 400
    lineHeight: 0.92
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Shrikhand, Cooper Black, Georgia, serif"
    fontSize: "clamp(2.6rem, 1.5rem + 4.4vw, 5.75rem)"
    fontWeight: 400
    lineHeight: 1.08
    letterSpacing: "-0.005em"
  headline-section:
    fontFamily: "Shrikhand, Cooper Black, Georgia, serif"
    fontSize: "clamp(2.2rem, 1.4rem + 3vw, 4.25rem)"
    fontWeight: 400
    lineHeight: 1.08
    letterSpacing: "-0.005em"
  title:
    fontFamily: "Shrikhand, Cooper Black, Georgia, serif"
    fontSize: "clamp(1.6rem, 1.2rem + 1.4vw, 2.4rem)"
    fontWeight: 400
    lineHeight: 1.05
  lead:
    fontFamily: "Figtree, Trebuchet MS, system-ui, sans-serif"
    fontSize: "clamp(1.15rem, 1rem + 0.5vw, 1.4rem)"
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: "Figtree, Trebuchet MS, system-ui, sans-serif"
    fontSize: "clamp(1rem, 0.96rem + 0.2vw, 1.125rem)"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Figtree, Trebuchet MS, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "0.06em"
rounded:
  sm: "4px"
  photo: "6px"
  card: "18px"
  pill: "999px"
spacing:
  gutter: "clamp(20px, 4vw, 56px)"
  section: "clamp(80px, 10vw, 152px)"
  wrap: "1320px"
components:
  button-primary:
    backgroundColor: "{colors.sun}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 24px"
    height: "50px"
  button-primary-hover:
    backgroundColor: "{colors.sun-hover}"
    textColor: "{colors.ink}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.wash}"
    rounded: "{rounded.pill}"
    padding: "0 24px"
    height: "50px"
  button-line:
    backgroundColor: "transparent"
    textColor: "{colors.wash}"
    rounded: "{rounded.pill}"
    padding: "0 18px"
    height: "44px"
  button-line-hover:
    backgroundColor: "{colors.wash}"
    textColor: "{colors.ink}"
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.wash}"
    rounded: "{rounded.pill}"
    padding: "0 24px"
    height: "50px"
  button-ink-hover:
    backgroundColor: "{colors.sea-700}"
  ticket-card:
    backgroundColor: "{colors.wash}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "clamp(28px, 4vw, 52px)"
  ticket-card-sun:
    backgroundColor: "{colors.sun}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "clamp(28px, 4vw, 48px) clamp(28px, 5vw, 64px)"
  nav-pill:
    backgroundColor: "{colors.sea-800}"
    textColor: "{colors.wash}"
    rounded: "{rounded.pill}"
    padding: "8px 14px"
  nav-pill-active:
    backgroundColor: "{colors.sun}"
    textColor: "{colors.ink}"
  chip-tag:
    backgroundColor: "{colors.sea-700}"
    textColor: "{colors.wash}"
    rounded: "{rounded.pill}"
    padding: "3px 10px"
  input-field:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "0"
    padding: "10px 0 12px"
---

# Design System: dr.gam

## Overview

**Creative North Star: "Atlantico dipinto"**

The site is a sun-faded wall on Fuerteventura, painted by hand the way a beach bar paints its board. Every surface is a coat of paint, not a screen: Atlantic blue in three depths for the ground, a cream whitewash for the panels that hold things to read, sun yellow for the one thing to press, and bougainvillea pink for accents and focus. Headings are sign lettering; everything that is read is a plain, warm sans.

Density is generous and loose. Sections breathe on a large vertical rhythm, panels hang slightly crooked (between -2deg and 1.8deg), and objects are physical: tickets with punched notches, photos pinned to the wall, records sliding out of their sleeves, a round stamp that turns slowly. Depth is a single soft drop shadow, as if each object were pinned a few millimetres off the wall. A fixed paint grain (7% opacity) sits over everything.

The world refuses the dark grid-of-cards artist template: no glassy dark tiles, no neon, no uniform card grids standing square to the viewport.

**Key Characteristics:**
- Three-depth sea-blue ground with cream panels; ink text is the deepest blue, never black.
- Shrikhand sign lettering only at heading size; Figtree 400/600/800 for all reading, buttons, menus and forms.
- Painted wave lines (stroke 7, round caps) as edges and dividers; full wave edges between grounds.
- Pinned, slightly rotated objects: tickets, postcards, pinned photos, sleeves with vinyl.
- Pill-shaped everything that is pressed.
- One soft shadow vocabulary; no hard offsets.

## Colors

A painted palette: deep Atlantic blues for the ground, cream whitewash for panels, and two sign paints (sun and bloom) used as accents.

### Primary
- **Sun Yellow** (sun): the primary action and the warmest paint. Primary pill buttons, the active nav pill, the hero sun disc, the footer contact ticket, the mobile menu wall, the tone half of every sign heading, the lightbox controls, text selection. Hover lifts to **Sun Wash** (sun-hover).

### Secondary
- **Bougainvillea Bloom** (bloom): accent and focus. The focus ring on every interactive element, the active language pill, the pink quote wall, video play buttons, "sold out" stamps, release tags, board separators, the middle hero stripe. As text it appears only on the deepest blue (sea-900), for pull quotes.
- **Bloom Ink** (bloom-ink): the dark pink that can carry text on cream and sun: the ticket meta line, quote attributions, the hovered menu item on the yellow wall, form errors.

### Neutral
- **Atlantic Deep** (sea-900): the page ground, the html and body background, record tags, ticket notches on the contact page. Also the value of **Ink** (ink), the text color on cream, sun and bloom.
- **Atlantic Mid** (sea-800): the second ground. Music crate, press-quote wall, inner page heroes, footer, the nav capsule, the YouTube placeholder.
- **Atlantic Shallow** (sea-700): the third and lightest ground. Story hero duotone base, nav hover, default event tags, the alternate studio logo disc.
- **Whitewash** (wash): main text on blue, and the painted panel for tickets, postcards, photo mounts, notes, partner chips, the board band.
- **Sea Mist** (wash-2): secondary text on blue: roles, leads in page heroes, meta, dates, footer base.
- **Lines**: whitewash at 20% (`rgb(247 238 220 / 0.2)`) for hairlines and dividers, at 45% for ghost and line button strokes. On cream, ink at 25-35% for dashed perforations and input underlines.

### Named Rules
**The Ink Is Blue Rule.** Text on any light paint (wash, sun, bloom) is ink (#0f2d52), never black or grey.

**The Sun Is the Action Rule.** Sun yellow fills the primary action on any view; a second competing filled action uses ink or a ghost outline, not another sun pill in the same group.

**The Bloom Stays on Deep Blue Rule.** Bloom pink as a text color only on sea-900; on light paint, pink text is bloom-ink.

## Typography

**Display Font:** Shrikhand (with Cooper Black, Georgia, serif)
**Body Font:** Figtree 400 / 600 / 800 (with Trebuchet MS, system-ui, sans-serif)

**Character:** Seventies sign lettering for what is shouted from the wall, a friendly round grotesque for what is read. Shrikhand is the only preloaded face.

### Hierarchy
- **Display** (400, clamp 4.4rem to 12.5rem, 0.92): the dr.gam wordmark in the hero only; the ".gam" half in sun yellow. It may run over the sun disc.
- **Headline** (400, clamp 2.6rem to 5.75rem, 1.08): inner page sign headings and the footer ticket CTA.
- **Headline Section** (400, clamp 2.2rem to 4.25rem, 1.08): home section signs. Two-part: a tone phrase in sun yellow, the rest in whitewash ("All the music", "On screen", "Through the lens").
- **Title** (400, clamp 1.6rem to 2.4rem, 1.05-1.1): ticket titles, postcard titles, the featured video title. The smallest size Shrikhand may appear at.
- **Lead** (400 or 600, clamp 1.15rem to 1.4rem, 1.5): intro lines, max 46ch.
- **Body** (400, clamp 1rem to 1.125rem, 1.6): running text. Long prose at up to 1.2rem, line-height 1.72, max 68ch.
- **Label** (800, 0.875rem or smaller, 0.06-0.08em, uppercase): form labels, event tags, stamps, quote attributions, language links. Functional labels only.
- **Meta** (800, 0.875rem, sentence case, no tracking): release status and year, set after the title it qualifies, in bloom-ink on cream.
- **Facts** (Figtree at lead size, 600 with the figure in 800): figures are written as words of the sentence ("Nearly 2,000 concerts..."), never as Shrikhand numerals.

### Named Rules
**The Sign Size Floor Rule.** Shrikhand never appears below the Title size (about 1.4rem is the absolute floor, used once for the story aside name). Below that it turns kitsch; use Figtree 800 instead.

**The Two Families Rule.** Shrikhand and Figtree only, four weights in total. Bold text is Figtree 800.

## Layout

A centred shell of 1320px plus a fluid gutter (20 to 56px) on each side. Sections are separated by a large fluid rhythm (80 to 152px). Grounds change by full-bleed bands (sea-900 to sea-800 and back) joined by painted wave edges, never by straight cuts; the board band and pink wall break the horizontal with a slight rotation or a slanted clip-path, scaled past the viewport so their edges never show.

Grids are asymmetric and loose: the hero is 7fr / 5fr with the sign overlapping the sun; content grids of three columns stagger each item's rotation and vertical offset. The photo wall is a column masonry (up to 4 columns of about 220px, 2 below 720px) that keeps each photo's natural proportions, with rotations alternating -1.6deg, 1.8deg, -0.4deg. Breakpoints: 1099px (inline nav collapses to the sun menu button and a full-screen yellow menu wall), 1023px (hero, postcard, story, archive, contact go single column; content grids go to two; the sun disc shrinks to min(56vw, 340px) above the sign and the spin badge drops to 96px on the disc's top-right shoulder, clear of the wordmark), 720px (photo wall to two columns), 600px (videos to one column, rotations on tickets and postcards removed, ticket actions stack full width and move above the ticket description). The fixed header is 72px, transparent until scrolled, then sea-900 at 92%.

## Elevation & Depth

Depth is one soft drop shadow, as if each painted object were pinned slightly off the wall. Flat grounds carry no shadow; objects on them (tickets, postcards, photos, sleeves, vinyl, stamps, play buttons, studio discs) all use the same one. Rotation, not shadow strength, does the rest of the work.

### Shadow Vocabulary
- **Pinned** (`box-shadow: 0 18px 40px -18px rgb(6 18 36 / 0.7)`): every object that sits on a ground.
- **Sun glow** (`box-shadow: 0 8px 22px -10px rgb(255 200 69 / 0.7)`): primary sun pill only.

### Named Rules
**The One Pin Rule.** Objects use the Pinned shadow and nothing heavier. No hard offset shadows on cards, panels or type, no stacked elevations. The 2px bloom-ink drop under the gallery pin is part of the pin's drawing, not an elevation.

## Shapes

Three shape families. Pills (999px) for everything pressed or tagged: buttons, nav, language links, chips, stamps, the skip link. Soft cards (18px) for tickets, video frames and boards; postcards use 8px, notes and covers 4-6px, so smaller objects get tighter corners. Circles for the sun disc, vinyl, play buttons, the spin badge, studio logos and ticket notches.

Tickets are punched: two half-circle notches (28-30px) cut into the left and right edges in the ground color behind, and a 2px dashed perforation in ink at 25-30% separates stub from body. Photos hang on a cream mount (12px sides, 40px bottom; 8px and 24px below 720px), held by a round bloom pin (18px) with a 2px bloom-ink drop, centred on the top edge. Waves are one shared path: 12 crests over 1440 units, stroked at 7 with round caps when used as a line, filled when used as an edge.

## Components

### Buttons
Painted pills, tactile and plain.
- **Shape:** full pill (999px), min height 50px, Figtree 800 at 1rem, 10px icon gap.
- **Primary:** sun with ink text and the sun glow; hover to sun-hover.
- **Hover / Focus:** lift 2px on hover, press to 1px down and 0.98 scale; 0.25s on the house ease (`cubic-bezier(0.22, 1, 0.36, 1)`). Focus is a 3px bloom outline offset 3px.
- **Ghost:** transparent with a 2px inset whitewash stroke at 45%, full whitewash on hover; on cream it becomes an ink stroke.
- **Line:** smaller (44px, 0.95rem) with a 1.5px stroke; fills whitewash with ink text on hover. Used for listening platforms.
- **Ink:** ink fill with whitewash text, hover to sea-700. Used on cream panels.
- **Expand toggle:** a sun pill with a drawn plus whose vertical bar rotates away when open.

### Chips
- **Style:** pill, Figtree 800 uppercase 0.75rem, sea-700 by default; sun for live events, bloom for releases. Partner chips are larger whitewash or sun pills with slight alternating rotation, bloom on hover.

### Cards / Containers
- **Corner Style:** 18px for tickets and boards, 8px postcards, 6px notes.
- **Background:** whitewash or sun, ink text; sea-800 for boards on the deep ground.
- **Shadow Strategy:** the Pinned shadow (see Elevation & Depth).
- **Border:** none; dashed ink perforations inside tickets and postcards.
- **Internal Padding:** fluid, roughly 16-22px for the hero ticket, 28-52px for contact and footer tickets.

### Inputs / Fields
- **Style:** underline only. Transparent, ink text, 2px ink underline at 35%, no radius, fluid 1.1-1.35rem text. Label above in the Label style.
- **Focus:** underline goes solid ink; no outline inside the ticket.
- **Error:** underline and label turn bloom-ink; status text in bloom-ink 600.

### Navigation
- **Desktop:** a sea-800 capsule (85%, whitewash hairline inset) holding Figtree 600 pills; hover sea-700, current page sun with ink. Language links are small uppercase 800 pills, current in bloom.
- **Mobile:** a sun "Menu" pill opens a full-screen sun-yellow wall with Shrikhand links (clamp 2.3 to 4.4rem) rising in with a 40ms stagger; hover and current in bloom-ink.

### Ticket (signature)
The release and contact object. A whitewash (or sun, in the footer) card with notches, a dashed perforation and a slight rotation (-1.2 to 1deg). The title comes first; the release status and year follow it as a Meta line. The footer ticket is a single link: the Shrikhand headline CTA with an arrow that slides on hover comes first, the Figtree 600 supporting line sits below it, and the card tilts -0.6deg on hover.

### Sun Disc Duotone (signature)
A true two-ink duotone in a circle: a grayscale, contrast-boosted portrait multiplied onto sun yellow, then a sea-700 layer blended with lighten on top, so shadows print Atlantic blue and highlights stay sun. No halo or glow around the disc. The story hero uses a multiply duotone on sea-700.

### Painted Wave (signature)
A wave line that paints itself in as it scrolls into view: the line sits in a clipping wrapper and slides from translateX(-100%) to 0 on the view timeline (entry 0% to cover 45%). Transform only, off under reduced motion. Three stacked sun, bloom and whitewash waves close the hero and draw the same way; filled wave edges join every change of ground.

### Spin Badge (signature)
The round red and white logo at the centre of a 168px stamp (112px on mobile) with the motto set in uppercase Figtree 800 on a circular path, turning once every 24s.

### Sleeve and Vinyl
A cover with a grooved vinyl peeking out at 14%; on hover the record slides to 34% and turns 160deg while the cover tilts -2deg. An optional bloom "sold out" stamp sits rotated 8deg on the corner.

## Do's and Don'ts

### Do:
- **Do** set every heading in Shrikhand at Title size or larger, splitting it into a sun tone phrase and a whitewash remainder.
- **Do** use sun yellow for the single primary action in a group, as a pill with ink text.
- **Do** join changes of ground with the shared wave edge, and use the drawn wave line as a divider.
- **Do** hang objects with a small rotation (between -2deg and 1.8deg) and the Pinned shadow; straighten them below 600px where they would crowd.
- **Do** keep text on light paint in ink (#0f2d52) and pink text on light paint in bloom-ink.
- **Do** use the bloom 3px outline for every focus state.
- **Do** draw icons as inline SVG with a rounded 2px stroke; mirror the same arrow for the opposite direction rather than drawing a second one.
- **Do** write figures as part of the sentence in Figtree, with the number in 800 at text size.
- **Do** leave the Press section (`.press-frozen`, src/app/press.css) exactly as it is. It is a frozen legacy island with its own near-black ground (#110f0e), its own tokens and its own fonts (Bricolage Grotesque, Instrument Serif, DM Mono). Reach it only through a wave edge filled with its ground color.

### Don't:
- **Don't** restyle, re-token or extend the Press section, and don't use Bricolage Grotesque, Instrument Serif or DM Mono anywhere outside it.
- **Don't** set Shrikhand for body, buttons, labels or anything below Title size.
- **Don't** add a third type family or weights beyond Figtree 400/600/800.
- **Don't** use black or grey for text or grounds; the darkest paint is sea-900.
- **Don't** build square, uniform dark card grids; this world exists to refuse that template.
- **Don't** use hard offset shadows on cards, panels or type, or heavier elevations than the Pinned shadow.
- **Don't** put a halo or glow around the sun disc; its depth comes from the duotone.
- **Don't** put an uppercase tracked line above a heading as a kicker; metadata follows the title in sentence case, and uppercase labels are for form fields, tags, stamps and attributions only.
- **Don't** use text glyphs (arrows, crosses) as icons.
