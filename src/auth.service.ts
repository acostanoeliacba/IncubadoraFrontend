// auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private usuario = {
    logueado: true, 
    rol: 'docente'  
  };

  estaLogueado(): boolean {
    return this.usuario.logueado;
  }

  esDocente(): boolean {
    return this.usuario.logueado && this.usuario.rol === 'docente';
  }
}
