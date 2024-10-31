import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TrocarTemaService } from './servicos/trocar-tema.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  servicoTrocarTema = inject(TrocarTemaService);
  temaEscolhido = window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';

  ngOnInit(): void {
    let tema = sessionStorage.getItem('tema');
    if (!tema) {
      tema = this.temaEscolhido;
    }
    this.servicoTrocarTema.trocarTema(tema as string);
  }
  title = 'Contatos';
}
