
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service'; 

import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-formulario-inscripcion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './formulario-inscripcion.component.html',
  styleUrls: ['./formulario-inscripcion.component.css']
})
export class FormularioInscripcionComponent implements OnInit {

  inscripcionForm: FormGroup;
  cursos: any[] = [];
  monto: string | null = null;
  costo: string | null = null;
  fecha_pago: string | null = null;
  comprobanteFile: File | null = null;
  fechaActual:string | null =null;
  fechaInicio:string | null =null;
  id_usuario: number | null = null;

  constructor(private fb: FormBuilder, 
              private http: HttpClient,
              private router: Router,
              private authService: AuthService,
              @Inject(PLATFORM_ID) private platformId: Object
              ) {

    this.inscripcionForm = this.fb.group({
      id_curso: ['', Validators.required],
      id_usuario: [''],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      // forma_pago: ['', Validators.required],
      acepta_politica: [false, Validators.requiredTrue]
    });
  }

  ngOnInit() {
    this.cargarCursos();
    const usuarioLogueado = this.authService.getUsuario();
    console.log("usuario-formulario-inscripcion",usuarioLogueado);

    if (!usuarioLogueado && isPlatformBrowser(this.platformId)) {
    alert('Sesión no válida');
        setTimeout(() => {
          this.router.navigate(['/acceso']);
          }, 500);
        return
    }
    if (usuarioLogueado) {
      this.inscripcionForm.patchValue({
        nombre: usuarioLogueado.nombre,
        apellido: usuarioLogueado.apellido,
        id_usuario: usuarioLogueado.id_usuario,
        email: usuarioLogueado.email
      });
      this.id_usuario=usuarioLogueado.id;
    }
    console.log('Form después de patch:', this.inscripcionForm.value);
      console.log('Form después de patch:', this.id_usuario);
  }

  cargarCursos() {
    this.http.get('http://localhost:3000/cursos').subscribe((data: any) => {
      this.cursos = data;
    });
  }

  actualizarCostoYFecha() {
    const idCursoSeleccionado = Number(this.inscripcionForm.get('id_curso')?.value);
     console.log("id_cursoseleccionado",idCursoSeleccionado);
    const curso = this.cursos.find(c => c.id_curso === idCursoSeleccionado);
      console.log("cursoseleccionado",curso);
    if (curso) {
      this.costo = curso.costo;
            console.log("costo",this.costo);
      this.monto = curso.tipo;
            console.log("modalidad",this.monto);
      this.fechaInicio = curso.fecha_inicio;
        const hoy = new Date();
      this.fecha_pago = hoy.toISOString().split('T')[0]; // formato: 'YYYY-MM-DD'
        console.log("Fecha actual para el pago:", this.fecha_pago);
    } else {
      this.monto = null;
      this.fecha_pago = null;
      this.costo = null;
      this.fechaInicio = null;
    }

  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.comprobanteFile = event.target.files[0];
    }
  }

  inscribirse() {

    if (this.inscripcionForm.valid ) {
      const formData = new FormData();
      formData.append('id_curso', this.inscripcionForm.get('id_curso')?.value);
      formData.append('id_usuario', this.inscripcionForm.get('id_usuario')?.value);
      if (this.fecha_pago !== null) {
       formData.append('fecha_inscripcion', this.fecha_pago);
      }

    const datosCompra = {
      id_curso: this.inscripcionForm.get('id_curso')?.value,
      id_usuario: this.inscripcionForm.get('id_usuario')?.value,
      nombre: this.inscripcionForm.get('nombre')?.value,
      apellido: this.inscripcionForm.get('apellido')?.value,
      email: this.inscripcionForm.get('email')?.value,
      fecha_pago: this.fecha_pago,
      costo: this.costo,
      modalidad: this.monto,
      fecha_inicio: this.fechaInicio
    };

     console.log("datos antes de guardar",datosCompra);
     localStorage.setItem('datosCompra', JSON.stringify(datosCompra));
     console.log("datos guardados almacenados de la compra",localStorage.getItem('datosCompra'));
      this.router.navigate(['/pago']);

      // this.http.post('http://localhost:3000/inscripciones', formData)
      //   .subscribe(
      //     response => {
      //       alert('¡Inscripción exitosa!');
      //       this.inscripcionForm.reset();
      //       this.comprobanteFile = null;
      //       this.monto = null;
      //       this.costo = null;
      //       this.fechaInicio = null;
      //       this.fecha_pago = null;
      //     },
      //     error => {
      //       alert('Error al inscribirse.');
      //     }
      //   );

    } else {
      alert('Por favor completa todos los campos y adjunta el comprobante de pago.');
    }
  }

    cerrarSesion(): void {
    this.authService.logout();       
    this.router.navigate(['/acceso']);
  }

}
