import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-acceso',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule], 
  templateUrl: './acceso.component.html',
  styleUrls: ['./acceso.component.css']
})
export class AccesoComponent {

  accesoForm: FormGroup;
  inicioExitoso: boolean = false;
  inicioError: string | null = null;

  constructor(private fb: FormBuilder, private router: Router) {
   
    this.accesoForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], 
      password: ['', [Validators.required, Validators.minLength(6)]] 
    });
  }
  
  onSubmit() {
    if (this.accesoForm.valid) {
      console.log('Formulario de acceso válido:', this.accesoForm.value);

      setTimeout(() => {
        this.inicioExitoso = true;
        this.inicioError = null; 
        this.router.navigate(['/perfil']); 
      }, 1000); 
    } else {
      console.log('Formulario inválido');
      this.inicioExitoso = false;
      this.inicioError = 'Por favor, revisa los errores en el formulario.';
    }
  }

  irAlRegistro() {
    this.router.navigate(['/registro']);
  }
}

