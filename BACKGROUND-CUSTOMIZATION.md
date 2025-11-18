# Background Ribbon Color Customization Guide

This guide shows you exactly how to change the colors of the animated background ribbons in your landing page.

## Location

File: `src/components/SkimlyBackground.tsx`

## Understanding the Ribbons

There are **3 diagonal ribbon layers** that create the dynamic background effect:

1. **Ribbon 1** (Line 38-48) - Top ribbon, rotated -6 degrees
2. **Ribbon 2** (Line 49-61) - Middle ribbon, rotated 8 degrees
3. **Ribbon 3** (Line 62-74) - Bottom ribbon, rotated -10 degrees

Each ribbon has a gradient with 3 color stops that blend together.

---

## How to Change Ribbon Colors

### Ribbon 1 (Static Colors)

**Location:** Lines 41-42

**Current Colors:**
- Green → Sky Blue → Indigo

```typescript
background: 'linear-gradient(90deg,
  rgba(16,185,129,0.12),   // Green (emerald-500)
  rgba(56,189,248,0.12),   // Sky Blue (sky-400)
  rgba(99,102,241,0.12))'  // Indigo (indigo-500)
```

**To Change:**
1. Pick your RGB colors (use a color picker or Tailwind colors)
2. Replace the RGB values
3. Keep the last number (0.12) for opacity - adjust between 0.05-0.20

**Example - Change to Purple/Pink/Red:**
```typescript
background: 'linear-gradient(90deg,
  rgba(168,85,247,0.12),   // Purple (purple-500)
  rgba(236,72,153,0.12),   // Pink (pink-500)
  rgba(239,68,68,0.12))'   // Red (red-500)
```

---

### Ribbon 2 (Dynamic Colors - Changes on Scroll)

**Location:** Lines 52-55

**Current Colors:**
- Indigo → Violet → Pink (morphs as you scroll)

```typescript
background: `linear-gradient(90deg,
  rgba(${99 + scrollProgress * 40}, ${102 - scrollProgress * 20}, ${241 - scrollProgress * 40}, ${0.10 + midScrollProgress * 0.05}),
  rgba(${139 - scrollProgress * 30}, ${92 + scrollProgress * 40}, ${246 - scrollProgress * 50}, 0.11),
  rgba(${236 - scrollProgress * 50}, ${72 + scrollProgress * 60}, ${153 + scrollProgress * 40}, 0.10))`
```

**Understanding the Formula:**
- `99 + scrollProgress * 40` means: Start at 99 (Red channel), add up to 40 as you scroll
- `scrollProgress` goes from 0 to 1 as you scroll down

**To Change to Static Colors (Easier):**
Replace the entire gradient with simple rgba values:

```typescript
background: 'linear-gradient(90deg,
  rgba(168,85,247,0.12),   // Your color 1
  rgba(236,72,153,0.12),   // Your color 2
  rgba(239,68,68,0.12))'   // Your color 3
```

**To Keep Dynamic Effect:**
1. Pick your starting RGB color (e.g., Purple = 168, 85, 247)
2. Pick your ending RGB color (e.g., Pink = 236, 72, 153)
3. Calculate the difference: 236-168=68, 72-85=-13, 153-247=-94
4. Use those differences in the formula:

```typescript
rgba(${168 + scrollProgress * 68}, ${85 - scrollProgress * 13}, ${247 - scrollProgress * 94}, 0.12)
```

---

### Ribbon 3 (Dynamic Colors - Changes on Late Scroll)

**Location:** Lines 65-68

**Current Colors:**
- Cyan → Indigo → Violet (morphs on late scroll)

Same concept as Ribbon 2, but uses `lateScrollProgress` instead.

**Simple Replacement:**
```typescript
background: 'linear-gradient(90deg,
  rgba(34,211,238,0.10),   // Your color 1
  rgba(99,102,241,0.09),   // Your color 2
  rgba(139,92,246,0.11))'  // Your color 3
```

---

## Quick Color Reference (Tailwind CSS)

Use these RGB values for common colors:

