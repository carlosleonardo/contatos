export interface Contato {
  id?: number;
  nome: string;
  telefone: string;
  email?: string;
  endereco?: string;
  observacao?: string;
  dataNascimento: Date;
}
