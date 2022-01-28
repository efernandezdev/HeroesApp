import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHeroesComponent } from './add-heroes.component';

describe('AddHeroesComponent', () => {
  let component: AddHeroesComponent;
  let fixture: ComponentFixture<AddHeroesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddHeroesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
