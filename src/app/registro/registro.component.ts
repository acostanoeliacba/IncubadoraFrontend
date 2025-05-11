
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, HttpClientModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  registroForm: FormGroup;
  registroExitoso: boolean = false;
  mensaje: string = '';

  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router) {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      fechaNacimiento: ['', [Validators.required, this.validarEdad.bind(this)]],
      direccion: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{7,15}$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      dni: ['', [Validators.required, Validators.pattern(/^\d{7,10}$/)]],
      tipo_usuario: ['', Validators.required],
      especialidad: ['', Validators.required]
    });
  }

  validarEdad(control: any) {
    const fechaNacimiento = new Date(control.value);

    if (isNaN(fechaNacimiento.getTime())) {
      return { invalidDate: true };
    }

    const edad = this.calcularEdad(fechaNacimiento);
    if (edad < 18) {
      return { menorDeEdad: true };
    }
    return null;
  }

  calcularEdad(fechaNacimiento: Date) {
    const hoy = new Date();
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const mes = hoy.getMonth();
    if (mes < fechaNacimiento.getMonth() || (mes === fechaNacimiento.getMonth() && hoy.getDate() < fechaNacimiento.getDate())) {
      edad--;
    }
    return edad;
  }

  onSubmit() {
    if (this.registroForm.valid) {
      const formData = this.registroForm.value;
      console.log('Formulario válido:', this.registroForm.value);
      const payload = {
        nombre: formData.nombre,
        apellido: formData.apellido,
        fecha_nacimiento: formData.fechaNacimiento,
        direccion: formData.direccion,
        telefono: Number(formData.telefono),
        email: formData.email,
        password: formData.password,
        dni: Number(formData.dni),
        tipo_usuario: formData.tipo_usuario,
        especialidad: formData.especialidad
      };

      this.http.post('http://localhost:3000/user/find', payload).subscribe({
        next: (response) => {
          console.log('Usuario registrado correctamente:', response);
          this.registroExitoso = true;
          this.mensaje = '¡Registro exitoso!';
          setTimeout(() => this.router.navigate(['/acceso']), 2000);
        },
        error: (error) => {
          console.error('Error al registrar usuario:', error);
          this.registroExitoso = false;
          this.mensaje = 'Error al registrar usuario. Intenta nuevamente.';
        }
      });

    } else {
      console.log('Formulario inválido');
    }
  }

  irAlAcceso() {
    this.router.navigate(['/acceso']);
  }
}
