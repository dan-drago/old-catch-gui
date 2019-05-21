import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackgroundGraphicComponent } from './background-graphic.component';

describe('BackgroundGraphicComponent', () => {
  let component: BackgroundGraphicComponent;
  let fixture: ComponentFixture<BackgroundGraphicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BackgroundGraphicComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackgroundGraphicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
