import { ComponentFixture, TestBed } from '@angular/core/testing';
import { commonTestImports, commonTestProviders } from '../shared/testing/test-providers';

import { LegalNoticeComponent } from './legal-notice.component';

describe('LegalNoticeComponent', () => {
  let component: LegalNoticeComponent;
  let fixture: ComponentFixture<LegalNoticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LegalNoticeComponent, ...commonTestImports],
      providers: [...commonTestProviders],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LegalNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
