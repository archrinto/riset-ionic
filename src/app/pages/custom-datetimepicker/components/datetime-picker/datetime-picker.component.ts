import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-datetime-picker',
  templateUrl: './datetime-picker.component.html',
  styleUrls: ['./datetime-picker.component.scss'],
})
export class DatetimePickerComponent implements OnInit {

  @Input() minDate: string; // YYYY-MM-DD
  @Input() maxDate: string; // YYYY-MM-DD
  @Input() minTime: string; // hh:mm A
  @Input() maxTime: string; // hh:mm A
  @Input() value: string;   // YYYY-MM-DD hh:mm A
  @Input() daysDisabled: Array<string>; // ['monday', 'sunday'] lowercase;
  @Input() disabled: boolean = false;
  @Input() minuteInterval: number = 1; // 1 - 60

  @Output() valueChange = new EventEmitter<string>();

  valueDate: string;
  valueTime: string;

  constructor() { }

  ngOnInit() {
    if (this.value) {
      const val = moment(this.value, 'YYYY-MM-DD hh:mm A');
      this.valueDate = val.format('YYYY-MM-DD');
      this.valueTime = val.format('hh:mm A');
    } else {
      const val = moment();
      this.valueDate = val.format('YYYY-MM-DD');
      this.valueTime = val.format('hh:mm A');
    }
  }

  handleTimeChange(time: string) {
    this.valueTime = time;
    this.value = `${this.valueDate} ${this.valueTime}`;

    this.handleDateTimeChange();
  }

  handleDateChange(date: string) {
    this.valueDate = date;
    this.value = `${this.valueDate} ${this.valueTime}`;

    this.handleDateTimeChange();
  }

  handleDateTimeChange() {
    this.valueChange.emit(this.value);

    // console.log('---', this.value);
  }

}
