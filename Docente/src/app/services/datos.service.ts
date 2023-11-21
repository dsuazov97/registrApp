import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatosService {
  private objetoSource = new BehaviorSubject <{}>([]);

  $getObjectSource = this.objetoSource.asObservable();

  constructor() { }

  sedObjectSource(data:any){
    this.objetoSource.next(data);
  }
}
