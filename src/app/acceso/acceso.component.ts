import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service'; 

@Component({
  selector: 'app-acceso',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule, RouterModule], 
  templateUrl: './acceso.component.html',
  styleUrls: ['./acceso.component.css']
})
export class AccesoComponent {

  accesoForm: FormGroup;
  inicioExitoso: boolean = false;
  inicioError: string | null = null;

  constructor(private http: HttpClient,
              private fb: FormBuilder, 
              private router: Router,
              private authService: AuthService
              ) {
   
    this.accesoForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], 
      password: ['', [Validators.required, Validators.minLength(6)]] 
    });
  }
  
  // onSubmit() {
  //   if (this.accesoForm.valid) {
  //     console.log('Formulario de acceso válido:', this.accesoForm.value);

  //     setTimeout(() => {
  //       this.inicioExitoso = true;
  //       this.inicioError = null; 
  //       this.router.navigate(['/perfil']); 
  //     }, 1000); 
  //   } else {
  //     console.log('Formulario inválido');
  //     this.inicioExitoso = false;
  //     this.inicioError = 'Por favor, revisa los errores en el formulario.';
  //   }
  // }

  onSubmit() {
    if (this.accesoForm.valid) {
    const formData = this.accesoForm.value;

    this.http.post('http://localhost:3000/user/easy/login', formData).subscribe({
      next: (response) => {
        console.log('Respuesta del backend:', response);
   
        this.authService.setUsuario(response);

        this.inicioExitoso = true;
        this.inicioError = null;
        this.router.navigate(['/perfil']);
      },
      error: (error) => {
        console.error('Error en el login:', error);
        this.inicioExitoso = false;
        this.inicioError = 'Error al iniciar sesión. Verifica tus credenciales.';
      }
    });
    } else {
      console.log('Formulario inválido');
      this.inicioExitoso = false;
      this.inicioError = 'Por favor, revisa los errores en el formulario.';
    }
  }

  cerrarSesion(): void {
    this.authService.logout();       
    this.router.navigate(['/acceso']);
  }

  irAlRegistro() {
    this.router.navigate(['/registro']);
  }
}

