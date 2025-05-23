
import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly isBrowser: boolean;
  usuario: any;

  constructor() {
    const platformId: Object = inject(PLATFORM_ID);
    this.isBrowser = isPlatformBrowser(platformId);

    this.usuario = this.getUsuario();
  }

  setUsuario(usuario: any): void {
    if (!this.isBrowser) return;

    try {
      const jsonString = JSON.stringify(usuario);
      const parsed = JSON.parse(jsonString);
      const userOnly = parsed?.user ?? parsed;
      localStorage.setItem('usuario', JSON.stringify(userOnly));
      this.usuario = userOnly; 
    } catch (error) {
      console.error('Error al guardar el usuario:', error);
    }
  }

  getUsuario(): any | null {
    if (!this.isBrowser) return null;

    try {
      const data = localStorage.getItem('usuario');
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error al leer el usuario:', error);
      return null;
    }
  }

  estaLogueado(): boolean {
    return !!this.usuario?.logueado; 
  }

  esDocente(): boolean {
    return this.usuario?.logueado && this.usuario?.rol === 'docente'; 
  }

  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem('usuario');
    }
    this.usuario = null; 
  }
}
