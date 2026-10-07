import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { Contact } from './contact';
import { apiErrorInterceptor } from '../../interceptors/api-error';

describe('Contact', () => {
  let component: Contact;
  let fixture: ComponentFixture<Contact>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Contact],
      providers: [
        provideHttpClient(withInterceptors([apiErrorInterceptor])),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Contact);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('invalid form disables submit', () => {
    const submitBtn = fixture.nativeElement.querySelector('button[type="submit"]') as HTMLButtonElement;
    expect(component.contactForm.valid).toBe(false);
    expect(submitBtn.disabled).toBe(true);

    component.contactForm.patchValue({
      name: 'Carlos',
      email: 'carlos@example.com',
      message: 'Hello!',
    });
    fixture.detectChanges();

    expect(component.contactForm.valid).toBe(true);
    expect(submitBtn.disabled).toBe(false);
  });

  it('shows error message when receiving a 429 response', () => {
    component.contactForm.patchValue({
      name: 'Carlos',
      email: 'carlos@example.com',
      message: 'Hello!',
    });
    fixture.detectChanges();

    component.onSubmit();

    const req = httpMock.expectOne('/api/contact');
    expect(req.request.method).toBe('POST');
    req.flush({ error: 'Too many requests' }, { status: 429, statusText: 'Too Many Requests' });

    fixture.detectChanges();

    expect(component.status()).toBe('error');
    expect(component.errorMessage()).toContain('Too many attempts');

    const alertEl = fixture.nativeElement.textContent;
    expect(alertEl).toContain('Too many attempts, try later.');
  });
});
