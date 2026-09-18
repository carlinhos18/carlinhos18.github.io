import { Component, inject, OnInit, signal } from '@angular/core';
import { GithubService, GithubRepo } from '../../services/github';
import { ProjectCard } from '../project-card/project-card';

@Component({
  selector: 'app-projects',
  imports: [ProjectCard],
  templateUrl: './projects.html',
})
export class Projects implements OnInit {
  private githubService = inject(GithubService);
  
  repos = signal<GithubRepo[]>([]);
  loading = signal<boolean>(true);

  ngOnInit() {
    this.githubService.getRepositories().subscribe({
      next: (data) => {
        // Filter out forks and get top projects
        const filtered = data.filter(repo => !repo.name.includes('github.io')).slice(0, 9);
        this.repos.set(filtered);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error fetching repos', err);
        this.loading.set(false);
      }
    });
  }
}
