import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NicknameModalComponent } from './nickname-modal.component';

describe('NicknameModalComponent', () => {
  let component: NicknameModalComponent;
  let fixture: ComponentFixture<NicknameModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NicknameModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NicknameModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
