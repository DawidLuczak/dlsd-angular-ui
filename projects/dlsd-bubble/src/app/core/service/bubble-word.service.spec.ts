import { TestBed } from '@angular/core/testing';

import { BubbleWordService } from './bubble-word.service';

describe('BubbleWordService', () => {
  let service: BubbleWordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BubbleWordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
