import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Contato } from '../../modelo/contato';
import { ContatosService } from '../../servicos/contatos.service';
import { AsyncPipe } from '@angular/common';
import { ContatoComponent } from '../contato/contato.component';

@Component({
  selector: 'app-lista-contatos',
  standalone: true,
  imports: [AsyncPipe, ContatoComponent],
  templateUrl: './lista-contatos.component.html',
  styleUrl: './lista-contatos.component.css',
})
export class ListaContatosComponent implements OnInit {
  contatos$!: Observable<Contato[]>;
  private contatosService = inject(ContatosService);

  ngOnInit(): void {
    this.contatos$ = this.contatosService.obterTodosContatos();
  }
}
