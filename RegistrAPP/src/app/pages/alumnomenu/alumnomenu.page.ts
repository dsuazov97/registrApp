import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController} from '@ionic/angular';
import { AuthenticationService } from 'src/app/authentication.service';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-alumnomenu',
  templateUrl: './alumnomenu.page.html',
  styleUrls: ['./alumnomenu.page.scss'],
})
export class AlumnomenuPage implements OnDestroy {
  user: any;
  private userDataSubscription: Subscription;

  constructor(
    private menuController: MenuController,
    public authService: AuthenticationService,
    public router: Router,
  ) {}

  ionViewWillEnter() {
    this.loadUserData();
  }

  loadUserData() {
    if (this.userDataSubscription) {
      this.userDataSubscription.unsubscribe();
    }

    this.userDataSubscription = this.authService.getProfile().pipe(
      take(1)
    ).subscribe(
      (user) => {
        console.log('Usuario en loadUserData:', user);
        this.user = user;
      },
      (error) => {
        console.error('Error al cargar datos del usuario:', error);
      }
    );
  }
   
  async logout() {
    try {
      await this.authService.signOut();
      this.user = null;
      this.router.navigate(['/login']);
    } catch (error) {
      console.log('Error al cerrar sesión:', error);
    }
  }

  ngOnDestroy() {
    if (this.userDataSubscription) {
      this.userDataSubscription.unsubscribe();
    }
  }

  alumnoMenu() {
    this.menuController.open('third');
  }
}
