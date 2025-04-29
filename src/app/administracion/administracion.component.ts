import { Component } from '@angular/core';

@Component({
  selector: 'app-administracion',
  standalone: true,
  imports: [],
  templateUrl: './administracion.component.html',
  styleUrl: './administracion.component.css'
})
export class AdministracionComponent {

  inscribir() {
    // Aquí iría la lógica para la inscripción, como redirigir a una página de pago o almacenamiento de datos
    alert('Inscripción realizada con éxito');
  }

}
