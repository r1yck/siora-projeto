import pool from '../config/database';

export const getUserByMatricula = async (matricula: string) => {
  const query = 'SELECT * FROM usuarios WHERE matricula_siape = $1';
  const result = await pool.query(query, [matricula]);
  return result.rows[0];
};