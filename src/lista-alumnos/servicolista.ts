import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Inscripcion {
  id_inscripcion: number;
  id_usuario: number;
  id_curso: number;
  fecha_inscripcion: string;
}

@Injectable({
  providedIn: 'root'
})
export class InscripcionesService {
  private apiUrl = 'http://localhost:3000/inscripciones'; // ajustá según tu ruta real

  constructor(private http: HttpClient) {}

  getAllInscripciones(): Observable<Inscripcion[]> {
    return this.http.get<Inscripcion[]>(this.apiUrl);
  }
}
