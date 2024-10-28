import { Component, inject, input, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Contato } from '../../modelo/contato';
@Component({
  selector: 'app-adicionar-contato',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './adicionar-contato.component.html',
  styleUrl: './adicionar-contato.component.css',
})
export class AdicionarContatoComponent implements OnInit {
  private modal = inject(NgbActiveModal);
  private formBuilder = inject(FormBuilder);
  formAdicionarContato = this.formBuilder.group({
    nome: ['', [Validators.required]],
    telefone: ['', [Validators.required]],
    email: ['', [Validators.email]],
    endereco: [''],
    dataNascimento: [''],
    observacao: [''],
  });

  editando = signal(false);
  contato = signal<Contato>({} as Contato);

  cancelar() {
    this.modal.dismiss();
  }
  salvarContato() {
    const rawDate = this.formAdicionarContato.value.dataNascimento;
    const formattedDate = rawDate
      ? new Date(rawDate).toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0];

    this.contato.set({
      nome: this.formAdicionarContato.value.nome as string,
      telefone: this.formAdicionarContato.value.telefone as string,
      email: this.formAdicionarContato.value.email as string,
      endereco: this.formAdicionarContato.value.endereco as string,
      dataNascimento: new Date(formattedDate),
      observacao: this.formAdicionarContato.value.observacao as string,
    });
    //alert(this.contato().dataNascimento);
    this.modal.close(this.contato());
  }
  ngOnInit(): void {
    this.formAdicionarContato.value.nome = this.contato().nome;
    this.formAdicionarContato.value.telefone = this.contato().telefone;
    this.formAdicionarContato.value.email = this.contato().email;
    this.formAdicionarContato.value.endereco = this.contato().endereco;
    this.formAdicionarContato.value.dataNascimento = this.contato()
      .dataNascimento.toISOString()
      .split('T')[0];
    this.formAdicionarContato.value.observacao = this.contato().observacao;
  }
}
