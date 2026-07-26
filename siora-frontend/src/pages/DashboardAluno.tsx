import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { HeaderAluno } from '../components/dashboard-aluno/HeaderAluno';
import { DisciplinaCard } from '../components/dashboard-aluno/DisciplinaCard';
import { PrazosAcademicosSection } from '../components/dashboard-aluno/PrazosAcademicosSection';
import { MetasEstudoSection } from '../components/dashboard-aluno/MetasEstudoSection';
import { GridHorarios } from '../components/dashboard-aluno/GridHorarios';

import type { Disciplina, Horario, PrazoAcademico, MetaPrivada, User } from '../types/aluno';

export function DashboardAluno() {
  const navigate = useNavigate();
  const [abaAtiva, setAbaAtiva] = useState<'disciplinas' | 'calendario' | 'horarios'>('disciplinas');
  const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);
  const [horarios, setHorarios] = useState<Horario[]>([]);

  const [prazos, setPrazos] = useState<PrazoAcademico[]>([]);
  const [metas, setMetas] = useState<MetaPrivada[]>([]);
  const [novaMetaDescricao, setNovaMetaDescricao] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [carregandoCalendario, setCarregandoCalendario] = useState(false);

  const userString = localStorage.getItem('@siora:user');
  const user: User | null = userString ? JSON.parse(userString) : null;
  const primeiroNome = user?.nome ? user.nome.split(' ')[0] : 'Aluno';
  const userId = user?.id || user?.id_usuario;

  useEffect(() => {
    const perfilDoUsuario = (user?.perfil || user?.tipo_usuario || '').toUpperCase();

    if (
      !user ||
      (!user.id && !user.id_usuario && !user.matricula_siape) ||
      (perfilDoUsuario !== 'ESTUDANTE' && perfilDoUsuario !== 'ALUNO')
    ) {
      navigate('/login');
      return;
    }

    async function fetchDadosDashboard() {
      try {
        const [respDisciplinas, respHorarios] = await Promise.all([
          api.get(`/api/dashboard/aluno/${userId}/disciplinas`),
          api.get(`/api/dashboard/aluno/${userId}/horarios`),
        ]);

        setDisciplinas(respDisciplinas.data);
        setHorarios(respHorarios.data);

        if (respDisciplinas.data.length > 0 && respDisciplinas.data[0].semestre_atual) {
          localStorage.setItem(
            '@siora:semestre_atual',
            respDisciplinas.data[0].semestre_atual.toString()
          );
        }
      } catch (err) {
        console.error("Erro ao buscar dados do dashboard:", err);
      } finally {
        setCarregando(false);
      }
    }

    fetchDadosDashboard();
  }, [userId, navigate]);

  useEffect(() => {
    if (abaAtiva !== 'calendario' || !userId) return;

    async function fetchCalendarioEMetas() {
      setCarregandoCalendario(true);
      try {
        const response = await api.get(`/api/dashboard/calendario`, {
          params: { usuario_id: userId },
        });
        setPrazos(response.data.prazos || []);
        setMetas(response.data.metas || []);
      } catch (err) {
        console.error("Erro ao carregar dados do calendário:", err);
      } finally {
        setCarregandoCalendario(false);
      }
    }

    fetchCalendarioEMetas();
  }, [abaAtiva, userId]);

  function handleLogout() {
    localStorage.removeItem('@siora:user');
    navigate('/login');
  }

  async function handleAddMeta(e: React.FormEvent) {
    e.preventDefault();
    if (!novaMetaDescricao.trim() || !userId) return;

    try {
      const response = await api.post(`/api/dashboard/tarefas`, {
        usuario_id: userId,
        descricao: novaMetaDescricao,
      });

      setMetas((prev) => [response.data, ...prev]);
      setNovaMetaDescricao('');
    } catch (err) {
      console.error("Erro ao adicionar meta:", err);
      alert("Não foi possível salvar a meta. Verifique o console do backend.");
    }
  }

  async function handleToggleMeta(id: number) {
    try {
      const response = await api.patch(`/api/dashboard/tarefas/${id}/toggle`, {
        usuario_id: userId,
      });
      setMetas((prev) =>
        prev.map((m) => (m.id === id ? { ...m, concluida: response.data.concluida } : m))
      );
    } catch (err) {
      console.error("Erro ao atualizar status da meta:", err);
    }
  }

  async function handleDeleteMeta(id: number) {
    try {
      await api.delete(`/api/dashboard/tarefas/${id}`, {
        data: { usuario_id: userId },
      });
      setMetas((prev) => prev.filter((m) => m.id !== id));
    } catch (err) {
      console.error("Erro ao excluir meta:", err);
    }
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-800 font-sans">
      <HeaderAluno
        primeiroNome={primeiroNome}
        semestreAtual={disciplinas[0]?.semestre_atual}
        onLogout={handleLogout}
      />

      <main className="max-w-[1200px] mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <section className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1 sm:mb-2">Suas Disciplinas</h1>
          <p className="text-slate-500 text-xs sm:text-sm font-medium">
            Período Letivo Atual: 2026.1{' '}
            {disciplinas.length > 0 && disciplinas[0]?.semestre_atual
              ? `• ${disciplinas[0].semestre_atual}º Semestre`
              : ''}
          </p>
        </section>

        {/* Barra de Navegação com Scroll Horizontal Limpo no Mobile */}
        <div className="w-full overflow-x-auto no-scrollbar mb-8">
          <nav className="flex gap-1 bg-slate-100/80 p-1.5 rounded-xl border border-slate-200/60 w-max min-w-full sm:min-w-0">
            <button
              onClick={() => setAbaAtiva('disciplinas')}
              className={`${
                abaAtiva === 'disciplinas'
                  ? 'bg-[#3B82F6] text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              } flex-1 sm:flex-none px-4 sm:px-8 py-2 rounded-lg font-semibold text-xs sm:text-sm transition-all text-center whitespace-nowrap`}
            >
              Disciplinas
            </button>
            <button
              onClick={() => setAbaAtiva('calendario')}
              className={`${
                abaAtiva === 'calendario'
                  ? 'bg-[#3B82F6] text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              } flex-1 sm:flex-none px-4 sm:px-8 py-2 rounded-lg font-semibold text-xs sm:text-sm transition-all text-center whitespace-nowrap`}
            >
              Calendário / Metas
            </button>
            <button
              onClick={() => setAbaAtiva('horarios')}
              className={`${
                abaAtiva === 'horarios'
                  ? 'bg-[#3B82F6] text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              } flex-1 sm:flex-none px-4 sm:px-8 py-2 rounded-lg font-semibold text-xs sm:text-sm transition-all text-center whitespace-nowrap`}
            >
              Meus Horários
            </button>
          </nav>
        </div>

        {carregando && abaAtiva === 'disciplinas' && (
          <p className="text-slate-500 animate-pulse font-medium text-sm">
            Carregando diários do banco de dados...
          </p>
        )}

        {!carregando && abaAtiva === 'disciplinas' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {Array.isArray(disciplinas) && disciplinas.length > 0 ? (
              disciplinas.map((disc) => (
                <DisciplinaCard key={disc.disciplina_id} disciplina={disc} />
              ))
            ) : (
              <div className="col-span-full bg-white border border-slate-200 rounded-xl p-6 sm:p-8 text-center text-slate-500 text-sm">
                Nenhuma disciplina vinculada encontrada para este estudante no banco de dados.
              </div>
            )}
          </div>
        )}

        {abaAtiva === 'calendario' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-start">
            <PrazosAcademicosSection carregando={carregandoCalendario} prazos={prazos} />
            <MetasEstudoSection
              carregando={carregandoCalendario}
              metas={metas}
              novaMetaDescricao={novaMetaDescricao}
              setNovaMetaDescricao={setNovaMetaDescricao}
              onAddMeta={handleAddMeta}
              onToggleMeta={handleToggleMeta}
              onDeleteMeta={handleDeleteMeta}
            />
          </div>
        )}

        {abaAtiva === 'horarios' && <GridHorarios horarios={horarios} />}
      </main>
    </div>
  );
}