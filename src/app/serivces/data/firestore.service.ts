import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { User } from '../../models/user';


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  //public firestore: AngularFirestore;
  constructor(public firestore: AngularFirestore) { }

  createUser(nom:string,prenom:string,tel:string,password:string):Promise<void>{
    const id = this.firestore.createId();
    console.log(id);
    return this.firestore.doc(`users/${id}`).set({
      nom,
      prenom,
      tel,
      password,
    });
  }

  getUserList() {
    return this.firestore.collection(`users`).snapshotChanges();
  }
}
