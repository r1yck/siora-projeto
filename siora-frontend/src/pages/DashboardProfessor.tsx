import { useState, useEffect } from 'react';
import axios from 'axios';
import iconSiora from '../assets/icon-siora.svg';
import { Users, ArrowRight } from '@phosphor-icons/react';

// Tipagem dos dados do backend
interface Turma {
  disciplina_id: number;
  disciplina_nome: string;
  codigo_turma: string;
  total_alunos: string;
}

interface User {
  id?: number;
  id_usuario?: number;
  nome: string;
  matricula_siape?: string;
  perfil?: string;
  tipo_usuario?: string;
}

export function DashboardProfessor() {
  const [turmas, setTurmas] = useState<Turma[]>([]);
  const [carregando, setCarregando] = useState<boolean>(true);
  const [erro, setErro] = useState<string>('');

  const userString = localStorage.getItem('@siora:user');
  const user: User | null = userString ? JSON.parse(userString) : null;

  // Extrai chaves primitivas para evitar loops infinitos no useEffect
  const userId = user?.id || user?.id_usuario;
  const perfilDoUsuario = (user?.perfil || user?.tipo_usuario || '').toUpperCase();
  const matriculaSiape = user?.matricula_siape;

  useEffect(() => {
    // Proteção de rota à prova de falhas com tipos primitivos
    if (!userString || (!userId && !matriculaSiape) || (perfilDoUsuario !== 'PROFESSOR' && perfilDoUsuario !== 'DOCENTE')) { 
      window.location.href = '/login'; 
      return; 
    }

    async function fetchTurmas() {
      try {
        setCarregando(true);
        const response = await axios.get<Turma[]>(`http://localhost:3000/api/dashboard/professor/${userId}/turmas`);
        setTurmas(response.data || []);
      } catch (err) {
        console.error(err);
        setErro('Não foi possível carregar as turmas.');
      } finally {
        setCarregando(false);
      }
    }

    if (userId) {
      fetchTurmas();
    }
  // Mudamos a dependência para monitorar apenas variáveis de texto/número estáveis
  }, [userId, perfilDoUsuario, matriculaSiape, userString]);

  function handleLogout(e: React.MouseEvent) {
    e.preventDefault();
    localStorage.removeItem('@siora:user');
    window.location.href = '/login';
  }

  const nomeProfessor = user?.nome ? `Prof. ${user.nome.split(' ')[0]}` : 'Professor';

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-800 font-sans">

      {/* CABEÇALHO (TOPBAR) */}
      <header className="flex justify-between items-center bg-white px-8 py-4 border-b border-slate-200 shadow-sm">
        <img
          src={iconSiora}
          alt="Logo SIORA"
          onClick={() => window.location.href = '/dashboard-professor'} 
          className="w-10 h-10 object-contain cursor-pointer hover:opacity-80 transition-opacity"
        />

        <div className="flex-1"></div>

        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end leading-tight">
            <span className="font-semibold text-sm text-slate-700">Olá, {nomeProfessor}</span>
            <button onClick={handleLogout} className="text-slate-400 text-xs hover:text-slate-600 transition-colors">
              Sair
            </button>
          </div>
          <div className="w-9 h-9 bg-slate-200 rounded-full flex-shrink-0"></div>
        </div>
      </header>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="max-w-[1200px] mx-auto px-6 py-12">
        <section className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Suas Turmas Ativas</h1>
          <p className="text-slate-500 text-sm font-medium">Painel do Docente • Semestre 2026.1</p>
        </section>

        {carregando && <p className="text-slate-500 animate-pulse font-medium">Carregando turmas...</p>}
        {erro && <p className="text-red-500 font-medium">{erro}</p>}

        {!carregando && !erro && turmas.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {turmas.map((turma) => {
              const infoExtraMock = turma.disciplina_nome.includes('Jogos')
                ? '8º Semestre (68 h/68 Aulas)'
                : '6º Semestre (68 h/68 Aulas)';

              return (
                <article
                  key={turma.disciplina_id}
                  className="bg-white border border-slate-200 rounded-xl flex flex-col overflow-hidden shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <div className="bg-[#D1FAE5]/60 px-5 py-2.5 text-[10px] font-bold text-[#059669] uppercase tracking-wider border-b border-emerald-50">
                    Bacharelado em Sistemas de Informação
                  </div>

                  <div className="p-6 flex-grow border-b border-slate-100">
                    <h2 className="text-[1.15rem] font-bold text-slate-800 mb-2 leading-snug">
                      {turma.disciplina_nome}
                    </h2>
                    <p className="text-[12px] text-slate-400 font-medium">
                      Código: {turma.codigo_turma} • {infoExtraMock}
                    </p>
                  </div>

                  <div className="px-6 py-4 flex items-center justify-between">
                    <span className="flex items-center gap-2 text-[#059669] text-xs font-bold">
                      <Users size={18} weight="fill" />
                      {turma.total_alunos} Alunos Matriculados
                    </span>

                    {/* ATUALIZADO: Enviando o ID dinâmico da disciplina pela URL para o painel do professor */}
                    <button
                      onClick={() => window.location.href = `/detalhes-disciplina-professor/${turma.disciplina_id}`}
                      className="flex items-center gap-1 text-[#3B82F6] text-xs font-bold hover:text-blue-700 transition-colors"
                    >
                      Gerenciar Turma <ArrowRight size={14} weight="bold" />
                    </button>
                  </div>
                </article>
              );
            })}

          </div>
        )}

        {!carregando && !erro && turmas.length === 0 && (
          <div className="bg-white border border-slate-200 rounded-xl p-8 text-center text-slate-500">
            Nenhuma turma vinculada a você neste semestre.
          </div>
        )}

      </main>
    </div>
  );
}