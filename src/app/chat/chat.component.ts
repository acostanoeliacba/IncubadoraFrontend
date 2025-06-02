import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { io, Socket } from 'socket.io-client';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  messages: string[] = [];
  inputMessage: string = '';
  socket!: Socket;
  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.socket = io('http://localhost:3000');

      this.socket.on('chat message', (msg: string, serverOffset: number) => {
        this.messages.push(msg);
      });
    }
  }

  sendMessage() {
    if (!this.inputMessage.trim() || !this.socket) return;

    const clientOffset = `${this.socket.id}-${Date.now()}`;
    this.socket.emit('chat message', this.inputMessage, clientOffset, () => {
      // callback
    });

    this.inputMessage = '';
  }
}