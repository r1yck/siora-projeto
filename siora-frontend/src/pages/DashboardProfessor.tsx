import { useState, useEffect } from 'react';
import axios from 'axios';
import { HeaderProfessor } from '../components/dashboard-professor/HeaderProfessor';
import { TurmaCard } from '../components/dashboard-professor/TurmaCard';
import type { Turma, User } from '../types/professor';

export function DashboardProfessor() {
  const [turmas, setTurmas] = useState<Turma[]>([]);
  const [carregando, setCarregando] = useState<boolean>(true);
  const [erro, setErro] = useState<string>('');

  const userString = localStorage.getItem('@siora:user');
  const user: User | null = userString ? JSON.parse(userString) : null;

  const userId = user?.id || user?.id_usuario;
  const perfilDoUsuario = (user?.perfil || user?.tipo_usuario || '').toUpperCase();
  const matriculaSiape = user?.matricula_siape;

  useEffect(() => {
    if (
      !userString ||
      (!userId && !matriculaSiape) ||
      (perfilDoUsuario !== 'PROFESSOR' && perfilDoUsuario !== 'DOCENTE')
    ) {
      window.location.href = '/login';
      return;
    }

    async function fetchTurmas() {
      try {
        setCarregando(true);
        const response = await axios.get<Turma[]>(
          `http://localhost:3000/api/dashboard/professor/${userId}/turmas`
        );
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
  }, [userId, perfilDoUsuario, matriculaSiape, userString]);

  function handleLogout(e: React.MouseEvent) {
    e.preventDefault();
    localStorage.removeItem('@siora:user');
    window.location.href = '/login';
  }

  const nomeProfessor = user?.nome ? `Prof. ${user.nome.split(' ')[0]}` : 'Professor';

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-800 font-sans">
      <HeaderProfessor nomeProfessor={nomeProfessor} onLogout={handleLogout} />

      <main className="max-w-[1200px] mx-auto px-6 py-12">
        <section className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Suas Turmas Ativas</h1>
          <p className="text-slate-500 text-sm font-medium">Painel do Docente • Semestre 2026.1</p>
        </section>

        {carregando && (
          <p className="text-slate-500 animate-pulse font-medium">Carregando turmas...</p>
        )}
        {erro && <p className="text-red-500 font-medium">{erro}</p>}

        {!carregando && !erro && turmas.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {turmas.map((turma) => (
              <TurmaCard key={turma.disciplina_id} turma={turma} />
            ))}
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