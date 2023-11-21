import { TestBed } from '@angular/core/testing';
import { ServicedatosService } from './servicesdatos.service';

describe('ServicesdatosService', () => {
  let service: ServicedatosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicedatosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
