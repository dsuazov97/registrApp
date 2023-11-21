import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, from, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AutheticationService {

  constructor ( private ngFireAuth: AngularFireAuth,
                private angularFirestore: AngularFirestore
              ) { }

  async registerUser(fullname: string, email: string, password: string, cuenta: string, numero: number) {
    try {
      const userCredential = await this.ngFireAuth.createUserWithEmailAndPassword(
        email,
        password
      );
  
      if (userCredential.user) {
        const userId = userCredential.user.uid;
  
        await this.angularFirestore.collection('usuarios').doc(userId).set({
          fullname,
          email,
          cuenta,
          numero,
        });
  
        return userCredential.user;
      } else {
        // Manejar el caso en el que userCredential.user es nulo
        throw new Error('El usuario no se creó correctamente.');
      }
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      throw error;
    }
  }
              

  // Logeando el Usuario 
  async loginUser(email: string, password: string) {
    return await this.ngFireAuth.signInWithEmailAndPassword(email, password);
  }

  // Enviar pw al correo
  async resetPass(email: string) {
    return await this.ngFireAuth.sendPasswordResetEmail(email);
  }

  // Cerrar Sesión
  async signOut() {
    return await this.ngFireAuth.signOut();
  }

  getProfile(): Observable<{ uid: string; data: any } | null> {
    return from(this.ngFireAuth.currentUser).pipe(
      switchMap((user) => {
        if (user) {
          const uid = user.uid;
          return this.getUserData(uid).pipe(
            map((userData) => ({ uid, data: userData }))
          );
        } else {
          return of(null);
        }
      })
    );
  }

  getUserData(uid: string): Observable<any> {
    return from(this.angularFirestore.collection('usuarios').doc(uid).get()).pipe(
      switchMap((userDoc) => {
        if (userDoc.exists) {
          return of(userDoc.data());
        } else {
          console.error('Usuario no encontrado en Firestore.');
          return of(null);
        }
      })
    );
  }
}


