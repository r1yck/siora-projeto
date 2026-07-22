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
            className="border border-slate-200 rounded-lg p-4 text-center bg-slate-50/50 hover:border-blue-300 transition-colors h-[125px] flex flex-col justify-center"
          >
            <span className="inline-block bg-slate-100 text-slate-500 text-[10px] font-bold px-2 py-1 rounded mb-2 w-max mx-auto">
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
          className="border border-dashed border-slate-100 rounded-lg h-[125px] flex items-center justify-center bg-slate-50/20"
        >
          <p className="text-slate-300 text-[11px] italic">Livre</p>
        </div>
      );
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-start">
      {diasDaSemana.map((dia) => (
        <div key={dia} className="bg-white border border-slate-200 rounded-xl min-h-[500px] flex flex-col shadow-sm">
          <h3 className="text-center font-bold text-slate-800 py-4 border-b border-slate-100">{dia}</h3>
          <div className="p-3 flex flex-col gap-3">{renderHorariosDoDia(dia)}</div>
        </div>
      ))}
    </div>
  );
}