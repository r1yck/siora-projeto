import { useState, useEffect } from 'react';
import axios from 'axios';
import iconSiora from '../assets/icon-siora.svg';
import { WarningCircle, CheckCircle, Plus, Trash } from '@phosphor-icons/react';

interface Disciplina {
  disciplina_id: number;
  disciplina_nome: string;
  carga_horaria?: number;
  semestre?: number;
  semestre_atual?: number;
  professor_nome?: string;
  qtd_alertas?: number;
}

interface User {
  id?: number;
  id_usuario?: number;
  nome: string;
  matricula_siape?: string;
  perfil?: string;
  tipo_usuario?: string;
}

interface Horario {
  horario_id: number;
  disciplina_nome: string;
  dia_semana: string;
  hora_inicio: string;
  hora_fim: string;
  laboratorio: string;
}

interface PrazoAcademico {
  id: number;
  descricao: string;
  data_vencimento: string;
  disciplina_nome: string;
  dias_restantes?: number;
}

interface MetaPrivada {
  id: number;
  descricao: string;
  concluidas?: boolean;
  concluida: boolean;
}

export function DashboardAluno() {
  const [abaAtiva, setAbaAtiva] = useState<'disciplinas' | 'calendario' | 'horarios'>('disciplinas');
  const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);
  const [horarios, setHorarios] = useState<Horario[]>([]);

  // Novos estados para a aba Calendário / Metas
  const [prazos, setPrazos] = useState<PrazoAcademico[]>([]);
  const [metas, setMetas] = useState<MetaPrivada[]>([]);
  const [novaMetaDescricao, setNovaMetaDescricao] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [carregandoCalendario, setCarregandoCalendario] = useState(false);

  const userString = localStorage.getItem('@siora:user');
  const user: User | null = userString ? JSON.parse(userString) : null;
  const primeiroNome = user?.nome ? user.nome.split(' ')[0] : 'Aluno';
  const userId = user?.id || user?.id_usuario;

  // Efeito principal para buscar Disciplinas e Horários
  useEffect(() => {
    const perfilDoUsuario = (user?.perfil || user?.tipo_usuario || '').toUpperCase();

    if (!user || (!user.id && !user.id_usuario && !user.matricula_siape) || (perfilDoUsuario !== 'ESTUDANTE' && perfilDoUsuario !== 'ALUNO')) {
      window.location.href = '/login';
      return;
    }

    async function fetchDadosDashboard() {
      try {
        const [respDisciplinas, respHorarios] = await Promise.all([
          axios.get(`http://localhost:3000/api/dashboard/aluno/${userId}/disciplinas`),
          axios.get(`http://localhost:3000/api/dashboard/aluno/${userId}/horarios`)
        ]);

        setDisciplinas(respDisciplinas.data);
        setHorarios(respHorarios.data);

        if (respDisciplinas.data.length > 0 && respDisciplinas.data[0].semestre_atual) {
          localStorage.setItem('@siora:semestre_atual', respDisciplinas.data[0].semestre_atual.toString());
        }
      } catch (err) {
        console.error("Erro ao buscar dados do dashboard:", err);
      } finally {
        setCarregando(false);
      }
    }

    fetchDadosDashboard();
  }, [userId]);

  // 1. Correção da Busca (Ajustado o endpoint para /api/dashboard/calendario)
  useEffect(() => {
    if (abaAtiva !== 'calendario' || !userId) return;

    async function fetchCalendarioEMetas() {
      setCarregandoCalendario(true);
      try {
        const response = await axios.get(`http://localhost:3000/api/dashboard/calendario`, {
          params: { usuario_id: userId }
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

  // 2. Correção do Envio (Ajustado o endpoint de /metas para /tarefas)
  async function handleAddMeta(e: React.FormEvent) {
    e.preventDefault();
    if (!novaMetaDescricao.trim() || !userId) return;

    try {
      const response = await axios.post(`http://localhost:3000/api/dashboard/tarefas`, {
        usuario_id: userId,
        descricao: novaMetaDescricao
      });

      setMetas(prev => [response.data, ...prev]);
      setNovaMetaDescricao(''); // Agora vai limpar o input com sucesso!
    } catch (err) {
      console.error("Erro ao adicionar meta:", err);
      alert("Não foi possível salvar a meta. Verifique o console do backend.");
    }
  }

  // 3. Ajuste nas rotas de Toggle e Delete correspondentes
  async function handleToggleMeta(id: number) {
    try {
      const response = await axios.patch(`http://localhost:3000/api/dashboard/tarefas/${id}/toggle`, {
        usuario_id: userId
      });
      setMetas(prev => prev.map(m => m.id === id ? { ...m, concluida: response.data.concluida } : m));
    } catch (err) {
      console.error("Erro ao atualizar status da meta:", err);
    }
  }

  async function handleDeleteMeta(id: number) {
    try {
      await axios.delete(`http://localhost:3000/api/dashboard/tarefas/${id}`, {
        data: { usuario_id: userId }
      });
      setMetas(prev => prev.filter(m => m.id !== id));
    } catch (err) {
      console.error("Erro ao excluir meta:", err);
    }
  }

  const renderHorariosDoDia = (dia: string) => {
    const aulasDoDia = horarios.filter(
      h => h.dia_semana.trim().toUpperCase() === dia.trim().toUpperCase()
    );

    const slotsHorarios = [
      { id: 'manha_1', chave: '07:30' },
      { id: 'manha_2', chave: '09:50' },
      { id: 'tarde_1', chave: '13:30' },
      { id: 'tarde_2', chave: '15:50' }
    ];

    return slotsHorarios.map(slot => {
      const aula = aulasDoDia.find(h => h.hora_inicio.startsWith(slot.chave));

      if (aula) {
        return (
          <div
            key={aula.horario_id}
            className="border border-slate-200 rounded-lg p-4 text-center bg-slate-50/50 hover:border-blue-300 transition-colors h-[125px] flex flex-col justify-center"
          >
            <span className="inline-block bg-slate-100 text-slate-500 text-[10px] font-bold px-2 py-1 rounded mb-2 w-max mx-auto">
              {aula.hora_inicio} - {aula.hora_fim}
            </span>
            <p className="text-[12px] font-bold text-slate-700 leading-snug mb-1 line-clamp-2">
              {aula.disciplina_nome}
            </p>
            <span className="text-[11px] font-bold text-emerald-600">
              {aula.laboratorio || 'Sala de Aula'}
            </span>
          </div>
        );
      }

      return (
        <div
          key={`livre-${slot.id}`}
          className="border border-dashed border-slate-100 rounded-lg h-[125px] flex items-center justify-center bg-slate-50/20"
        >
          <p className="text-slate-300 text-[11px] italic">Livre</p>
        </div>
      );
    });
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-800 font-sans">
      <header className="flex justify-between items-center bg-white px-8 py-4 border-b border-slate-200 shadow-sm">
        <img
          src={iconSiora}
          alt="Logo SIORA"
          onClick={() => window.location.href = '/'}
          className="w-10 h-10 object-contain cursor-pointer hover:opacity-80 transition-opacity"
        />
        {disciplinas.length > 0 && disciplinas[0]?.semestre_atual && (
          <div className="bg-emerald-100 text-emerald-600 px-5 py-1.5 rounded-full text-xs font-bold tracking-wide">
            Progresso do Curso: {Math.round(((disciplinas[0].semestre_atual - 1) / 8) * 100)}% concluído
          </div>
        )}
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end leading-tight">
            <span className="font-semibold text-sm text-slate-700">Olá, {primeiroNome}</span>
            <button onClick={handleLogout} className="text-slate-400 text-xs hover:text-slate-600 transition-colors">Sair</button>
          </div>
          <div className="w-9 h-9 bg-slate-200 rounded-full flex-shrink-0"></div>
        </div>
      </header>

      <main className="max-w-[1200px] mx-auto px-6 py-12">
        <section className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Suas Disciplinas</h1>
          <p className="text-slate-500 text-sm font-medium">
            Período Letivo Atual: 2026.1 {disciplinas.length > 0 && disciplinas[0]?.semestre_atual ? `• ${disciplinas[0].semestre_atual}º Semestre` : ''}
          </p>
        </section>

        <nav className="flex gap-1 bg-slate-100/80 p-1.5 rounded-lg w-max mb-10 border border-slate-200/60">
          <button
            onClick={() => setAbaAtiva('disciplinas')}
            className={`${abaAtiva === 'disciplinas' ? 'bg-[#3B82F6] text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'} px-8 py-2 rounded-md font-semibold text-sm transition-all`}
          >
            Disciplinas
          </button>
          <button
            onClick={() => setAbaAtiva('calendario')}
            className={`${abaAtiva === 'calendario' ? 'bg-[#3B82F6] text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'} px-8 py-2 rounded-md font-semibold text-sm transition-all`}
          >
            Calendário / Metas
          </button>
          <button
            onClick={() => setAbaAtiva('horarios')}
            className={`${abaAtiva === 'horarios' ? 'bg-[#3B82F6] text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'} px-8 py-2 rounded-md font-semibold text-sm transition-all`}
          >
            Meus Horários
          </button>
        </nav>

        {carregando && abaAtiva === 'disciplinas' && (
          <p className="text-slate-500 animate-pulse font-medium">Carregando diários do banco de dados...</p>
        )}

        {!carregando && abaAtiva === 'disciplinas' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.isArray(disciplinas) && disciplinas.length > 0 ? (
              disciplinas.map((disc: Disciplina) => {
                const nomeDisciplina = disc.disciplina_nome || "Disciplina Sem Nome";
                const qtdAlertas = disc.qtd_alertas || 0;
                const temAlerta = qtdAlertas > 0;

                return (
                  <article
                    key={disc.disciplina_id}
                    onClick={() => window.location.href = `/disciplina/${disc.disciplina_id}`}
                    className="bg-white border border-slate-200 rounded-xl flex flex-col overflow-hidden shadow-sm hover:shadow-md hover:border-blue-400 transition-all cursor-pointer"
                  >
                    <div className="bg-[#D1FAE5]/60 px-5 py-2.5 text-[10px] font-bold text-[#059669] uppercase tracking-wider border-b border-emerald-50">
                      Bacharelado em Sistemas de Informação
                    </div>

                    <div className="p-6 flex-grow border-b border-slate-100">
                      <h2 className="text-[1.15rem] font-bold text-slate-800 mb-2 leading-snug">
                        {nomeDisciplina}
                      </h2>
                      <p className="text-[13px] text-slate-400 font-medium">
                        Prof. {disc.professor_nome || 'A definir'}
                      </p>
                    </div>

                    <div className="p-4 flex items-center justify-center">
                      {temAlerta ? (
                        <span className="flex items-center gap-2 text-red-500 text-sm font-bold">
                          <WarningCircle size={20} weight="fill" />
                          {qtdAlertas} {qtdAlertas === 1 ? 'Alerta Pendente' : 'Alertas Pendentes'}
                        </span>
                      ) : (
                        <span className="flex items-center gap-2 text-emerald-500 text-sm font-bold">
                          <CheckCircle size={20} weight="fill" />
                          Nenhum alerta pendente
                        </span>
                      )}
                    </div>
                  </article>
                );
              })
            ) : (
              <div className="col-span-full bg-white border border-slate-200 rounded-xl p-8 text-center text-slate-500">
                Nenhuma disciplina vinculada encontrada para este estudante no banco de dados.
              </div>
            )}
          </div>
        )}

        {/* INTEGRADO: ABA CALENDÁRIO & METAS DINÂMICAS */}
        {abaAtiva === 'calendario' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

            {/* SESSÃO DE PRAZOS ACADÊMICOS */}
            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm min-h-[500px] flex flex-col">
              <h2 className="text-xl font-bold text-slate-800 mb-8">Prazos e Avaliações</h2>

              {carregandoCalendario ? (
                <p className="text-slate-400 animate-pulse text-sm">Buscando cronograma acadêmico...</p>
              ) : prazos.length === 0 ? (
                <p className="text-slate-400 text-sm italic my-auto text-center">Nenhum prazo ou atividade agendada pelos professores.</p>
              ) : (
                <div className="space-y-8">
                  {prazos.map((prazo) => {
                    const diasRestantes = prazo.dias_restantes ?? 0;
                    const ehUrgente = diasRestantes <= 3;
                    return (
                      <div key={prazo.id} className="flex gap-4">
                        <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${ehUrgente ? 'bg-red-500' : 'bg-emerald-500'}`}></div>
                        <div>
                          <p className="text-[15px] font-semibold text-slate-700">
                            {prazo.descricao} — <span className="text-slate-500 text-sm font-normal">{prazo.disciplina_nome}</span>
                          </p>
                          <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded mt-1 ${ehUrgente ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'
                            }`}>
                            {diasRestantes === 0 ? 'Entrega hoje!' : diasRestantes === 1 ? 'Falta 1 dia' : `Faltam ${diasRestantes} dias`}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* SESSÃO DE METAS DE ESTUDO (TAREFAS PRIVADAS) */}
            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm min-h-[500px] flex flex-col">
              <h2 className="text-xl font-bold text-slate-800 mb-8">Minhas Metas de Estudo</h2>

              <form onSubmit={handleAddMeta} className="relative mb-10">
                <Plus className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  value={novaMetaDescricao}
                  onChange={(e) => setNovaMetaDescricao(e.target.value)}
                  placeholder="Adicionar um compromisso particular... (Pressione Enter)"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-slate-700"
                />
              </form>

              {carregandoCalendario ? (
                <p className="text-slate-400 animate-pulse text-sm">Carregando suas metas...</p>
              ) : metas.length === 0 ? (
                <p className="text-slate-400 text-sm italic my-auto text-center">Você não possui metas pendentes. Adicione um objetivo acima!</p>
              ) : (
                <div className="space-y-4 overflow-y-auto max-h-[350px] pr-1">
                  {metas.map((meta) => (
                    <div key={meta.id} className="flex items-center justify-between group border-b border-slate-100 pb-2 last:border-none">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={meta.concluida}
                          onChange={() => handleToggleMeta(meta.id)}
                          className={`w-5 h-5 rounded border-slate-300 transition-all ${meta.concluida ? 'text-emerald-600 focus:ring-emerald-500' : 'text-blue-600 focus:ring-blue-500'
                            }`}
                        />
                        <span className={`text-sm font-medium transition-colors ${meta.concluida ? 'text-slate-400 line-through' : 'text-slate-600 group-hover:text-slate-900'
                          }`}>
                          {meta.descricao}
                        </span>
                      </label>
                      <button
                        onClick={() => handleDeleteMeta(meta.id)}
                        className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                        title="Remover meta"
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}

        {/* ABA HORÁRIOS */}
        {abaAtiva === 'horarios' && (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-start">
            <div className="bg-white border border-slate-200 rounded-xl min-h-[500px] flex flex-col shadow-sm">
              <h3 className="text-center font-bold text-slate-800 py-4 border-b border-slate-100">Segunda-feira</h3>
              <div className="p-3 flex flex-col gap-3">{renderHorariosDoDia('Segunda-feira')}</div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl min-h-[500px] flex flex-col shadow-sm">
              <h3 className="text-center font-bold text-slate-800 py-4 border-b border-slate-100">Terça-feira</h3>
              <div className="p-3 flex flex-col gap-3">{renderHorariosDoDia('Terça-feira')}</div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl min-h-[500px] flex flex-col shadow-sm">
              <h3 className="text-center font-bold text-slate-800 py-4 border-b border-slate-100">Quarta-feira</h3>
              <div className="p-3 flex flex-col gap-3">{renderHorariosDoDia('Quarta-feira')}</div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl min-h-[500px] flex flex-col shadow-sm">
              <h3 className="text-center font-bold text-slate-800 py-4 border-b border-slate-100">Quinta-feira</h3>
              <div className="p-3 flex flex-col gap-3">{renderHorariosDoDia('Quinta-feira')}</div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl min-h-[500px] flex flex-col shadow-sm">
              <h3 className="text-center font-bold text-slate-800 py-4 border-b border-slate-100">Sexta-feira</h3>
              <div className="p-3 flex flex-col gap-3">{renderHorariosDoDia('Sexta-feira')}</div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}