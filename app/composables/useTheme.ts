export const THEMES = [
  { id: 'garden', label: 'Garden', swatch: ['#3d8a5f', '#fbe28a', '#b5e1f8'] },
  { id: 'pastel', label: 'Pastel', swatch: ['#9c64b0', '#ffb3a7', '#bfe3f7'] },
  { id: 'nature', label: 'Inspired by Nature', swatch: ['#4a6b2f', '#d9b36a', '#a9cbd6'] },
  { id: 'retro', label: 'Retro / Vintage', swatch: ['#b5532f', '#e9b949', '#8fb8b5'] }
] as const

export type ThemeId = (typeof THEMES)[number]['id']

// Theme is stored in a cookie so the server renders the right colors (no flash).
export function useTheme() {
  const theme = useCookie<ThemeId>('vy-theme', { default: () => 'garden', maxAge: 60 * 60 * 24 * 365, sameSite: 'lax' })

  if (!THEMES.some((item) => item.id === theme.value)) {
    theme.value = 'garden'
  }

  function setTheme(id: ThemeId) {
    theme.value = id
  }

  return { theme, themes: THEMES, setTheme }
}
