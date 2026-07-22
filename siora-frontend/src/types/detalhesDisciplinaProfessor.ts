export interface InfoDisciplina {
  id: number;
  nome: string;
  codigo_turma: string;
}

export interface Comunicado {
  id: number;
  titulo: string;
  conteudo: string;
  data_publicacao: string;
  urgente: boolean;
}

export interface Avaliacao {
  id: number;
  titulo: string;
  descricao: string;
  data_vencimento: string;
  peso: string | number;
}

export interface MaterialAula {
  id: number;
  nome_arquivo: string;
  tamanho: string;
  url_caminho: string;
  data_upload: string;
}

export interface SubmissaoAluno {
  id: number;
  avaliacao_id: number;
  estudante_id: number;
  nome_aluno: string;
  url_arquivo: string;
  nome_arquivo: string;
  data_envio: string;
  nota: number | null;
}