import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { RespuestaTopHeadLines } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  constructor(private http: HttpClient) { }

  getTopHeadlines() {
    return this.http.get<RespuestaTopHeadLines>(`https://newsapi.org/v2/everything?q=apple&from=2023-11-17&to=2023-11-17&sortBy=popularity&apiKey=d806188346a04704abeadc967aa4b0d4`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    console.error('Error en la solicitud a la API de noticias', error);
    return throwError(error); // Puedes personalizar cómo manejar el error aquí
  }
}