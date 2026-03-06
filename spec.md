# ELZIA 2K26 Symposium

## Current State
Full-page symposium website with:
- Dark navy/blue electric tech theme
- IC chip / PCB embedded-systems canvas animation (background, fixed)
- Oscilloscope wave animation on hero sides
- Glitch title, digit-flip countdown, energy event cards, ripple buttons
- Scroll progress bar, character-reveal headings, dragon eye glow
- Uploaded logo: /assets/uploads/WhatsApp-Image-2026-03-05-at-12.17.43-PM-1.jpeg
- Generated cartoon logo: /assets/generated/elzia-cartoon-logo-transparent.dim_400x400.png
- All existing content preserved: events, prizes, rules, registration, contact

## Requested Changes (Diff)

### Add
- Cartoon/comic-book visual theme throughout all sections
- Vibrant color palette: bright purple (#7C3AED), electric yellow (#FACC15), orange (#F97316), hot pink (#EC4899), cyan (#06B6D4)
- Cartoon-style animated background: floating comic-style lightning bolts, ZAP/POW/BOOM speech bubble bursts, bouncing stars, spinning gear icons, cartoon circuit paths with bold outlines
- Bouncy spring entrance animations for cards and headings (using framer-motion spring)
- Cartoon thick black outlined borders on cards (3px bold border)
- Bold comic-font style for section labels
- Cartoon character mascot hover wiggle effects on event cards
- Comic "halftone dot" pattern overlay on hero section
- Generated cartoon logo displayed in hero and navbar
- Bouncy floating animation on hero logo

### Modify
- Color scheme: switch from dark navy/blue to vibrant comic-purple dark background with yellow/orange/pink/cyan accents
- CSS tokens: update --primary to electric yellow, --accent to hot pink/orange, --background to deep comic purple
- Background animation: replace IC chip canvas with cartoon-style canvas (comic lightning, speech bubbles, stars, cartoon circuit lines with thick outlines)
- Hero logo: use generated cartoon logo /assets/generated/elzia-cartoon-logo-transparent.dim_400x400.png with bouncy floating animation
- Navbar logo: use generated cartoon logo
- Card borders: thicker, more colorful, cartoon-style
- Buttons: bold rounded cartoon style with yellow/orange gradient and thick black outline
- Countdown timer: comic-book panel style with yellow background and purple text
- Section headers: bold with cartoon-style underline or highlight

### Remove
- Oscilloscope wave canvas (replace with cartoon animations)
- Dark blue glow effects (replace with vibrant cartoon glow)
- Current IC/PCB embedded-systems canvas background

## Implementation Plan
1. Update index.css:
   - New OKLCH tokens: deep comic purple background, electric yellow primary, hot pink accent, orange secondary
   - New cartoon CSS: halftone pattern, comic border style, bouncy keyframes, cartoon glow effects
   - New typography: bold comic feel with high contrast
2. Update App.tsx:
   - Replace EmbeddedSystemCanvas with CartoonCanvas (lightning bolts, speech bubbles ZAP/POW, bouncing stars, cartoon circuit lines)
   - Remove OscilloscopeWave components
   - Use cartoon logo in hero and navbar
   - Update hero logo with bouncing float animation instead of rotating ring
   - Update color references throughout (gold→yellow, cyan→pink/orange)
   - Add spring-based entrance animations to cards
   - Update countdown timer style to comic-book panel
   - Update button styles to cartoon-bold
   - Add cartoon wiggle hover effect on event cards
3. Validate and build
