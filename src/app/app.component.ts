import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TrocarTemaService } from './servicos/trocar-tema.service';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgbDropdownModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  mudarTema(tema: string) {
    this.servicoTrocarTema.trocarTema(tema);
  }
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
