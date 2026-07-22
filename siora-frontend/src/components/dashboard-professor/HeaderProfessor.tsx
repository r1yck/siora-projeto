import iconSiora from '../../assets/icon-siora.svg';
import { User } from '@phosphor-icons/react';

interface HeaderProfessorProps {
  nomeProfessor: string;
  onLogout: (e: React.MouseEvent) => void;
}

export function HeaderProfessor({ nomeProfessor, onLogout }: HeaderProfessorProps) {
  return (
    <header className="flex justify-between items-center bg-white px-8 py-4 border-b border-slate-200 shadow-sm">
      <img
        src={iconSiora}
        alt="Logo SIORA"
        onClick={() => (window.location.href = '/dashboard-professor')}
        className="w-10 h-10 object-contain cursor-pointer hover:opacity-80 transition-opacity"
      />

      <div className="flex-1"></div>

      <div className="flex items-center gap-3">
        <div className="flex flex-col items-end leading-tight">
          <span className="font-semibold text-sm text-slate-700">Olá, {nomeProfessor}</span>
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