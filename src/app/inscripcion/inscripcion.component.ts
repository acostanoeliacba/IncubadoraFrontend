
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CursoService } from '../services/curso.service';
import { InscripcionService } from '../services/inscripcion.service';
import { Curso } from '../models/curso.model';
import { AuthService } from './services/auth.service'; 

@Component({
  selector: 'app-inscripcion',
  standalone: true,
  imports: [],
  templateUrl: './inscripcion.component.html',
  styleUrls: ['./inscripcion.component.css']
})
export class InscripcionComponent implements OnInit {
  inscripcionForm: FormGroup;
  cursos: Curso[] = [];
  id_usuario: number = 0; // Este lo cargás luego del login

  constructor(
              private fb: FormBuilder,
              private cursoService: CursoService,
              private inscripcionService: InscripcionService
              private http: HttpClient,
              private router: Router,
              private authService: AuthService
              ) {
    this.inscripcionForm = this.fb.group({
      id_curso: ['', Validators.required]
    });
  }

  ngOnInit(): void {
      const usuarioLogueado = this.authService.getUsuario();
      console.log("usuario-inscripcion",usuarioLogueado);
        // if (!usuarioLogueado) {
        //   alert("Sesión no válida");
        //   this.router.navigate(['/acceso']);
        //   return;
        // }
    this.id_usuario = Number(usuarioLogueado.id_usuario); 
    //this.id_usuario = Number(localStorage.getItem('id_usuario')); // o desde un servicio
    this.cargarCursos();
  }

  cargarCursos(): void {
    this.cursoService.getCursos().subscribe((data) => {
      this.cursos = data;
    });
  }

  inscribirse(): void {
    const fechaHoy = new Date().toISOString().split('T')[0]; // solo la fecha
    const inscripcion = {
      id_usuario: this.id_usuario,
      id_curso: this.inscripcionForm.value.id_curso,
      fecha_inscripcion: fechaHoy
    };

    this.inscripcionService.registrarInscripcion(inscripcion).subscribe(() => {
      alert('Inscripción registrada con éxito');
      this.inscripcionForm.reset();
    });
  }
}
