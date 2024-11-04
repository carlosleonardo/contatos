import { Component, inject, signal } from '@angular/core';
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
    sessionStorage.setItem('tema', tema);
    if (tema === 'dark') {
      this.modoEscuro.set('moon-fill.svg');
      this.modoClaro.set('sun-fill.svg');
    } else {
      this.modoEscuro.set('moon.svg');
      this.modoClaro.set('sun.svg');
    }
  }

  modoEscuro = signal('moon-fill.svg');
  modoClaro = signal('sun-fill.svg');

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
