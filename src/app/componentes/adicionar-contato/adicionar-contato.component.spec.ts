import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarContatoComponent } from './adicionar-contato.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { provideNgxMask } from 'ngx-mask';

describe('AdicionarContatoComponent', () => {
  let component: AdicionarContatoComponent;
  let fixture: ComponentFixture<AdicionarContatoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdicionarContatoComponent],
      providers: [provideRouter([]), NgbActiveModal, provideNgxMask()],
    }).compileComponents();

    fixture = TestBed.createComponent(AdicionarContatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
