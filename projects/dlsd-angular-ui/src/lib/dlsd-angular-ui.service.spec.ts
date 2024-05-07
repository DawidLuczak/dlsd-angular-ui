import { TestBed } from '@angular/core/testing';

import { DlsdAngularUiService } from './dlsd-angular-ui.service';

describe('DlsdAngularUiService', () => {
  let service: DlsdAngularUiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DlsdAngularUiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
