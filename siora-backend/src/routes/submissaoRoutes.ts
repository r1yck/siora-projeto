import { Router } from 'express';
import upload from '../config/multer';
import { 
  submeterTrabalho, 
  buscarSubmissaoAluno, 
  listarEntregasAvaliacao, 
  lancarNota 
} from '../controllers/submissaoController';

const router = Router();

// Rota para o aluno enviar o .zip do trabalho (RF10)
router.post('/avaliacoes/:avaliacaoId/submeter', upload.single('arquivo'), submeterTrabalho);

// Rota para checar se o aluno já enviou o trabalho
router.get('/avaliacoes/:avaliacaoId/estudante/:estudanteId', buscarSubmissaoAluno);

// Rota para o professor listar as entregas (Modal do Figma - RF11)
router.get('/avaliacoes/:avaliacaoId/submissoes', listarEntregasAvaliacao);

// Rota para o professor lançar nota (RF11)
router.patch('/submissoes/:submissaoId/nota', lancarNota);

export default router;