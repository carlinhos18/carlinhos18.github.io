import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ThemeService } from './theme';

// Mock matchMedia for test environment
const createMockMatchMedia = (matches: boolean) => ({
  matches,
  media: '(prefers-color-scheme: dark)',
  onchange: null,
  addEventListener: () => {},
  removeEventListener: () => {},
  addListener: () => {},
  removeListener: () => {},
  dispatchEvent: () => true,
});

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should default to dark mode when no preference is saved', () => {
    localStorage.removeItem('theme');
    // Re-create service to test init
    TestBed.resetTestingModule();
    // Ensure matchMedia mock returns dark preference
    window.matchMedia = (query: string) => createMockMatchMedia(true);
    TestBed.configureTestingModule({});
    const freshService = TestBed.inject(ThemeService);
    expect(freshService.isDarkMode()).toBe(true);
  });

  it('should set light mode when theme is saved as light', () => {
    localStorage.setItem('theme', 'light');
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({});
    const lightService = TestBed.inject(ThemeService);
    expect(lightService.isDarkMode()).toBe(false);
  });

  it('should set dark mode when theme is saved as dark', () => {
    localStorage.setItem('theme', 'dark');
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({});
    const darkService = TestBed.inject(ThemeService);
    expect(darkService.isDarkMode()).toBe(true);
  });

  it('should toggle theme and persist to localStorage', () => {
    localStorage.removeItem('theme');
    TestBed.resetTestingModule();
    // Ensure matchMedia mock returns false (light preference)
    window.matchMedia = (query: string) => createMockMatchMedia(false);
    TestBed.configureTestingModule({});
    const toggleService = TestBed.inject(ThemeService);

    // First toggle - should go to dark (since initial is light from matchMedia)
    toggleService.toggleTheme();
    expect(toggleService.isDarkMode()).toBe(true);
    expect(localStorage.getItem('theme')).toBe('dark');

    // Second toggle - should go to light
    toggleService.toggleTheme();
    expect(toggleService.isDarkMode()).toBe(false);
    expect(localStorage.getItem('theme')).toBe('light');
  });
});