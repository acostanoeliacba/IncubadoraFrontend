import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder,  FormGroup, ReactiveFormsModule,  Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service'; 
import { ChatComponent } from '../chat/chat.component';

import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, Inject } from '@angular/core';

import { DialogService } from '../services/dialog.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { SafeUrlPipe } from '../pipes/safe-url.pipe';

interface Usuario {
  id_usuario: number;
  nombre: string;
  apellido: string;
  email: string;
}

@Component({
  selector: 'app-contenido',
  standalone: true,
  imports: [CommonModule, 
            HttpClientModule,
            ReactiveFormsModule, 
            FormsModule,
            RouterModule, 
            ChatComponent,
            SafeUrlPipe 
            ],
  templateUrl: './contenido.component.html',
  styleUrl: './contenido.component.css'
})

export class ContenidoComponent implements OnInit {
  curso: any;
  idCurso: string | null = null;
  cursoInfo: any;
  contenidoInfo: any;
  tipoUsuario: string = '';
  isBrowser = false;
  nuevoContenido = {
    id_curso: '',
    modulo: '',
    nombre: '',
    tipo: '',
    url: '',
    fecha_publicacion: ''
  };
  formularioCarga: boolean = false;
  formularioEdicion: boolean = false;
  mostrarPanel: boolean = false;
  constructor(private route: ActivatedRoute,
              private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private http: HttpClient,
              private dialogService: DialogService,
              @Inject(PLATFORM_ID) private platformId: Object 
              ) {this.isBrowser = isPlatformBrowser(this.platformId);}

getDriveId(url: string): string | null {
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
}
isDriveEmbeddable(url: string): boolean {
  return url?.includes('drive.google.com') && !url?.includes('accounts.google.com');
}
getDriveEmbedUrl(url: string): string {
  const id = this.getDriveId(url);
  return `https://drive.google.com/file/d/${id}/preview`;
}

getYoutubeEmbedUrl(url: string): string {

  let videoId = '';

  if (url.includes('youtu.be')) {
    // URL acortada https://youtu.be/VIDEOID
    videoId = url.split('youtu.be/')[1].split(/[?&]/)[0];
  } else if (url.includes('youtube.com')) {
    // URL normal https://www.youtube.com/watch?v=VIDEOID
    const urlParams = new URL(url).searchParams;
    videoId = urlParams.get('v') || '';
  }

  return `https://www.youtube.com/embed/${videoId}`;
}

ngOnInit(): void {
  const usuario = this.authService.getUsuario();

  if (usuario && usuario.tipo_usuario) {
    this.tipoUsuario = usuario.tipo_usuario;
  }


  this.idCurso = this.route.snapshot.paramMap.get('id');
  console.log('ID del curso recibido:', this.idCurso);

  // Obtener información del curso
  this.http.get<any>(`http://localhost:3000/cursos/info/${this.idCurso}`).subscribe(
    cursoI => {
      console.log("✅ Información de Curso recibida:", cursoI);
      this.cursoInfo = cursoI;

      this.curso = {
        id_curso: this.idCurso,
        nombre: cursoI.nombre_curso,
        modalidad: cursoI.tipo,
        alumnos: 60,
        fechaInicio: cursoI.fecha_inicio,
        fechaFin: cursoI.fecha_fin,
        unidades: [],
        proximaClase: { fecha: '15/05/2025', tema: 'Herramientas básicas' },
        materiales: [],
        mensajes: [
          'Reunión el viernes 18:00 hs.',
          'Consulta sobre la tarea.'
        ]
      };

     
      this.cargarContenido()
      this.mostrarPanelParticipantes();
    },
    error => {
      console.error("Error al cargar la información del curso:", error);
    }
  );

}
cargarContenido(): void {
    this.formularioCarga = false;
    if (!this.idCurso) return;
    console.log("Identificador id del curso:", this.idCurso);
    this.http.get<any[]>(`http://localhost:3000/contenidos/curso/${this.idCurso}`).subscribe(
      contenidoI => {
        if (contenidoI.length > 0) {
          console.log("Contenidos recibidos:", contenidoI);
          this.contenidoInfo = contenidoI;

          this.curso.materiales = contenidoI.map((modulo: any) => ({
            nombre: `${modulo.modulo}: ${modulo.nombre}`,
            link: modulo.url
          }));

          this.curso.unidades = contenidoI.map((modulo: any) => modulo.nombre);

          const ultimoModulo = contenidoI[contenidoI.length - 1];
          const fechaActual = new Date();
          fechaActual.setDate(fechaActual.getDate() + 7);
          const fechaFormateada = fechaActual.toLocaleDateString('es-AR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
          });

          this.curso.proximaClase = {
            fecha: fechaFormateada,
            tema: ultimoModulo.nombre
          };
          this.organizarPorModulo(this.contenidoInfo);

        } else {
          console.warn("Sin contenido del curso");
          this.contenidoInfo = [];
          this.curso.materiales = [];
          this.curso.unidades = [];
          this.organizarPorModulo([]);
        }
      },
      error => {
        console.error("Error al cargar el contenido del curso:", error);
      }
    );
  }


// **************   seccion actualizar contenido *************  //


