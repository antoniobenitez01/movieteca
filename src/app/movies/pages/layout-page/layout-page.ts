import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/login';
import { User } from '../../../interfaces/api-response';

@Component({
  selector: 'app-layout-page',
  template: '',
  styles: ``,
  standalone : false
})
export class LayoutPageComponent {
  public sidebarItems = [
    { label: "Listado", icon: "label", url: "./list"},
    { label: "Añadir", icon: "add", url: "./new-hero"},
    { label: "Buscar", icon: "search", url: "./search"},
  ];

  constructor(
    private authService : LoginService,
    private router : Router
  ){}
}
