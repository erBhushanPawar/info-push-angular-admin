import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSnypseComponent } from './create-snypse.component';

describe('CreateSnypseComponent', () => {
  let component: CreateSnypseComponent;
  let fixture: ComponentFixture<CreateSnypseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSnypseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSnypseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
