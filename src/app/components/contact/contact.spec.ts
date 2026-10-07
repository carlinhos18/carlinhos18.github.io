import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { Contact } from './contact';

describe('Contact', () => {
  let component: Contact;
  let fixture: ComponentFixture<Contact>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Contact],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(Contact);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty fields', () => {
    expect(component.contactForm.value).toEqual({
      name: '',
      email: '',
      message: '',
      website: '',
    });
  });

  it('should be invalid when required fields are empty', () => {
    expect(component.contactForm.valid).toBe(false);
  });

  it('should validate email format', () => {
    const emailControl = component.contactForm.get('email');
    emailControl?.setValue('invalid-email');
    expect(emailControl?.hasError('pattern')).toBe(true);

    emailControl?.setValue('test@example.com');
    expect(emailControl?.hasError('pattern')).toBeFalsy();
  });
});
