import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndpointConfigurations } from './endpoint-configurations';

describe('EndpointConfigurations', () => {
  let component: EndpointConfigurations;
  let fixture: ComponentFixture<EndpointConfigurations>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EndpointConfigurations],
    }).compileComponents();

    fixture = TestBed.createComponent(EndpointConfigurations);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
