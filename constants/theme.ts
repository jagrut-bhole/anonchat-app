export const TAB_BAR = {
  /** Total capsule height */
  HEIGHT: 64,
  /** Left / right margin from screen edge */
  MARGIN_H: 12,
  /** Bottom margin above safe-area */
  MARGIN_BOTTOM: 10,
  /** Corner radius of the capsule */
  BORDER_RADIUS: 28,
  /** Max width of the capsule (set lower to make narrower) */
  MAX_WIDTH: 320,
  /** Diameter of the active-indicator circle */
  ACTIVE_CIRCLE: 32,
  /** Corner radius of the active-indicator circle */
  ACTIVE_CIRCLE_RADIUS: 16,
  /** Icon size (Feather) */
  ICON_SIZE: 22,
  /** Label font size */
  LABEL_SIZE: 11,
  /** Gap between icon and label */
  ICON_LABEL_GAP: 2,
  /** How far the icon lifts when active */
  ICON_LIFT: -2,
  /** Scale of icon when active */
  ICON_SCALE_ACTIVE: 1.08,
  /** Elevation on Android */
  ELEVATION: 8,
  /** Badge diameter */
  BADGE_SIZE: 18,
  /** Badge font size */
  BADGE_FONT: 10,
} as const;

export const accentPresets = [
  { name: 'Gold',    hex: '#F5C440' },
  { name: 'Emerald', hex: '#2ED573' },
  { name: 'Blue',    hex: '#3B82F6' },
  { name: 'Violet',  hex: '#A78BFA' },
  { name: 'Rose',    hex: '#FF6B9D' },
  { name: 'Crimson', hex: '#FF4D4D' },
];

export const themeColors = {
  background: '#000000',
  backgroundSoft: '#1C1000',
  accent: '#F5C440',   // keep in sync with --accent in global.css
  glow: '#F5C440',     // keep in sync with --glow in global.css
};