import { ComponentFixture, TestBed } from '@angular/core/testing';
import { commonTestImports, commonTestProviders } from '../shared/testing/test-providers';

import { PortfolioComponent } from './portfolio.component';

describe('PortfolioComponent', () => {
  let component: PortfolioComponent;
  let fixture: ComponentFixture<PortfolioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfolioComponent, ...commonTestImports],
      providers: [...commonTestProviders],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