contenidos: any[] = [];
moduloSeleccionado: string = '';
contenidoSeleccionado: any = null;
contenidosPorModulo: { [key: string]: any[] } = {};
modulosDisponibles: string[] = [];
tiposArchivo: string[] = ['pdf', 'docx', 'odt', 'txt', 'xlsx', 'ods', 'pptx', 'odp', 'mp4', 'webm', 'avi', 'mp3', 'wav', 'jpg', 'jpeg', 'png', 'gif', 'svg', 'genially', 'canva', 'iframe', 'url'];


organizarPorModulo(contenidos: any[]) {
  this.contenidosPorModulo = {};
  contenidos.forEach(c => {
    if (!this.contenidosPorModulo[c.modulo]) {
      this.contenidosPorModulo[c.modulo] = [];
    }
    this.contenidosPorModulo[c.modulo].push(c);
  });
  this.modulosDisponibles = Object.keys(this.contenidosPorModulo);

  // Selecciono el primero automáticamente si hay
  if (this.modulosDisponibles.length > 0) {
    this.moduloSeleccionado = this.modulosDisponibles[0];
  }
  this.contenidoSeleccionado = null;
}

seleccionarContenido(contenido: any) {
  // Limpiar el formulario


  if (!contenido || !contenido.id_contenido) {
    console.warn('Contenido inválido al seleccionar:', contenido);
    return;
  }

  this.contenidoSeleccionado = {
    id: null,
    nombre: '',
    tipo: '',
    url: '',
    modulo: contenido.modulo, // mantenemos el módulo
    id_curso: contenido.id_curso,
    fecha_publicacion: contenido.fecha_publicacion || ''
  };
    // clon para evitar vinculación directa al array
  // Reemplazar id_contenido por id, para tu backend espera "id"
  // Luego clonar el contenido seleccionado (para edición real)
  if (contenido && contenido.id_contenido) {
    this.contenidoSeleccionado = {
      ...contenido,
      id: contenido.id_contenido 
    };
  }
}

editarContenido() {
  if (!this.contenidoSeleccionado || !this.contenidoSeleccionado.id) {
    this.dialogService.showError('No se seleccionó un contenido válido para actualizar').subscribe();
    return;
  }

  this.formularioEdicion = false;

  this.http.put(`http://localhost:3000/contenidos/${this.contenidoSeleccionado.id}`, this.contenidoSeleccionado)
    .subscribe({
      next: res => {
        console.log(' Contenido actualizado', res);
        this.dialogService.showSuccess('Contenido actualizado').subscribe();
        this.cargarContenido();
      },
      error: err => {
        console.error(' Error al actualizar contenido:', err);
        this.dialogService.showError('Error al actualizar').subscribe();
      }
    });
}


  cerrarFormularioEdicion(): void {
     this.formularioEdicion = false;
     this.nuevoContenido = {
                id_curso: '',
                modulo: '',
                nombre: '',
                tipo: '',
                url: '',
                fecha_publicacion: ''
              };
  }


// ****************** Fin seccion  actualizar contenido **************//
  subirMaterial(): void {
    
    if (!this.idCurso) return;

    const fechaActual = new Date().toISOString();

    const contenidoEnviar = {
      ...this.nuevoContenido,
      id_curso: this.idCurso,
      fecha_publicacion: fechaActual
    };

    console.log('Enviando contenido:', contenidoEnviar);
    this.http.post('http://localhost:3000/contenidos/', contenidoEnviar).subscribe({
      next: (res: any) => {
        console.log('Contenido creado:', res);
        this.cargarContenido();
        this.dialogService.showSuccess('Material cargado exitosamente').subscribe();
        this.nuevoContenido = {
            id_curso: '',
            modulo: '',
            nombre: '',
            tipo: '',
            url: '',
            fecha_publicacion: ''
          };

      },
      error: err => {
        console.error('Error al cargar contenido:', err);
        this.dialogService.showError('Error al subir el material').subscribe();
      }
    });
  }

  cerrarFormulario(): void {
     this.formularioCarga = false;
     this.nuevoContenido = {
                id_curso: '',
                modulo: '',
                nombre: '',
                tipo: '',
                url: '',
                fecha_publicacion: ''
              };
  }


  alumnosCurso: Usuario[] = [];

mostrarPanelParticipantes() {
  if (!this.curso || !this.curso.id_curso) {
    console.warn('⚠ No se encontró el ID del curso.');
    return;
  }

  const idCurso = this.curso.id_curso;
  console.log(' ID del curso para cargar alumnos:', idCurso);


  this.http.get<Usuario[]>(`http://localhost:3000/inscripciones/curso/${idCurso}/alumnos`)
    .subscribe({
      next: (data) => {
        console.log(' Lista de alumnos recibida:', data);

        if (!Array.isArray(data) || data.length === 0) {
          console.info('ℹNo hay alumnos inscriptos para este curso.');
        }

        this.alumnosCurso = data;
        this.mostrarPanel = true;
      },
      error: (err) => {
        console.error(' Error al obtener alumnos:', err);
        if (err.status === 404) {
          console.warn(' No se encontraron alumnos para este curso.');
        } else if (err.status === 0) {
          console.warn(' No se pudo conectar con el servidor. ¿Está levantado el backend?');
        }
      }
    });
}

  verAlumnos() {
    this.dialogService.showError('Funcionalidad para ver alumnos').subscribe(() => {});
  }

  enviarMensaje() {
    this.dialogService.showError('Funcionalidad para enviar mensaje grupal').subscribe(() => {});
  }

  cerrarSesion(): void {
    this.authService.logout();       
    this.router.navigate(['/acceso']);
  }

}

