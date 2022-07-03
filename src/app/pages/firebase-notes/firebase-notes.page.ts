import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { NoteFormComponent } from './components/note-form/note-form.component';
import { NotesService } from './services/notes.service';

@Component({
  selector: 'app-firebase-notes',
  templateUrl: './firebase-notes.page.html',
  styleUrls: ['./firebase-notes.page.scss'],
})
export class FirebaseNotesPage implements OnInit, OnDestroy {

  private notes: any[];

  notesSubscription: Subscription;

  constructor(
    private notesService: NotesService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.notesSubscription = this.notesService.getNotes().subscribe(data => {
      this.notes = data;
      console.log('-- load notes');
    })
  }

  async openNote(note) {
    const modal = await this.modalCtrl.create({
      component: NoteFormComponent,
      componentProps: { id: note.id },
      breakpoints: [0, 0.5, 0.8],
      initialBreakpoint: 0.5,
    });
    modal.present();
  }

  async addNote() {
    const modal = await this.modalCtrl.create({
      component: NoteFormComponent,
      componentProps: {},
      breakpoints: [0, 0.5, 0.8],
      initialBreakpoint: 0.5,
    });
    modal.present();
  }

  ngOnDestroy(): void {
    if (this.notesSubscription) {
      this.notesSubscription.unsubscribe();
    }
  }

}
