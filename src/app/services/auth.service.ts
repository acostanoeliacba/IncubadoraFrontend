
import { Injectable, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isBrowser: boolean;

  constructor() {
    const platformId = inject(PLATFORM_ID);
    this.isBrowser = isPlatformBrowser(platformId);
  }


  setUsuario(usuario: any) {
  if (this.isBrowser) {
    try {
    
      const jsonString = JSON.stringify(usuario);

      const parsed = JSON.parse(jsonString);

      const userOnly = parsed?.user;

      if (userOnly !== undefined) {
        localStorage.setItem('usuario', JSON.stringify(userOnly));
      }
    } catch (error) {
      console.error('Error al procesar el usuario:', error);
    }
  }
}

  getUsuario() {
    if (this.isBrowser) {
      const data = localStorage.getItem('usuario');
      return data ? JSON.parse(data) : null;
    }
    return null;
  }

  logout() {
    if (this.isBrowser) {
      localStorage.removeItem('usuario');
    }
  }
}
