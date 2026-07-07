import pool from '../config/database.js';

export interface UsuarioDTO {
    id: number;
    nome: string;
    email: string;
    tipo_usuario: 'ESTUDANTE' | 'PROFESSOR';
}

export class UserModel {
    // Busca o usuário no banco usando a credencial digitada (Matrícula ou SIAPE)
    static async findByIdentifier(credencial: string): Promise<UsuarioDTO | null> {
        const queryText = 'SELECT id, nome, email, tipo_usuario FROM usuarios WHERE email = $1;';
        const { rows } = await pool.query(queryText, [credencial]);
        
        if (rows.length === 0) {
            return null;
        }
        
        return rows[0] as UsuarioDTO;
    }
}