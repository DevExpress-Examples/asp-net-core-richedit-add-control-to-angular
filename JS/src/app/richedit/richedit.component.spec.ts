import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RicheditComponent } from './richedit.component';

describe('RicheditComponent', () => {
  let component: RicheditComponent;
  let fixture: ComponentFixture<RicheditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RicheditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RicheditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
