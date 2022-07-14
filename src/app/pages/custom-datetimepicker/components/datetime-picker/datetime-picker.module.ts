import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePickerComponent } from '../date-picker/date-picker.component';
import { TimePickerComponent } from '../time-picker/time-picker.component';
import { IonicModule } from '@ionic/angular';
import { DatetimePickerComponent } from './datetime-picker.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
  ],
  declarations: [DatetimePickerComponent, DatePickerComponent, TimePickerComponent],
  exports: [DatePickerComponent, DatetimePickerComponent, TimePickerComponent]
})
export class DatetimePickerModule { }
