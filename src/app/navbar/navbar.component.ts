
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common'; 
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, NgIf ], 
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  estaLogueado: boolean = false;

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.estaLogueado = !!this.authService.usuario?.logueado;
  }

  cerrarSesion(): void {
    this.authService.logout();       
    this.router.navigate(['/acceso']);
  }


}

