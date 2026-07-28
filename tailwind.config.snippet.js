// Add this inside theme.extend.colors in your existing tailwind.config.js
// (the one NativeWind already points at). Don't replace your whole config —
// just merge this colors block in.
 
module.exports = {
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background) / <alpha-value>)',
        'background-soft': 'hsl(var(--background-soft) / <alpha-value>)',
        foreground: 'hsl(var(--foreground) / <alpha-value>)',
        muted: 'hsl(var(--muted) / <alpha-value>)',
        'muted-foreground': 'hsl(var(--muted-foreground) / <alpha-value>)',
        card: 'hsl(var(--card) / <alpha-value>)',
        border: 'hsl(var(--border) / <alpha-value>)',
        accent: 'hsl(var(--accent) / <alpha-value>)',
        'accent-foreground': 'hsl(var(--accent-foreground) / <alpha-value>)',
        glow: 'hsl(var(--glow) / <alpha-value>)',
      },
    },
  },
};
 
// Once this is in, you can use bg-background, bg-muted, bg-card/60,
// text-foreground, text-muted-foreground, bg-accent, border-border, etc.
// everywhere in the app, and swapping the theme is just changing
// --accent / --glow in global.css (or overriding them at runtime — see
// constants/theme.ts for why that file exists separately).
 