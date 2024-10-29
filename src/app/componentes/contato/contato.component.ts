import { Component, inject, input, OnInit, output } from '@angular/core';
import { Contato } from '../../modelo/contato';
import { ContatosService } from '../../servicos/contatos.service';

@Component({
  selector: 'app-contato',
  standalone: true,
  imports: [],
  templateUrl: './contato.component.html',
  styleUrl: './contato.component.css',
})
export class ContatoComponent {
  contatosServico = inject(ContatosService);
  aoExcluirContato = output<Contato>();

  excluirContato(id: number | undefined) {
    if (!id) return;
    this.contatosServico
      .excluirContato(id)
      .subscribe((contato) => this.aoExcluirContato.emit(contato));
  }
  contato = input<Contato | undefined>(undefined);
}
