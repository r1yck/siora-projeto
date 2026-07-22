import { FilePdf } from '@phosphor-icons/react';
import type { MaterialAula } from '../../types/detalhesDisciplinaAluno';

interface MateriaisAulaProps {
  materiais: MaterialAula[];
}

export function MateriaisAula({ materiais }: MateriaisAulaProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
      <h2 className="text-lg font-bold text-slate-800 mb-4">Material de Aula / Downloads</h2>

      {materiais.length === 0 ? (
        <p className="text-sm text-slate-400 italic">
          Nenhum arquivo ou material anexado para download.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {materiais.map((arquivo) => (
            <div
              key={arquivo.id}
              className="bg-slate-50 border border-slate-100 rounded-lg p-3 flex items-center justify-between hover:border-slate-200 transition-colors"
            >
              <div className="flex items-center gap-3">
                <FilePdf size={24} className="text-slate-400" />
                <span className="text-sm font-medium text-slate-700">
                  {arquivo.nome_arquivo}{' '}
                  {arquivo.tamanho && (
                    <span className="text-slate-400 font-normal">({arquivo.tamanho})</span>
                  )}
                </span>
              </div>
              <a
                href={arquivo.url_caminho}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-blue-500 hover:text-blue-700 text-xs font-bold transition-colors"
              >
                Baixar arquivo
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}