import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/authentication.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public authService: AuthenticationService,
    public router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
        ],
      ],
      password: [
        '',
        [
          Validators.required,
        ],
      ],
    });
  }
  

  get errorControl() {
    return this.loginForm.controls;
  }

  async login() {
    const loading = await this.loadingCtrl.create({
      message: 'Iniciando sesión...',
    });
  
    try {
      await loading.present();
  
      if (this.loginForm.valid) {
        const user = await this.authService.loginUser(
          this.loginForm.value.email,
          this.loginForm.value.password
        );
  
        if (user) {
          // Obtener el UID del usuario
          const uid = user.user.uid;
  
          // Obtener el perfil del usuario para verificar el tipo de cuenta
          const profile = await this.authService.getProfile().toPromise();
  
          if (profile) {
            const tipoCuenta = profile.data.cuenta;
  
            if (tipoCuenta === 'Estudiante') {
              // Imprimir el UID del usuario en la consola
              console.log('UID del usuario:', uid);
              this.handleSuccessfulLogin();
            } else {
              // Cerrar la sesión y mostrar un mensaje de error
              await this.authService.signOut();
              this.showAlert('Acceso no autorizado', 'Solo los estudiantes pueden iniciar sesión en esta aplicación.');
            }
          } else {
            // Manejar el caso en el que no se pueda obtener el perfil del usuario
            console.error('No se pudo obtener el perfil del usuario');
          }
        } else {
          this.showAlert('Inicio de sesión fallido', 'Credenciales incorrectas. Verifique y vuelva a intentarlo.');
        }
      } else {
        this.showAlert('Formulario incompleto', 'Por favor, complete todos los campos correctamente.');
      }
    } catch (error) {
      console.error('Error durante el inicio de sesión:', error);
      this.showAlert('Error', '¡Ups! Algo salió mal. Por favor, inténtalo de nuevo.');
    } finally {
      // Asegurarse de que la pantalla de carga se cierre incluso en caso de error
      if (loading) {
        await loading.dismiss();
      }
    }
  }

  private handleSuccessfulLogin(): void {
    console.log('Inicio de sesión exitoso. Redirigiendo...');
    this.router.navigate(['/alumnomenu']);
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
