import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FirebaseNotesPage } from './firebase-notes.page';

const routes: Routes = [
  {
    path: '',
    component: FirebaseNotesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FirebaseNotesPageRoutingModule {}
