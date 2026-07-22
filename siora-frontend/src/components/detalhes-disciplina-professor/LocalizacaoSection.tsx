import { Trash } from '@phosphor-icons/react';
import type { Comunicado } from '../../types/detalhesDisciplinaProfessor';

interface LocalizacaoSectionProps {
  novaSala: string;
  setNovaSala: (val: string) => void;
  onAtualizarLocalizacao: () => void;
  alertaDeSalaAtual?: Comunicado;
  onDeletarComunicado: (id: number) => void;
}

export function LocalizacaoSection({
  novaSala,
  setNovaSala,
  onAtualizarLocalizacao,
  alertaDeSalaAtual,
  onDeletarComunicado,
}: LocalizacaoSectionProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 mb-8 shadow-sm">
      <h2 className="text-sm font-bold text-slate-700 mb-3">Definir Localização da Aula de Hoje</h2>
      <div className="flex flex-wrap items-center gap-4">
        <input
          type="text"
          value={novaSala}
          onChange={(e) => setNovaSala(e.target.value)}
          placeholder="Ex: Laboratório 124"
          className="flex-1 max-w-sm bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-siora-blue/20 transition-all"
        />
        <button
          onClick={onAtualizarLocalizacao}
          className="bg-siora-blue hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-lg text-sm transition-colors shadow-sm"
        >
          Atualizar Localização
        </button>
        {alertaDeSalaAtual && (
          <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 px-4 py-2 rounded-lg text-xs font-semibold text-amber-800 ml-auto">
            <span>Ativo: {alertaDeSalaAtual.conteudo}</span>
            <button
              onClick={() => onDeletarComunicado(alertaDeSalaAtual.id)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash size={16} weight="bold" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}