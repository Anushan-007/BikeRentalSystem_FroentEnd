import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// ── Interfaces ────────────────────────────────────────────────────────────────

// What we send to the backend POST /api/chat
// Matches C# ChatRequest { Message }
export interface ChatRequest {
  message: string;
}

// What the backend returns to us
// Matches C# ChatResponse { Reply }
export interface ChatReply {
  reply: string;
}

// ── Service ───────────────────────────────────────────────────────────────────

@Injectable({
  providedIn: 'root'   // registered globally — no need to add to any module or component
})
export class ChatService {

  // The backend API endpoint for chat.
  // Matches [Route("api/[controller]")] + [HttpPost] on ChatController.
  private readonly apiUrl = 'http://localhost:5268/api/Chat';

  // HttpClient is injected by Angular's DI — registered in app.config.ts via provideHttpClient().
  // AuthInterceptorService automatically adds the JWT Bearer token to this request.
  constructor(private http: HttpClient) {}

  // ── sendMessage ─────────────────────────────────────────────────────────────

  /**
   * Sends the user's message to the ASP.NET Core API.
   * Returns an Observable — the component subscribes to receive the reply.
   *
   * @param message  The text the user typed in the chat UI.
   * @returns        Observable<ChatReply> — emits once when the server responds.
   */
  sendMessage(message: string): Observable<ChatReply> {
    // Build the request body: { "message": "Hello" }
    const body: ChatRequest = { message };

    // http.post<ChatReply>() sends POST and automatically deserializes
    // the JSON response into ChatReply { reply: "..." }.
    // The AuthInterceptor adds "Authorization: Bearer {token}" automatically.
    return this.http.post<ChatReply>(this.apiUrl, body);
  }
}
