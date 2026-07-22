import { Warning, Trash, Paperclip, CaretRight } from '@phosphor-icons/react';
import type { Avaliacao } from '../../types/detalhesDisciplinaProfessor';

interface AgendarAvaliacaoSectionProps {
  nomeAtividade: string;
  setNomeAtividade: (val: string) => void;
  dataVencimento: string;
  setDataVencimento: (val: string) => void;
  pesoValor: string;
  setPesoValor: (val: string) => void;
  onAgendarAvaliacao: () => void;
  avaliacoes: Avaliacao[];
  onDeletarAvaliacao: (id: number) => void;
  onAbrirModalEntregas: (avaliacao: Avaliacao) => void;
}

export function AgendarAvaliacaoSection({
  nomeAtividade,
  setNomeAtividade,
  dataVencimento,
  setDataVencimento,
  pesoValor,
  setPesoValor,
  onAgendarAvaliacao,
  avaliacoes,
  onDeletarAvaliacao,
  onAbrirModalEntregas,
}: AgendarAvaliacaoSectionProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col">
      <h2 className="text-lg font-bold text-slate-900 mb-6">Agendar Nova Entrega / Avaliação</h2>

      <div className="flex flex-col gap-4 mb-6">
        <input
          type="text"
          value={nomeAtividade}
          onChange={(e) => setNomeAtividade(e.target.value)}
          placeholder="Nome da Atividade"
          className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3 px-4 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-siora-blue/20 transition-all"
        />
        <input
          type="datetime-local"
          value={dataVencimento}
          onChange={(e) => setDataVencimento(e.target.value)}
          className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3 px-4 text-sm text-slate-500 focus:outline-none focus:ring-2 focus:ring-siora-blue/20 transition-all"
        />
        <input
          type="text"
          value={pesoValor}
          onChange={(e) => setPesoValor(e.target.value)}
          placeholder="Peso/Valor (Ex: 4.0)"
          className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3 px-4 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-siora-blue/20 transition-all"
        />
        <button
          onClick={onAgendarAvaliacao}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 rounded-lg text-sm flex items-center justify-center gap-2 shadow-sm transition-colors"
        >
          Salvar e Disparar Alerta <Warning size={16} weight="bold" />
        </button>
      </div>

      <div className="border-t border-slate-100 pt-4 flex flex-col gap-3">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
          Prazos Agendados
        </h3>
        {avaliacoes.length === 0 ? (
          <p className="text-sm text-slate-400 italic text-center py-4">Nenhuma atividade criada.</p>
        ) : (
          avaliacoes.map((entrega) => (
            <div
              key={entrega.id}
              className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl text-xs flex flex-col gap-2"
            >
              <div className="flex justify-between items-start">
                <div>
                  <strong className="text-slate-800 text-sm block">{entrega.titulo}</strong>
                  <span className="text-slate-400 font-medium">
                    Vencimento: {new Date(entrega.data_vencimento).toLocaleDateString('pt-BR')} •
                    Valor: {entrega.peso}
                  </span>
                </div>
                <button
                  onClick={() => onDeletarAvaliacao(entrega.id)}
                  className="text-slate-400 hover:text-red-500 p-1"
                >
                  <Trash size={16} />
                </button>
              </div>

              <button
                onClick={() => onAbrirModalEntregas(entrega)}
                className="mt-1 w-full bg-slate-100 hover:bg-slate-200 text-siora-blue font-bold py-2 px-3 rounded-lg flex items-center justify-between transition-colors border border-slate-200"
              >
                <span className="flex items-center gap-1.5 text-slate-700">
                  <Paperclip size={14} /> Entregas da Turma
                </span>
                <span className="flex items-center gap-1 text-siora-blue">
                  Ver Entregas & Lançar Notas <CaretRight size={12} weight="bold" />
                </span>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}