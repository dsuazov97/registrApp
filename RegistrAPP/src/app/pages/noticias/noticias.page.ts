import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Article } from 'src/app/interfaces/interfaces';
import { NoticiasService } from 'src/app/services/noticias.service';


@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.page.html',
  styleUrls: ['./noticias.page.scss'],
})
export class NoticiasPage implements OnInit {

  noticias: Article[] = [];

  constructor(private noticiasService: NoticiasService, private menuController: MenuController){
    
  }

  ngOnInit() {
    this.noticiasService.getTopHeadlines().subscribe(resp =>{
      console.log('noticias', resp);
      this.noticias.push(...resp.articles);
    });
  }

  alumnoMenu(){
    this.menuController.open('third');
  }

}
