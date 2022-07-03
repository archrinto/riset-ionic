import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { UserFormComponent } from './components/user-form/user-form.component';
import { User } from './models/user.model';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-firestore-user',
  templateUrl: './firestore-user.page.html',
  styleUrls: ['./firestore-user.page.scss'],
})
export class FirestoreUserPage implements OnInit, OnDestroy {

  users: Array<User> = [];

  usersSubscription: Subscription;

  constructor(
    private userService: UserService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(res => {
      this.users = res;
      console.log('-- reload user list');
    });
  }

  async editUser(user: User) {
    const modal = await this.modalCtrl.create({
      component: UserFormComponent,
      componentProps: { userId: user.id}  
    });
    modal.present();
  }

  ngOnDestroy(): void {
    if (this.usersSubscription) {
      this.usersSubscription.unsubscribe();
    }
    console.log('-- on destroy')
  }

}
