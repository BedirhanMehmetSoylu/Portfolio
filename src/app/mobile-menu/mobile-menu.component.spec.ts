import { ComponentFixture, TestBed } from '@angular/core/testing';
import { commonTestImports, commonTestProviders } from '../shared/testing/test-providers';

import { MobileMenuComponent } from './mobile-menu.component';

describe('MobileMenuComponent', () => {
  let component: MobileMenuComponent;
  let fixture: ComponentFixture<MobileMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileMenuComponent, ...commonTestImports],
      providers: [...commonTestProviders],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MobileMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
