import { Component, inject, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-buscador',
    imports: [ReactiveFormsModule],
    templateUrl: './buscador.component.html',
    styleUrl: './buscador.component.css'
})
export class BuscadorComponent {
  private fb = inject(FormBuilder);
  formularioBuscador = this.fb.group({
    texto: [''],
  });
  aoBuscar = output<string>();

  buscar() {
    this.aoBuscar.emit(this.formularioBuscador.value.texto || '');
  }
}
