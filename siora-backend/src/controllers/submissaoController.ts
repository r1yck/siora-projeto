import { Request, Response } from 'express';
import {
    salvarOuAtualizarSubmissao,
    getSubmissoesPorAvaliacao,
    atualizarNotaSubmissao,
    getSubmissaoPorEstudante
} from '../models/submissaoModel';

export const submeterTrabalho = async (req: Request, res: Response) => {
    try {
        const { avaliacaoId } = req.params;
        const { estudanteId } = req.body;
        const file = req.file;

        if (!file) {
            return res.status(400).json({ error: "Nenhum arquivo enviado. Selecione um arquivo para enviar." });
        }

        if (!estudanteId) {
            return res.status(400).json({ error: "ID do estudante é obrigatório." });
        }

        const urlArquivo = `/uploads/${file.filename}`;
        const nomeArquivo = file.originalname;

        const submissao = await salvarOuAtualizarSubmissao(
            Number(avaliacaoId),
            Number(estudanteId),
            urlArquivo,
            nomeArquivo
        );

        res.status(200).json({
            message: "Trabalho enviado com sucesso!",
            submissao
        });
    } catch (error) {
        console.error("Erro no envio do trabalho:", error);
        res.status(500).json({ error: "Erro interno ao enviar trabalho." });
    }
};

// Buscar submissão do próprio aluno em uma tarefa
export const buscarSubmissaoAluno = async (req: Request, res: Response) => {
    try {
        const { avaliacaoId, estudanteId } = req.params;

        const submissao = await getSubmissaoPorEstudante(Number(avaliacaoId), Number(estudanteId));

        if (!submissao) {
            return res.status(200).json({ enviado: false });
        }

        res.status(200).json({ enviado: true, submissao });
    } catch (error) {
        console.error("Erro ao buscar submissão:", error);
        res.status(500).json({ error: "Erro interno ao buscar submissão." });
    }
};

// Listar entregas para o Professor (Alimenta a Modal do Figma)
export const listarEntregasAvaliacao = async (req: Request, res: Response) => {
    try {
        const { avaliacaoId } = req.params;

        const submissoes = await getSubmissoesPorAvaliacao(Number(avaliacaoId));

        res.status(200).json({
            total: submissoes.length,
            submissoes
        });
    } catch (error) {
        console.error("Erro ao listar entregas:", error);
        res.status(500).json({ error: "Erro interno ao listar entregas." });
    }
};

// Lançar Nota (RF11)
export const lancarNota = async (req: Request, res: Response) => {
    try {
        const { submissaoId } = req.params;
        const { nota } = req.body;

        if (nota === undefined || nota < 0 || nota > 10) {
            return res.status(400).json({ error: "Nota deve ser um número entre 0 e 10." });
        }

        const submissaoAtualizada = await atualizarNotaSubmissao(Number(submissaoId), nota);

        if (!submissaoAtualizada) {
            return res.status(404).json({ error: "Submissão não encontrada." });
        }

        res.status(200).json({
            message: "Nota atribuída com sucesso!",
            submissao: submissaoAtualizada
        });
    } catch (error) {
        console.error("Erro ao lançar nota:", error);
        res.status(500).json({ error: "Erro interno ao lançar nota." });
    }
};