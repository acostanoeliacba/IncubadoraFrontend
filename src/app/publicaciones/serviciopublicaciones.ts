import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Publicacion } from './Publicacion.model';


@Injectable({ providedIn: 'root' })
export class PublicacionService {
  private apiUrl = 'http://localhost:3000/publicaciones';

  constructor(private http: HttpClient) {}

  getPublicaciones(): Observable<Publicacion[]> {
    return this.http.get<Publicacion[]>(this.apiUrl);
  }

  crearPublicacion(data: FormData): Observable<Publicacion> {
    return this.http.post<Publicacion>(this.apiUrl, data);
  }
}
