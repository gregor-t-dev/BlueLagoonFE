import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IamRoot } from './iam-root';

describe('IamRoot', () => {
  let component: IamRoot;
  let fixture: ComponentFixture<IamRoot>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IamRoot],
    }).compileComponents();

    fixture = TestBed.createComponent(IamRoot);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
