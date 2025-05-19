
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder,  FormGroup, ReactiveFormsModule,  Validators } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service'; 

@Component({
  selector: 'app-dashboard-profe',
  standalone: true,
  imports: [CommonModule, HttpClientModule,ReactiveFormsModule, RouterModule],
  templateUrl: './dashboard-profe.component.html',
  styleUrl: './dashboard-profe.component.css'
})
export class DashboardProfeComponent implements OnInit {
  curso: any;
  idCurso: string | null = null;
  cursoInfo: any;
  contenidoInfo: any;
  tipoUsuario: string = '';
  idUsuario: string |null = null;
  docente: any = {};
  cursosAsignados: any[] = [];
  mensajes: string[] = [
  'Mensaje de Administración: Reunión el viernes a las 18:00 hs.',
  'Mensaje de Alumno: Consulta sobre la tarea.'];
  totalAlumnos: number = 0;
  proximaClase: string = 'Sin fecha asignada';

  constructor(private route: ActivatedRoute,
              private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private http: HttpClient,
              ) {}

ngOnInit(): void {
  const usuario = this.authService.getUsuario();
  if (usuario && usuario.tipo_usuario) {
    this.tipoUsuario = usuario.tipo_usuario;
    this.idUsuario = usuario.id_usuario;
    console.log('Tipo de usuario:', this.tipoUsuario);
  }

  if (this.tipoUsuario === 'docente' && this.idUsuario) {
    this.http.get<any>(`http://localhost:3000/docentes/cursos/${this.idUsuario}`).subscribe({
      next: (res) => {
        console.log('✅ Respuesta completa:', res);
        this.docente = res.docente;
        this.cursosAsignados = res.cursos;

        this.docente = res.docente;
        this.cursosAsignados = res.cursos;

        //this.totalAlumnos = this.cursosAsignados.reduce((total, curso) => total + (curso.alumnos || 0), 0);
         this.totalAlumnos  = 77
        
        if (this.cursosAsignados.length > 0) {
          this.proximaClase = this.cursosAsignados[0].fecha_inicio; // o similar
        }
      },
      error: (err) => {
        console.error('❌ Error al cargar cursos del docente:', err);
      }
    });
   }
  }



  verCurso(id: number) {
    this.router.navigate(['/curso', id]);
  }

  verPerfil() {
    this.router.navigate(['/perfil']);
  }

  verAlumnos() {
    console.log('Mostrando los alumnos');
  }

  cerrarSesion(): void {
    this.authService.logout();       
    this.router.navigate(['/acceso']);
  }
}

