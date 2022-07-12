import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import * as moment from 'moment';

interface DateOption {
  date: moment.Moment,
  isActive: boolean
}

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
})
export class DatePickerComponent implements OnInit {
  @ViewChild('slides', {static: true}) slides: IonSlides;

  _dateList: DateOption[];
  
  minDate: moment.Moment;
  maxDate: moment.Moment;
  selectedIndex: number;

  @Input() min: string; // YYYY-MM-DD
  @Input() max: string; // YYYY-MM-DD
  @Input() value: string;
  @Input() disabled: boolean = false;
  @Input() daysDisabled: string[];

  @Output() onChange = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
    this.minDate = moment();
    this.maxDate = moment().add(1, 'months');

    if (this.min) {
      this.minDate = moment(this.min);
      if (!this.max) {
        this.maxDate = moment(this.min).add(1, 'months');
      }
    }

    if (this.max) {
      this.maxDate = moment(this.max);
      if (!this.min) {
        this.minDate = moment(this.max).add(-1, 'months');
      }
    }

    if (this.value) {
      if (!this.min && !this.max) {
        this.minDate = moment(this.value).add(-3, 'days');
        this.maxDate = moment(this.value).add(4, 'days');
      }
    }

    this._dateList = this.getDateRange(this.minDate, this.maxDate);

    if (this.value) {
      this.initValue();
    }
  }

  initValue() {
    const value = moment(this.value);
    this.selectedIndex = this.getIndexOf(value);

    this.slides.slideTo(this.selectedIndex - 2  < 0 ? this.selectedIndex : this.selectedIndex - 2);

    setTimeout(() => {
      this.slides.lockSwipes(this.disabled);
    }, 300)
  }

  getIndexOf(value: moment.Moment) {
    for (let i = 0; i < this._dateList.length; i++) {
      if (value.isSame(this._dateList[i].date)) {
        return i;
      }
    }
  }

  getDateRange(start: moment.Moment, end: moment.Moment) {
    let dates: DateOption[] = [];
    let current = start.clone();

    while (current.isBefore(end)) {
      const day = current.format('dddd').toLowerCase();

      dates.push({
        date: current.clone(),
        isActive: this.daysDisabled?.includes(day) ? false : true
      });

      current = current.clone().add(1, 'days');
    }

    return dates;
  }

  selectIndex(index: number) {
    this.selectedIndex = index;
    this.valueChange()
  }

  valueChange() {
    const value = this._dateList[this.selectedIndex].date.format('YYYY-MM-DD');
    this.onChange.emit(value);

    console.log('-- changed', value);
  }
}
