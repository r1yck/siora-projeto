import { useState } from 'react';
import axios from 'axios';
import iconSiora from '../assets/icon-siora.svg';
import ifLogo from '../assets/if-logo.svg';
import { Eye, EyeSlash, LockSimple, ShieldWarning } from '@phosphor-icons/react';

type Usuario = {
  id?: number | string;
  perfil?: string;
  tipo_usuario?: string;
  primeiro_acesso?: boolean;
};

export function Login() {
  const [matricula, setMatricula] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  // Estados para a Modal de Primeiro Acesso
  const [mostrarModalPrimeiroAcesso, setMostrarModalPrimeiroAcesso] = useState(false);
  const [usuarioPendente, setUsuarioPendente] = useState<Usuario | null>(null);
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarNovaSenha, setConfirmarNovaSenha] = useState('');
  const [mostrarNovaSenha, setMostrarNovaSenha] = useState(false);
  const [erroModal, setErroModal] = useState('');
  const [carregandoModal, setCarregandoModal] = useState(false);

  // Função centralizada para redirecionamento após autenticação/troca de senha
  function redirecionarUsuario(user: Usuario) {
    localStorage.setItem('@siora:user', JSON.stringify(user));
    const perfilDoUsuario = (user.perfil || user.tipo_usuario || '').toUpperCase();

    if (perfilDoUsuario === 'ESTUDANTE' || perfilDoUsuario === 'ALUNO') {
      window.location.href = '/dashboard-aluno';
    } else if (perfilDoUsuario === 'PROFESSOR' || perfilDoUsuario === 'DOCENTE') {
      window.location.href = '/dashboard-professor';
    } else {
      setErro(`Erro de roteamento: Perfil "${perfilDoUsuario}" não reconhecido.`);
    }
  }

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

      // Verificação do Primeiro Acesso (RF12)
      if (user.primeiro_acesso) {
        setUsuarioPendente(user);
        setMostrarModalPrimeiroAcesso(true);
      } else {
        redirecionarUsuario(user);
      }

    } catch (err) {
      if (axios.isAxiosError(err) && err.response && err.response.data) {
        setErro(err.response.data.error);
      } else {
        setErro('Erro ao conectar com o servidor. Verifique o CORS ou a API.');
      }
    } finally {
      setCarregando(false);
    }
  }

  // Submissão do formulário de Redefinição de Senha Obrigatória
  async function handleRedefinirSenha(e: React.FormEvent) {
    e.preventDefault();
    setErroModal('');

    if (novaSenha.length < 6) {
      setErroModal('A senha deve conter no mínimo 6 caracteres.');
      return;
    }

    if (novaSenha !== confirmarNovaSenha) {
      setErroModal('As senhas não coincidem. Digite novamente.');
      return;
    }

    if (!usuarioPendente || usuarioPendente.id == null) {
      setErroModal('Usuário não encontrado. Recarregue a página e tente novamente.');
      return;
    }

    setCarregandoModal(true);

    try {
      const response = await axios.patch('http://localhost:3000/api/primeiro-acesso', {
        userId: usuarioPendente.id,
        novaSenha
      });

      const usuarioAtualizado = response.data.user || {
        ...usuarioPendente,
        primeiro_acesso: false
      };

      setMostrarModalPrimeiroAcesso(false);
      redirecionarUsuario(usuarioAtualizado);

    } catch (err) {
      if (axios.isAxiosError(err) && err.response && err.response.data) {
        setErroModal(err.response.data.error);
      } else {
        setErroModal('Erro ao salvar nova senha. Tente novamente.');
      }
    } finally {
      setCarregandoModal(false);
    }
  }

  return (
    <div className="w-full h-screen grid grid-cols-1 md:grid-cols-2 overflow-hidden bg-white text-siora-dark relative">

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
      <div className="flex flex-col justify-center items-center p-8 bg-white relative w-full h-full">

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
                className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3.5 px-4 pr-12 text-sm text-siora-dark focus:outline-none focus:ring-2 focus:ring-siora-blue/20 transition-all [&::-ms-reveal]:hidden [&::-webkit-credentials-auto-fill-button]:hidden"
              />

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

        {/* RODAPÉ */}
        <div className="absolute bottom-6 w-full flex justify-between items-center text-[10px] sm:text-[11px] text-slate-400 font-medium px-6 md:px-12">
          <p className="italic">Desenvolvido para o Instituto Federal Baiano — Campus Itapetinga</p>
          <img
            src={ifLogo}
            alt="Logo Instituto Federal Baiano"
            className="h-5 sm:h-6 object-contain ml-2 opacity-90"
          />
        </div>

      </div>

      {/* MODAL DE PRIMEIRO ACESSO (RF12 / Protótipo Figma) */}
      {mostrarModalPrimeiroAcesso && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 md:p-8 border border-slate-100 flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-200">

            <div className="w-14 h-14 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mb-4">
              <ShieldWarning size={32} weight="fill" />
            </div>

            <h3 className="text-xl font-bold text-siora-dark mb-1">
              Primeiro Acesso Detectado
            </h3>
            <p className="text-xs text-slate-500 mb-6 max-w-xs leading-relaxed">
              Por motivos de segurança, você precisa cadastrar uma nova senha pessoal antes de prosseguir.
            </p>

            <form onSubmit={handleRedefinirSenha} className="w-full flex flex-col gap-3 text-left">

              <div>
                <label className="text-xs font-semibold text-slate-600 mb-1 block">
                  Nova Senha (Mínimo 6 caracteres)
                </label>
                <div className="relative">
                  <input
                    type={mostrarNovaSenha ? "text" : "password"}
                    value={novaSenha}
                    onChange={(e) => setNovaSenha(e.target.value)}
                    placeholder="Digite sua nova senha"
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3 px-3.5 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-siora-blue/20"
                  />
                  <LockSimple size={18} className="absolute left-3 top-3.5 text-slate-400" />
                  <button
                    type="button"
                    onClick={() => setMostrarNovaSenha(!mostrarNovaSenha)}
                    className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600"
                  >
                    {mostrarNovaSenha ? <EyeSlash size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 mb-1 block">
                  Confirme a Nova Senha
                </label>
                <div className="relative">
                  <input
                    type={mostrarNovaSenha ? "text" : "password"}
                    value={confirmarNovaSenha}
                    onChange={(e) => setConfirmarNovaSenha(e.target.value)}
                    placeholder="Repita a nova senha"
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3 px-3.5 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-siora-blue/20"
                  />
                  <LockSimple size={18} className="absolute left-3 top-3.5 text-slate-400" />
                </div>
              </div>

              {erroModal && (
                <p className="text-red-500 text-xs font-semibold mt-1 animate-pulse">
                  {erroModal}
                </p>
              )}

              <button
                type="submit"
                disabled={carregandoModal}
                className="w-full mt-4 bg-siora-blue hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors text-sm shadow-sm disabled:opacity-50"
              >
                {carregandoModal ? 'Atualizando Senha...' : 'Salvar Senha e Entrar'}
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}