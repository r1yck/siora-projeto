import { CheckCircle, Paperclip } from '@phosphor-icons/react';
import type { Avaliacao, SubmissaoAluno } from '../../types/detalhesDisciplinaAluno';

interface ProximasEntregasProps {
  avaliacoes: Avaliacao[];
  submissoes: { [key: number]: SubmissaoAluno };
  enviandoId: number | null;
  onFileUpload: (avaliacaoId: number, event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ProximasEntregas({
  avaliacoes,
  submissoes,
  enviandoId,
  onFileUpload,
}: ProximasEntregasProps) {
  function formatarDataSurch(dataString: string) {
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }).replace('.', '');
  }

  function calcularDiasRestantes(dataString: string) {
    const dataVencimento = new Date(dataString).setHours(0, 0, 0, 0);
    const hoje = new Date().setHours(0, 0, 0, 0);
    const diferencaTempo = dataVencimento - hoje;
    const diferencaDias = Math.ceil(diferencaTempo / (1000 * 60 * 60 * 24));

    if (diferencaDias === 0) return 'Entrega hoje!';
    if (diferencaDias === 1) return 'Falta 1 dia';
    if (diferencaDias < 0) return 'Vencido';
    return `Faltam ${diferencaDias} dias`;
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm min-h-[400px]">
      <h2 className="text-lg font-bold text-slate-800 mb-6">Próximas Entregas</h2>

      {avaliacoes.length === 0 ? (
        <p className="text-sm text-slate-400 italic text-center mt-12">
          Nenhuma atividade agendada.
        </p>
      ) : (
        <div className="flex flex-col">
          {avaliacoes.map((entrega, index) => {
            const tagTempoStr = calcularDiasRestantes(entrega.data_vencimento);
            const ehUrgente = tagTempoStr.includes('1') || tagTempoStr.includes('hoje');
            const statusSubmissao = submissoes[entrega.id];

            return (
              <div key={entrega.id} className="flex gap-4 relative">
                <div className="flex flex-col items-center relative">
                  <div
                    className={`w-2.5 h-2.5 rounded-full z-10 mt-1.5 ${
                      ehUrgente ? 'bg-red-500' : 'bg-slate-300'
                    }`}
                  ></div>
                  {index !== avaliacoes.length - 1 && (
                    <div className="w-[2px] h-full bg-slate-100 absolute top-3"></div>
                  )}
                </div>

                <div className="pb-8 flex-1">
                  <p className="text-sm font-bold text-slate-800 mb-1">
                    {formatarDataSurch(entrega.data_vencimento)} — {entrega.titulo}
                  </p>
                  <p className="text-xs text-slate-400 mb-2 leading-relaxed">
                    {entrega.descricao}
                  </p>

                  <div className="flex gap-2 mb-3">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        ehUrgente ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {tagTempoStr}
                    </span>
                    {entrega.peso && (
                      <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded">
                        Valor: {Number(entrega.peso).toFixed(1)}
                      </span>
                    )}
                  </div>

                  {statusSubmissao?.enviado ? (
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 flex flex-col gap-2 text-xs">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-emerald-600 font-semibold">
                          <CheckCircle size={18} weight="fill" />
                          <span className="truncate max-w-[140px]">
                            Enviado ({statusSubmissao.submissao?.nome_arquivo})
                          </span>
                        </div>

                        <label className="text-siora-blue font-semibold cursor-pointer hover:underline text-[11px]">
                          Substituir arquivo
                          <input
                            type="file"
                            className="hidden"
                            onChange={(e) => onFileUpload(entrega.id, e)}
                          />
                        </label>
                      </div>

                      {statusSubmissao.submissao?.nota !== null &&
                      statusSubmissao.submissao?.nota !== undefined ? (
                        <div className="mt-1 pt-2 border-t border-slate-200/60 flex items-center justify-between">
                          <span className="text-slate-500 font-medium">
                            Nota atribuída pelo professor:
                          </span>
                          <span className="bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-md text-xs">
                            {Number(statusSubmissao.submissao.nota).toFixed(1)} / {Number(entrega.peso).toFixed(1)}
                          </span>
                        </div>
                      ) : (
                        <div className="mt-1 pt-1.5 border-t border-slate-200/60 text-[11px] text-slate-400 italic">
                          Aguardando correção do professor.
                        </div>
                      )}
                    </div>
                  ) : (
                    <label
                      className={`w-full flex items-center justify-center gap-2 bg-siora-blue hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg text-xs cursor-pointer transition-colors shadow-sm ${
                        enviandoId === entrega.id ? 'opacity-50' : ''
                      }`}
                    >
                      <Paperclip size={16} />
                      {enviandoId === entrega.id ? 'Enviando...' : 'Enviar Resolução'}
                      <input
                        type="file"
                        accept="*"
                        className="hidden"
                        disabled={enviandoId === entrega.id}
                        onChange={(e) => onFileUpload(entrega.id, e)}
                      />
                    </label>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}