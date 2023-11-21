import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, Timestamp } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private db;

  constructor() {
    const firebaseConfig = {
      apiKey: "AIzaSyBVM0ACcit2e7YNzLWyYjp2rv3X8LpQ7iQ",
      authDomain: "registrapp-21467.firebaseapp.com",
      projectId: "registrapp-21467",
      storageBucket: "registrapp-21467.appspot.com",
      messagingSenderId: "689439946150",
      appId: "1:689439946150:web:873960ade6518d7783cb67",
      measurementId: "G-9565W4GYPS"
    };

    const firebaseApp = initializeApp(firebaseConfig);
    this.db = getFirestore(firebaseApp);
  }

  // async writeDataToFirestore() {
  //   const usuario = {
  //     email: 'example@example.com',
  //     fullname: 'John Doe',
  //     password: 'secretPassword',
  //     dateExample: Timestamp.fromDate(new Date("December 10, 1815")),
  //     arrayExample: [5, true, 'hello'],
  //     nullExample: null,
  //     objectExample: {
  //       a: 5,
  //       b: {
  //         nested: 'foo',
  //       },
  //     },
  //   };

  //   await setDoc(doc(this.db, 'data', 'one'), usuario);
  // }
}
