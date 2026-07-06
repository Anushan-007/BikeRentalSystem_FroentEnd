import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../Services/chat.service';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {

  // ── UI State ────────────────────────────────────────────────────────────────

  message: string = '';

  messages: Message[] = [
    { sender: 'bot', text: 'Welcome! How can I help you with bike rental today?' }
  ];

  isLoading: boolean = false;

  // ── Conversation State (Phase 2) ────────────────────────────────────────────

  // Tracks the active conversation ID returned by the backend.
  // null  = no conversation started yet (first message will create one).
  // string = an active conversation — sent with every subsequent message
  //          so the backend can retrieve history from ConversationMemoryService.
  conversationId: string | null = null;

  // ── Constructor ─────────────────────────────────────────────────────────────

  constructor(private chatService: ChatService) {}

  // ── Methods ─────────────────────────────────────────────────────────────────

  /**
   * Sends the user's message to the backend.
   *
   * Phase 2 changes vs Phase 1:
   *   - Passes conversationId to service (undefined on first call, then always included)
   *   - Stores the returned conversationId for all future calls
   *   - If 404 (conversation not found after server restart), resets and retries automatically
   */
  sendMessage(): void {
    const trimmed = this.message.trim();
    if (!trimmed) return;

    this.messages.push({ sender: 'user', text: trimmed });
    this.message = '';
    this.isLoading = true;

    // Pass conversationId if we have one (undefined = start new conversation).
    // The backend returns the same ID (or a new one if we sent null).
    this.chatService.sendMessage(trimmed, this.conversationId ?? undefined).subscribe({

      next: (response) => {
        // Store the conversationId returned by the backend.
        // On the first message: this will be a newly created GUID.
        // On subsequent messages: same GUID as before (conversation continues).
        this.conversationId = response.conversationId;

        this.messages.push({ sender: 'bot', text: response.reply });
        this.isLoading = false;
      },

      error: (err) => {
        console.error('Chat API error:', err);

        // Handle 404: server was restarted, memory was lost.
        // Reset conversationId so the next message starts fresh.
        if (err.status === 404) {
          this.conversationId = null;
          this.messages.push({
            sender: 'bot',
            text: 'The conversation was lost (server restarted). Your next message will start a new conversation.'
          });
        } else {
          this.messages.push({
            sender: 'bot',
            text: 'Sorry, I could not connect to the AI service. Please try again.'
          });
        }

        this.isLoading = false;
      }
    });
  }

  /**
   * Resets the conversation — both on the backend (deletes history from memory)
   * and on the frontend (clears the UI message list).
   *
   * Called when the user clicks "New Conversation".
   */
  newConversation(): void {
    // If there is an active conversation, tell the backend to clear it.
    if (this.conversationId) {
      this.chatService.clearConversation(this.conversationId).subscribe({
        next: () => console.log('Conversation cleared on backend'),
        error: (err) => console.warn('Could not clear conversation on backend:', err)
        // We reset the frontend regardless — even if the backend call fails.
      });
    }

    // Reset frontend state.
    this.conversationId = null;
    this.message = '';
    this.messages = [
      { sender: 'bot', text: 'New conversation started. How can I help you?' }
    ];
  }
}
