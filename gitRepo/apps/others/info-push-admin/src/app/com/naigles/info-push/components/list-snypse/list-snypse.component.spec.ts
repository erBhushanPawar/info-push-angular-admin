import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSnypseComponent } from './list-snypse.component';

describe('ListSnypseComponent', () => {
  let component: ListSnypseComponent;
  let fixture: ComponentFixture<ListSnypseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSnypseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSnypseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
