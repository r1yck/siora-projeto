import { useState } from 'react';
import axios from 'axios';
import iconSiora from '../assets/icon-siora.svg';
import ifLogo from '../assets/if-logo.svg';
import { Eye, EyeSlash } from '@phosphor-icons/react';

export function Login() {
  const [matricula, setMatricula] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setErro('');
    setCarregando(true);

    try {
      const response = await axios.post('http://localhost:3000/api/login', {
        matricula,
        senha
      });

      const user = response.data;

      console.log("Dados recebidos do banco:", user);

      localStorage.setItem('@siora:user', JSON.stringify(user));

      const perfilDoUsuario = (user.perfil || user.tipo_usuario || '').toUpperCase();

      if (perfilDoUsuario === 'ESTUDANTE' || perfilDoUsuario === 'ALUNO') {
        window.location.href = '/dashboard-aluno';
      } else if (perfilDoUsuario === 'PROFESSOR' || perfilDoUsuario === 'DOCENTE') {
        window.location.href = '/dashboard-professor';
      } else {
        setErro(`Erro de roteamento: Perfil "${perfilDoUsuario}" não reconhecido.`);
      }

    } catch (err) {
      if (axios.isAxiosError(err) && err.response && err.response.data) {
        setErro(err.response.data.error);
      } else {
        setErro('Erro ao conectar com o servidor. Verifique o CORS.');
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
      {/* justify-center para o form ficar sempre no meio exato */}
      <div className="flex flex-col justify-center items-center p-8 bg-white relative w-full h-full">

        {/* Formulário Centralizado */}
        <div className="w-full max-w-md px-4 flex flex-col items-center z-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-siora-dark mb-3 tracking-tight">
              Bem-vindo ao SIORA
            </h2>
            <p className="text-sm text-slate-500 font-medium">
              Insira suas credenciais institucionais para acessar seus diários.
            </p>
          </div>

          <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">

            {/* INPUT DA MATRÍCULA */}
            <div className="w-full">
              <input
                type="text"
                placeholder="Sua Matrícula ou SIAPE"
                value={matricula}
                onChange={(e) => setMatricula(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3.5 px-4 text-sm text-siora-dark focus:outline-none focus:ring-2 focus:ring-siora-blue/20 transition-all"
              />
            </div>

            {/* INPUT DA SENHA */}
            <div className="w-full relative">
              <input
                type={mostrarSenha ? "text" : "password"}
                placeholder="Sua Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                // As classes abaixo com [&::] servem para esconder o olhinho nativo do navegador
                className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3.5 px-4 pr-12 text-sm text-siora-dark focus:outline-none focus:ring-2 focus:ring-siora-blue/20 transition-all [&::-ms-reveal]:hidden [&::-webkit-credentials-auto-fill-button]:hidden"
              />

              {/* Nosso botão customizado que não some */}
              <button
                type="button"
                onClick={() => setMostrarSenha(!mostrarSenha)}
                className="absolute right-4 top-3.5 text-slate-400 hover:text-siora-blue transition-colors focus:outline-none"
              >
                {mostrarSenha ? <EyeSlash size={20} weight="bold" /> : <Eye size={20} weight="bold" />}
              </button>

              {/* MENSAGEM DE ERRO */}
              {erro && (
                <p className="text-red-500 text-xs font-semibold mt-2 pl-1 animate-pulse">
                  {erro}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={carregando}
              className="w-full mt-2 bg-siora-blue hover:bg-blue-700 text-white font-medium py-3.5 px-4 rounded-lg transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-siora-blue text-sm disabled:opacity-50"
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