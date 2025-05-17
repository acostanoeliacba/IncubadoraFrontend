import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder,  FormGroup, ReactiveFormsModule,  Validators } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service'; 

@Component({
  selector: 'app-contenido',
  standalone: true,
  imports: [CommonModule, HttpClientModule,ReactiveFormsModule, RouterModule],
  templateUrl: './contenido.component.html',
  styleUrl: './contenido.component.css'
})
export class ContenidoComponent implements OnInit {
  curso: any;
  idCurso: string | null = null;

  constructor(private route: ActivatedRoute,
              private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private http: HttpClient,
              ) {}

  ngOnInit(): void {
    this.idCurso = this.route.snapshot.paramMap.get('id');
    console.log('🧭 ID del curso recibido:', this.idCurso);
  

         // this.http.get<any[]>(`http://localhost:3000/inscripciones/cursos/${this.userId}`).subscribe(
         //    data => {
         //      console.log("✅ Inscripciones recibidas:", data);
             
         //     if (Array.isArray(data) && data.length > 0) {
         //          data.forEach((inscripcion, i) => {
         //          const nombreCurso = inscripcion?.curso?.nombre_curso;
         //          console.log(`📘 Curso #${i + 1}: ${nombreCurso ?? 'Sin nombre de curso'}`);
         //      });

         //      } else {
         //          console.warn("⚠️ Inscripciones no encontradas.");
         //      }

         //      this.cursosInscriptos = data;
         //      this.cargandoCursos = false;
         //    },
         //    error => {
         //      console.error("❌ Error al cargar las inscripciones:", error);
         //      this.cargandoCursos = false;
         //    }
         //  );




    this.curso = {
      nombre: 'Informática',
      modalidad: 'Presencial',
      alumnos: 60,
      fechaInicio: '15/05/2025',
      fechaFin: '30/07/2025',
      unidades: ['Introducción', 'Herramientas básicas', 'Procesadores de texto'],
      proximaClase: { fecha: '15/05/2025', tema: 'Herramientas básicas' },
      materiales: [
        { nombre: 'Programa PDF', link: '/assets/programa-informatica.pdf' },
        { nombre: 'Presentación PPT', link: '/assets/unidad1-informatica.ppt' }
      ],
      mensajes: [
        'Reunión el viernes 18:00 hs.',
        'Consulta sobre la tarea.'
      ]
    };
  }

  editarCurso() {
    alert('Funcionalidad para editar curso');
  }

  subirMaterial() {
    alert('Funcionalidad para subir material');
  }

  verAlumnos() {
    alert('Funcionalidad para ver alumnos');
  }

  enviarMensaje() {
    alert('Funcionalidad para enviar mensaje grupal');
  }

  cerrarSesion(): void {
    this.authService.logout();       
    this.router.navigate(['/acceso']);
  }

}

