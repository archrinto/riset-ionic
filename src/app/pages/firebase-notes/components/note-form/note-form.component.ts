import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { NotesService } from '../../services/notes.service';

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.scss'],
})
export class NoteFormComponent implements OnInit, OnDestroy {
  @Input() id: string;

  title: string;
  content: string;

  noteSubscription: Subscription;

  constructor(
    private notesService: NotesService,
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {
    if (this.id) {
      this.noteSubscription = this.notesService.getNoteById(this.id).subscribe((res: any) => {
        console.log('updated')
        this.title = res?.title;
        this.content = res?.content;

        console.log('-- load detail note');
      });
    }
  }

  handleSubmit() {
    if (this.id) {
      this.notesService.updateNote(this.id, {
        title: this.title,
        content: this.content
      });
    } else {
      this.notesService.addNote({
        title: this.title,
        content: this.content
      });
    }
    this.modalCtrl.dismiss();
  }

  ngOnDestroy(): void {
    if (this.noteSubscription) {
      this.noteSubscription.unsubscribe();
    }
  }

}
