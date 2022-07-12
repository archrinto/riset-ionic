import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  minHour: number;
  maxHour: number;
  minMinute: number;
  maxMinute: number;
  timePart: string = 'AM';
  minTime: moment.Moment;
  maxTime: moment.Moment;
  amDisabled: boolean = false;
  pmDisabled: boolean = false;

  hourValues: Array<number>;
  minuteValues: Array<number>;

  @Input() value: string; // string date time
  @Input() min: string; // string date time
  @Input() max: string; // string date time
  @Input() disabled: boolean = false;
  @Input() hourInterval: number = 1;
  @Input() minuteInterval: number = 10;

  @Output() onChange = new EventEmitter<string>();

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

    this.minute = Math.ceil(this.minute / this.minuteInterval) * this.minuteInterval;

    this.hourValues = this.getHourOptions();
    this.minuteValues = this.getMinuteOptions();

    this.validateTimeOptions();
  }

  convert24to12(time24) {
    return [time24.hour() % 12 || 12, time24.minute(), time24.format('A')];
  }

  nextHour() {
    const nextH = this.hour + this.hourInterval; 
    if (nextH <= this.maxHour) {
      this.setHour(nextH);
    } else {
      if (nextH < this.hourValues[this.hourValues.length - 1]) {
        this.timePart = 'PM';
      }
    }
    this.timeChanged();
  }

  prevHour() {
    let prevH = this.hour - this.hourInterval
    if (prevH >= this.minHour) {
      this.setHour(prevH);
    } else {
      if (prevH < 0) {
        prevH = 12 + prevH
      }

      if (prevH > this.hourValues[0]) {
        this.timePart = 'AM';
        this.setHour(prevH);
      }
    }
    this.timeChanged();
  }

  nextMinute() {
    if ((this.minute + this.minuteInterval) <= this.maxMinute) {
      this.minute += this.minuteInterval;
    }
    this.timeChanged();
  }

  prevMinute() {
    if ((this.minute - this.minuteInterval) >= this.minMinute) {
      this.minute -= this.minuteInterval;
    }
    this.timeChanged();
  }

  minuteFormatted() {
    return this.numberPadding(this.minute);
  }

  hourFormatted() {
    return this.numberPadding(this.hour === 0 ? 12 : this.hour);
  }

  numberPadding(numb: number) {
    return numb?.toString().padStart(2, '0');
  }

  getHour24() {
    return this.hour + (this.timePart === 'PM' ? 12 : 0);
  }

  setHour(hour) {
    this.hour = hour;
    this.minuteValues = this.getMinuteOptions();
  }

  validateTimeOptions() {
    // validate min hour options
    if (this.timePart === 'AM') {
      const validHours = this.hourValues.filter(h => h < 12);
      this.minHour = validHours[0];
      this.maxHour = validHours[validHours.length - 1];
    } else {
      const validHours = this.hourValues.filter(h => h >= 12);
      // this.minHour = validHours[0] > 12 ? validHours[0] % 12 : validHours[0];
      this.minHour = validHours[0] % 12;
      this.maxHour = validHours[validHours.length - 1] % 12;
    }

    if (this.hour < this.minHour || this.hour > this.maxHour) {
      this.setHour(this.minHour);
    }

    this.minMinute = this.minuteValues[0] ?? 0;
    this.maxMinute = this.minuteValues[this.minuteValues.length - 1] ?? 0;

    if (this.minute < this.minMinute || this.minute > this.maxMinute) {
      this.minute = this.minMinute;
    }
  }

  getHourOptions() {
    const hourOpts = [];
    const [minH, minM] = [this.minTime.hour(), this.minTime.minute()];
    const [maxH, maxM] = [this.maxTime.hour(), this.maxTime.minute()];

    for (let h = minH; h < (maxM > 0 ? maxH+1 : maxH); h = h + this.hourInterval) {
      hourOpts.push(h);
    }
    return hourOpts;
  }

  getMinuteOptions() {
    let minM = this._minMinute;
    let maxM = this._maxMinute;
    const minuteOpts = [];

    if (this.getHour24() === this.minTime.hour()) {
      minM = this.minTime.minute();
    }
    if (this.getHour24() === this.maxTime.hour()) {
      maxM = this.maxTime.minute();
    }

    minM = Math.ceil(minM / this.minuteInterval) * this.minuteInterval;
    maxM = Math.ceil(maxM / this.minuteInterval) * this.minuteInterval;
    
    for (let m = minM; m < maxM; m = m + this.minuteInterval) {
      minuteOpts.push(m);
    }

    return minuteOpts;
  }

  timeChanged() {
    this.validateTimeOptions();
    this.onChange.emit(`${this.hourFormatted()}:${this.minuteFormatted()} ${this.timePart}`);
  }

  partChanged() {
    this.timeChanged();
  }

}
