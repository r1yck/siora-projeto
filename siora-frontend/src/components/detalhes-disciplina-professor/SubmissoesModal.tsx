import { X, Paperclip, DownloadSimple, Check } from '@phosphor-icons/react';
import type { Avaliacao, SubmissaoAluno } from '../../types/detalhesDisciplinaProfessor';

interface SubmissoesModalProps {
  modalAberta: boolean;
  avaliacaoSelecionada: Avaliacao | null;
  onFecharModal: () => void;
  carregandoSubmissoes: boolean;
  submissoes: SubmissaoAluno[];
  notasInputs: { [key: number]: string };
  setNotasInputs: React.Dispatch<React.SetStateAction<{ [key: number]: string }>>;
  onSalvarNota: (submissaoId: number) => void;
  salvandoNotaId: number | null;
}

export function SubmissoesModal({
  modalAberta,
  avaliacaoSelecionada,
  onFecharModal,
  carregandoSubmissoes,
  submissoes,
  notasInputs,
  setNotasInputs,
  onSalvarNota,
  salvandoNotaId,
}: SubmissoesModalProps) {
  if (!modalAberta || !avaliacaoSelecionada) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-100 flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-200">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 rounded-t-2xl">
          <div>
            <h3 className="text-lg font-bold text-slate-800">
              Submissões — {avaliacaoSelecionada.titulo}
            </h3>
            <p className="text-xs text-slate-400 font-medium">
              Valor total da avaliação: {avaliacaoSelecionada.peso} pontos
            </p>
          </div>
          <button
            onClick={onFecharModal}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X size={20} weight="bold" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          {carregandoSubmissoes ? (
            <p className="text-center text-slate-400 text-sm py-8 animate-pulse">
              Carregando submissões dos estudantes...
            </p>
          ) : submissoes.length === 0 ? (
            <div className="text-center py-10 text-slate-400 text-sm">
              <Paperclip size={32} className="mx-auto mb-2 opacity-40" />
              Nenhum estudante enviou a resolução para esta atividade ainda.
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {submissoes.map((sub) => (
                <div
                  key={sub.id}
                  className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="flex-1">
                    <strong className="text-sm text-slate-800 block mb-0.5">
                      {sub.nome_aluno}
                    </strong>
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <span className="italic">
                        Enviado em {new Date(sub.data_envio).toLocaleString('pt-BR')}
                      </span>
                    </div>
                    <a
                      href={`http://localhost:3000${sub.url_arquivo}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-siora-blue font-bold hover:underline mt-2 bg-blue-50 px-2.5 py-1 rounded-md"
                    >
                      <DownloadSimple size={14} weight="bold" />
                      Baixar {sub.nome_arquivo}
                    </a>
                  </div>

                  <div className="flex items-center gap-2 self-end md:self-center">
                    <div className="flex flex-col items-end">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                        Nota do Aluno
                      </label>
                      <input
                        type="text"
                        placeholder="0.0"
                        value={notasInputs[sub.id] ?? ''}
                        onChange={(e) =>
                          setNotasInputs({ ...notasInputs, [sub.id]: e.target.value })
                        }
                        className="w-20 text-center bg-white border border-slate-300 rounded-lg py-1.5 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-siora-blue/20"
                      />
                    </div>
                    <button
                      onClick={() => onSalvarNota(sub.id)}
                      disabled={salvandoNotaId === sub.id}
                      className="mt-5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold p-2.5 rounded-lg text-xs transition-colors shadow-sm disabled:opacity-50"
                      title="Salvar Nota"
                    >
                      {salvandoNotaId === sub.id ? '...' : <Check size={16} weight="bold" />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="px-6 py-3 border-t border-slate-100 flex justify-end bg-slate-50/50 rounded-b-2xl">
          <button
            onClick={onFecharModal}
            className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold py-2 px-5 rounded-lg text-xs transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}