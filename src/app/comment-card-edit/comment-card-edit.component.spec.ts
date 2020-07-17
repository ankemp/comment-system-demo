import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentCardEditComponent } from './comment-card-edit.component';

describe('CommentCardEditComponent', () => {
  let component: CommentCardEditComponent;
  let fixture: ComponentFixture<CommentCardEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentCardEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentCardEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
