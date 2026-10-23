import { Injectable } from '@angular/core';
import { Observable, of, catchError, delay } from 'rxjs';
import { MY_PROJECTS, Project } from '../data/projects';
import reposJson from '../data/repos.json';

// We alias Project to GithubRepo to keep components unmodified
export type GithubRepo = Project;

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private readonly LOCAL_FALLBACK_DELAY = 300;

  // Returns projects loaded from static JSON with fallback to hardcoded list on error
  getRepositories(): Observable<GithubRepo[]> {
    // Try to load from repos.json; on error fall back to hardcoded list
    return this.loadFromJson().pipe(
      catchError(() => of(MY_PROJECTS).pipe(delay(this.LOCAL_FALLBACK_DELAY)))
    );
  }

  private loadFromJson(): Observable<GithubRepo[]> {
    // Extract the "repos" array from the imported JSON
    const repos = (reposJson as any).repos ?? [];
    // Map Project fields: all Project fields are compatible; ensure GithubRepo type
    const mapped: GithubRepo[] = repos.map((r: any) => ({
      id: r.id,
      name: r.name,
      description: r.description,
      html_url: r.html_url,
      live_url: r.live_url,
      image_url: r.image_url,
      language: r.language,
      grade: r.grade,
      collaborators: r.collaborators,
      stargazers_count: r.stargazers_count,
      forks_count: r.forks_count,
      topics: r.topics,
      updated_at: r.updated_at,
    }));
    return of(mapped).pipe(delay(this.LOCAL_FALLBACK_DELAY));
  }
}