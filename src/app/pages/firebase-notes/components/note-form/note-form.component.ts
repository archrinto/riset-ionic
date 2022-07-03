import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NotesService } from '../../services/notes.service';

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.scss'],
})
export class NoteFormComponent implements OnInit {
  @Input() id: string;

  title: string;
  content: string;

  constructor(
    private notesService: NotesService,
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {
    if (this.id) {
      this.notesService.getNoteById(this.id).subscribe((res: any) => {
        console.log('updated')
        this.title = res?.title;
        this.content = res?.content;
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

}
