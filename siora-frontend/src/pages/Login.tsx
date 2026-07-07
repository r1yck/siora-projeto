import { useState } from 'react';
import axios from 'axios';

// Importação profissional dos assets
import iconSiora from '../assets/icon-siora.svg';
import ifLogo from '../assets/if-logo.svg';

export function Login() {
  const [credencial, setCredencial] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setErro('');
    setCarregando(true);

    try {
      const response = await axios.post('http://localhost:3000/api/login', {
        credencial: credencial
      });

      const { user } = response.data;
      localStorage.setItem('@siora:user', JSON.stringify(user));

      if (user.perfil === 'ESTUDANTE') {
        window.location.href = '/dashboard-aluno';
      } else if (user.perfil === 'PROFESSOR') {
        window.location.href = '/dashboard-professor';
      }

    } catch (err) {
      if (axios.isAxiosError(err) && err.response && err.response.data) {
        setErro(err.response.data.error);
      } else {
        setErro('Erro ao conectar com o servidor.');
      }
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="w-full h-screen grid grid-cols-1 md:grid-cols-2 overflow-hidden bg-white text-siora-dark">
      
      {/* PAINEL ESQUERDO: Verde Oficial SIORA */}
      <div className="hidden md:flex flex-col items-center justify-center bg-siora-teal p-12 text-white text-center select-none">
        <div className="flex flex-col items-center max-w-sm">
          <img 
            src={iconSiora} 
            alt="Ícone SIORA" 
            className="w-16 h-16 mb-6 object-contain"
          />
          <h1 className="text-6xl font-bold tracking-wider mb-4">SIORA</h1>
          <p className="text-lg font-light leading-relaxed text-teal-100/90">
            Sistema de Informação para Organização da Rotina Acadêmica
          </p>
        </div>
      </div>

      {/* PAINEL DIREITO: Formulário de Login */}
      {/* Mudamos para justify-center para o form ficar sempre no meio exato */}
      <div className="flex flex-col justify-center items-center p-8 bg-white relative w-full h-full">
        
        {/* Formulário Centralizado */}
        <div className="w-full max-w-md px-4 flex flex-col items-center z-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-siora-dark mb-3 tracking-tight">
              Bem-vindo ao SIORA
            </h2>
            <p className="text-sm text-slate-500 font-medium">
              Insira sua matrícula institucional para acessar seus diários.
            </p>
          </div>

          <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
            <div className="w-full">
              <input 
                type="text" 
                placeholder="20221ITA01GB0006"
                value={credencial}
                onChange={(e) => setCredencial(e.target.value)}
                disabled={carregando}
                className="w-full px-4 py-3.5 border border-slate-200 rounded-lg text-siora-dark placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-siora-blue focus:border-transparent transition-all font-mono"
              />
              
              {erro && (
                <p className="text-red-500 text-xs font-semibold mt-2 pl-1 animate-pulse">
                  {erro}
                </p>
              )}
            </div>

            <button 
              type="submit"
              disabled={carregando}
              className="w-full bg-siora-blue hover:bg-blue-700 text-white font-medium py-3.5 px-4 rounded-lg transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-siora-blue text-sm disabled:opacity-50"
            >
              {carregando ? 'Autenticando...' : 'Acessar Sistema'}
            </button>
          </form>
        </div>

        {/* RODAPÉ: Cravado no fundo da tela com absolute */}
        <div className="absolute bottom-6 w-full flex justify-between items-center text-[10px] sm:text-[11px] text-slate-400 font-medium px-6 md:px-12">
          <p className="italic">Desenvolvido para o Instituto Federal Baiano — Campus Itapetinga</p>
          <img 
            src={ifLogo} 
            alt="Logo Instituto Federal Baiano" 
            className="h-5 sm:h-6 object-contain ml-2 opacity-90"
          />
        </div>

      </div>

    </div>
  );
}