import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailerComponent } from './detailer.component';

describe('DetailerComponent', () => {
  let component: DetailerComponent;
  let fixture: ComponentFixture<DetailerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
