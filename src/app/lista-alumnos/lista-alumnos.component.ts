import { Component, OnInit } from '@angular/core';
import { Inscripcion, InscripcionesService } from './servicolista';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service'; 
@Component({
  selector: 'app-lista-inscripciones',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: 'lista-alumnos.component.html',
  styleUrls: ['lista-alumnos.component.css']

})
export class ListaInscripcionesComponent implements OnInit {
  todasInscripciones: Inscripcion[] = [];
  inscripcionesFiltradas: Inscripcion[] = [];

  constructor(private inscripcionService: InscripcionesService, 
                  private router: Router,
                  private authService: AuthService ) {}

  ngOnInit(): void {
    this.inscripcionService.getAllInscripciones().subscribe(data => {
      this.todasInscripciones = data;
    });
  }

  filtrarPorCurso(idCurso: number): void {
    this.inscripcionesFiltradas = this.todasInscripciones.filter(i => i.id_curso === idCurso);
  }

    cerrarSesion(): void {
    this.authService.logout();       
    this.router.navigate(['/acceso']);
  }
}
