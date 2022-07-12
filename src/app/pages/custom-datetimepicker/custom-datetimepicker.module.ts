import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomDatetimepickerPageRoutingModule } from './custom-datetimepicker-routing.module';

import { CustomDatetimepickerPage } from './custom-datetimepicker.page';
import { TimePickerComponent } from './components/time-picker/time-picker.component';
import { DatePickerComponent } from './components/date-picker/date-picker.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomDatetimepickerPageRoutingModule
  ],
  declarations: [CustomDatetimepickerPage, TimePickerComponent, DatePickerComponent]
})
export class CustomDatetimepickerPageModule {}
