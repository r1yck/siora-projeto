import type { Comunicado } from '../../types/detalhesDisciplinaAluno';

interface MuralAvisosProps {
  comunicados: Comunicado[];
}

export function MuralAvisos({ comunicados }: MuralAvisosProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
      <h2 className="text-lg font-bold text-slate-800 mb-4">Mural de Avisos</h2>

      {comunicados.length === 0 ? (
        <p className="text-sm text-slate-400 italic">
          Nenhum aviso publicado nesta disciplina.
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {comunicados.map((aviso) => (
            <div
              key={aviso.id}
              className="text-sm text-slate-600 leading-relaxed border-b border-slate-50 pb-3 last:border-none last:pb-0"
            >
              <span className="text-slate-400 font-medium">
                Postado em {new Date(aviso.data_publicacao).toLocaleDateString('pt-BR')}:{' '}
              </span>
              <span className="text-slate-700">{aviso.conteudo}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}