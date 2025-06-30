import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Contato } from '../../modelo/contato';
import { ContatosService } from '../../servicos/contatos.service';
import { AsyncPipe } from '@angular/common';
import { ContatoComponent } from '../contato/contato.component';
import { AdicionarContatoComponent } from '../adicionar-contato/adicionar-contato.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BuscadorComponent } from '../buscador/buscador.component';

@Component({
    selector: 'app-lista-contatos',
    imports: [
        ContatoComponent,
        AdicionarContatoComponent,
        BuscadorComponent,
    ],
    templateUrl: './lista-contatos.component.html',
    styleUrl: './lista-contatos.component.css'
})
export class ListaContatosComponent implements OnInit {
  buscarContato(texto: string) {
    if (texto.length === 0) {
      this.contatosService.obterTodosContatos().subscribe((contatos) => {
        this.contatos.set(contatos);
        this.contatosFiltrados.set(contatos);
      });
    } else {
      this.contatos.set(
        this.contatosFiltrados()?.filter((contato) => {
          return contato.nome.toLowerCase().includes(texto.toLowerCase());
        })
      );
    }
  }
  aoExcluirContato(contatoExcluido: Contato) {
    this.contatos.update((contatos) =>
      contatos?.filter((contato) => contato !== contatoExcluido)
    );
  }

  aoEditarContato(contatoEditado: Contato) {
    //console.log('Contato editado: ', contatoEditado);
    this.contatos.update((contatos) =>
      contatos?.map((contato) =>
        contato.id === contatoEditado.id ? contatoEditado : contato
      )
    );
    //console.log('Contatos-evento recebido ', this.contatos());
  }

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
          .subscribe((contato) => {
            this.contatos.update((contatos) =>
              contatos ? [...contatos, contato] : [contato]
            );
          });
      }
    });
  }
  contatos = signal<Contato[] | undefined>([]);
  contatosFiltrados = signal<Contato[] | undefined>([]);
  private contatosService = inject(ContatosService);

  totalContatos = computed(() => this.contatos()?.length);

  ngOnInit(): void {
    this.contatosService.obterTodosContatos().subscribe((contatos) => {
      this.contatos.set(contatos);
      this.contatosFiltrados.set(contatos);
    });
  }
}
