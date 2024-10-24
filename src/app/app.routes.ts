import { Routes } from '@angular/router';
import { PaginaInicialComponent } from './componentes/pagina-inicial/pagina-inicial.component';
import { ListaContatosComponent } from './componentes/lista-contatos/lista-contatos.component';

export const routes: Routes = [
  {
    path: '',
    component: PaginaInicialComponent,
  },
  {
    path: 'lista-contatos',
    component: ListaContatosComponent,
  },
];
