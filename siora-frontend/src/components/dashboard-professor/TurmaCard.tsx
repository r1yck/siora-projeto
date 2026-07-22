import { Users, ArrowRight } from '@phosphor-icons/react';
import type { Turma } from '../../types/professor';

interface TurmaCardProps {
  turma: Turma;
}

export function TurmaCard({ turma }: TurmaCardProps) {
  const infoExtraMock = turma.disciplina_nome.includes('Jogos')
    ? '8º Semestre (68 h/68 Aulas)'
    : '6º Semestre (68 h/68 Aulas)';

  return (
    <article className="bg-white border border-slate-200 rounded-xl flex flex-col overflow-hidden shadow-sm hover:shadow-md transition-all duration-200">
      <div className="bg-[#D1FAE5]/60 px-5 py-2.5 text-[10px] font-bold text-[#059669] uppercase tracking-wider border-b border-emerald-50">
        Bacharelado em Sistemas de Informação
      </div>

      <div className="p-6 flex-grow border-b border-slate-100">
        <h2 className="text-[1.15rem] font-bold text-slate-800 mb-2 leading-snug">
          {turma.disciplina_nome}
        </h2>
        <p className="text-[12px] text-slate-400 font-medium">
          Código: {turma.codigo_turma} • {infoExtraMock}
        </p>
      </div>

      <div className="px-6 py-4 flex items-center justify-between">
        <span className="flex items-center gap-2 text-[#059669] text-xs font-bold">
          <Users size={18} weight="fill" />
          {turma.total_alunos} Alunos Matriculados
        </span>

        <button
          onClick={() =>
            (window.location.href = `/detalhes-disciplina-professor/${turma.disciplina_id}`)
          }
          className="flex items-center gap-1 text-[#3B82F6] text-xs font-bold hover:text-blue-700 transition-colors"
        >
          Gerenciar Turma <ArrowRight size={14} weight="bold" />
        </button>
      </div>
    </article>
  );
}