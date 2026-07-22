import pool from '../config/database';

export interface Submissao {
  id?: number;
  avaliacao_id: number;
  estudante_id: number;
  url_arquivo: string;
  nome_arquivo: string;
  data_envio?: Date;
  nota?: number | null;
}

export const salvarOuAtualizarSubmissao = async (
  avaliacaoId: number,
  estudanteId: number,
  urlArquivo: string,
  nomeArquivo: string
) => {
  const query = `
    INSERT INTO submissoes_avaliacoes (avaliacao_id, estudante_id, url_arquivo, nome_arquivo, data_envio)
    VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP)
    ON CONFLICT (avaliacao_id, estudante_id) 
    DO UPDATE SET 
      url_arquivo = EXCLUDED.url_arquivo,
      nome_arquivo = EXCLUDED.nome_arquivo,
      data_envio = CURRENT_TIMESTAMP
    RETURNING *;
  `;
  const values = [avaliacaoId, estudanteId, urlArquivo, nomeArquivo];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const getSubmissaoPorEstudante = async (avaliacaoId: number, estudanteId: number) => {
  const query = `
    SELECT * FROM submissoes_avaliacoes 
    WHERE avaliacao_id = $1 AND estudante_id = $2;
  `;
  const result = await pool.query(query, [avaliacaoId, estudanteId]);
  return result.rows[0];
};

export const getSubmissoesPorAvaliacao = async (avaliacaoId: number) => {
  const query = `
    SELECT 
      s.id,
      s.avaliacao_id,
      s.estudante_id,
      u.nome AS nome_aluno,
      s.url_arquivo,
      s.nome_arquivo,
      s.data_envio,
      s.nota
    FROM submissoes_avaliacoes s
    JOIN usuarios u ON s.estudante_id = u.id
    WHERE s.avaliacao_id = $1
    ORDER BY s.data_envio DESC;
  `;
  const result = await pool.query(query, [avaliacaoId]);
  return result.rows;
};

export const atualizarNotaSubmissao = async (submissaoId: number, nota: number) => {
  const query = `
    UPDATE submissoes_avaliacoes
    SET nota = $1
    WHERE id = $2
    RETURNING *;
  `;
  const result = await pool.query(query, [nota, submissaoId]);
  return result.rows[0];
};