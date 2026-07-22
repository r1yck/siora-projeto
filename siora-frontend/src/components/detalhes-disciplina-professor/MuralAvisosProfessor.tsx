import { Trash } from '@phosphor-icons/react';
import type { Comunicado } from '../../types/detalhesDisciplinaProfessor';

interface MuralAvisosProfessorProps {
  conteudoMural: string;
  setConteudoMural: (val: string) => void;
  onPublicarMural: () => void;
  muralNormal: Comunicado[];
  onDeletarComunicado: (id: number) => void;
}

export function MuralAvisosProfessor({
  conteudoMural,
  setConteudoMural,
  onPublicarMural,
  muralNormal,
  onDeletarComunicado,
}: MuralAvisosProfessorProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
      <h2 className="text-lg font-bold text-slate-900 mb-4">Mural de Avisos</h2>
      <textarea
        value={conteudoMural}
        onChange={(e) => setConteudoMural(e.target.value)}
        placeholder="Escreva um comunicado oficial para a turma aqui..."
        rows={3}
        className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3 px-4 text-sm mb-3 resize-none focus:outline-none focus:ring-2 focus:ring-siora-blue/20 transition-all text-slate-700"
      ></textarea>
      <div className="flex justify-end mb-6">
        <button
          onClick={onPublicarMural}
          className="bg-siora-blue hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-lg text-sm transition-colors shadow-sm"
        >
          Publicar no Mural
        </button>
      </div>

      <div className="border-t border-slate-100 pt-4 flex flex-col gap-3">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
          Avisos Ativos no Mural
        </h3>
        {muralNormal.length === 0 ? (
          <p className="text-sm text-slate-400 italic">Nenhum aviso publicado no mural.</p>
        ) : (
          muralNormal.map((aviso) => (
            <div
              key={aviso.id}
              className="flex justify-between items-start bg-slate-50 border border-slate-100 p-3 rounded-lg text-sm"
            >
              <div>
                <span className="text-xs text-slate-400 font-medium block mb-0.5">
                  Postado em {new Date(aviso.data_publicacao).toLocaleDateString('pt-BR')}
                </span>
                <p className="text-slate-700 leading-relaxed">{aviso.conteudo}</p>
              </div>
              <button
                onClick={() => onDeletarComunicado(aviso.id)}
                className="text-slate-400 hover:text-red-500 p-1 transition-colors"
              >
                <Trash size={16} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}