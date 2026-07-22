import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { getUserByMatricula, updatePassword } from '../models/userModel';

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

    // Retorna os dados do usuário, incluindo o campo 'primeiro_acesso'
    res.status(200).json(userWithoutPassword);
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ error: "Erro interno no servidor de autenticação." });
  }
};

export const redefinirSenha = async (req: Request, res: Response) => {
  try {
    const { userId, novaSenha } = req.body;

    if (!userId || !novaSenha) {
      return res.status(400).json({ error: "ID do usuário e nova senha são obrigatórios." });
    }

    if (novaSenha.length < 6) {
      return res.status(400).json({ error: "A nova senha deve ter no mínimo 6 caracteres." });
    }

    console.log(`Redefinindo senha para o usuário ID: ${userId}`);

    // Gerar hash da nova senha
    const saltRounds = 10;
    const newPasswordHash = await bcrypt.hash(novaSenha, saltRounds);

    // Atualizar no banco e setar primeiro_acesso = false
    const updatedUser = await updatePassword(userId, newPasswordHash);

    if (!updatedUser) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    console.log("Senha redefinida com sucesso!");

    res.status(200).json({
      message: "Senha alterada com sucesso!",
      user: updatedUser
    });
  } catch (error) {
    console.error("Erro ao redefinir senha:", error);
    res.status(500).json({ error: "Erro interno ao redefinir senha." });
  }
};