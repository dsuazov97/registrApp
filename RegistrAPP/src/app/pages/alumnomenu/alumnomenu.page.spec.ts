import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlumnomenuPage } from './alumnomenu.page';

describe('AlumnomenuPage', () => {
  let component: AlumnomenuPage;
  let fixture: ComponentFixture<AlumnomenuPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AlumnomenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
