import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthenticationService } from 'src/app/authentication.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {
  
  datos$: Observable<any[]>;
  user: any;
  asignaturasAgrupadas: { asignatura: string, documentos: any[] }[] = [];

  constructor(
    private menuController: MenuController,
    private angularFirestore: AngularFirestore,
    private authService: AuthenticationService,
  ) { }

  ngOnInit() {
    this.loadUserData();
    this.obtenerDatos();
  }

  loadUserData() {
    this.authService.getProfile().subscribe(
      (user) => {
        if (user) {
          console.log('Usuario en loadUserData:', user);
          this.user = user;
        } else {
          console.warn('Usuario no autenticado.');
        }
      },
      (error) => {
        console.error('Error al cargar datos del usuario:', error);
      }
    );
  }

  // Funcional

  obtenerDatos() {
    const asistenciaCollection = this.angularFirestore.collection('Asistencia');
    this.datos$ = asistenciaCollection.valueChanges();
    this.datos$.subscribe(datos => {
      console.log('Datos de la colección:', datos);
      datos.forEach(documento => {
      console.log('Datos del documento:', documento);
      });
    });
  } 
  
  alumnoMenu() {
    this.menuController.open('third');
  }

  

}
