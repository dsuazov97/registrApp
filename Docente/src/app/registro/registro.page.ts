import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AutheticationService } from '../authetication.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  regForm: FormGroup;
  
  constructor (
                private formBuilder: FormBuilder,
                private loadingCtrl: LoadingController,
                private authService: AutheticationService,
                private router: Router,
                private alertController: AlertController
              ) { }

  ngOnInit() {
    this.regForm = this.formBuilder.group({
      fullname: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern("[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"),
        ],
      ],
      cuenta: ['',[Validators.required]],
      numero: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d{8}$/),
        ],
      ],
    });
  }

  get errorControl() {
    return this.regForm?.controls;
  }
  
  async signUp() {
    let loading: HTMLIonLoadingElement | null = null;
  
    try {
      loading = await this.loadingCtrl.create({
        message: 'Registrando usuario...',
      });
      await loading.present();
  
      if (this.regForm?.valid) {
        const { fullname, email, password, cuenta, numero } = this.regForm.value;
  
        // Intenta registrar al usuario
        const user = await this.authService.registerUser(fullname, email, password, cuenta, numero);
  
        // Redirige a la página correspondiente según el rol
        switch (cuenta) {
          case 'Profesor':
            this.router.navigate(['/generarqr']);
            break;
          case 'Estudiante':
            // Muestra una alerta específica para profesores
            this.showAlert('Registro exitoso', 'Bienvenido estudiante. Por favor, inicie sesión a través de la aplicación.');
            await this.authService.signOut();
            this.router.navigate(['/home']);
            break;
          // Agrega más casos según sea necesario para otros roles
          default:
            console.log('Rol no reconocido:', cuenta);
        }

        // Limpia los campos del formulario después de un registro exitoso
        this.regForm.reset();
      } else {
        this.showAlert('', 'Rellene los campos');
        console.log('Formato inválido');
      }
    } catch (error) {
      console.error('Error durante el registro:', error);
  
      // Aquí puedes verificar el tipo de error y mostrar un mensaje específico
      if ((error as any).code === 'auth/email-already-in-use') {
        // El correo electrónico ya está en uso
        // Muestra una alerta
        console.log('El correo electrónico ya está registrado.');
        this.showAlert('Error', 'Correo ya registrado');
        // También puedes evitar que el proceso continúe
        return;
      }
    } finally {
      // Asegúrate de descartar el loading incluso si ocurre un error
      if (loading) {
        loading.dismiss();
      }
    }
  }

  async showAlert(title: string, message: string) {
    const alert = await this.alertController.create({
      header: title,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }

}
