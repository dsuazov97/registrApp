import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutheticationService } from '../authetication.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  constructor(
    public authService: AutheticationService,
    public router: Router,
    private alertController: AlertController
  ) {}

  email: any;

  ngOnInit() {
  }

  async showAlert(title: string, message: string): Promise<void> {
    const alert = await this.alertController.create({
      header: title,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  
  async resetPassword(): Promise<void> {
    if (!this.email) {
      this.showAlert('Campo requerido', 'Ingresa tu correo electrónico antes de continuar.');
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(this.email)) {
      this.showAlert('Formato incorrecto', 'Ingresa un correo electrónico válido.');
      return;
    }

    try {
      await this.authService.resetPass(this.email);
      this.showAlert('Correo enviado', 'Se ha enviado un correo electrónico para restablecer tu contraseña.');
      console.log('Link de restablecimiento enviado correctamente');
      this.router.navigate(['/login']);
    } catch (error) {
      console.error(error);
    }
  }
}

