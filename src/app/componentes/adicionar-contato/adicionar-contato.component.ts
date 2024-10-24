import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-adicionar-contato',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './adicionar-contato.component.html',
  styleUrl: './adicionar-contato.component.css',
})
export class AdicionarContatoComponent {
  private formBuilder = inject(FormBuilder);
  formAdicionarContato = this.formBuilder.group({
    nome: [''],
    telefone: [''],
    email: [''],
    endereco: [''],
    dataNascimento: [''],
    observacoes: [''],
  });
}
