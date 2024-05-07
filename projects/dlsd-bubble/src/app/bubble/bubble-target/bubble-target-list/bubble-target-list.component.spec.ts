import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BubbleTargetListComponent } from './bubble-target-list.component';

describe('BubbleTargetListComponent', () => {
  let component: BubbleTargetListComponent;
  let fixture: ComponentFixture<BubbleTargetListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BubbleTargetListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BubbleTargetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
