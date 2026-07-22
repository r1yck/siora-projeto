import { Plus, Trash } from '@phosphor-icons/react';
import type { MetaPrivada } from '../../types/aluno';

interface MetasEstudoSectionProps {
  carregando: boolean;
  metas: MetaPrivada[];
  novaMetaDescricao: string;
  setNovaMetaDescricao: (val: string) => void;
  onAddMeta: (e: React.FormEvent) => void;
  onToggleMeta: (id: number) => void;
  onDeleteMeta: (id: number) => void;
}

export function MetasEstudoSection({
  carregando,
  metas,
  novaMetaDescricao,
  setNovaMetaDescricao,
  onAddMeta,
  onToggleMeta,
  onDeleteMeta,
}: MetasEstudoSectionProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm min-h-[500px] flex flex-col">
      <h2 className="text-xl font-bold text-slate-800 mb-8">Minhas Metas de Estudo</h2>

      <form onSubmit={onAddMeta} className="relative mb-10">
        <Plus className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input
          type="text"
          value={novaMetaDescricao}
          onChange={(e) => setNovaMetaDescricao(e.target.value)}
          placeholder="Adicionar um compromisso particular... (Pressione Enter)"
          className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-slate-700"
        />
      </form>

      {carregando ? (
        <p className="text-slate-400 animate-pulse text-sm">Carregando suas metas...</p>
      ) : metas.length === 0 ? (
        <p className="text-slate-400 text-sm italic my-auto text-center">
          Você não possui metas pendentes. Adicione um objetivo acima!
        </p>
      ) : (
        <div className="space-y-4 overflow-y-auto max-h-[350px] pr-1">
          {metas.map((meta) => (
            <div
              key={meta.id}
              className="flex items-center justify-between group border-b border-slate-100 pb-2 last:border-none"
            >
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={meta.concluida}
                  onChange={() => onToggleMeta(meta.id)}
                  className={`w-5 h-5 rounded border-slate-300 transition-all ${
                    meta.concluida
                      ? 'text-emerald-600 focus:ring-emerald-500'
                      : 'text-blue-600 focus:ring-blue-500'
                  }`}
                />
                <span
                  className={`text-sm font-medium transition-colors ${
                    meta.concluida
                      ? 'text-slate-400 line-through'
                      : 'text-slate-600 group-hover:text-slate-900'
                  }`}
                >
                  {meta.descricao}
                </span>
              </label>
              <button
                onClick={() => onDeleteMeta(meta.id)}
                className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                title="Remover meta"
              >
                <Trash size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}