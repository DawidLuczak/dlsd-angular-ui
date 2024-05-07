import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BubbleStreamComponent } from './bubble-stream.component';

describe('BubbleStreamComponent', () => {
  let component: BubbleStreamComponent;
  let fixture: ComponentFixture<BubbleStreamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BubbleStreamComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BubbleStreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
