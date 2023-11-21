import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthenticationService } from 'src/app/authentication.service';
import { NgModel } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.page.html',
  styleUrls: ['./cuenta.page.scss'],
  providers: [NgModel], 
})
export class CuentaPage implements OnInit {

  usuarioActual: any;
  nuevoNumero: number;
  uid: string;
  nuevaContrasena: string;


  constructor(
    private menuController: MenuController,
    private firestore: AngularFirestore,
    private authService: AuthenticationService,
    private alertController: AlertController,
    private router: Router,
  ) { }

  ngOnInit() {
  
  }

  ionViewDidEnter() {
    this.obtenerInformacionUsuario();
  }

  irAlumnoMenu() {
    this.router.navigate(['/alumnomenu']);
  }
  
  alumnoMenu() {
    this.menuController.open('third');
  }
 
  async obtenerInformacionUsuario() {
    try {
      this.authService.getProfile().toPromise().then((userDataWithUid) => {
        if (userDataWithUid) {
          this.usuarioActual = userDataWithUid.data;
          this.uid = userDataWithUid.uid;
        }
      });
    } catch (error) {
      console.error('Error al obtener información del usuario:', error);
    }
  }

  async actualizarNumero() {
    console.log('Método actualizar Numero llamado');
    console.log('Nuevo número:', this.nuevoNumero);
    try {
      if (this.uid && this.nuevoNumero && /^[0-9]{8}$/.test(this.nuevoNumero.toString())) {
        await this.authService.updatePhoneNumber(this.uid, this.nuevoNumero);
        // Actualiza la información del usuario después de la modificación
        await this.obtenerInformacionUsuario();
        this.showAlert('Actualización', 'Se ha modificado su número de telefono');
        // Limpia la casilla de nuevo número
        this.nuevoNumero = null;
      } else {
        console.error('Error: El número de teléfono debe tener 8 dígitos.');
        this.showAlert('Error', 'El número de teléfono debe tener 8 dígitos.');
      }
    } catch (error) {
      console.error('Error al actualizar el número de teléfono:', error);
    }
  }
  
  async cambiarContrasena() {
    try {
      if (this.uid) {
        // Verificar si la nueva contraseña cumple con los requisitos (por ejemplo, longitud mínima)
        if (this.nuevaContrasena && this.nuevaContrasena.length >= 8 && /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(this.nuevaContrasena.toString())) {
          await this.authService.updatePassword(this.uid, this.nuevaContrasena);
  
          // Muestra una alerta para informar al usuario que la contraseña se ha cambiado
          const alert = await this.alertController.create({
            header: 'Contraseña cambiada',
            message: 'La contraseña se ha cambiado con éxito.',
            buttons: ['OK']
          });
          
          await alert.present();
          
          // Limpia la casilla de la nueva contraseña
          this.nuevaContrasena = '';
          this.router.navigate(['/alumnomenu']);
        } else {
          // Muestra una alerta de error por mal formato de contraseña
          const errorAlert = await this.alertController.create({
            header: 'Error',
            message: 'La contraseña no cumple con los requisitos mínimos (por ejemplo, longitud mínima de 8 caracteres, al menos un número, una mayúscula y una minúscula).',
            buttons: ['OK']
          });
  
          await errorAlert.present();
        }
      }
    } catch (error) {
      console.error('Error al cambiar la contraseña:', error);
    }
  }
  

  async showAlert(title: string, message: string): Promise<void> {
    const alert = await this.alertController.create({
      header: title,
      message: message,
      buttons: ['OK'],
    });
  
    await alert.present();
  }
}
