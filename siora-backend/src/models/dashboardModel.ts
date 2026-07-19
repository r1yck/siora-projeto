import pool from '../config/database';

export const getDisciplinasByAlunoId = async (alunoId: number) => {
  const query = `
    SELECT 
      d.id AS disciplina_id,
      d.nome AS disciplina_nome,
      d.codigo_turma,
      p.nome AS professor_nome
    FROM matriculas m
    JOIN disciplinas d ON m.disciplina_id = d.id
    JOIN usuarios p ON d.professor_id = p.id
    WHERE m.estudante_id = $1
    ORDER BY d.nome ASC;
  `;
  
  const result = await pool.query(query, [alunoId]);
  return result.rows;
};

export const getTurmasByProfessorId = async (professorId: number) => {
  const query = `
    SELECT 
      d.id AS disciplina_id,
      d.nome AS disciplina_nome,
      d.codigo_turma,
      COUNT(m.estudante_id) AS total_alunos
    FROM disciplinas d
    LEFT JOIN matriculas m ON d.id = m.disciplina_id
    WHERE d.professor_id = $1
    GROUP BY d.id, d.nome, d.codigo_turma
    ORDER BY d.nome ASC;
  `;
  
  const result = await pool.query(query, [professorId]);
  return result.rows;
};

export const getPrazosAcademicos = async (estudanteId: number) => {
  const query = `
    SELECT 
      a.id AS avaliacao_id,
      a.titulo AS descricao, 
      d.nome AS disciplina_nome,
      a.data_vencimento,
      (a.data_vencimento::date - CURRENT_DATE) AS dias_restantes
    FROM public.matriculas m
    INNER JOIN public.disciplinas d ON m.disciplina_id = d.id
    INNER JOIN public.avaliacoes a ON a.disciplina_id = d.id
    WHERE m.estudante_id = $1 
    ORDER BY a.data_vencimento ASC;
  `;
  const { rows } = await pool.query(query, [estudanteId]);
  return rows;
};


export const getTarefasPrivadas = async (estudanteId: number) => {
  const query = `
    SELECT id, titulo AS descricao, concluida 
    FROM public.tarefas_privadas 
    WHERE estudante_id = $1 
    ORDER BY id DESC;
  `;
  const { rows } = await pool.query(query, [estudanteId]);
  return rows;
};

export const createTarefaPrivada = async (estudanteId: number, titulo: string) => {
  const query = `
    INSERT INTO public.tarefas_privadas (estudante_id, titulo) 
    VALUES ($1, $2) 
    RETURNING id, titulo AS descricao, concluida;
  `;
  const { rows } = await pool.query(query, [estudanteId, titulo]);
  return rows[0];
};

export const toggleTarefaPrivada = async (tarefaId: number, estudanteId: number) => {
  const query = `
    UPDATE public.tarefas_privadas 
    SET concluida = NOT concluida 
    WHERE id = $1 AND estudante_id = $2
    RETURNING id, titulo AS descricao, concluida;
  `;
  const { rows } = await pool.query(query, [tarefaId, estudanteId]);
  return rows[0];
};

export const deleteTarefaPrivada = async (tarefaId: number, estudanteId: number) => {
  const query = `
    DELETE FROM public.tarefas_privadas 
    WHERE id = $1 AND estudante_id = $2;
  `;
  await pool.query(query, [tarefaId, estudanteId]);
};

export const getDetalhesDisciplina = async (disciplinaId: number) => {
  const query = `
    SELECT d.id, d.nome, d.codigo_turma, u.nome AS professor_nome
    FROM public.disciplinas d
    INNER JOIN public.professores p ON d.professor_id = p.usuario_id
    INNER JOIN public.usuarios u ON p.usuario_id = u.id
    WHERE d.id = $1;
  `;
  const { rows } = await pool.query(query, [disciplinaId]);
  return rows[0];
};

export const getMateriaisDisciplina = async (disciplinaId: number) => {
  const query = `
    SELECT id, nome_arquivo, tamanho, url_caminho, data_upload
    FROM public.materiais_aula
    WHERE disciplina_id = $1
    ORDER BY data_upload DESC;
  `;
  const { rows } = await pool.query(query, [disciplinaId]);
  return rows;
};

export const getComunicadosDisciplina = async (disciplinaId: number) => {
  const query = `
    SELECT id, titulo, conteudo, data_publicacao, urgente
    FROM public.comunicados
    WHERE disciplina_id = $1
    ORDER BY urgente DESC, data_publicacao DESC;
  `;
  const { rows } = await pool.query(query, [disciplinaId]);
  return rows;
};

export const getAvaliacoesDisciplina = async (disciplinaId: number) => {
  const query = `
    SELECT id, titulo, descricao, data_vencimento, peso
    FROM public.avaliacoes
    WHERE disciplina_id = $1
    ORDER BY data_vencimento ASC;
  `;
  const { rows } = await pool.query(query, [disciplinaId]);
  return rows;
};

// Cria um novo comunicado ou alerta de mudança de sala
export const createComunicado = async (disciplinaId: number, titulo: string, conteudo: string, urgente: boolean) => {
  const query = `
    INSERT INTO public.comunicados (disciplina_id, titulo, conteudo, data_publicacao, urgente)
    VALUES ($1, $2, $3, CURRENT_TIMESTAMP, $4)
    RETURNING *;
  `;
  const { rows } = await pool.query(query, [disciplinaId, titulo, conteudo, urgente]);
  return rows[0];
};

// Agenda uma nova avaliação/entrega na timeline
export const createAvaliacao = async (disciplinaId: number, titulo: string, descricao: string, dataVencimento: string, peso: number) => {
  const query = `
    INSERT INTO public.avaliacoes (disciplina_id, titulo, descricao, data_vencimento, peso)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;
  const { rows } = await pool.query(query, [disciplinaId, titulo, descricao, dataVencimento, peso]);
  return rows[0];
};

export const deleteComunicado = async (id: number) => {
  const query = `DELETE FROM public.comunicados WHERE id = $1 RETURNING *;`;
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};

export const deleteAvaliacao = async (id: number) => {
  const query = `DELETE FROM public.avaliacoes WHERE id = $1 RETURNING *;`;
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};