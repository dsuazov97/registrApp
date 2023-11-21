import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router'
import { DatosService } from '../services/datos.service';
import { AutheticationService } from '../authetication.service';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-generarqr',
  templateUrl: './generarqr.page.html',
  styleUrls: ['./generarqr.page.scss'],
})
export class GenerarqrPage implements OnDestroy {

  user: any;
  private userDataSubscription: Subscription;

  asignatura: any;
  isButtonDisabled: boolean = true;

  constructor(
    private router: Router,
    private authService: AutheticationService,
    private datosService: DatosService
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

  ngOnDestroy() {
    if (this.userDataSubscription) {
      this.userDataSubscription.unsubscribe();
    }
  }

  updateButtonState() {
    // Verifica si se ha seleccionado una asignatura
    this.isButtonDisabled = !this.asignatura;
  }

  enviarDatos() {
    // Verifica nuevamente si se ha seleccionado una asignatura antes de proceder
    if (this.asignatura) {
      console.log('Generando QR para la asignatura:', this.asignatura);
      this.datosService.sedObjectSource(this.asignatura);
      this.router.navigate(['/qr']);
    } else {
      console.log('Por favor, selecciona una asignatura antes de generar QR.');
    }
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
}
