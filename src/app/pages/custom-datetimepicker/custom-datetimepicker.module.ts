import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomDatetimepickerPageRoutingModule } from './custom-datetimepicker-routing.module';

import { CustomDatetimepickerPage } from './custom-datetimepicker.page';
import { DatetimePickerModule } from './components/datetime-picker/datetime-picker.module';
import { DatetimePickerComponent } from './components/datetime-picker/datetime-picker.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomDatetimepickerPageRoutingModule,
    DatetimePickerModule
  ],
  declarations: [CustomDatetimepickerPage]
})
export class CustomDatetimepickerPageModule {}
