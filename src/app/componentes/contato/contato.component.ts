import { Component, input, OnInit } from '@angular/core';
import { Contato } from '../../modelo/contato';

@Component({
  selector: 'app-contato',
  standalone: true,
  imports: [],
  templateUrl: './contato.component.html',
  styleUrl: './contato.component.css',
})
export class ContatoComponent {
  contato = input<Contato | undefined>(undefined);
}
