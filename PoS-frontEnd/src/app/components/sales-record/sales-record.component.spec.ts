import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesRecordComponent } from './sales-record.component';

describe('SalesRecordComponent', () => {
  let component: SalesRecordComponent;
  let fixture: ComponentFixture<SalesRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
