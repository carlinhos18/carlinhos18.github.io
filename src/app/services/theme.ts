import { Injectable, signal, effect, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  isDarkMode = signal(true);

  constructor() {
    this.initTheme();
    // Watch system preference changes
    this.setupSystemPreferenceWatcher();
  }

  private initTheme() {
    // Check if user previously saved a preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      this.isDarkMode.set(false);
    } else if (savedTheme === 'dark') {
      this.isDarkMode.set(true);
    } else {
      // Default to dark mode if nothing saved, but respect system preference
      // Guard against environments where matchMedia is unavailable (e.g. tests)
      if (typeof window !== 'undefined' && window.matchMedia) {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.isDarkMode.set(prefersDark);
      } else {
        this.isDarkMode.set(true);
      }
    }
    this.applyTheme();
  }

  private setupSystemPreferenceWatcher() {
    // Guard against environments where matchMedia is unavailable (e.g. jsdom tests)
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = (e: MediaQueryListEvent) => {
        // Only auto-switch if user hasn't explicitly set a preference
        const savedTheme = localStorage.getItem('theme');
        if (!savedTheme) {
          this.isDarkMode.set(e.matches);
          this.applyTheme();
        }
      };

      // Use the modern event listener syntax
      mediaQuery.addEventListener('change', handler);
    }
  }

  toggleTheme() {
    this.isDarkMode.update(v => !v);
    localStorage.setItem('theme', this.isDarkMode() ? 'dark' : 'light');
    this.applyTheme();
  }

  private applyTheme() {
    if (this.isDarkMode()) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}
