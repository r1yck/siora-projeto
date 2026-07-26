import type { Horario } from '../../types/aluno';

interface GridHorariosProps {
  horarios: Horario[];
}

export function GridHorarios({ horarios }: GridHorariosProps) {
  const diasDaSemana = [
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
  ];

  const renderHorariosDoDia = (dia: string) => {
    const aulasDoDia = horarios.filter(
      (h) => h.dia_semana.trim().toUpperCase() === dia.trim().toUpperCase()
    );

    const slotsHorarios = [
      { id: 'manha_1', chave: '07:30' },
      { id: 'manha_2', chave: '09:50' },
      { id: 'tarde_1', chave: '13:30' },
      { id: 'tarde_2', chave: '15:50' },
    ];

    return slotsHorarios.map((slot) => {
      const aula = aulasDoDia.find((h) => h.hora_inicio.startsWith(slot.chave));

      if (aula) {
        return (
          <div
            key={aula.horario_id}
            className="border border-slate-200 rounded-lg p-3 text-center bg-slate-50/50 hover:border-blue-300 transition-colors min-h-[115px] sm:h-[125px] flex flex-col justify-center"
          >
            <span className="inline-block bg-slate-100 text-slate-500 text-[10px] font-bold px-2 py-0.5 rounded mb-1.5 w-max mx-auto">
              {aula.hora_inicio} - {aula.hora_fim}
            </span>
            <p className="text-[12px] font-bold text-slate-700 leading-snug mb-1 line-clamp-2">
              {aula.disciplina_nome}
            </p>
            <span className="text-[11px] font-bold text-emerald-600">
              {aula.laboratorio || 'Sala de Aula'}
            </span>
          </div>
        );
      }

      return (
        <div
          key={`livre-${slot.id}`}
          className="border border-dashed border-slate-100 rounded-lg min-h-[115px] sm:h-[125px] flex items-center justify-center bg-slate-50/20"
        >
          <p className="text-slate-300 text-[11px] italic">Livre</p>
        </div>
      );
    });
  };

  return (
    <div className="w-full overflow-x-auto no-scrollbar pb-4">
      {/* Container flex no mobile com min-w para os dias não esmagarem, e grid no desktop */}
      <div className="flex md:grid md:grid-cols-5 gap-3 sm:gap-4 items-start min-w-max md:min-w-0">
        {diasDaSemana.map((dia) => (
          <div
            key={dia}
            className="bg-white border border-slate-200 rounded-xl flex flex-col shadow-sm w-[240px] sm:w-[260px] md:w-auto flex-shrink-0 md:flex-shrink"
          >
            <h3 className="text-center font-bold text-xs sm:text-sm text-slate-800 py-3 border-b border-slate-100">
              {dia}
            </h3>
            <div className="p-2.5 sm:p-3 flex flex-col gap-2.5 sm:gap-3">
              {renderHorariosDoDia(dia)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}