import { Component } from '@angular/core';

@Component({
  selector: 'app-manicuria',
  standalone: true,
  imports: [],
  templateUrl: './manicuria.component.html',
  styleUrl: './manicuria.component.css'
})
export class ManicuriaComponent {

  inscribir() {
    // Aquí iría la lógica para la inscripción, como redirigir a una página de pago o almacenamiento de datos
    alert('Inscripción realizada con éxito');
  }

}
