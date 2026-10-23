import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

@Component({
  selector: 'app-chat-assistant',
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-assistant.html',
  styleUrl: './chat-assistant.css',
})
export class ChatAssistant implements OnInit {
  private http = inject(HttpClient);

  messages = signal<ChatMessage[]>([
    { role: 'assistant', content: "Hi! I'm Carlos's AI assistant. Ask me anything about his projects, skills, or experience!" }
  ]);

  input = signal('');
  status = signal<'idle' | 'sending' | 'error'>('idle');
  isOpen = signal(false);

  ngOnInit() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('chat-assistant-open');
      if (saved === 'true') {
        this.isOpen.set(true);
      }
    }
  }

  getApiUrl(): string {
    if (typeof window !== 'undefined' && window.location.hostname.includes('github.io')) {
      return 'https://carloscristeloportfolio.carloslisboa2005.workers.dev/api/chat';
    }
    return '/api/chat';
  }

  toggleChat() {
    this.isOpen.update(v => !v);
    if (typeof window !== 'undefined') {
      localStorage.setItem('chat-assistant-open', String(this.isOpen()));
    }
  }

  async sendMessage() {
    const text = this.input().trim();
    if (!text || this.status() === 'sending') return;

    const userMessage: ChatMessage = { role: 'user', content: text };
    this.messages.update(msgs => [...msgs, userMessage]);
    this.input.set('');
    this.status.set('sending');

    try {
      const response = await this.http.post<{ reply: string }>(this.getApiUrl(), { message: text }).toPromise();
      if (response?.reply) {
        this.messages.update(msgs => [...msgs, { role: 'assistant', content: response.reply }]);
      } else {
        this.messages.update(msgs => [...msgs, { role: 'assistant', content: "Sorry, I couldn't generate a response. Please try again." }]);
      }
      this.status.set('idle');
    } catch (err) {
      console.error('Chat error:', err);
      this.messages.update(msgs => [...msgs, { role: 'assistant', content: "Something went wrong. Please try again later." }]);
      this.status.set('error');
    }
  }

  handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }
}