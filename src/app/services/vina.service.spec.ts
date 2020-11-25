import { TestBed } from '@angular/core/testing';

import { VinaService } from './vina.service';

describe('VinaService', () => {
  let service: VinaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VinaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
