import { Component, input } from '@angular/core';
import { GithubRepo } from '../../services/github';

@Component({
  selector: 'app-project-card',
  imports: [],
  templateUrl: './project-card.html',
})
export class ProjectCard {
  repo = input.required<GithubRepo>();
}
