import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule],
  templateUrl: './contact.html',
})
export class Contact {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);

  contactForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.pattern(/^\S+@\S+\.\S+$/)]],
    message: ['', [Validators.required, Validators.maxLength(2000)]],
    website: [''], // Honeypot
    token: [''], // Turnstile bot verification token
  });

  status = signal<'idle' | 'sending' | 'success' | 'error'>('idle');
  errorMessage = signal<string>('');

  getApiUrl(): string {
    if (typeof window !== 'undefined' && window.location.hostname.includes('github.io')) {
      return 'https://carloscristeloportfolio.carloslisboa2005.workers.dev/api/contact';
    }
    return '/api/contact';
  }

  onSubmit() {
    if (this.contactForm.invalid || this.status() === 'sending') {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.status.set('sending');
    this.errorMessage.set('');

    this.http.post<{ ok?: boolean; error?: string }>(this.getApiUrl(), this.contactForm.value).subscribe({
      next: () => {
        this.status.set('success');
        this.contactForm.reset({
          name: '',
          email: '',
          message: '',
          website: '',
          token: '',
        });
      },
      error: (err) => {
        this.status.set('error');
        const msg = err?.message || err?.error?.error || 'Failed to send message. Please try again later.';
        this.errorMessage.set(msg);
      },
    });
  }
}
