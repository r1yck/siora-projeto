import { useNavigate } from 'react-router-dom';

export function DashboardProfessor() {
  const navigate = useNavigate();
  
  const userData = localStorage.getItem('@siora:user');
  const user = userData ? JSON.parse(userData) : null;

  function handleLogout() {
    localStorage.removeItem('@siora:user');
    navigate('/login');
  }

  return (
    <div className="flex flex-col h-screen items-center justify-center bg-slate-50 text-siora-dark">
      <h1 className="text-4xl font-bold mb-2 text-siora-blue">
        Olá, {user?.nome || 'Professor'}! 👨‍🏫
      </h1>
      <p className="text-lg text-slate-500 mb-8">
        Bem-vindo ao seu painel docente.
      </p>

      <button 
        onClick={handleLogout}
        className="px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
      >
        Sair do Sistema
      </button>
    </div>
  );
}