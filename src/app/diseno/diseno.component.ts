import { Component } from '@angular/core';

@Component({
  selector: 'app-diseno',
  standalone: true,
  imports: [],
  templateUrl: './diseno.component.html',
  styleUrl: './diseno.component.css'
})
export class DisenoComponent {

  inscribir() {
    // Aquí iría la lógica para la inscripción, como redirigir a una página de pago o almacenamiento de datos
    alert('Inscripción realizada con éxito');
  }
  
}
