import { Component, inject, input, OnInit, output } from '@angular/core';
import { Contato } from '../../modelo/contato';
import { ContatosService } from '../../servicos/contatos.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdicionarContatoComponent } from '../adicionar-contato/adicionar-contato.component';

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
  aoEditarContato = output<Contato>();
  servicoModal = inject(NgbModal);

  excluirContato(id: number | undefined) {
    if (!id) return;
    this.contatosServico
      .excluirContato(id)
      .subscribe((contato) => this.aoExcluirContato.emit(contato));
  }
  editarContato(contato: Contato | undefined) {
    if (!contato) return;
    if (!contato.id) return;
    const ref = this.servicoModal.open(AdicionarContatoComponent, {
      backdrop: 'static',
    });
    ref.componentInstance.editando.set(true);
    ref.componentInstance.contato.set(contato);
    ref.closed.subscribe((contato: Contato) => {
      if (contato) {
        this.contatosServico
          .atualizarContato(contato)
          .subscribe((contato) => this.aoEditarContato.emit(contato));
      }
    });
  }
  contato = input<Contato | undefined>(undefined);
}
