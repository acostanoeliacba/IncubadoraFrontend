import { Component } from '@angular/core';

@Component({
  selector: 'app-carpinteria',
  standalone: true,
  imports: [],
  templateUrl: './carpinteria.component.html',
  styleUrl: './carpinteria.component.css'
})
export class CarpinteriaComponent {

  inscribir() {
    // Aquí iría la lógica para la inscripción, como redirigir a una página de pago o almacenamiento de datos
    alert('Inscripción realizada con éxito');
  }

}
