import { Request, Response } from 'express';
import { UserModel } from '../models/userModel.js';

export class AuthController {
    static async login(req: Request, res: Response): Promise<void> {
        try {
            const { credencial } = req.body;

            // Validação simples de preenchimento
            if (!credencial) {
                res.status(400).json({ error: 'A credencial (Matrícula/SIAPE) é obrigatória.' });
                return;
            }

            const usuario = await UserModel.findByIdentifier(credencial);

            if (!usuario) {
                res.status(401).json({ error: 'Acesso negado. Credencial não encontrada.' });
                return;
            }

            res.status(200).json({
                message: 'Autenticação bem-sucedida!',
                user: {
                    id: usuario.id,
                    nome: usuario.nome,
                    perfil: usuario.tipo_usuario
                }
            });

        } catch (error) {
            console.error('Erro no processo de login:', error);
            res.status(500).json({ error: 'Erro interno no servidor de autenticação.' });
        }
    }
}