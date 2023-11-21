import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-qralumno',
  templateUrl: './qralumno.page.html',
  styleUrls: ['./qralumno.page.scss'],
})

export class QralumnoPage implements OnInit {
  
  scanResult: any='';
  resultArray = this.scanResult.split(',');

  usuarioActual: string;
  uid: string;
  asignatura: string;
  docente: string;
  sala: string;
  
  constructor(private menuController: MenuController,
              private alertController: AlertController,
              private authService: AuthenticationService,
              public router: Router,) { }

  ngOnInit() { }

  onCodeResult(result: string) {
    this.scanResult = result;
    this.resultArray = this.scanResult.split(',');
  }
  
  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permission denied',
      message: 'Please grant camera permission to use the barcode scanner.',
      buttons: ['OK'],
    });
    await alert.present();
  }

  alumnoMenu() {
    this.menuController.open('third');
  }

  async obtenerInformacionUsuario() {
    try {
      const userDataWithUid = await this.authService.getProfile().toPromise();

      if (userDataWithUid) {
        this.usuarioActual = userDataWithUid.data.fullname;
        this.uid = userDataWithUid.uid;
      }
    } catch (error) {
      console.error('Error al obtener información del usuario:', error);
    }
  }

  async registrar(codeAsig: string) {
    codeAsig = this.resultArray;
    try {
      const userDataWithUid = await this.authService.getProfile().toPromise();

      if (userDataWithUid) {
        this.usuarioActual = userDataWithUid.data.fullname;
        this.uid = userDataWithUid.uid;
        // Sacar la fecha en bonito 
        const fechaActual: Date = new Date();
        const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
        const diaSemana = diasSemana[fechaActual.getDay()];
        const dia = fechaActual.getDate();
        const mes = meses[fechaActual.getMonth()];
        const anio = fechaActual.getFullYear();
        const fechaFormateada: string = `${diaSemana}, ${dia} de ${mes} del ${anio}`;
        
        this.docente = this.resultArray[0];
        this.sala = this.resultArray[1];
        this.asignatura = this.resultArray[2];
        // Generar la asistencia
        this.authService.generarAsistencia(this.asignatura, this.sala, this.docente, this.usuarioActual, fechaFormateada);
        // Mensaje
        this.showAlert('Asistencia ' + this.asignatura, 'Ten un buen día ' + this.usuarioActual);
        this.router.navigate(['/alumnomenu']);
           
      } else {
        this.showAlert('','');
        console.log('Formato inválido');
      }
    } catch (error) {
      console.error('Error al obtener información del usuario:', error);
    }
  }

  async showSelectAlert(title: string, options: string[]): Promise<any> {
    const alert = await this.alertController.create({
      header: title,
      inputs: options.map((option) => ({
        name: title.toLowerCase(),
        type: 'radio',
        label: option,
        value: option
      })),
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Aceptar',
          handler: () => {}
        }
      ]
    });

    await alert.present();

    return alert.onDidDismiss();
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
