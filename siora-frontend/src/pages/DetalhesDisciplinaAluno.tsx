import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Warning, CaretRight } from '@phosphor-icons/react';
import { HeaderAluno } from '../components/dashboard-aluno/HeaderAluno';
import { MuralAvisos } from '../components/detalhes-disciplina-aluno/MuralAvisos';
import { MateriaisAula } from '../components/detalhes-disciplina-aluno/MateriaisAula';
import { ProximasEntregas } from '../components/detalhes-disciplina-aluno/ProximasEntregas';

import type {
  InfoDisciplina,
  MaterialAula,
  Comunicado,
  Avaliacao,
  SubmissaoAluno,
} from '../types/detalhesDisciplinaAluno';

export function DetalhesDisciplinaAluno() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [info, setInfo] = useState<InfoDisciplina | null>(null);
  const [materiais, setMateriais] = useState<MaterialAula[]>([]);
  const [comunicados, setComunicados] = useState<Comunicado[]>([]);
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [submissoes, setSubmissoes] = useState<{ [key: number]: SubmissaoAluno }>({});
  const [carregando, setCarregando] = useState(true);
  const [enviandoId, setEnviandoId] = useState<number | null>(null);

  const userString = localStorage.getItem('@siora:user');
  const user = userString ? JSON.parse(userString) : null;
  const primeiroNome = user?.nome ? user.nome.split(' ')[0] : 'Aluno';
  const userId = user?.id || user?.id_usuario;

  useEffect(() => {
    if (!userString || !userId) {
      navigate('/login');
      return;
    }

    async function fetchDadosDisciplina() {
      try {
        setCarregando(true);
        const response = await api.get(`/api/dashboard/disciplina/${id}`);

        if (response.data) {
          setInfo(response.data.info || null);
          setMateriais(response.data.materiais || []);
          setComunicados(response.data.comunicados || []);

          const listaAvaliacoes = response.data.avaliacoes || [];
          setAvaliacoes(listaAvaliacoes);

          listaAvaliacoes.forEach(async (av: Avaliacao) => {
            try {
              const resSubmissao = await api.get(
                `/api/avaliacoes/${av.id}/estudante/${userId}`
              );
              setSubmissoes((prev) => ({
                ...prev,
                [av.id]: resSubmissao.data,
              }));
            } catch (err) {
              console.error(`Erro ao buscar submissão da avaliação ${av.id}:`, err);
            }
          });
        }
      } catch (err) {
        console.error("Erro ao carregar detalhes da disciplina:", err);
      } finally {
        setCarregando(false);
      }
    }

    if (id) {
      fetchDadosDisciplina();
    }
  }, [id, userId, userString, navigate]);

  async function handleFileUpload(
    avaliacaoId: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('arquivo', file);
    formData.append('estudanteId', String(userId));

    try {
      setEnviandoId(avaliacaoId);
      const res = await api.post(
        `/api/avaliacoes/${avaliacaoId}/submeter`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      setSubmissoes((prev) => ({
        ...prev,
        [avaliacaoId]: {
          enviado: true,
          submissao: res.data.submissao,
        },
      }));

      alert('Trabalho enviado com sucesso!');
    } catch (err) {
      console.error('Erro ao submeter arquivo:', err);
      alert('Erro ao enviar o arquivo. Tente novamente.');
    } finally {
      setEnviandoId(null);
    }
  }

  function handleLogout() {
    localStorage.removeItem('@siora:user');
    navigate('/login');
  }

  if (carregando) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center font-sans p-4">
        <p className="text-slate-500 animate-pulse font-medium text-sm">
          Carregando conteúdos da disciplina...
        </p>
      </div>
    );
  }

  if (!info) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center font-sans p-4">
        <p className="text-red-500 font-medium text-sm text-center">
          Disciplina não encontrada no banco de dados.
        </p>
      </div>
    );
  }

  const comunicadoUrgente = comunicados.find((c) => c.urgente);
  const comunicadosFiltados = comunicados.filter((aviso) => !aviso.urgente);

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-800 font-sans">
      <HeaderAluno
        primeiroNome={primeiroNome}
        semestreAtual={Number(localStorage.getItem('@siora:semestre_atual') || 1)}
        onLogout={handleLogout}
      />

      <main className="max-w-[1200px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Breadcrumb com Link do React Router e Flex Wrap */}
        <nav className="flex items-center flex-wrap gap-1.5 text-xs sm:text-sm font-medium mb-4 sm:mb-6">
          <Link
            to="/dashboard-aluno"
            className="text-slate-400 hover:text-blue-500 transition-colors whitespace-nowrap"
          >
            Suas Disciplinas
          </Link>
          <CaretRight size={12} className="text-slate-400 flex-shrink-0" />
          <span className="text-blue-500 font-semibold truncate max-w-[200px] sm:max-w-none">
            {info.nome}
          </span>
        </nav>

        {/* Banner Urgente Adaptável para Telas Pequenas */}
        {comunicadoUrgente && (
          <div className="bg-[#FEF3C7] border border-[#FDE68A] text-[#92400E] px-3.5 py-3 rounded-xl flex items-start sm:items-center gap-2.5 font-medium text-xs sm:text-sm mb-6 shadow-sm">
            <Warning size={20} weight="bold" className="text-[#D97706] flex-shrink-0 mt-0.5 sm:mt-0" />
            <div>
              <span className="font-bold">{comunicadoUrgente.titulo}: </span>
              {comunicadoUrgente.conteudo}
            </div>
          </div>
        )}

        <section className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1 leading-tight">
            {info.nome}
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm font-medium">
            Turma: {info.codigo_turma} • Prof. {info.professor_nome}
          </p>
        </section>

        {/* Grid dos Módulos */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <MuralAvisos comunicados={comunicadosFiltados} />
            <MateriaisAula materiais={materiais} />
          </div>

          <ProximasEntregas
            avaliacoes={avaliacoes}
            submissoes={submissoes}
            enviandoId={enviandoId}
            onFileUpload={handleFileUpload}
          />
        </div>
      </main>
    </div>
  );
}