import { computed, effect, Injectable, signal } from '@angular/core';

const THEME_MODE_VARIABLE_NAME = 'theme-mode';

const THEME_MODE = {
  LIGHT: 'light',
  DARK: 'dark',
} as const;
type ThemeMode = (typeof THEME_MODE)[keyof typeof THEME_MODE];

const THEME_COLOR = {
  BLUE: 'blue',
  LAGOON: 'lagoon',
} as const;
type ThemeColor = (typeof THEME_COLOR)[keyof typeof THEME_COLOR];

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly mode = signal<ThemeMode>(THEME_MODE.LIGHT);
  private readonly color = signal<ThemeColor>(THEME_COLOR.LAGOON);

  private currentTheme = computed(() => `${this.mode()}-${this.color()}`);

  constructor() {
    const theme_mode = localStorage.getItem(THEME_MODE_VARIABLE_NAME) as ThemeMode;

    if (theme_mode) {
      this.mode.set(theme_mode);
    } else {
      this.mode.set(
        window.matchMedia('prefers-color-scheme: dark').matches
          ? THEME_MODE.DARK
          : THEME_MODE.LIGHT,
      );
    }

    effect(() => {
      /* document.documentElement.className = this.currentTheme(); */
      const el = document.documentElement;

      el.classList.remove('light-lagoon', 'dark-lagoon');
      el.classList.add(this.currentTheme());
      localStorage.setItem(THEME_MODE_VARIABLE_NAME, this.mode());
    });
  }

  setMode(mode: ThemeMode) {
    this.mode.set(mode);
  }

  setColor(color: ThemeColor) {
    this.color.set(color);
  }
}
