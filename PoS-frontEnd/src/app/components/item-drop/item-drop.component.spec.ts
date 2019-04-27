import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDropComponent } from './item-drop.component';

describe('ItemDropComponent', () => {
  let component: ItemDropComponent;
  let fixture: ComponentFixture<ItemDropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemDropComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
