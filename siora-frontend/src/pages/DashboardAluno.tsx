import { useState, useEffect } from 'react';
import axios from 'axios';
import iconSiora from '../assets/icon-siora.svg';
import { WarningCircle, CheckCircle, Plus } from '@phosphor-icons/react';

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

export function DashboardAluno() {
  const [abaAtiva, setAbaAtiva] = useState<'disciplinas' | 'calendario' | 'horarios'>('disciplinas');
  const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);
  const [carregando, setCarregando] = useState(true);

  const userString = localStorage.getItem('@siora:user');
  const user: User | null = userString ? JSON.parse(userString) : null;
  const primeiroNome = user?.nome ? user.nome.split(' ')[0] : 'Aluno';

  useEffect(() => {

    const perfilDoUsuario = (user?.perfil || user?.tipo_usuario || '').toUpperCase();

    if (!user || (!user.id && !user.id_usuario && !user.matricula_siape) || (perfilDoUsuario !== 'ESTUDANTE' && perfilDoUsuario !== 'ALUNO')) {
      window.location.href = '/login';
      return;
    }

    async function fetchDisciplinas() {
      try {

        const userId = user?.id || user?.id_usuario;

        const response = await axios.get(`http://localhost:3000/api/dashboard/aluno/${userId}/disciplinas`);
        console.log("Dados chegando do banco:", response.data);
        setDisciplinas(response.data);
      } catch (err) {
        console.error("Erro ao buscar disciplinas:", err);
      } finally {
        setCarregando(false);
      }
    }

    fetchDisciplinas();
  }, [user?.id]);

  function handleLogout() {
    localStorage.removeItem('@siora:user');
    window.location.href = '/login';
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-800 font-sans">
      <header className="flex justify-between items-center bg-white px-8 py-4 border-b border-slate-200 shadow-sm">
        <img
          src={iconSiora}
          alt="Logo SIORA"
          onClick={() => window.location.href = '/'}
          className="w-10 h-10 object-contain cursor-pointer hover:opacity-80 transition-opacity"
        />
        <div className="bg-emerald-100 text-emerald-600 px-5 py-1.5 rounded-full text-xs font-bold tracking-wide">
          Progresso do Curso: 75% concluído
        </div>
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

        {/* FEEDBACK DE CARREGAMENTO */}
        {carregando && abaAtiva === 'disciplinas' && (
          <p className="text-slate-500 animate-pulse font-medium">Carregando diários do banco de dados...</p>
        )}

        {/* RENDERIZAÇÃO REAL DO BANCO DE DADOS */}
        {!carregando && abaAtiva === 'disciplinas' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {Array.isArray(disciplinas) && disciplinas.length > 0 ? (
              disciplinas.map((disc: Disciplina) => {
                const nomeDisciplina = disc.disciplina_nome || "Disciplina Sem Nome";
                
                const qtdAlertas: number = 0;
                const temAlerta = qtdAlertas > 0;

                return (
                  <article
                    key={disc.disciplina_id}
                    onClick={() => window.location.href = '/detalhes-disciplina'}
                    className="bg-white border border-slate-200 rounded-xl flex flex-col overflow-hidden shadow-sm hover:shadow-md hover:border-blue-400 transition-all cursor-pointer"
                  >
                    {/* ... (mantenha as divs do topo e do meio iguais) ... */}
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
                          {/* CORREÇÃO 2: Deixando o texto dinâmico para o futuro */}
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
        {/* ABA CALENDÁRIO (MANTIDA INTACTA) */}
        {abaAtiva === 'calendario' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm min-h-[500px]">
              <h2 className="text-xl font-bold text-slate-800 mb-8">Prazos de Junho</h2>

              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-2 h-2 rounded-full bg-red-500 mt-2 shrink-0"></div>
                  <div>
                    <p className="text-[15px] font-semibold text-slate-700">18 de Junho — Entrega do Protótipo (Dev. de Jogos)</p>
                    <span className="inline-block bg-red-100 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded mt-1">Faltam 3 dias</span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 shrink-0"></div>
                  <div>
                    <p className="text-[15px] font-semibold text-slate-700">24 de Junho — Mapeamento de Tabelas (TABD)</p>
                    <span className="inline-block bg-emerald-100 text-emerald-600 text-[10px] font-bold px-2 py-0.5 rounded mt-1">Faltam 9 dias</span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 shrink-0"></div>
                  <div>
                    <p className="text-[15px] font-semibold text-slate-700">26 de Junho — Entregáveis do Front-End (TCC2)</p>
                    <span className="inline-block bg-emerald-100 text-emerald-600 text-[10px] font-bold px-2 py-0.5 rounded mt-1">Faltam 11 dias</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm min-h-[500px]">
              <h2 className="text-xl font-bold text-slate-800 mb-8">Minhas Metas de Estudo</h2>
              <div className="relative mb-10">
                <Plus className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder="Adicionar um compromisso particular..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>

              <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 transition-all" />
                  <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">Estudar SQL para a prova de TABD</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" checked readOnly className="w-5 h-5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 transition-all" />
                  <span className="text-sm font-medium text-slate-400 line-through">Revisar roteiro do TCC2 com o orientador</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* ABA HORÁRIOS (MANTIDA INTACTA) */}
        {abaAtiva === 'horarios' && (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-start">
            {/* SEGUNDA-FEIRA */}
            <div className="bg-white border border-slate-200 rounded-xl min-h-[500px] flex flex-col shadow-sm">
              <h3 className="text-center font-bold text-slate-800 py-4 border-b border-slate-100">Segunda-feira</h3>
              <div className="p-3 flex flex-col gap-3"></div>
            </div>

            {/* TERÇA-FEIRA */}
            <div className="bg-white border border-slate-200 rounded-xl min-h-[500px] flex flex-col shadow-sm">
              <h3 className="text-center font-bold text-slate-800 py-4 border-b border-slate-100">Terça-feira</h3>
              <div className="p-3 flex flex-col gap-3">
                <div className="border border-slate-200 rounded-lg p-4 text-center bg-slate-50/50 hover:border-blue-300 transition-colors">
                  <span className="inline-block bg-slate-100 text-slate-500 text-[10px] font-bold px-2 py-1 rounded mb-2">07:30 - 09:30</span>
                  <p className="text-[13px] font-bold text-slate-700 leading-snug mb-2">Tópicos Avançados<br />em Banco de Dados</p>
                  <span className="text-[11px] font-bold text-emerald-600">Lab. 107</span>
                </div>
              </div>
            </div>

            {/* QUARTA-FEIRA */}
            <div className="bg-white border border-slate-200 rounded-xl min-h-[500px] flex flex-col shadow-sm">
              <h3 className="text-center font-bold text-slate-800 py-4 border-b border-slate-100">Quarta-feira</h3>
              <div className="p-3 flex flex-col gap-3">
                <div className="border border-slate-200 rounded-lg p-4 text-center bg-slate-50/50 hover:border-blue-300 transition-colors">
                  <span className="inline-block bg-slate-100 text-slate-500 text-[10px] font-bold px-2 py-1 rounded mb-2">07:30 - 09:30</span>
                  <p className="text-[13px] font-bold text-slate-700 leading-snug mb-2">Desenvolvimento<br />de Jogos</p>
                  <span className="text-[11px] font-bold text-emerald-600">Lab. 118</span>
                </div>
                <div className="border border-slate-200 rounded-lg p-4 text-center bg-slate-50/50 hover:border-blue-300 transition-colors">
                  <span className="inline-block bg-slate-100 text-slate-500 text-[10px] font-bold px-2 py-1 rounded mb-2">09:50 - 11:50</span>
                  <p className="text-[13px] font-bold text-slate-700 leading-snug mb-2">Tópicos Avançados<br />em Banco de Dados</p>
                  <span className="text-[11px] font-bold text-emerald-600">Lab. 107</span>
                </div>
              </div>
            </div>

            {/* QUINTA-FEIRA */}
            <div className="bg-white border border-slate-200 rounded-xl min-h-[500px] flex flex-col shadow-sm">
              <h3 className="text-center font-bold text-slate-800 py-4 border-b border-slate-100">Quinta-feira</h3>
              <div className="p-3 flex flex-col gap-3">
                <div className="border border-slate-200 rounded-lg p-4 text-center bg-slate-50/50 hover:border-blue-300 transition-colors">
                  <span className="inline-block bg-slate-100 text-slate-500 text-[10px] font-bold px-2 py-1 rounded mb-2">07:30 - 09:30</span>
                  <p className="text-[13px] font-bold text-slate-700 leading-snug mb-2">Trabalho de<br />Conclusão de Curso</p>
                  <span className="text-[11px] font-bold text-emerald-600">Lab. 124</span>
                </div>
                <div className="border border-slate-200 rounded-lg p-4 text-center bg-slate-50/50 hover:border-blue-300 transition-colors">
                  <span className="inline-block bg-slate-100 text-slate-500 text-[10px] font-bold px-2 py-1 rounded mb-2">09:50 - 11:50</span>
                  <p className="text-[13px] font-bold text-slate-700 leading-snug mb-2">Desenvolvimento<br />de Jogos</p>
                  <span className="text-[11px] font-bold text-emerald-600">Lab. 118</span>
                </div>
              </div>
            </div>

            {/* SEXTA-FEIRA */}
            <div className="bg-white border border-slate-200 rounded-xl min-h-[500px] flex flex-col shadow-sm">
              <h3 className="text-center font-bold text-slate-800 py-4 border-b border-slate-100">Sexta-feira</h3>
              <div className="p-3 flex flex-col gap-3"></div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}