import { WarningCircle, CheckCircle } from '@phosphor-icons/react';
import type { Disciplina } from '../../types/aluno';

interface DisciplinaCardProps {
  disciplina: Disciplina;
}

export function DisciplinaCard({ disciplina }: DisciplinaCardProps) {
  const nomeDisciplina = disciplina.disciplina_nome || 'Disciplina Sem Nome';
  const qtdAlertas = disciplina.qtd_alertas || 0;
  const temAlerta = qtdAlertas > 0;

  return (
    <article
      onClick={() => (window.location.href = `/disciplina/${disciplina.disciplina_id}`)}
      className="bg-white border border-slate-200 rounded-xl flex flex-col overflow-hidden shadow-sm hover:shadow-md hover:border-blue-400 transition-all cursor-pointer"
    >
      <div className="bg-[#D1FAE5]/60 px-5 py-2.5 text-[10px] font-bold text-[#059669] uppercase tracking-wider border-b border-emerald-50">
        Bacharelado em Sistemas de Informação
      </div>

      <div className="p-6 flex-grow border-b border-slate-100">
        <h2 className="text-[1.15rem] font-bold text-slate-800 mb-2 leading-snug">
          {nomeDisciplina}
        </h2>
        <p className="text-[13px] text-slate-400 font-medium">
          Prof. {disciplina.professor_nome || 'A definir'}
        </p>
      </div>

      <div className="p-4 flex items-center justify-center">
        {temAlerta ? (
          <span className="flex items-center gap-2 text-red-500 text-sm font-bold">
            <WarningCircle size={20} weight="fill" />
            {qtdAlertas} {qtdAlertas === 1 ? 'Alerta Pendente' : 'Alertas Pendentes'}
          </span>
        ) : (
          <span className="flex items-center gap-2 text-emerald-500 text-sm font-bold">
            <CheckCircle size={20} weight="fill" />
            Nenhum alerta pendente
          </span>
        )}
      </div>
    </article>
  );
}