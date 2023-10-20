import { TestBed } from '@angular/core/testing';

import { WeaponInterfaceService } from './weaponinterface.service';

describe('WeaponinterfaceService', () => {
  let service: WeaponInterfaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeaponInterfaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
