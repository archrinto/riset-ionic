import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CustomDatetimepickerPage } from './custom-datetimepicker.page';

describe('CustomDatetimepickerPage', () => {
  let component: CustomDatetimepickerPage;
  let fixture: ComponentFixture<CustomDatetimepickerPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomDatetimepickerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CustomDatetimepickerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
