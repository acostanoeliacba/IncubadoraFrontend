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
  cursoInfo: any;
  contenidoInfo: any;

  constructor(private route: ActivatedRoute,
              private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private http: HttpClient,
              ) {}

  ngOnInit(): void {
    this.idCurso = this.route.snapshot.paramMap.get('id');
    console.log('ID del curso recibido:', this.idCurso);
  
       this.http.get<any[]>(`http://localhost:3000/contenidos/curso/${this.idCurso}`).subscribe(
          contenidoI => {
             if (contenidoI.length > 0) {
              console.log("✅ Contenidos recibidos:", contenidoI);
              this.contenidoInfo = contenidoI[0];
              }
              else{
                console.error("❌ Sin contenido del curso:"); 
              }           
          },
          error => {
            console.error("❌ Error al cargar el contenido del curso:", error);
          }
        );

       this.http.get<any>(`http://localhost:3000/cursos/info/${this.idCurso}`).subscribe(
          cursoI => {
            console.log("✅ Información de Curso recibida:", cursoI);
            this.cursoInfo = cursoI;

            // Aquí ya podemos usar los datos de cursoInfo
            this.curso = {
              nombre: cursoI.nombre_curso,
              modalidad: cursoI.tipo,
              alumnos: 60,
              fechaInicio: cursoI.fecha_inicio,
              fechaFin: cursoI.fecha_fin,
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
          },
          error => {
            console.error("❌ Error al cargar la información del curso:", error);
          }
        );
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

