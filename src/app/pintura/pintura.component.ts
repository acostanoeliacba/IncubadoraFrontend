import { Component } from '@angular/core';

@Component({
  selector: 'app-pintura',
  standalone: true,
  imports: [],
  templateUrl: './pintura.component.html',
  styleUrl: './pintura.component.css'
})
export class PinturaComponent {

inscribir() {
    // Aquí iría la lógica para la inscripción, como redirigir a una página de pago o almacenamiento de datos
    alert('Inscripción realizada con éxito');
  }

}
