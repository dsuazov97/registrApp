import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-ayuda',
  templateUrl: './ayuda.page.html',
  styleUrls: ['./ayuda.page.scss'],
})
export class AyudaPage implements OnInit {

  constructor(private menuController: MenuController) { }

  ngOnInit() {
  }


  alumnoMenu(){
    this.menuController.open('third');
  }

 
}