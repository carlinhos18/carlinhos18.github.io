import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCard } from './project-card';

describe('ProjectCard', () => {
  let component: ProjectCard;
  let fixture: ComponentFixture<ProjectCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectCard],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectCard);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('repo', {
      id: 1,
      name: 'test-repo',
      description: 'test description',
      html_url: 'https://github.com/test',
      language: 'TypeScript',
      stargazers_count: 5,
      forks_count: 2,
      topics: ['angular'],
      homepage: 'https://test.com',
      updated_at: '2026-01-01T00:00:00Z',
    });
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
