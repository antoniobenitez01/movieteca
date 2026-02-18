import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services/auth-service';
import { Router } from '@angular/router';
import { User } from '../../../shared/interfaces/user';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.html',
  styles: ``,
  standalone : false
})
export class LayoutPageComponent {

  user : User | undefined = this.loadUser();

  public sidebarItems = [
    { label: "Buscar", icon: "search", url: "./search"},
    { label: "Listado", icon: "list", url: "./list"},
    { label: "Favoritos", icon: "star", url: "./favourites"},
  ];

  constructor(
    private authService : AuthService,
    private router : Router
  ){}

  onLogout() : void {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }

  loadUser() : User | undefined {
    if(localStorage.getItem('nombre_publico') && localStorage.getItem('token')){
      return this.user = {
        nombre_publico : localStorage.getItem('nombre_publico')!,
        token : localStorage.getItem('token')!
      };
    }else{
      return undefined;
    }
  }
}
