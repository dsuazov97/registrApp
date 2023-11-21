import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QralumnoPage } from './qralumno.page';
import { IonicModule } from '@ionic/angular';

describe('QralumnoPage', () => {
  let component: QralumnoPage;
  let fixture: ComponentFixture<QralumnoPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QralumnoPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QralumnoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
