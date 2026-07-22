import { Eye, EyeSlash, LockSimple, ShieldWarning } from '@phosphor-icons/react';

type PrimeiroAcessoModalProps = {
  mostrar: boolean;
  novaSenha: string;
  setNovaSenha: (v: string) => void;
  confirmarNovaSenha: string;
  setConfirmarNovaSenha: (v: string) => void;
  mostrarNovaSenha: boolean;
  setMostrarNovaSenha: (v: boolean) => void;
  erroModal: string;
  carregandoModal: boolean;
  onSubmit: (e: React.FormEvent) => void;
};

export function PrimeiroAcessoModal({
  mostrar,
  novaSenha,
  setNovaSenha,
  confirmarNovaSenha,
  setConfirmarNovaSenha,
  mostrarNovaSenha,
  setMostrarNovaSenha,
  erroModal,
  carregandoModal,
  onSubmit,
}: PrimeiroAcessoModalProps) {
  if (!mostrar) return null;

  return (
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

        <form onSubmit={onSubmit} className="w-full flex flex-col gap-3 text-left">
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
  );
}