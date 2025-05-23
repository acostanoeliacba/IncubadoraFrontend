
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder,  FormGroup, ReactiveFormsModule,  Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service'; 

@Component({
  selector: 'app-dashboard-profe',
  standalone: true,
  imports: [CommonModule, HttpClientModule,ReactiveFormsModule,FormsModule, RouterModule],
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
  cursoForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private http: HttpClient,
              ) {
     this.cursoForm = this.fb.group({
      nombre_curso: ['', Validators.required],
      descripcion: [''],
      duracion: [null, [Validators.required, Validators.min(1)]], 
      tipo: ['', Validators.required],
      costo: [null, [Validators.min(0)]], 
      fecha_inicio: [''],
      fecha_fin: [''],
      foto: [null] 
    });
  }

mostrarFormularioCrearCurso: boolean = false;

nombreCursoBuscar: string = '';
mostrarFormularioModificarCurso: boolean = false;
actualizarIdCurso: string | null = null;

archivoFoto: File | null = null;
fotoPreviewUrl: string | null = null;


mostrarCrearCursoForm() {
  this.mostrarFormularioCrearCurso = true;
}

ocultarFormularios() {
  this.mostrarFormularioCrearCurso = false;
}
//*******************Modificar curso

mostrarModificarCursoForm() {
  this.mostrarFormularioCrearCurso = false; 
  this.mostrarFormularioModificarCurso = true;
  this.cursoForm.reset(); 
}

get fotoUrl(): string {
    const foto = this.curso?.foto;
    if (!foto || foto === 'null' || foto === 'undefined') {
      return 'assets/img/perfilDefault3.jpg';
    }
    return `http://localhost:3000${foto}`;
}

buscarCursoPorNombre() {
  if (!this.nombreCursoBuscar.trim()) return;

  this.http.get<any>(`http://localhost:3000/cursos?nombre=${this.nombreCursoBuscar}`).subscribe({
    next: (res) => {
      console.log('✅ Curso a modificar:', res);
      this.curso = Array.isArray(res) ? res[0] : res;
      this.actualizarIdCurso = this.curso.id_curso;
      console.log('✅ id Curso a modificar:', this.actualizarIdCurso);

      this.mostrarFormularioModificarCurso = true;

      this.cursoForm.patchValue({
        nombre_curso: this.curso.nombre_curso,
        descripcion: this.curso.descripcion,
        duracion: this.curso.duracion,
        tipo: this.curso.tipo,
        costo: this.curso.costo,
        fecha_inicio: this.curso.fecha_inicio?.split('T')[0],
        fecha_fin: this.curso.fecha_fin?.split('T')[0],
      });
    },
    error: (error) => {
      console.error('Error al buscar el curso:', error);
      alert('No se encontró el curso.');
    }
  });
}


modificarCurso() {
  const datos = this.cursoForm.value;
  const formData = new FormData();

  for (const key in datos) {
    if (datos[key] !== null && datos[key] !== undefined) {
      formData.append(key, datos[key]);
    }
  }

  const id = this.actualizarIdCurso ;

  this.http.put(`http://localhost:3000/cursos/${id}`, formData).subscribe({
    next: (response) => {
      console.log('Curso actualizado correctamente:', response);
    },
    error: (error) => {
      console.error('Error al actualizar curso:', error);
    }
  });
}

//************************fin seccion modificar curso

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


crearCurso() {
  if (this.cursoForm.valid) {

    const formValues = this.cursoForm.value;
    const nombreCurso = formValues.nombre_curso;

    // PASO 1: Verifico si ya existe un curso con ese nombre
    this.http.get<any[]>(`http://localhost:3000/cursos?nombre=${nombreCurso}`).subscribe({
      next: (cursosExistentes) => {
        const cursoEncontrado = cursosExistentes.find(curso => curso.nombre_curso.toLowerCase() === nombreCurso.toLowerCase());

    if (cursoEncontrado) {
          console.log('curso ya existente o con el mismo nombre');
          return;
    }
   //paso1
    const formData = new FormData();
    formData.append('nombre_curso', formValues.nombre_curso);
    formData.append('descripcion', formValues.descripcion);
    formData.append('duracion', formValues.duracion);
    formData.append('tipo', formValues.tipo);
    formData.append('costo', formValues.costo);
    formData.append('fecha_inicio', formValues.fecha_inicio);
    formData.append('fecha_fin', formValues.fecha_fin);

    if (this.cursoForm.get('foto')?.value) {
      formData.append('foto', this.cursoForm.get('foto')?.value);
      console.log('Foto añadida al formData:', this.cursoForm.get('foto')?.value);
    }

    this.http.post(`http://localhost:3000/cursos`, formData).subscribe({
      next: (response) => {
        console.log('Curso creado correctamente:', response);

         // Paso 2: Obtener el curso recién creado buscando por nombre exacto o parcial
        const nombreCurso = formValues.nombre_curso;

        this.http.get<any[]>(`http://localhost:3000/cursos?nombre=${nombreCurso}`).subscribe({
          next: (cursos) => {
            const cursoCreado = cursos.find(c => c.nombre_curso === nombreCurso);
            if (!cursoCreado) {
              console.error('Curso no encontrado tras creación.');
              return;
            }

            const idCurso = cursoCreado.id_curso;
            const usuario = this.authService.getUsuario(); 

            if (!usuario || !usuario.id_usuario) {
              console.error('No se pudo obtener el docente');
              return;
            }

            const idDocente = usuario.id_usuario;

            // Paso 3: Asociar el curso al docente en DocenteCurso
            this.http.post('http://localhost:3000/docentes/', {
              id_usuario: idDocente,
              id_curso: idCurso
            }).subscribe({
              next: (res) => {
                console.log('Curso asociado correctamente al docente:', res);
              },
              error: (err) => {
                console.error('Error al asociar curso al docente:', err);
              }
            });
          },
          error: (err) => {
            console.error('Error al buscar curso por nombre:', err);
          }
        });
              //paso2
      },
      error: (error) => {
        console.error('Error al crear curso:', error);
      }
    });
    //paso1 
      },
      error: (error) => {
        console.error('Error al verificar existencia del curso:', error);
      }
    });
  //fin paso1
  } else {
    console.log('Formulario inválido');
  }
}



  onFileChange(event: any) {
    console.log('Evento de selección de archivo recibido:', event);

    const file: File = event.target.files[0];
    console.log('Archivo seleccionado:', file);
    
    if (file) {
      const fileType = file.type;
      const maxSize = 2 * 1024 * 1024; // 2 MB

      console.log('Tipo de archivo:', fileType);
      console.log('Tamaño del archivo:', file.size);

      if (!['image/jpeg', 'image/png', 'image/jpg'].includes(fileType)) {
        console.log('Solo se permiten imágenes JPG o JPEG o PNG');
        console.warn('Tipo de archivo no válido');
        return;
      }

      if (file.size > maxSize) {
        console.log('El archivo no debe superar los 2MB');
        console.warn('Archivo demasiado grande');
        return;
      }

      this.cursoForm.patchValue({foto: file});
 
      console.log('Archivo válido y guardado en fotoSeleccionada');
    } else {
      console.warn('No se seleccionó ningún archivo');
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

