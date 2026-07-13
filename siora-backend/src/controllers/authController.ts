import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { getUserByMatricula } from '../models/userModel';

export const login = async (req: Request, res: Response) => {
  try {

    const { matricula, senha } = req.body;

    if (!matricula || !senha) {
      return res.status(400).json({ error: "Matrícula e senha são obrigatórias." });
    }

    console.log(`Tentativa de login - Matrícula: ${matricula}`);

    const user = await getUserByMatricula(matricula);
    if (!user) {
      console.log("Erro: Usuário não existe no banco.");
      return res.status(401).json({ error: "Credenciais inválidas." });
    }

    console.log("Usuário encontrado. Verificando senha...");
    const senhaValida = await bcrypt.compare(senha, user.senha_hash);

    if (!senhaValida) {
      console.log("Erro: Senha incorreta.");
      return res.status(401).json({ error: "Credenciais inválidas." });
    }

    console.log("Login autorizado!");

    const { senha_hash, ...userWithoutPassword } = user;

    res.status(200).json(userWithoutPassword);
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ error: "Erro interno no servidor de autenticação." });
  }
};