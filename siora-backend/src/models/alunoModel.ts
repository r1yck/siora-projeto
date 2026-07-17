import pool from '../config/database';

export const getDisciplinasByAlunoId = async (usuarioId: number) => {
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
    WHERE e.usuario_id = $1
    ORDER BY d.nome ASC;
  `;
  
  const result = await pool.query(query, [usuarioId]);
  return result.rows;
};

export const getHorariosByAlunoId = async (usuarioId: number) => {
  const query = `
    SELECT 
      ha.id AS horario_id,
      d.nome AS disciplina_nome,
      ha.dia_semana,
      TO_CHAR(ha.hora_inicio, 'HH24:MI') AS hora_inicio,
      TO_CHAR(ha.hora_fim, 'HH24:MI') AS hora_fim,
      ha.laboratorio
    FROM public.horarios_aula ha
    INNER JOIN public.disciplinas d ON ha.disciplina_id = d.id
    INNER JOIN public.matriculas m ON m.disciplina_id = d.id
    INNER JOIN public.estudantes e ON m.estudante_id = e.usuario_id
    WHERE e.usuario_id = $1
    ORDER BY 
      CASE UPPER(ha.dia_semana)
        WHEN 'SEGUNDA-FEIRA' THEN 1
        WHEN 'TERÇA-FEIRA'   THEN 2
        WHEN 'QUARTA-FEIRA'  THEN 3
        WHEN 'QUINTA-FEIRA'  THEN 4
        WHEN 'SEXTA-FEIRA'   THEN 5
        WHEN 'SÁBADO'        THEN 6
        ELSE 7
      END,
      ha.hora_inicio ASC;
  `;
  
  const result = await pool.query(query, [usuarioId]);
  return result.rows;
};