import { Request, Response } from 'express';
import { getDisciplinasByAlunoId } from '../models/alunoModel';

export const getDashboardAluno = async (req: Request, res: Response) => {
  try {
    const alunoId = parseInt(req.params.id as string);
    
    if (isNaN(alunoId)) {
      return res.status(400).json({ error: "ID do aluno inválido." });
    }

    const disciplinas = await getDisciplinasByAlunoId(alunoId);
    
    res.status(200).json(disciplinas);
  } catch (error) {
    console.error("Erro ao buscar disciplinas do aluno:", error);
    res.status(500).json({ error: "Erro interno ao carregar o dashboard do aluno." });
  }
};