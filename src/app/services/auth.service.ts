import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly isBrowser: boolean;
  private usuarioSubject = new BehaviorSubject<any | null>(null);
  usuario$ = this.usuarioSubject.asObservable();

  constructor() {
    const platformId: Object = inject(PLATFORM_ID);
    this.isBrowser = isPlatformBrowser(platformId);

    if (this.isBrowser) {
      const usuarioGuardado = localStorage.getItem('usuario');
      if (usuarioGuardado) {
        this.usuarioSubject.next(JSON.parse(usuarioGuardado));
      } else {
        this.usuarioSubject.next(null);
      }
    }
  }

  setUsuario(usuario: any): void {
    if (!this.isBrowser) return;
    try {
      // Guardamos solo la info del usuario (sin el logueado) si quieres
      localStorage.setItem('usuario', JSON.stringify(usuario));
      this.usuarioSubject.next(usuario);
    } catch (error) {
      console.error('Error al guardar el usuario:', error);
    }
  }

  getUsuario(): any | null {
    return this.usuarioSubject.value;
  }

  estaLogueado(): boolean {
    const usuario = this.getUsuario();
    return !!usuario?.logueado;
  }

  esUsuarioDocente(): boolean {
    const usuario = this.getUsuario();
    return usuario?.logueado && usuario?.tipo_usuario === 'docente';
  }

  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem('usuario');
      this.usuarioSubject.next(null);
    }
  }
}
