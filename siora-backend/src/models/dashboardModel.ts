import pool from '../config/database'; // Ajuste o caminho se o seu export for diferente

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