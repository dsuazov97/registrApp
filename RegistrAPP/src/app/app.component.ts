import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication.service';

interface MenuItem {
  name: string;
  icon: string;
  redirecTo: string;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {
  alumnoMenuItems: MenuItem[] = [
    {
      name: 'Home',
      icon: 'home-outline',
      redirecTo: '/alumnomenu',
    },
    {
      name: 'Ayuda',
      icon: 'settings-outline',
      redirecTo: '/ayuda',
    },
    { 
      name: 'Noticias',
      icon: 'newspaper-outline',
      redirecTo: '/noticias',
    },
    {
      name: 'Configuración',
      icon: 'settings-outline',
      redirecTo: '/cuenta',
    },
  ];

  constructor(
    private menu: MenuController,
    public authService: AuthenticationService,
    public router: Router,
  ) {}

  async logout() {
    try {
      await this.authService.signOut();
      this.router.navigate(['/login']);
      this.menu.close();
    } catch (error) {
      console.log('Error al cerrar sesión:', error);
    }
  }
}
