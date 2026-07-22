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

// Controller para criar comunicados (Mural e Alteração de Sala)
export const postComunicadoDocente = async (req: Request, res: Response) => {
  try {
    const { disciplina_id, titulo, conteudo, urgente } = req.body;

    if (!disciplina_id || !titulo || !conteudo) {
      return res.status(400).json({ error: 'Campos obrigatórios ausentes.' });
    }

    const novoComunicado = await dashboardModel.createComunicado(
      Number(disciplina_id),
      titulo,
      conteudo,
      Boolean(urgente)
    );

    return res.status(201).json(novoComunicado);
  } catch (error) {
    console.error('Erro ao postar comunicado:', error);
    return res.status(500).json({ error: 'Erro interno ao salvar comunicado.' });
  }
};

// Controller para agendar novas avaliações
export const postAvaliacaoDocente = async (req: Request, res: Response) => {
  try {
    const { disciplina_id, titulo, descricao, data_vencimento, peso } = req.body;

    if (!disciplina_id || !titulo || !data_vencimento || peso === undefined) {
      return res.status(400).json({ error: 'Campos obrigatórios ausentes.' });
    }

    const novaAvaliacao = await dashboardModel.createAvaliacao(
      Number(disciplina_id),
      titulo,
      descricao || 'Submissão via portal.',
      data_vencimento,
      Number(peso)
    );

    return res.status(201).json(novaAvaliacao);
  } catch (error) {
    console.error('Erro ao agendar avaliação:', error);
    return res.status(500).json({ error: 'Erro interno ao salvar avaliação.' });
  }
};

export const removeComunicadoDocente = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletado = await dashboardModel.deleteComunicado(Number(id));
    if (!deletado) return res.status(404).json({ error: 'Aviso não encontrado.' });
    return res.status(200).json({ message: 'Aviso removido com sucesso.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro interno ao deletar comunicado.' });
  }
};

export const removeAvaliacaoDocente = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletado = await dashboardModel.deleteAvaliacao(Number(id));
    if (!deletado) return res.status(404).json({ error: 'Avaliação não encontrada.' });
    return res.status(200).json({ message: 'Avaliação removida com sucesso.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro interno ao deletar avaliação.' });
  }
};

// Adicione no final do seu dashboardController.ts

export const postMaterialDocente = async (req: Request, res: Response) => {
  try {
    const { disciplina_id } = req.body;
    const file = req.file;

    if (!disciplina_id || !file) {
      return res.status(400).json({ error: 'Disciplina ou arquivo não fornecidos.' });
    }

    // Calcula o tamanho em formato legível (Ex: 4.2 MB)
    const tamanhoEmBytes = file.size;
    let tamanhoFormatado = `${(tamanhoEmBytes / 1024).toFixed(1)} KB`;
    if (tamanhoEmBytes > 1024 * 1024) {
      tamanhoFormatado = `${(tamanhoEmBytes / (1024 * 1024)).toFixed(1)} MB`;
    }

    // A URL que o frontend vai usar para baixar o arquivo
    const urlCaminho = `http://localhost:3000/files/${file.filename}`;

    const novoMaterial = await dashboardModel.createMaterialAula(
      Number(disciplina_id),
      file.originalname, // Nome original do arquivo (Ex: Aula 04 - Slides.pdf)
      tamanhoFormatado,
      urlCaminho
    );

    return res.status(201).json(novoMaterial);
  } catch (error) {
    console.error('Erro ao fazer upload de material:', error);
    return res.status(500).json({ error: 'Erro interno ao salvar arquivo.' });
  }
};

export const removeMaterialDocente = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletado = await dashboardModel.deleteMaterialAula(Number(id));
    if (!deletado) return res.status(404).json({ error: 'Arquivo não encontrado.' });
    return res.status(200).json({ message: 'Arquivo removido do portal com sucesso.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro interno ao deletar arquivo.' });
  }
};

// Controller para atualizar localização/laboratório em tempo real (RF04)
export const updateLocalizacaoDocente = async (req: Request, res: Response) => {
  try {
    const { disciplina_id, laboratorio } = req.body;

    if (!disciplina_id || !laboratorio) {
      return res.status(400).json({ error: 'ID da disciplina e laboratório/sala são obrigatórios.' });
    }

    const horarioAtualizado = await dashboardModel.updateLaboratorioDisciplina(
      Number(disciplina_id),
      laboratorio
    );

    // Cria automaticamente o aviso de mudança de sala no mural com flag urgente (RF04)
    await dashboardModel.createComunicado(
      Number(disciplina_id),
      'Atenção: Mudança de Sala/Laboratório',
      `A aula de hoje será no ${laboratorio}.`,
      true
    );

    return res.status(200).json({
      message: 'Localização atualizada com sucesso!',
      horarioAtualizado
    });
  } catch (error) {
    console.error('Erro ao atualizar localização:', error);
    return res.status(500).json({ error: 'Erro interno ao atualizar localização.' });
  }
};