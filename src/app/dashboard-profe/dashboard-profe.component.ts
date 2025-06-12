
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder,  FormGroup, ReactiveFormsModule,  Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule,HttpParams ,HttpClient} from '@angular/common/http';
import { AuthService } from '../services/auth.service'; 

import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, Inject } from '@angular/core';

import { DialogService } from '../services/dialog.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChatComponent } from '../chat/chat.component';

import { PagosAdminComponent } from '../pagos-admin/pagos-admin.component';

interface User {
  id_usuario: number;
  nombre: string;
  apellido: string;
  fecha_nacimiento: string;
  direccion: string;
  telefono: number;
  email: string;
  dni: number;
  especialidad?: string;
  tipo_usuario: string;
  foto?: string;
}

@Component({
  selector: 'app-dashboard-profe',
  standalone: true,

  imports: [CommonModule,
            HttpClientModule,
            ReactiveFormsModule,
            FormsModule, 
            RouterModule,
            PagosAdminComponent,
            ChatComponent
          ],

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
              private dialogService: DialogService,
              private router: Router,
              private http: HttpClient,
              @Inject(PLATFORM_ID) private platformId: Object
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


formularioActivo: 'crearCurso' | 'modificarCurso' | 'listarPagos' | 'listarUsuarios' | null = null;

nombreCursoBuscar: string = '';
actualizarIdCurso: string | null = null;

archivoFoto: File | null = null;
fotoPreviewUrl: string | null = null;

imagenSeleccionada: File | null = null;

mostrarFormulario(nombre: 'crearCurso' | 'modificarCurso' | 'listarPagos' | 'listarUsuarios') {
  this.formularioActivo = nombre;
}

mostrarCrearCursoForm() {

  this.formularioActivo = 'crearCurso';
    this.resetFormularioCurso();
}


//*******************Modificar curso

resetFormularioCurso() {
  this.cursoForm.reset({
    nombre_curso: '',
    descripcion: '',
    duracion: null,
    tipo: '',
    costo: null,
    fecha_inicio: '',
    fecha_fin: '',
    foto: null
  });
 // this.imagenSeleccionada =null;
  this.fotoPreviewUrl = null;
}


mostrarModificarCursoForm() {
  this.formularioActivo = 'modificarCurso';
  this.cursoForm.reset();
}
ocultarFormularios() {
  this.formularioActivo = null;
}

get fotoUrl(): string {
    const foto = this.curso?.foto;
    if (!foto || foto === 'null' || foto === 'undefined') {
      return 'assets/img/default.jpg';
    }
    return `http://localhost:3000${foto}`;
}

get fotoDocenteUrl(): string {
  const foto = this.docente?.foto;
  if (!foto || foto === 'null' || foto === 'undefined') {
    return 'assets/img/sinfoto.png'; 
  }
  return `http://localhost:3000${foto}`;
}

buscarCursoPorNombre() {
  if (!this.nombreCursoBuscar.trim()) return;
 
    this.http.get<any>(`http://localhost:3000/cursos?nombre=${encodeURIComponent(this.nombreCursoBuscar)}`).subscribe({
    next: (res) => {
      console.log('Curso a modificar:', res);

      const cursoEncontrado = Array.isArray(res) ? res[0] : res;

      if (!cursoEncontrado) {
        this.dialogService.showError('No se encontró el curso.').subscribe(() => {});
        return;
      }

      this.curso = cursoEncontrado;
      this.actualizarIdCurso = this.curso.id_curso;
      console.log(' id Curso a modificar:', this.actualizarIdCurso);

      this.formularioActivo = 'modificarCurso';

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
      this.dialogService.showError('Ocurrió un error al buscar el curso.').subscribe(() => {});
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

  if (this.imagenSeleccionada) {
    formData.append('imagen', this.imagenSeleccionada);
  }

  const id = this.actualizarIdCurso ;

  this.http.put(`http://localhost:3000/cursos/${id}`, formData).subscribe({
    next: (response) => {
      console.log('Curso actualizado correctamente:', response);
      this.dialogService.showSuccess('Curso Actualizado.').subscribe(() => {});
    },
    error: (error) => {
      console.error('Error al actualizar curso:', error);
      this.dialogService.showError('Error al actualizar su curso.').subscribe(() => {});
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

  if (this.tipoUsuario === 'docente' || this.tipoUsuario === 'admin' && this.idUsuario) {
    this.http.get<any>(`http://localhost:3000/docentes/cursos/${this.idUsuario}`).subscribe({
      next: (res) => {
        console.log('Respuesta completa:', res);
        this.docente = res.docente;
        this.cursosAsignados = res.cursos;

        this.docente = res.docente;
        this.cursosAsignados = res.cursos;

        let solicitudesCompletadas = 0;

        const verificarFinalizacion = () => {
          if (solicitudesCompletadas === this.cursosAsignados.length) {
            this.totalAlumnos = this.cursosAsignados.reduce((total, curso) => total + (curso.alumnos || 0), 0);
            console.log('Total de alumnos en todos los cursos:', this.totalAlumnos);
          }
        };

        this.cursosAsignados.forEach(curso => {
          if (!curso.id_curso) {
            console.warn('Curso sin ID detectado, omitiendo...');
            solicitudesCompletadas++;
            verificarFinalizacion();
            return;
          }

          this.http.get<any[]>(`http://localhost:3000/inscripciones/curso/${curso.id_curso}/alumnos`)
            .subscribe({
              next: (alumnos) => {
                curso.alumnos = alumnos.length;
                solicitudesCompletadas++;
                verificarFinalizacion();
              },
              error: (err) => {
                console.warn(`⚠ Error en curso ${curso.id}:`, err);
                curso.alumnos = 0;
                solicitudesCompletadas++;
                verificarFinalizacion();
              }
            });
        });

        if (this.cursosAsignados.length > 0) {
          this.proximaClase = this.cursosAsignados[0].fecha_inicio; 
        }


      },
      error: (err) => {
        console.error('Error al cargar cursos del docente:', err);
      }
    });
   }
  }

//**********************Inicio Seccion Crear Curso***********

verificarCursoExistente(nombre: string): Observable<boolean> {
  return this.http.get<any[]>(`http://localhost:3000/cursos?nombre=${encodeURIComponent(nombre)}`).pipe(
    map((cursos: any[]) =>
      cursos.some((curso: any) => curso.nombre_curso.toLowerCase() === nombre.toLowerCase())
    )
  );
}

buscarCurso() {
  const nombreCurso = this.cursoForm.get('nombre_curso')?.value;

  if (!nombreCurso?.trim()) {
    this.dialogService.showError('Ingrese un nombre de curso para buscar.').subscribe();
    return;
  }

  this.verificarCursoExistente(nombreCurso).subscribe({
    next: (existe: boolean) => {
      if (existe) {
        this.dialogService.showError('Ya existe un curso con ese nombre.').subscribe(() => {
          this.cursoForm.get('nombre_curso')?.reset();
          this.resetFormularioCurso();
        });
      } else {
        this.dialogService.showSuccess('Nombre disponible para crear un nuevo curso.').subscribe();
      }
    },
    error: (err) => {
      console.error('Error al verificar el curso:', err);
      this.dialogService.showError('Ocurrió un error al buscar el curso.').subscribe();
    }
  });
}

crearCurso() {

  if (!this.cursoForm.valid) {
    console.log('Formulario inválido');
    return;
  }

  const formValues = this.cursoForm.value;
  const nombreCurso = formValues.nombre_curso;

  this.verificarCursoExistente(nombreCurso).subscribe({
    next: (existe) => {

      if (existe) {
        this.dialogService.showError('Ya existe un curso con ese nombre.').subscribe(() => {
   //       this.cursoForm.get('nombre_curso')?.reset();
        this.cursoForm.reset();
        });
        return;
      }

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
      }

      this.http.post(`http://localhost:3000/cursos`, formData).subscribe({
        next: (response) => {
          console.log('Curso creado correctamente:', response);
          this.dialogService.showSuccess('Curso Creado Correctamente.').subscribe(() => {});
          

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

              this.http.post('http://localhost:3000/docentes/', {
                id_usuario: idDocente,
                id_curso: idCurso
              }).subscribe({
                next: (res) => {
                  console.log('Curso asociado correctamente al docente:', res);

       
                  this.cursoForm.reset();
                  this.archivoFoto = null;
                  this.fotoPreviewUrl = null;
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
        },
        error: (error) => {
          console.error('Error al crear curso:', error);
        }
      });
    },
    error: (err) => {
      console.error('Error al verificar si el curso existe:', err);
    }
  });
}

onFileChange(event: any) {
    console.log('Evento de selección de archivo recibido:', event);

    const file: File = event.target.files[0];

    if (!file) {
      console.warn('No se seleccionó ningún archivo');
      return;
    }

    const fileType = file.type;
    const maxSize = 2 * 1024 * 1024; 

    console.log('Archivo seleccionado:', file);
    console.log('Tipo de archivo:', fileType);
    console.log('Tamaño del archivo:', file.size);

    if (!['image/jpeg', 'image/png', 'image/jpg'].includes(fileType)) {
      console.warn(' Solo se permiten imágenes JPG, JPEG o PNG');
      return;
    }

    if (file.size > maxSize) {
      console.warn(' El archivo no debe superar los 2MB');
      return;
    }

    this.imagenSeleccionada = file;
    console.log('Archivo válido y guardado en imagenSeleccionada');
    this.cursoForm.get('foto')?.setValue(file);//linea determinante carga

    const reader = new FileReader();
    reader.onload = () => {
      this.fotoPreviewUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

//**********************Fin Seccion Crear Curso***********

//**********************Inicio Seccion Listar Usuarios***********
  filtros = {
    nombre: '',
    id_usuario: null as number | null, 
    dni: null as number | null,
    apellido: '',
  };

  usuarios: User[] = [];

  ListarUsuariosComponent() {
  this.formularioActivo = 'listarUsuarios';
  }
  buscar() {
    let params = new HttpParams();

    if (this.filtros.nombre) params = params.set('nombre', this.filtros.nombre);
    if (this.filtros.dni) params = params.set('dni', this.filtros.dni.toString());
    if (this.filtros.apellido) params = params.set('apellido', this.filtros.apellido);

    this.http.get<User[]>('http://localhost:3000/user/find', { params }).subscribe({
      next: (usuarios) => {
        console.log('Usuarios recibidos:', usuarios); 
        this.usuarios = usuarios;
      },
      error: (err) => {
        console.error('Error al obtener usuarios:', err);
        this.usuarios = [];
      }
    });
  }

//**********************Fin Seccion Listar Usuarios***********

//**********************Inicio Seccion Listar Pagos***********

filtrosPago = {
  id_usuario: null as number | null,
  id_curso: null as number | null,
  fecha_pago: ''
};

pagos: any[] = [];

cursos: any[] = [];

buscarPagos() {
  let userParams = new HttpParams();

  if (this.filtros.nombre) userParams = userParams.set('nombre', this.filtros.nombre);
  if (this.filtros.dni) userParams = userParams.set('dni', this.filtros.dni.toString());
  if (this.filtros.apellido) userParams = userParams.set('apellido', this.filtros.apellido);

  this.http.get<User[]>('http://localhost:3000/user/find', { params: userParams }).subscribe({
    next: (usuarios) => {
      this.usuarios = usuarios;

      this.http.get<any[]>('http://localhost:3000/cursos').subscribe({
        next: (cursos) => {
          this.cursos = cursos;

          let pagoParams = new HttpParams();
          if (this.filtrosPago.id_usuario) {
            pagoParams = pagoParams.set('id_usuario', this.filtrosPago.id_usuario.toString());
          }
          if (this.filtrosPago.id_curso) {
            pagoParams = pagoParams.set('id_curso', this.filtrosPago.id_curso.toString());
          }
          if (this.filtrosPago.fecha_pago) {
            pagoParams = pagoParams.set('fecha_pago', this.filtrosPago.fecha_pago);
          }

          this.http.get<any[]>('http://localhost:3000/pagos/', { params: pagoParams }).subscribe({
            next: (pagos) => {
              this.pagos = pagos.map(pago => {
                const usuario = this.usuarios.find(u => u.id_usuario === pago.id_usuario);
                const curso = this.cursos.find(c => c.id_curso === pago.id_curso);
                return {
                  ...pago,
                  nombre: usuario?.nombre || '',
                  apellido: usuario?.apellido || '',
                  dni: usuario?.dni || '',
                  nombre_curso: curso?.nombre_curso || ''
                };
              });
            },
            error: err => {
              console.error('Error al buscar pagos:', err);
              this.pagos = [];
            }
          });

        },
        error: err => {
          console.error('Error al obtener cursos:', err);
          this.cursos = [];
        }
      });

    },
    error: err => {
      console.error('Error al obtener usuarios:', err);
      this.usuarios = [];
      this.pagos = [];
    }
  });
}

//**********************Fin Seccion Listar Pagos***********

/*********************pagos Admin*********************************/
  graficoPagos() {
    this.router.navigate(['/pagos-admin']);
  }

/**********************pagos Admin********************************/
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

