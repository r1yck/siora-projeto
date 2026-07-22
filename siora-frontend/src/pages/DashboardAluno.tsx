import { useState, useEffect } from 'react';
import axios from 'axios';
import { HeaderAluno } from '../components/dashboard-aluno/HeaderAluno';
import { DisciplinaCard } from '../components/dashboard-aluno/DisciplinaCard';
import { PrazosAcademicosSection } from '../components/dashboard-aluno/PrazosAcademicosSection';
import { MetasEstudoSection } from '../components/dashboard-aluno/MetasEstudoSection';
import { GridHorarios } from '../components/dashboard-aluno/GridHorarios';

import type { Disciplina, Horario, PrazoAcademico, MetaPrivada, User } from '../types/aluno';

export function DashboardAluno() {
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
      window.location.href = '/login';
      return;
    }

    async function fetchDadosDashboard() {
      try {
        const [respDisciplinas, respHorarios] = await Promise.all([
          axios.get(`http://localhost:3000/api/dashboard/aluno/${userId}/disciplinas`),
          axios.get(`http://localhost:3000/api/dashboard/aluno/${userId}/horarios`),
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
  }, [userId]);

  useEffect(() => {
    if (abaAtiva !== 'calendario' || !userId) return;

    async function fetchCalendarioEMetas() {
      setCarregandoCalendario(true);
      try {
        const response = await axios.get(`http://localhost:3000/api/dashboard/calendario`, {
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
    window.location.href = '/login';
  }

  async function handleAddMeta(e: React.FormEvent) {
    e.preventDefault();
    if (!novaMetaDescricao.trim() || !userId) return;

    try {
      const response = await axios.post(`http://localhost:3000/api/dashboard/tarefas`, {
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
      const response = await axios.patch(
        `http://localhost:3000/api/dashboard/tarefas/${id}/toggle`,
        {
          usuario_id: userId,
        }
      );
      setMetas((prev) =>
        prev.map((m) => (m.id === id ? { ...m, concluida: response.data.concluida } : m))
      );
    } catch (err) {
      console.error("Erro ao atualizar status da meta:", err);
    }
  }

  async function handleDeleteMeta(id: number) {
    try {
      await axios.delete(`http://localhost:3000/api/dashboard/tarefas/${id}`, {
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

      <main className="max-w-[1200px] mx-auto px-6 py-12">
        <section className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Suas Disciplinas</h1>
          <p className="text-slate-500 text-sm font-medium">
            Período Letivo Atual: 2026.1{' '}
            {disciplinas.length > 0 && disciplinas[0]?.semestre_atual
              ? `• ${disciplinas[0].semestre_atual}º Semestre`
              : ''}
          </p>
        </section>

        <nav className="flex gap-1 bg-slate-100/80 p-1.5 rounded-lg w-max mb-10 border border-slate-200/60">
          <button
            onClick={() => setAbaAtiva('disciplinas')}
            className={`${
              abaAtiva === 'disciplinas'
                ? 'bg-[#3B82F6] text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            } px-8 py-2 rounded-md font-semibold text-sm transition-all`}
          >
            Disciplinas
          </button>
          <button
            onClick={() => setAbaAtiva('calendario')}
            className={`${
              abaAtiva === 'calendario'
                ? 'bg-[#3B82F6] text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            } px-8 py-2 rounded-md font-semibold text-sm transition-all`}
          >
            Calendário / Metas
          </button>
          <button
            onClick={() => setAbaAtiva('horarios')}
            className={`${
              abaAtiva === 'horarios'
                ? 'bg-[#3B82F6] text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            } px-8 py-2 rounded-md font-semibold text-sm transition-all`}
          >
            Meus Horários
          </button>
        </nav>

        {carregando && abaAtiva === 'disciplinas' && (
          <p className="text-slate-500 animate-pulse font-medium">
            Carregando diários do banco de dados...
          </p>
        )}

        {!carregando && abaAtiva === 'disciplinas' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.isArray(disciplinas) && disciplinas.length > 0 ? (
              disciplinas.map((disc) => (
                <DisciplinaCard key={disc.disciplina_id} disciplina={disc} />
              ))
            ) : (
              <div className="col-span-full bg-white border border-slate-200 rounded-xl p-8 text-center text-slate-500">
                Nenhuma disciplina vinculada encontrada para este estudante no banco de dados.
              </div>
            )}
          </div>
        )}

        {abaAtiva === 'calendario' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
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