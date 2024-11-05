import { fakeAsync, TestBed } from '@angular/core/testing';

import { ContatosService } from './contatos.service';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

describe('ContatosService', () => {
  let service: ContatosService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ContatosService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ContatosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Adicionando contato', () => {
    const contato = {
      id: 1,
      nome: 'Teste',
      telefone: '123456789',
      email: 'teste@teste.com',
      endereco: 'Rua Teste',
      observacao: 'Observação',
      dataNascimento: new Date(),
    };
    service.adicionarContato(contato).subscribe((contato) => {
      expect(contato).toEqual(contato);
    });

    const req = httpMock.expectOne({
      url: 'http://localhost:5134/contatos',
      method: 'POST',
    });

    req.flush(contato);
  });

  it('Listando contatos', () => {
    const contatos = [
      {
        id: 1,
        nome: 'Teste',
        telefone: '123456789',
        email: 'teste@teste.com',
        endereco: 'Rua Teste',
        observacao: 'Observação',
        dataNascimento: new Date(),
      },
      {
        id: 2,
        nome: 'Teste 2',
        telefone: '123456789',
        email: 'teste@teste.com',
        endereco: 'Rua Teste',
        observacao: 'Observação',
        dataNascimento: new Date(),
      },
    ];
    service.obterTodosContatos().subscribe((contatos) => {
      expect(contatos).toEqual(contatos);
    });

    const req = httpMock.expectOne({
      url: 'http://localhost:5134/contatos',
      method: 'GET',
    });
    req.flush({ data: contatos });
  });

  it('Obtendo contato por id', () => {
    const contato = {
      id: 1,
      nome: 'Teste',
      telefone: '123456789',
      email: 'teste@teste.com',
      endereco: 'Rua Teste',
      observacao: 'Observação',
      dataNascimento: new Date(),
    };
    service.obterContatoPorId(1).subscribe((contato) => {
      expect(contato).toEqual(contato);
    });
    const req = httpMock.expectOne({
      url: 'http://localhost:5134/contatos/1',
      method: 'GET',
    });
    req.flush({ data: contato });
  });

  it('Atualizando contato', () => {
    const contato = {
      id: 1,
      nome: 'Teste',
      telefone: '123456789',
      email: 'teste@teste.com',
      endereco: 'Rua Teste',
      observacao: 'Observação',
      dataNascimento: new Date(),
    };
    service.atualizarContato(contato).subscribe((contato) => {
      expect(contato).toEqual(contato);
    });
    const req = httpMock.expectOne({
      url: 'http://localhost:5134/contatos/1',
      method: 'PUT',
    });
    req.flush({ data: contato });
  });

  it('Excluindo contato', () => {
    const contato = {
      id: 1,
      nome: 'Teste',
      telefone: '123456789',
      email: 'teste@teste.com',
      endereco: 'Rua Teste',
      observacao: 'Observação',
      dataNascimento: new Date(),
    };
    service.excluirContato(1).subscribe((contato) => {
      expect(contato).toEqual(contato);
    });
    const req = httpMock.expectOne({
      url: 'http://localhost:5134/contatos/1',
      method: 'DELETE',
    });
    req.flush({ data: contato });
  });
});
