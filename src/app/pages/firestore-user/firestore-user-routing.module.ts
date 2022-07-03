import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FirestoreUserPage } from './firestore-user.page';

const routes: Routes = [
  {
    path: '',
    component: FirestoreUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FirestoreUserPageRoutingModule {}
