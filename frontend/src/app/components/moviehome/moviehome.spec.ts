import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Moviehome } from './moviehome';

describe('Moviehome', () => {
  let component: Moviehome;
  let fixture: ComponentFixture<Moviehome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Moviehome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Moviehome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
