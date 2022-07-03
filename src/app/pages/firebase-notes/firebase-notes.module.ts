import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FirebaseNotesPageRoutingModule } from './firebase-notes-routing.module';

import { FirebaseNotesPage } from './firebase-notes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FirebaseNotesPageRoutingModule,
  ],
  declarations: [FirebaseNotesPage]
})
export class FirebaseNotesPageModule {}
