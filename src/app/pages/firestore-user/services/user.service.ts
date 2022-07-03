import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private db: AngularFirestore
  ) { }

  getUsers() {
    const userCollection = this.db.collection<User>('users');
    return userCollection.valueChanges({ idField: 'id' });
  }

  getUserById(id: string) {
    const userDoc = this.db.collection<User>(`users`).doc(id);
    return userDoc.valueChanges({ idField: 'id' });
  }

  addUser(user: User) {
    const userCollection = this.db.collection<User>('users');
    return userCollection.add(user);
  }
  
  updateUser(id, values) {
    const userDoc = this.db.doc<User>(`users/${id}`);
    return userDoc.update(values);
  }
}
