import { Request, Response } from 'express';
import { getDisciplinasByAlunoId, getHorariosByAlunoId } from '../models/alunoModel';
import { getTurmasByProfessorId } from '../models/dashboardModel';
import * as dashboardModel from '../models/dashboardModel';

export const getDisciplinasAluno = async (req: Request, res: Response) => {
  try {
    const { alunoId } = req.params;
    
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

export const getHorariosAluno = async (req: Request, res: Response) => {
  try {
    const { alunoId } = req.params;
    
    const horarios = await getHorariosByAlunoId(Number(alunoId));
    
    res.status(200).json(horarios);
  } catch (error) {
    console.error("Erro ao buscar horários do aluno:", error);
    res.status(500).json({ error: "Erro interno do servidor ao carregar horários." });
  }
};

export const getCalendarioMetas = async (req: Request, res: Response) => {
  try {

    const estudanteId = req.query.usuario_id || (req as any).user?.id || req.body.usuario_id; 

    if (!estudanteId) {
      return res.status(400).json({ error: 'ID do estudante não fornecido.' });
    }

    const prazos = await dashboardModel.getPrazosAcademicos(Number(estudanteId));
    const metas = await dashboardModel.getTarefasPrivadas(Number(estudanteId));

    return res.status(200).json({ prazos, metas });
  } catch (error) {
    console.error('Erro ao buscar calendário/metas:', error);
    return res.status(500).json({ error: 'Erro interno ao buscar dados do calendário.' });
  }
};

export const addMetaPrivada = async (req: Request, res: Response) => {
  try {
    const { usuario_id, descricao } = req.body;

    if (!usuario_id || !descricao) {
      return res.status(400).json({ error: 'Usuário e descrição são obrigatórios.' });
    }

    const novaTarefa = await dashboardModel.createTarefaPrivada(Number(usuario_id), descricao);
    
    return res.status(201).json({
      id: novaTarefa.id,
      descricao: novaTarefa.descricao, 
      concluida: novaTarefa.concluida
    });
  } catch (error) {
    console.error('Erro ao adicionar meta:', error);
    return res.status(500).json({ error: 'Erro interno ao salvar meta.' });
  }
};

export const toggleMetaPrivada = async (req: Request, res: Response) => {
  try {
    const estudanteId = (req as any).user?.id || req.body.usuario_id;
    const { id } = req.params;

    const metaAtualizada = await dashboardModel.toggleTarefaPrivada(Number(id), estudanteId);
    return res.status(200).json(metaAtualizada);
  } catch (error) {
    console.error('Erro ao atualizar meta:', error);
    return res.status(500).json({ error: 'Erro interno ao atualizar status.' });
  }
};

export const deleteMetaPrivada = async (req: Request, res: Response) => {
  try {
    const estudanteId = (req as any).user?.id || req.body.usuario_id;
    const { id } = req.params;

    await dashboardModel.deleteTarefaPrivada(Number(id), estudanteId);
    return res.status(204).send();
  } catch (error) {
    console.error('Erro ao deletar meta:', error);
    return res.status(500).json({ error: 'Erro interno ao deletar meta.' });
  }
};

export const getDetalhesCompletosDisciplina = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'O ID da disciplina é obrigatório.' });
    }

    const disciplinaId = Number(id);
    
    const [info, materiais, comunicados, avaliacoes] = await Promise.all([
      dashboardModel.getDetalhesDisciplina(disciplinaId),
      dashboardModel.getMateriaisDisciplina(disciplinaId),
      dashboardModel.getComunicadosDisciplina(disciplinaId),
      dashboardModel.getAvaliacoesDisciplina(disciplinaId)
    ]);

    if (!info) {
      return res.status(404).json({ error: 'Disciplina não encontrada.' });
    }

    return res.status(200).json({
      info,
      materiais,
      comunicados,
      avaliacoes
    });
  } catch (error) {
    console.error('Erro ao buscar detalhes da disciplina:', error);
    return res.status(500).json({ error: 'Erro interno ao carregar detalhes da disciplina.' });
  }
};