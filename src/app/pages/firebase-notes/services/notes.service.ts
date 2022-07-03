import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(
    private db: AngularFireDatabase
  ) { }

  getNotes() {
    const ref = this.db.list('notes');
    return ref.valueChanges([], { idField: 'id' });
  }

  getNoteById(id: string) {
    const ref = this.db.object(`notes/${id}`);
    return ref.valueChanges();
  }

  updateNote(id: string, value: any) {
    const ref = this.db.list('notes');
    return ref.update(id, value);
  }

  addNote(value: any) {
    const ref = this.db.list('notes');
    return ref.push(value);
  }

  deleteNote(id: string) {
    const ref = this.db.list('notes');
    return ref.remove(id);
  }
}
