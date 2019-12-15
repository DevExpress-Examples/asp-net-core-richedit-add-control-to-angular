import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RicheditComponent } from './richedit.component';

describe('RicheditComponent', () => {
  let component: RicheditComponent;
  let fixture: ComponentFixture<RicheditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RicheditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RicheditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
