import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss'],
})
export class TimePickerComponent implements OnInit {

  _minHour = 1;
  _maxHour = 12;
  _minMinute = 0;
  _maxMinute = 59;

  hour: number;
  minute: number;
  minuteInterval = 10;
  minHour: number;
  maxHour: number;
  minMinute: number;
  maxMinute: number;
  timePart: string = 'AM';
  minTime: moment.Moment;
  maxTime: moment.Moment;
  amDisabled: boolean = false;
  pmDisabled: boolean = false;

  @Input() value: string; // string date time
  @Input() min: string; // string date time
  @Input() max: string; // string date time
  @Input() disabled: boolean = false;
  @Input() hourInterval: number = 1;

  constructor() {
    this.minHour = this._minHour;
    this.maxHour = this._maxHour;
    this.minMinute = this._minMinute;
    this.maxMinute = this._maxMinute;
  }

  ngOnInit() {
    if (this.min) {
      this.minTime = moment(this.min);
      this.amDisabled = this.minTime.hour() >= 12;
    } else {
      this.minTime = moment('00:00', 'HH:mm');
    }

    if (this.max) {
      this.maxTime = moment(this.max);
      this.pmDisabled = this.maxTime.hour() < 12;
    } else {
      this.maxTime = moment('23:59', 'HH:mm');
    }

    console.log(this.minTime, this.maxTime);

    let now = moment();
    if (this.value) {
      now = moment(this.value);
    }

    [this.hour, this.minute, this.timePart] = this.convert24to12(now);
    this.validTimeOption();
  }

  convert24to12(time24) {
    return [time24.hour() % 12 || 12, time24.minute(), time24.format('A')];
  }

  nextHour() {
    if ((this.hour + this.hourInterval) <= this.maxHour) {
      this.hour += this.hourInterval;
    }
  }

  prevHour() {
    if ((this.hour - this.hourInterval) >= this.minHour) {
      this.hour -= this.hourInterval;
      if (this.hour === this.minHour) {
        if (this.minute < this.minMinute) {
          this.minute = this.minMinute;
        }
      }
    }
  }

  nextMinute() {
    if ((this.minute + this.minuteInterval) <= this.maxMinute) {
      this.minute += this.minuteInterval;
    }
  }

  prevMinute() {
    if ((this.minute - this.minuteInterval) >= this.minMinute) {
      this.minute -= this.minuteInterval;
    }
  }

  minuteFormatted() {
    return this.numberPadding(this.minute);
  }

  hourFormatted() {
    return this.numberPadding(this.hour);
  }

  numberPadding(numb: number) {
    return numb?.toString().padStart(2, '0');
  }

  validTimeOption() {
    const [minHH, minMM, minAA] = this.convert24to12(this.minTime);
    const [maxHH, maxMM, maxAA] = this.convert24to12(this.maxTime);

    if (minAA === 'PM') {
      if (this.timePart === 'AM') {
        this.timePart = 'PM';
      }

      this.amDisabled = true;
    }

    if (maxAA === 'AM') {
      this.pmDisabled = true;
    }

    if (this.timePart === 'AM') {
      if (minAA === 'AM') {
        this.minHour = minHH;
        this.minMinute = minMM;
      }
    } else {
      if (minAA === 'AM') {
        this.minHour = this._minHour;
        this.minMinute = this._minHour;
      } else {
        this.minHour = minHH;
        this.minMinute = minMM;
      }
    }

    if (this.hour < this.minHour) {
      this.hour = this.minHour;
      if (this.minute < this.minMinute) {
        this.minute = this.minMinute;
      }
    }

  }

  partChanged() {
    this.validTimeOption();
  }

}
