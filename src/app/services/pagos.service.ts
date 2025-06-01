import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Pago {
  usuario: string;
  curso: string;
  monto: number;
  fecha: string;
}

@Injectable({
  providedIn: 'root'
})
export class PagosService {
  private apiUrl = 'http://localhost:3000/admin/pagos';

  constructor(private http: HttpClient) {}

  obtenerPagos(): Observable<Pago[]> {
    return this.http.get<Pago[]>(this.apiUrl);
  }

  obtenerTotalPagos(): Observable<{ total: number }> {
  return this.http.get<{ total: number }>('http://localhost:3000/admin/pagos/total');
}

  obtenerTotalesPorMes(): Observable<{ mes: string; total: number }[]> {
  return this.http.get<{ mes: string; total: number }[]>('http://localhost:3000/admin/pagos/totales-por-mes');
}

}
