import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { GithubService } from './github';

describe('GithubService', () => {
  let service: GithubService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()]
    });
    service = TestBed.inject(GithubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
