import pool from '../config/database';

export const getDisciplinasByAlunoId = async (alunoId: number) => {
  const query = `
    SELECT 
      d.id AS disciplina_id, 
      d.nome AS disciplina_nome, 
      d.codigo_turma,
      u_prof.nome AS professor_nome,
      e.semestre_atual,
      (
        SELECT COUNT(*)::int
        FROM public.avaliacoes a 
        WHERE a.disciplina_id = d.id AND a.data_vencimento >= CURRENT_TIMESTAMP
      ) + 
      (
        SELECT COUNT(*)::int
        FROM public.comunicados c 
        WHERE c.disciplina_id = d.id AND c.urgente = true
      ) AS qtd_alertas
    FROM public.matriculas m
    INNER JOIN public.disciplinas d ON m.disciplina_id = d.id
    INNER JOIN public.usuarios u_prof ON d.professor_id = u_prof.id
    INNER JOIN public.estudantes e ON m.estudante_id = e.usuario_id
    WHERE m.estudante_id = $1
    ORDER BY d.nome ASC;
  `;
  
  console.log("ALERTA: O NODE LEU A QUERY NOVA DO MODEL!");
  
  const result = await pool.query(query, [alunoId]);
  return result.rows;
};

