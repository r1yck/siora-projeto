import iconSiora from '../../assets/icon-siora.svg';
import { User } from '@phosphor-icons/react';

interface HeaderAlunoProps {
  primeiroNome: string;
  semestreAtual?: number;
  onLogout: () => void;
}

export function HeaderAluno({ primeiroNome, semestreAtual, onLogout }: HeaderAlunoProps) {
  return (
    <header className="flex justify-between items-center bg-white px-8 py-4 border-b border-slate-200 shadow-sm">
      <img
        src={iconSiora}
        alt="Logo SIORA"
        onClick={() => (window.location.href = '/')}
        className="w-10 h-10 object-contain cursor-pointer hover:opacity-80 transition-opacity"
      />
      {semestreAtual && (
        <div className="bg-emerald-100 text-emerald-600 px-5 py-1.5 rounded-full text-xs font-bold tracking-wide">
          Progresso do Curso: {Math.round(((semestreAtual - 1) / 8) * 100)}% concluído
        </div>
      )}
      <div className="flex items-center gap-3">
        <div className="flex flex-col items-end leading-tight">
          <span className="font-semibold text-sm text-slate-700">Olá, {primeiroNome}</span>
          <button
            onClick={onLogout}
            className="text-slate-400 text-xs underline hover:text-red-500 transition-colors cursor-pointer"
          >
            Sair
          </button>
        </div>
        <div className="w-9 h-9 bg-teal-50 border border-teal-200 text-siora-teal rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
          <User size={20} weight="bold" />
        </div>
      </div>
    </header>
  );
}