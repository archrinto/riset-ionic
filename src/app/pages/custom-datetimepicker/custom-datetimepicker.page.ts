import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom-datetimepicker',
  templateUrl: './custom-datetimepicker.page.html',
  styleUrls: ['./custom-datetimepicker.page.scss'],
})
export class CustomDatetimepickerPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  handleDateTimeChange(value) {
    console.log(value);
  }

}
