import { useNavigate } from 'react-router-dom';
import iconSiora from '../../assets/icon-siora.svg';
import { User } from '@phosphor-icons/react';

interface HeaderAlunoProps {
  primeiroNome: string;
  semestreAtual?: number;
  onLogout: () => void;
}

export function HeaderAluno({ primeiroNome, semestreAtual, onLogout }: HeaderAlunoProps) {
  const navigate = useNavigate();

  return (
    <header className="bg-white border-b border-slate-200 shadow-sm px-4 sm:px-8 py-3.5 w-full">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        
        {/* Bloco Superior no Mobile / Esquerda no Desktop: Logo + Progresso */}
        <div className="flex items-center justify-between w-full sm:w-auto gap-4">
          <img
            src={iconSiora}
            alt="Logo SIORA"
            onClick={() => navigate('/dashboard-aluno')}
            className="w-9 h-9 sm:w-10 sm:h-10 object-contain cursor-pointer hover:opacity-80 transition-opacity flex-shrink-0"
          />

          {semestreAtual && (
            <div className="bg-emerald-100 text-emerald-700 px-3.5 py-1 sm:px-5 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-bold tracking-wide text-center whitespace-nowrap">
              Progresso do Curso: {Math.round(((semestreAtual - 1) / 8) * 100)}% concluído
            </div>
          )}
        </div>

        {/* Bloco Inferior no Mobile / Direita no Desktop: Infos do Usuário */}
        <div className="flex items-center justify-end w-full sm:w-auto gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
          <div className="flex flex-col items-end leading-tight">
            <span className="font-semibold text-xs sm:text-sm text-slate-700">Olá, {primeiroNome}</span>
            <button
              onClick={onLogout}
              className="text-slate-400 text-xs underline hover:text-red-500 transition-colors cursor-pointer mt-0.5"
            >
              Sair
            </button>
          </div>
          <div className="w-8 h-8 sm:w-9 sm:h-9 bg-teal-50 border border-teal-200 text-siora-teal rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
            <User size={18} weight="bold" className="sm:w-5 sm:h-5" />
          </div>
        </div>

      </div>
    </header>
  );
}