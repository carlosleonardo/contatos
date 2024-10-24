import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Contato } from '../modelo/contato';

@Injectable({
  providedIn: 'root',
})
export class ContatosService {
  private http = inject(HttpClient);
  private readonly API = environment.urlBase;

  obterTodosContatos(): Observable<Contato[]> {
    return this.http.get<Contato[]>(this.API);
  }

  obterContatoPorId(id: number): Observable<Contato> {
    return this.http.get<Contato>(`${this.API}/${id}`);
  }

  adicionarContato(contato: Contato): Observable<Contato> {
    return this.http.post<Contato>(this.API, contato);
  }

  atualizarContato(contato: Contato): Observable<Contato> {
    return this.http.put<Contato>(`${this.API}/${contato.id}`, contato);
  }

  excluirContato(id: number): Observable<Contato> {
    return this.http.delete<Contato>(`${this.API}/${id}`);
  }
}
