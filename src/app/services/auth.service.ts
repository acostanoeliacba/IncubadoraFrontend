
import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly isBrowser: boolean;
  usuario: any;
  private usuarioSubject = new BehaviorSubject<any>(null);
  usuario$ = this.usuarioSubject.asObservable();

  constructor() {
    const platformId: Object = inject(PLATFORM_ID);
    this.isBrowser = isPlatformBrowser(platformId);

    const usuario = this.getUsuario();
    this.usuario = this.getUsuario();
    this.usuarioSubject.next(usuario);
  }

  setUsuario(usuario: any): void {
    if (!this.isBrowser) return;

    try {
      const jsonString = JSON.stringify(usuario);
      const parsed = JSON.parse(jsonString);
      const userOnly = parsed?.user ?? parsed;

      const usuarioConEstado = {
      ...userOnly,
      logueado: true
    };

      localStorage.setItem('usuario', JSON.stringify(userOnly));
      this.usuarioSubject.next(usuarioConEstado);
      // this.usuario = userOnly; 
      this.usuario = usuarioConEstado;
    } catch (error) {
      console.error('Error al guardar el usuario:', error);
    }
  }

  getUsuario(): any | null {
  if (!this.isBrowser) return null;

  try {
    const data = localStorage.getItem('usuario');
    const user = data ? JSON.parse(data) : null;

    if (user && user.logueado !== true) {
      user.logueado = true;
    }

    return user;
  } catch (error) {
    console.error('Error al leer el usuario:', error);
    return null;
  }
}

  // estaLogueado(): boolean {
  //   return !!this.usuario?.logueado; 
  // }

  // esDocente(): boolean {
  //   return this.usuario?.logueado && this.usuario?.rol === 'docente'; 
  // }

  estaLogueado(): boolean {
    return !!this.usuario && !!this.usuario.tipo_usuario;
  }

  esDocente(): boolean {
    return this.usuario?.tipo_usuario === 'docente';
  }

  esAdmin(): boolean {
    return this.usuario?.tipo_usuario === 'admin';
  }

  esAlumno(): boolean {
    return this.usuario?.tipo_usuario === 'alumno';
  }
  

  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem('usuario');
    }
    this.usuario = null; 
    this.usuarioSubject.next(null);
  }
}
