import { Routes } from '@angular/router';
import { PaginaInicialComponent } from './componentes/pagina-inicial/pagina-inicial.component';
import { ListaContatosComponent } from './componentes/lista-contatos/lista-contatos.component';
import { PaginaNaoEncontradaComponent } from './componentes/pagina-nao-encontrada/pagina-nao-encontrada.component';

export const routes: Routes = [
  {
    path: '',
    component: PaginaInicialComponent,
    title: 'Pagina Inicial',
  },
  {
    path: 'lista-contatos',
    component: ListaContatosComponent,
    title: 'Lista de Contatos',
  },
  {
    path: '**',
    component: PaginaNaoEncontradaComponent,
  },
];
