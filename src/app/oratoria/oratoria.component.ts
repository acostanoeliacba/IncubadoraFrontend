import { Component } from '@angular/core';

@Component({
  selector: 'app-oratoria',
  standalone: true,
  imports: [],
  templateUrl: './oratoria.component.html',
  styleUrl: './oratoria.component.css'
})
export class OratoriaComponent {

  inscribir() {
    // Aquí iría la lógica para la inscripción, como redirigir a una página de pago o almacenamiento de datos
    alert('Inscripción realizada con éxito');
  }

}
