import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// ── Interfaces ────────────────────────────────────────────────────────────────

// What we send to POST /api/chat
// Matches C# ChatRequest { Message, ConversationId? }
export interface ChatRequest {
  message: string;
  conversationId?: string;   // undefined on first message, then always included
}

// What the backend returns from POST /api/chat
// Matches C# ChatResponse { Reply, ConversationId }
export interface ChatReply {
  reply: string;
  conversationId: string;    // always returned — Angular stores and reuses this
}

// ── Service ───────────────────────────────────────────────────────────────────

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private readonly apiUrl = 'http://localhost:5268/api/Chat';

  constructor(private http: HttpClient) {}

  // ── sendMessage ─────────────────────────────────────────────────────────────

  /**
   * Sends a message and optional conversationId to the backend.
   *
   * First call:      { message: "Hello" }                    → conversationId omitted
   * Subsequent:      { message: "...", conversationId: "..." } → backend continues history
   *
   * Returns Observable<ChatReply> — emits once with { reply, conversationId }.
   */
  sendMessage(message: string, conversationId?: string): Observable<ChatReply> {
    // Build request body — only include conversationId if it exists.
    const body: ChatRequest = conversationId
      ? { message, conversationId }
      : { message };

    return this.http.post<ChatReply>(this.apiUrl, body);
  }

  // ── clearConversation ────────────────────────────────────────────────────────

  /**
   * Tells the backend to delete the conversation history from memory.
   * Matches DELETE /api/chat/{conversationId} on ChatController.
   *
   * Returns Observable<void> — the component subscribes to know when done.
   * Backend returns 204 No Content — no body to read.
   */
  clearConversation(conversationId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${conversationId}`);
  }
}
