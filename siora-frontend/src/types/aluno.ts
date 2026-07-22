export interface Disciplina {
  disciplina_id: number;
  disciplina_nome: string;
  carga_horaria?: number;
  semestre?: number;
  semestre_atual?: number;
  professor_nome?: string;
  qtd_alertas?: number;
}

export interface User {
  id?: number;
  id_usuario?: number;
  nome: string;
  matricula_siape?: string;
  perfil?: string;
  tipo_usuario?: string;
}

export interface Horario {
  horario_id: number;
  disciplina_nome: string;
  dia_semana: string;
  hora_inicio: string;
  hora_fim: string;
  laboratorio: string;
}

export interface PrazoAcademico {
  id: number;
  descricao: string;
  data_vencimento: string;
  disciplina_nome: string;
  dias_restantes?: number;
}

export interface MetaPrivada {
  id: number;
  descricao: string;
  concluidas?: boolean;
  concluida: boolean;
}