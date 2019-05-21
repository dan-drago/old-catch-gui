import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovingObjectSearchViewComponent } from './moving-object-search-view.component';

describe('MovingObjectSearchViewComponent', () => {
  let component: MovingObjectSearchViewComponent;
  let fixture: ComponentFixture<MovingObjectSearchViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MovingObjectSearchViewComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovingObjectSearchViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
