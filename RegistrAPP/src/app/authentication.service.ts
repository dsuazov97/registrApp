import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, from, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';



@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private ngFireAuth: AngularFireAuth,
    private angularFirestore: AngularFirestore
  ) {}

  // Autentificando el usuario con AuthenticationService y enviando demás información con el UID
  // a una base de datos del mismo Usuario ( no directamente vinculado ) información extra

  async registerUser(fullname: string, email: string, password: string, cuenta: string, numero: number) {
    try {
      const userCredential = await this.ngFireAuth.createUserWithEmailAndPassword(
        email,
        password
      );

      const userId = userCredential.user.uid;

      await this.angularFirestore.collection('usuarios').doc(userId).set({
        fullname,
        email,
        cuenta,
        numero,
        // Agrega más campos aquí si es necesario
      });

      return userCredential.user;
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

  async updateUserProfile(uid: string, data: any) {
    try {
      // Actualizar el documento del usuario en la colección 'usuarios'
      await this.angularFirestore.collection('usuarios').doc(uid).update(data);
    } catch (error) {
      console.error('Error al actualizar el perfil del usuario:', error);
      throw error;
    }
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

  async updatePhoneNumber(uid: string, newPhoneNumber: number) {
    try {
      console.log('Antes de updatePhoneNumber - UID:', uid); // Agregado para depuración
  
      if (!uid) {
        console.error('Error: UID no proporcionado.');
        return;
      }
  
      console.log('Actualizando número de teléfono...');
      
      const userRef = this.angularFirestore.collection('usuarios').doc(uid);
      const userData = await userRef.get().toPromise();
  
      if (userData.exists) {
        console.log('Usuario encontrado. Actualizando número...');
        
        await userRef.update({
          numero: newPhoneNumber,
        });
        
        console.log('Número de teléfono actualizado exitosamente.');
      } else {
        console.error('Error: Usuario no encontrado en Firestore. UID:', uid);
      }
    } catch (error) {
      console.error('Error al actualizar el número de teléfono:', error);
      throw error;
    }
  }
  
  async updatePassword(uid: string, newPassword: string) {
    try {
      const user = await this.ngFireAuth.currentUser;
      await user.updatePassword(newPassword);
    } catch (error) {
      console.error('Error al actualizar la contraseña:', error);
      throw error;
    }
  }

  async generarAsistencia(asignatura: string, sala: string, docente: string, fullname: string, fecha: string) {
    const idAleatorio = uuidv4();
    await this.angularFirestore.collection('Asistencia').doc(idAleatorio).set({
      fullname,
      docente,
      fecha,
      sala,
      asignatura,
    });
  }
}
