import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { MY_PROJECTS, Project } from '../data/projects';

// We alias Project to GithubRepo to keep components unmodified
export type GithubRepo = Project;

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  // Returns the hardcoded list of projects with a slight delay to show the cool loading spinner!
  getRepositories(): Observable<GithubRepo[]> {
    return of(MY_PROJECTS).pipe(delay(500));
  }
}