| Color | RGB Value | Tailwind |
|-------|-----------|----------|
| Red | `rgba(239,68,68,0.12)` | red-500 |
| Orange | `rgba(249,115,22,0.12)` | orange-500 |
| Yellow | `rgba(234,179,8,0.12)` | yellow-500 |
| Green | `rgba(34,197,94,0.12)` | green-500 |
| Teal | `rgba(20,184,166,0.12)` | teal-500 |
| Cyan | `rgba(6,182,212,0.12)` | cyan-500 |
| Sky | `rgba(14,165,233,0.12)` | sky-500 |
| Blue | `rgba(59,130,246,0.12)` | blue-500 |
| Indigo | `rgba(99,102,241,0.12)` | indigo-500 |
| Violet | `rgba(139,92,246,0.12)` | violet-500 |
| Purple | `rgba(168,85,247,0.12)` | purple-500 |
| Fuchsia | `rgba(217,70,239,0.12)` | fuchsia-500 |
| Pink | `rgba(236,72,153,0.12)` | pink-500 |
| Rose | `rgba(244,63,94,0.12)` | rose-500 |

---

## Adjusting Opacity

The last number in `rgba(99,102,241,0.12)` controls transparency:

- `0.05` - Very subtle
- `0.10` - Subtle (recommended for backgrounds)
- `0.15` - Medium visibility
- `0.20` - More prominent
- `0.30` - Very visible (might be too strong)

**Tip:** Keep opacity between 0.08 and 0.15 for best results.

---

## Example: Create a Warm Sunset Theme

```typescript
// Ribbon 1 - Orange to Red
background: 'linear-gradient(90deg,
  rgba(251,146,60,0.12),   // Orange
  rgba(251,113,133,0.12),  // Rose
  rgba(239,68,68,0.12))'   // Red

// Ribbon 2 - Yellow to Orange (static)
background: 'linear-gradient(90deg,
  rgba(250,204,21,0.10),   // Yellow
  rgba(251,146,60,0.11),   // Orange
  rgba(249,115,22,0.10))'  // Deep Orange

// Ribbon 3 - Pink to Purple (static)
background: 'linear-gradient(90deg,
  rgba(244,114,182,0.10),  // Pink
  rgba(217,70,239,0.09),   // Fuchsia
  rgba(168,85,247,0.11))'  // Purple
```

---

## Example: Create a Cool Ocean Theme

```typescript
// Ribbon 1 - Teal to Blue
background: 'linear-gradient(90deg,
  rgba(20,184,166,0.12),   // Teal
  rgba(6,182,212,0.12),    // Cyan
  rgba(14,165,233,0.12))'  // Sky

// Ribbon 2 - Cyan to Indigo (static)
background: 'linear-gradient(90deg,
  rgba(34,211,238,0.10),   // Light Cyan
  rgba(59,130,246,0.11),   // Blue
  rgba(99,102,241,0.10))'  // Indigo

// Ribbon 3 - Sky to Purple (static)
background: 'linear-gradient(90deg,
  rgba(56,189,248,0.10),   // Sky
  rgba(99,102,241,0.09),   // Indigo
  rgba(139,92,246,0.11))'  // Violet
```

---

## Testing Your Changes

1. Save the file after making changes
2. The page will hot-reload automatically
3. Scroll up and down to see how ribbons behave
4. Adjust opacity if colors are too strong or subtle

---

## Pro Tips

1. **Use analogous colors** (next to each other on color wheel) for smooth gradients
2. **Keep consistent opacity** across all ribbons (around 0.10-0.12)
3. **Test on both light backgrounds** - ribbons should be subtle
4. **Mobile preview** - Colors appear different on smaller screens
5. **Contrast check** - Ensure text remains readable over ribbons

---

## Need Help?

- Tailwind Color Palette: https://tailwindcss.com/docs/customizing-colors
- RGB Color Picker: https://g.co/kgs/rgb (Google search)
- Gradient Generator: https://cssgradient.io/

Just copy the RGB values (e.g., "99, 102, 241") and paste into the rgba() function with your desired opacity.
