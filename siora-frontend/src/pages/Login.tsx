import { useState } from 'react';
import axios from 'axios';
import { Eye, EyeSlash } from '@phosphor-icons/react';
import { LoginSideBanner } from '../components/LoginSideBanner';
import { LoginFooter } from '../components/LoginFooter';
import { PrimeiroAcessoModal } from '../components/PrimeiroAcessoModal';

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

  const [mostrarModalPrimeiroAcesso, setMostrarModalPrimeiroAcesso] = useState(false);
  const [usuarioPendente, setUsuarioPendente] = useState<Usuario | null>(null);
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarNovaSenha, setConfirmarNovaSenha] = useState('');
  const [mostrarNovaSenha, setMostrarNovaSenha] = useState(false);
  const [erroModal, setErroModal] = useState('');
  const [carregandoModal, setCarregandoModal] = useState(false);

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
      <LoginSideBanner />

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

        <LoginFooter />
      </div>

      <PrimeiroAcessoModal
        mostrar={mostrarModalPrimeiroAcesso}
        novaSenha={novaSenha}
        setNovaSenha={setNovaSenha}
        confirmarNovaSenha={confirmarNovaSenha}
        setConfirmarNovaSenha={setConfirmarNovaSenha}
        mostrarNovaSenha={mostrarNovaSenha}
        setMostrarNovaSenha={setMostrarNovaSenha}
        erroModal={erroModal}
        carregandoModal={carregandoModal}
        onSubmit={handleRedefinirSenha}
      />
    </div>
  );
}