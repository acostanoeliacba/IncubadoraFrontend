import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private socket: Socket | null = null;
  private offset = 0;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.socket = io('http://localhost:3000', {
        withCredentials: true,
        transports: ['websocket', 'polling'],
        auth: {
          serverOffset: this.offset,
        },
        ackTimeout: 10000,
        retries: 3,
      });

      this.socket.on('chat message', (msg: string, serverOffset: number) => {
        this.offset = serverOffset;
      });

      this.socket.on('connect_error', (err) => {
        console.error('Socket connection error:', err);
      });
    }
  }

  sendMessage(message: string, callback?: () => void): void {
    if (this.socket) {
      const clientOffset = `${this.socket.id}-${Date.now()}`;
      this.socket.emit('chat message', message, clientOffset, callback);
    }
  }

  onMessage(): Observable<{ message: string; offset: number }> {
    return new Observable((observer) => {
      if (this.socket) {
        this.socket.on('chat message', (msg: string, serverOffset: number) => {
          observer.next({ message: msg, offset: serverOffset });
        });
      }
    });
  }
}