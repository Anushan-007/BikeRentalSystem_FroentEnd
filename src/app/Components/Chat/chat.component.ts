import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';   // needed for *ngFor and *ngIf in template
import { FormsModule } from '@angular/forms';      // needed for [(ngModel)] two-way binding
import { ChatService } from '../../Services/chat.service';

// ── Message Interface ─────────────────────────────────────────────────────────
// Defines the shape of each message in the chat history.
// sender: 'user' = the person typing | 'bot' = the AI response
interface Message {
  sender: 'user' | 'bot';
  text: string;
}

// ── Component ─────────────────────────────────────────────────────────────────
@Component({
  selector: 'app-chat',
  standalone: true,
  // CommonModule provides *ngFor and *ngIf structural directives.
  // FormsModule provides [(ngModel)] for two-way input binding.
  // ChatService is injected via constructor — no need to list it here.
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {

  // ── Properties ─────────────────────────────────────────────────────────────

  // Bound to the input box via [(ngModel)].
  // Updated on every keystroke. Cleared after each send.
  message: string = '';

  // The full chat history displayed in the UI.
  // Pre-loaded with a welcome message from the bot so the UI is never empty.
  messages: Message[] = [
    {
      sender: 'bot',
      text: 'Welcome! How can I help you with bike rental today?'
    }
  ];

  // True while waiting for the API response.
  // Used to: disable the Send button, show "Typing..." indicator,
  // and disable the input box so the user cannot send another message.
  isLoading: boolean = false;

  // ── Constructor ────────────────────────────────────────────────────────────

  // Angular DI injects ChatService because it is providedIn: 'root'.
  constructor(private chatService: ChatService) {}

  // ── Methods ────────────────────────────────────────────────────────────────

  /**
   * Called when the user clicks Send or presses Enter.
   *
   * Flow:
   *   1. Validate — do nothing if input is blank
   *   2. Add user message to chat history
   *   3. Clear the input box
   *   4. Set isLoading = true
   *   5. Call ChatService.sendMessage()
   *   6. On success → add bot message, set isLoading = false
   *   7. On error   → add error message, set isLoading = false
   */
  sendMessage(): void {

    // ── Step 1: Validate ───────────────────────────────────────────────────
    // trim() removes leading/trailing whitespace.
    // If the user pressed Enter on an empty field, do nothing.
    const trimmed = this.message.trim();
    if (!trimmed) return;

    // ── Step 2: Add user message to history ───────────────────────────────
    this.messages.push({ sender: 'user', text: trimmed });

    // ── Step 3: Clear the input box ────────────────────────────────────────
    this.message = '';

    // ── Step 4: Show loading state ─────────────────────────────────────────
    this.isLoading = true;

    // ── Step 5: Call the service ───────────────────────────────────────────
    // sendMessage() returns an Observable. We subscribe to get the response.
    // next()  is called once when the server responds successfully.
    // error() is called if the HTTP request fails.
    this.chatService.sendMessage(trimmed).subscribe({

      next: (response) => {
        // ── Step 6a: Add bot reply to history ──────────────────────────────
        this.messages.push({ sender: 'bot', text: response.reply });
        this.isLoading = false;
      },

      error: (err) => {
        // ── Step 6b: Show a friendly error message instead of crashing ─────
        // The user sees this if the backend is offline or returns a 502/500.
        console.error('Chat API error:', err);
        this.messages.push({
          sender: 'bot',
          text: 'Sorry, I could not connect to the AI service. Please try again.'
        });
        this.isLoading = false;
      }

    });
  }
}
