import pool from '../config/database';

export const getUserByMatricula = async (matricula: string) => {
  const query = 'SELECT * FROM usuarios WHERE matricula_siape = $1';
  const result = await pool.query(query, [matricula]);
  return result.rows[0];
};

export const updatePassword = async (userId: number, newPasswordHash: string) => {
  const query = `
    UPDATE usuarios 
    SET senha_hash = $1, primeiro_acesso = FALSE 
    WHERE id = $2 
    RETURNING id, nome, matricula_siape, tipo_usuario, primeiro_acesso
  `;
  const result = await pool.query(query, [newPasswordHash, userId]);
  return result.rows[0];
};