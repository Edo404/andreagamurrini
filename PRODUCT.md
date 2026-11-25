# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: fans and listeners discovering dr.gam (Andrea Gamurrini), mostly arriving from social media, YouTube or Spotify, on a phone. Their job: hear the music, watch a video, decide to follow. Secondary: promoters and press, who need the story, the press coverage and a way to get in touch.

## Product Purpose

The official website of dr.gam, singer-songwriter, multi-instrumentalist and producer (rock, pop and funk, with roots in blues, soul, reggae, jazz and grunge). Success is a visitor who presses play: the first action is listening to the latest release on Spotify ("Live in Rome", 2026).

## Positioning

An artist with nearly two thousand concerts across Italy, Europe and America, a production studio and label of his own (White Coal, Fuerteventura), and a live-first rock, pop and funk sound. The name itself carries the idea: "dr" from the heart of Andrea, "gam" from the surname, feeling and reason, "alchemy is everything, my friend".

## Operating Context

- Three languages with the same URLs: English at `/`, Italian at `/it`, Spanish at `/es`.
- One-page home with Music, Videos, Gallery and Press sections (each shows a few items and an "Others" button), then White Coal and the contact form at the bottom, before the footer. Only Story and Live archive are separate pages.
- Hosted on Cloudflare Workers (OpenNext). `main` deploys to production automatically. The contact form sends email through Resend.

## Capabilities and Constraints

- Next.js 16 App Router, static pages, plain CSS in `src/app/globals.css`, content in `src/data`.
- Old URLs (`/records`, `/videos`, `/gallery`, `/stampa`, `/white-coal`, `/white-coal-records`, `/contact`) redirect to the home sections.

## Brand Commitments

- The round red and white logo ("an drea gam urrini") stays as it is.
- The artist name is written "dr.gam".
- Motto, from the artist's own bio: "Alchemy is everything, my friend."

## Evidence on Hand

- Real photos: `public/media` (portrait, live, studio, gallery of 16 photos).
- Discography, 25 videos, 42 press outlets, 12 press quotes, 86 archived events: `src/data`.
- No testimonials, numbers or claims beyond what the artist's bio states (about 2,000 concerts; almost 500,000 views of "Kilimangiaro").

## Product Principles

1. Listening comes first: every page should lead to the music.
2. The artist's own words and real press, never invented praise.
3. Personality over template: it must feel like one artist's world.
4. Fast and readable on a phone.
