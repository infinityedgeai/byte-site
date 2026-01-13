# Color Accessibility Strategies

This document outlines accessibility strategies for the site's color system.

## Color Palette

| Variable | Value | Purpose |
|----------|-------|---------|
| `--dark` | #1F2733 | Dark blue-gray, used as bg (dark) / fg (light) |
| `--light` | #f3e2ef | Light pink, used as bg (light) / fg (dark) |
| `--primary-base` | #06d6a0 | Teal - primary actions |
| `--secondary-base` | #e05652 | Red - errors, secondary actions |
| `--accent-base` | #f6d251 | Yellow - highlights, decorative |

## Contrast Considerations

| Color | On Light BG | On Dark BG |
|-------|-------------|------------|
| Primary (teal) | Low contrast | Moderate |
| Secondary (red) | Good | Moderate |
| Accent (yellow) | Very poor | Poor |

## Strategies

### 1. Reserve primary colors for non-text elements

Use primary/secondary/accent for:
- Buttons
- Borders
- Icons
- Decorative elements

These have lower WCAG requirements (3:1 vs 4.5:1 for text).

### 2. Text on primary-colored backgrounds must use `background` color

```tsx
// Correct
<button className="bg-primary text-background">Submit</button>

// Incorrect
<button className="bg-primary text-white">Submit</button>
```

### 3. Primary-colored text: only for large/bold text

- Headings (24px+ or 19px+ bold)
- Always use `font-semibold` or `font-bold` when using colored text
- Never use for body text

```tsx
// Correct
<h2 className="text-primary font-bold">Heading</h2>

// Incorrect
<p className="text-primary">Body text</p>
```

### 4. Invert darkening logic by theme

Darken primaries in light mode for contrast against light background.
Use base or lighten in dark mode for contrast against dark background.

```css
/* Light mode: darken for contrast against light bg */
:root {
  --primary: color-mix(in srgb, var(--primary-base) 70%, black 30%);
}

/* Dark mode: use base or lighten for contrast against dark bg */
.dark {
  --primary: var(--primary-base);
}
```

### 5. Avoid accent (yellow) for text entirely

Yellow fails accessibility on both backgrounds. Use only for:
- Background fills with `text-foreground` on top
- Borders and decorations
- Icons alongside foreground text

```tsx
// Correct - yellow as background
<div className="bg-accent text-foreground">Notice</div>

// Incorrect - yellow as text
<span className="text-accent">Warning</span>
```

### 6. Error messages: ensure dark mode compatibility

If using `text-secondary` for errors, ensure it's readable in both themes or add a dark mode override:

```tsx
className="text-secondary font-semibold"
```

## Testing

Always test color combinations with:
- Browser dev tools contrast checker
- WCAG contrast ratio tools (aim for 4.5:1 for normal text, 3:1 for large text/UI)
