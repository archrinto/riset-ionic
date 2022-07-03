import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit, OnDestroy {
  @Input() userId: string;

  name: string;
  picture: string;
  email: string;
  isOnline: boolean = false;
  bio: string;

  userDocSubcription: Subscription;

  constructor(
    private userService: UserService,
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {
    console.log('init user form');
    if (this.userId) {
      this.userDocSubcription = this.userService.getUserById(this.userId).subscribe((res: User) => {
        this.name = res?.name;
        this.bio = res?.bio;
        this.email = res?.email;
        this.picture = res?.picture;
        this.isOnline = res?.isOnline;
        console.log('-- reload detail user');
        console.log(res);
      });
    }
  }

  handleSubmit() {
    const params: User = {
      name: this.name,
      email: this.email,
      picture: this.picture,
      bio: this.bio,
      isOnline: this.isOnline
    };

    if (this.userId) {
      this.userService.updateUser(this.userId, params);
    } else {
      this.userService.addUser(params);
    }

    this.modalCtrl.dismiss();
  }

  onChange(test) {
    console.log(test);
  }

  ngOnDestroy(): void {
    if (this.userDocSubcription) {
      this.userDocSubcription.unsubscribe();
      console.log('-- unsubscribe detail');
    }
    console.log('destroyed');
  }

}
