import { Request, Response } from 'express';
import { getDisciplinasByAlunoId, getTurmasByProfessorId } from '../models/dashboardModel';

export const getDisciplinasAluno = async (req: Request, res: Response) => {
  try {
    const { alunoId } = req.params;
    
    // Converte o parâmetro da URL para número e chama o banco
    const disciplinas = await getDisciplinasByAlunoId(Number(alunoId));
    
    res.status(200).json(disciplinas);
  } catch (error) {
    console.error("Erro ao buscar disciplinas do aluno:", error);
    res.status(500).json({ error: "Erro interno do servidor ao carregar disciplinas." });
  }
};

export const getTurmasProfessor = async (req: Request, res: Response) => {
  try {
    const { professorId } = req.params;
    
    const turmas = await getTurmasByProfessorId(Number(professorId));
    
    res.status(200).json(turmas);
  } catch (error) {
    console.error("Erro ao buscar turmas do professor:", error);
    res.status(500).json({ error: "Erro interno do servidor ao carregar turmas." });
  }
};