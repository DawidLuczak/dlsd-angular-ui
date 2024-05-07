import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BubbleCreateComponent } from './bubble-create.component';

describe('BubbleCreateComponent', () => {
  let component: BubbleCreateComponent;
  let fixture: ComponentFixture<BubbleCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BubbleCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BubbleCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
