import { Component, inject } from '@angular/core';
import { Header } from './components/header/header';
import { Projects } from './components/projects/projects';
import { Footer } from './components/footer/footer';
import { ThemeService } from './services/theme';

@Component({
  selector: 'app-root',
  imports: [Header, Projects, Footer],
  templateUrl: './app.html',
})
export class App {
  // Injecting ThemeService so it initializes early
  themeService = inject(ThemeService);
}
