import { async, TestBed } from '@angular/core/testing';
import { DataAccessUserModule } from './data-access-user.module';

describe('DataAccessUserModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DataAccessUserModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(DataAccessUserModule).toBeDefined();
  });
});
