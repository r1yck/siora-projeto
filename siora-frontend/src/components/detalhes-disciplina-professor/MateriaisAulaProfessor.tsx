import { UploadSimple, Trash } from '@phosphor-icons/react';
import type { MaterialAula } from '../../types/detalhesDisciplinaProfessor';

interface MateriaisAulaProfessorProps {
  onUploadArquivo: (e: React.ChangeEvent<HTMLInputElement>) => void;
  materiais: MaterialAula[];
  onDeletarMaterial: (id: number) => void;
}

export function MateriaisAulaProfessor({
  onUploadArquivo,
  materiais,
  onDeletarMaterial,
}: MateriaisAulaProfessorProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
      <h2 className="text-lg font-bold text-slate-900 mb-4">Material de Aula / Downloads</h2>

      <label className="border-2 border-dashed border-slate-300 rounded-lg p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-50 transition-all">
        <input type="file" onChange={onUploadArquivo} className="hidden" />
        <p className="text-slate-500 text-sm font-semibold mb-2">
          Clique aqui para enviar arquivos de aula
        </p>
        <p className="text-slate-400 text-xs mb-3">
          Aceita qualquer formato (PDF, Slides, ZIP, Imagens) até 20MB
        </p>
        <UploadSimple size={36} className="text-siora-blue" weight="bold" />
      </label>

      <div className="border-t border-slate-100 pt-4 mt-6 flex flex-col gap-3">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
          Arquivos Disponíveis para a Turma
        </h3>
        {materiais.length === 0 ? (
          <p className="text-sm text-slate-400 italic">Nenhum aviso publicado no mural.</p>
        ) : (
          materiais.map((arquivo) => (
            <div
              key={arquivo.id}
              className="flex justify-between items-center bg-slate-50 border border-slate-100 p-3 rounded-lg text-sm"
            >
              <div className="flex items-center gap-2">
                <span className="text-slate-700 font-medium truncate max-w-[280px] md:max-w-[400px]">
                  {arquivo.nome_arquivo}
                </span>
                <span className="text-xs text-slate-400">({arquivo.tamanho})</span>
              </div>
              <button
                onClick={() => onDeletarMaterial(arquivo.id)}
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