
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

  // setUsuario(usuario: any) {
  //   if (this.isBrowser) {
  //     localStorage.setItem('usuario', JSON.stringify(usuario));
  //   }
  // }

  setUsuario(usuario: any) {
  if (this.isBrowser) {
    try {
      // Primero convertimos el objeto a JSON (texto)
      const jsonString = JSON.stringify(usuario);

      // Luego lo parseamos de nuevo para asegurarnos de tener un objeto JS manipulable
      const parsed = JSON.parse(jsonString);

      // Extraemos solo la propiedad 'usr'
      const userOnly = parsed?.user;

      // Guardamos solo 'usr' si existe
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
