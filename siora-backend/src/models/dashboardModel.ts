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

// ------------------------------------------------------------------
// ABA CALENDÁRIO / METAS
// ------------------------------------------------------------------

// Busca prazos acadêmicos (avaliacoes) das disciplinas do aluno
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

// Busca metas/tarefas privadas do aluno
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

// Cria uma nova tarefa privada
export const createTarefaPrivada = async (estudanteId: number, titulo: string) => {
  const query = `
    INSERT INTO public.tarefas_privadas (estudante_id, titulo) 
    VALUES ($1, $2) 
    RETURNING id, titulo AS descricao, concluida;
  `;
  const { rows } = await pool.query(query, [estudanteId, titulo]);
  return rows[0];
};

// Marca/Desmarca tarefa como concluída
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

// Deleta tarefa privada
export const deleteTarefaPrivada = async (tarefaId: number, estudanteId: number) => {
  const query = `
    DELETE FROM public.tarefas_privadas 
    WHERE id = $1 AND estudante_id = $2;
  `;
  await pool.query(query, [tarefaId, estudanteId]);
};