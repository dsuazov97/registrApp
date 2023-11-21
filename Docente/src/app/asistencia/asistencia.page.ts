import { Component, OnInit } from '@angular/core';
import { AutheticationService } from '../authetication.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {

  datos$: Observable<any[]>;
  user: any;
  
  constructor(
    private angularFirestore: AngularFirestore,
    private authService: AutheticationService
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

}
