import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BubbleTargetComponent } from './bubble-target.component';

describe('BubbleTargetComponent', () => {
  let component: BubbleTargetComponent;
  let fixture: ComponentFixture<BubbleTargetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BubbleTargetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BubbleTargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
