export interface Turma {
  disciplina_id: number;
  disciplina_nome: string;
  codigo_turma: string;
  total_alunos: string;
}

export interface User {
  id?: number;
  id_usuario?: number;
  nome: string;
  matricula_siape?: string;
  perfil?: string;
  tipo_usuario?: string;
}