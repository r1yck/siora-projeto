import { useEffect } from 'react';
import iconSiora from '../assets/icon-siora.svg';
import { UploadSimple, Warning } from '@phosphor-icons/react';

export function DetalhesDisciplinaProfessor() {
  
  const user = JSON.parse(localStorage.getItem('@siora:user') || '{}');
  const nomeProfessor = user.nome ? `Prof. ${user.nome.split(' ')[0]}` : 'Professor';

  useEffect(() => {
    if (!user.id || user.perfil !== 'PROFESSOR') { 
      window.location.href = '/login'; 
      return; 
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-800 font-sans">
      
      {/* HEADER PADRÃO (Sem a barra de progresso) */}
      <header className="flex justify-between items-center bg-white px-8 py-4 border-b border-slate-200 shadow-sm">
        <img 
          src={iconSiora} 
          alt="Logo SIORA" 
          onClick={() => window.location.href = '/dashboard-professor'}
          className="w-10 h-10 object-contain cursor-pointer hover:opacity-80 transition-opacity" 
        />
        <div className="flex-1"></div>
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end leading-tight">
            <span className="font-semibold text-sm text-slate-700">Olá, {nomeProfessor}</span>
            <button onClick={() => { localStorage.removeItem('@siora:user'); window.location.href = '/login'; }} className="text-slate-400 text-xs hover:text-slate-600 transition-colors">Sair</button>
          </div>
          <div className="w-9 h-9 bg-slate-200 rounded-full flex-shrink-0"></div>
        </div>
      </header>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="max-w-[1200px] mx-auto px-6 py-10">
        
        {/* BREADCRUMB */}
        <nav className="text-sm font-medium mb-6">
          <a href="/dashboard-professor" className="text-slate-400 hover:text-slate-600 transition-colors">Suas Turmas</a>
          <span className="text-slate-300 mx-2">/</span>
          <span className="text-blue-500 font-semibold">Desenvolvimento de Jogos</span>
        </nav>

        {/* CONTROLE DE LOCALIZAÇÃO (Opcional - Mover sala) */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 mb-8 flex items-center gap-4 shadow-sm">
          <input 
            type="text" 
            placeholder="Digitar nova sala ou laboratório..."
            className="flex-1 max-w-sm bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
          />
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2.5 px-6 rounded-lg text-sm transition-colors shadow-sm">
            Atualizar Localização
          </button>
        </div>

        {/* CABEÇALHO DA DISCIPLINA */}
        <section className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 mb-1 tracking-tight">Desenvolvimento de Jogos</h1>
          <p className="text-slate-400 text-sm font-medium">Prof. Heverton Santos Queiroz</p>
        </section>

        {/* GRID DE FORMULÁRIOS (2 colunas na esquerda, 1 na direita) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* COLUNA ESQUERDA (Mural e Materiais) */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            
            {/* POSTAR NO MURAL */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-6">Mural de Avisos</h2>
              <textarea 
                placeholder="Escreva um comunicado oficial para a turma aqui..."
                rows={4}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3 px-4 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all mb-4 resize-none"
              ></textarea>
              <div className="flex justify-end">
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2.5 px-6 rounded-lg text-sm transition-colors shadow-sm">
                  Publicar no Mural
                </button>
              </div>
            </div>

            {/* UPLOAD DE MATERIAL */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-6">Material de Aula / Downloads</h2>
              
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-10 flex flex-col items-center justify-center text-center hover:bg-slate-50 hover:border-slate-400 transition-all cursor-pointer">
                <p className="text-slate-400 text-sm font-medium mb-4">Arraste os arquivos de aula aqui ou clique para fazer upload (PDF, Slides, DOCX)</p>
                <UploadSimple size={48} className="text-slate-300" weight="bold" />
              </div>
            </div>
          </div>

          {/* COLUNA DIREITA (Agendar Avaliação) */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm min-h-[400px] flex flex-col">
            <h2 className="text-lg font-bold text-slate-900 mb-8">Agendar Nova Entrega / Avaliação</h2>
            
            <div className="flex flex-col gap-4 flex-grow">
              <input 
                type="text" 
                placeholder="Nome da Atividade"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3 px-4 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
              <input 
                type="text" 
                placeholder="Data de Vencimento (DD/MM/AAAA)"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3 px-4 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
              <input 
                type="text" 
                placeholder="Peso/Valor"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3 px-4 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>

            <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 rounded-lg text-sm transition-colors flex items-center justify-center gap-2 mt-8 shadow-sm">
              Salvar e Disparar Alerta Geral <Warning size={16} weight="bold" />
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}