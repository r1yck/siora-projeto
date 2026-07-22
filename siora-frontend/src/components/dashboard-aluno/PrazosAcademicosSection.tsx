import type { PrazoAcademico } from '../../types/aluno';

interface PrazosAcademicosSectionProps {
  carregando: boolean;
  prazos: PrazoAcademico[];
}

export function PrazosAcademicosSection({ carregando, prazos }: PrazosAcademicosSectionProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm min-h-[500px] flex flex-col">
      <h2 className="text-xl font-bold text-slate-800 mb-8">Prazos e Avaliações</h2>

      {carregando ? (
        <p className="text-slate-400 animate-pulse text-sm">Buscando cronograma acadêmico...</p>
      ) : prazos.length === 0 ? (
        <p className="text-slate-400 text-sm italic my-auto text-center">
          Nenhum prazo ou atividade agendada pelos professores.
        </p>
      ) : (
        <div className="space-y-8">
          {prazos.map((prazo) => {
            const diasRestantes = prazo.dias_restantes ?? 0;
            const ehUrgente = diasRestantes <= 3;
            return (
              <div key={prazo.id} className="flex gap-4">
                <div
                  className={`w-2 h-2 rounded-full mt-2 shrink-0 ${
                    ehUrgente ? 'bg-red-500' : 'bg-emerald-500'
                  }`}
                ></div>
                <div>
                  <p className="text-[15px] font-semibold text-slate-700">
                    {prazo.descricao} —{' '}
                    <span className="text-slate-500 text-sm font-normal">
                      {prazo.disciplina_nome}
                    </span>
                  </p>
                  <span
                    className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded mt-1 ${
                      ehUrgente ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'
                    }`}
                  >
                    {diasRestantes === 0
                      ? 'Entrega hoje!'
                      : diasRestantes === 1
                      ? 'Falta 1 dia'
                      : `Faltam ${diasRestantes} dias`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}