import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DlsdAngularUiComponent } from './dlsd-angular-ui.component';

describe('DlsdAngularUiComponent', () => {
  let component: DlsdAngularUiComponent;
  let fixture: ComponentFixture<DlsdAngularUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DlsdAngularUiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DlsdAngularUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
