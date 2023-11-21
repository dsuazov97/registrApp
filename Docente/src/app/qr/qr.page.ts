import { Component, OnInit } from '@angular/core';
import { DatosService } from '../services/datos.service';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QrPage implements OnInit {
  dato:any;
  constructor(private datosService: DatosService) { }

  ngOnInit() {
    this.datosService.$getObjectSource.subscribe(asignatura => {
      console.log(asignatura)
      this.dato = asignatura;
    });
  }

}
