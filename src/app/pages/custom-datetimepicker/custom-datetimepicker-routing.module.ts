import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomDatetimepickerPage } from './custom-datetimepicker.page';

const routes: Routes = [
  {
    path: '',
    component: CustomDatetimepickerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomDatetimepickerPageRoutingModule {}
