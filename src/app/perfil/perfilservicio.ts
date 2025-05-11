import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PerfilService {
  private baseUrl = 'http://localhost:3000'; // Ajustar si es necesario

  constructor(private http: HttpClient) {}

  obtenerPerfil(tipo: 'alumno' | 'docente', id: string) {
    //return this.http.get<any>(`${this.baseUrl}/${tipo}/${id}`);
    return this.http.get<any>(`${this.baseUrl}/user/findById/${id}`);
  }

  actualizarPerfil(tipo: 'alumno' | 'docente', id: string, datos: any) {
    //return this.http.put<any>(`${this.baseUrl}/${tipo}/${id}`, datos);
    return this.http.get<any>(`${this.baseUrl}/user/findById/${id}`,datos);
  }
}
