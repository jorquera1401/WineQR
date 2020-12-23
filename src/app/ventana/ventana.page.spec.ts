import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VentanaPage } from './ventana.page';

describe('VentanaPage', () => {
  let component: VentanaPage;
  let fixture: ComponentFixture<VentanaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VentanaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VentanaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
