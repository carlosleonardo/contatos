import { Component, inject, OnInit, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Contato } from '../../modelo/contato';
import { ContatosService } from '../../servicos/contatos.service';
import { AsyncPipe } from '@angular/common';
import { ContatoComponent } from '../contato/contato.component';
import { AdicionarContatoComponent } from '../adicionar-contato/adicionar-contato.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-lista-contatos',
  standalone: true,
  imports: [AsyncPipe, ContatoComponent, AdicionarContatoComponent],
  templateUrl: './lista-contatos.component.html',
  styleUrl: './lista-contatos.component.css',
})
export class ListaContatosComponent implements OnInit {
  private servicoModal = inject(NgbModal);

  adicionarContato() {
    const ref = this.servicoModal.open(AdicionarContatoComponent, {
      backdrop: 'static',
    });
    ref.componentInstance.editando.set(false);
    ref.componentInstance.contato.set({
      nome: '',
      telefone: '',
      email: '',
      endereco: '',
      dataNascimento: new Date(),
      observacao: '',
    });
    ref.closed.subscribe((contato: Contato) => {
      if (contato) {
        this.contatosService
          .adicionarContato(contato)
          .pipe(tap((contato) => console.log(contato)))
          .subscribe();
      }
    });
  }
  contatos$!: Observable<Contato[]>;
  private contatosService = inject(ContatosService);
  mostrar = signal(false);

  ngOnInit(): void {
    this.contatos$ = this.contatosService.obterTodosContatos();
  }
}
