
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

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
  costoTotal: number | null = null;
  fechaInicio: string | null = null;
  comprobanteFile: File | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.inscripcionForm = this.fb.group({
      id_curso: ['', Validators.required],
      id_usuario: [''],
      nombre_completo: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      forma_pago: ['', Validators.required],
      acepta_politica: [false, Validators.requiredTrue]
    });
  }

  ngOnInit() {
    this.cargarCursos();

    const usuarioLogueado = JSON.parse(localStorage.getItem('usuario') || '{}');
    if (usuarioLogueado && usuarioLogueado.id_usuario) {
      this.inscripcionForm.patchValue({ id_usuario: usuarioLogueado.id_usuario });
    }
  }

  cargarCursos() {
    this.http.get('/api/cursos').subscribe((data: any) => {
      this.cursos = data;
    });
  }

  actualizarCostoYFecha() {
    const idCursoSeleccionado = this.inscripcionForm.get('id_curso')?.value;
    const curso = this.cursos.find(c => c.id_curso === idCursoSeleccionado);

    if (curso) {
      this.costoTotal = curso.precio;
      this.fechaInicio = curso.fecha_inicio;
    } else {
      this.costoTotal = null;
      this.fechaInicio = null;
    }
  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.comprobanteFile = event.target.files[0];
    }
  }

  inscribirse() {
    if (this.inscripcionForm.valid && this.comprobanteFile) {
      const formData = new FormData();
      formData.append('id_curso', this.inscripcionForm.get('id_curso')?.value);
      formData.append('id_usuario', this.inscripcionForm.get('id_usuario')?.value);
      formData.append('nombre_completo', this.inscripcionForm.get('nombre_completo')?.value);
      formData.append('email', this.inscripcionForm.get('email')?.value);
      formData.append('forma_pago', this.inscripcionForm.get('forma_pago')?.value);
      formData.append('acepta_politica', this.inscripcionForm.get('acepta_politica')?.value);
      formData.append('comprobante_pago', this.comprobanteFile);
      this.http.post('/api/inscripciones', formData)
        .subscribe(
          response => {
            alert('¡Inscripción exitosa!');
            this.inscripcionForm.reset();
            this.comprobanteFile = null;
            this.costoTotal = null;
            this.fechaInicio = null;
          },
          error => {
            alert('Error al inscribirse.');
          }
        );
    } else {
      alert('Por favor completa todos los campos y adjunta el comprobante de pago.');
    }
  }

}
