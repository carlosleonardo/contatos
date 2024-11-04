import { Component, inject, input, OnInit, output } from '@angular/core';
import { Contato } from '../../modelo/contato';
import { ContatosService } from '../../servicos/contatos.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdicionarContatoComponent } from '../adicionar-contato/adicionar-contato.component';
import { tap } from 'rxjs';
import { NgxMaskPipe } from 'ngx-mask';

@Component({
  selector: 'app-contato',
  standalone: true,
  imports: [NgxMaskPipe],
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
    if (!confirm('Tem certeza de que quer excluir o contato?')) return;
    this.contatosServico
      .excluirContato(id)
      .subscribe((contato) => this.aoExcluirContato.emit(contato));
  }
  editarContato(contato: Contato | undefined) {
    if (!contato) return;
    if (!contato.id) return;
    let idAtual = contato.id;
    const ref = this.servicoModal.open(AdicionarContatoComponent, {
      backdrop: 'static',
    });
    ref.componentInstance.editando.set(true);
    ref.componentInstance.contato.set(contato);
    ref.closed.subscribe((contatoEditado: Contato) => {
      if (contatoEditado) {
        contatoEditado.id = idAtual;
        this.contatosServico
          .atualizarContato(contatoEditado)
          .pipe(
            tap((contato) => console.log('Contato pelo pipe ', contatoEditado))
          )
          .subscribe((contato) => {
            //console.log('Contado enviado via emit: ', contatoEditado);
            this.aoEditarContato.emit(contatoEditado);
          });
      }
    });
  }
  contato = input<Contato | undefined>(undefined);
}
