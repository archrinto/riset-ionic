import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FirestoreUserPageRoutingModule } from './firestore-user-routing.module';

import { FirestoreUserPage } from './firestore-user.page';
import { UserItemComponent } from './components/user-item/user-item.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FirestoreUserPageRoutingModule
  ],
  declarations: [FirestoreUserPage, UserItemComponent]
})
export class FirestoreUserPageModule {}
