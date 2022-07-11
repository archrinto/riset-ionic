import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'push-notification',
    loadChildren: () => import('./pages/push-notification/push-notification.module').then( m => m.PushNotificationPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'firebase-notes',
    loadChildren: () => import('./pages/firebase-notes/firebase-notes.module').then( m => m.FirebaseNotesPageModule)
  },
  {
    path: 'firestore-user',
    loadChildren: () => import('./pages/firestore-user/firestore-user.module').then( m => m.FirestoreUserPageModule)
  },
  {
    path: 'custom-datetimepicker',
    loadChildren: () => import('./pages/custom-datetimepicker/custom-datetimepicker.module').then( m => m.CustomDatetimepickerPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
