import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { GithubRepo } from '../../services/github';

@Component({
  selector: 'app-project-card',
  imports: [DatePipe],
  templateUrl: './project-card.html',
})
export class ProjectCard {
  repo = input.required<GithubRepo>();
}