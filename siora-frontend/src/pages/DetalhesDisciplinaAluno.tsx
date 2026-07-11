import { useEffect } from 'react';
import iconSiora from '../assets/icon-siora.svg';
import { Warning, FilePdf, CaretRight } from '@phosphor-icons/react';

export function DetalhesDisciplinaAluno() {
    // Resgata o usuário do localStorage
    const user = JSON.parse(localStorage.getItem('@siora:user') || '{}');
    const primeiroNome = user.nome ? user.nome.split(' ')[0] : 'Aluno';

    // Proteção básica de rota
    useEffect(() => {
        if (!user.id || user.perfil !== 'ESTUDANTE') {
            window.location.href = '/login';
        }
    }, [user]);

    function handleLogout(e: React.MouseEvent) {
        e.preventDefault();
        localStorage.removeItem('@siora:user');
        window.location.href = '/login';
    }

    // ==========================================
    // MOCK DE DADOS (Será substituído pela API)
    // ==========================================
    const disciplina = {
        nome: "Desenvolvimento de Jogos",
        professor: "Heverton Santos Queiroz",
        alerta: "Atenção: A aula de hoje será no Laboratório 124.",
        avisos: [
            {
                id: 1,
                tempo: "há 2 horas",
                autor: "Prof. Heverton",
                mensagem: "Pessoal, os slides da aula sobre Arquitetura de Motores Gráficos já estão disponíveis na seção de arquivos abaixo. Não esqueçam de revisar para a entrega do protótipo."
            }
        ],
        arquivos: [
            {
                id: 1,
                nome: "Aula 04 - Slides_Motores_Graficos.pdf",
                tamanho: "4.2 MB",
                link: "#"
            }
        ],
        entregas: [
            {
                id: 1,
                data: "18/Jun",
                titulo: "Entrega do Protótipo 2D",
                urgente: true,
                tagTempo: "Faltam 3 dias",
                tagValor: "Valor: 4.0"
            },
            {
                id: 2,
                data: "02/Jul",
                titulo: "Avaliação Teórica Prática",
                urgente: false,
                tagTempo: "Em 17 dias",
                tagValor: "Valor: 3.0"
            }
        ]
    };

    return (
        <div className="min-h-screen bg-[#F8F9FA] text-slate-800 font-sans">

            {/* CABEÇALHO (Igual ao Dashboard) */}
            <header className="flex justify-between items-center bg-white px-8 py-4 border-b border-slate-200 shadow-sm">
                <img
                    src={iconSiora}
                    alt="Logo SIORA"
                    onClick={() => window.location.href = '/'} // Opcional: faz a logo voltar pra home
                    className="w-10 h-10 object-contain cursor-pointer hover:opacity-80 transition-opacity"
                />

                <div className="bg-emerald-100 text-emerald-600 px-5 py-1.5 rounded-full text-xs font-bold tracking-wide">
                    Progresso do Curso: 75% concluído
                </div>

                <div className="flex items-center gap-3">
                    <div className="flex flex-col items-end leading-tight">
                        <span className="font-semibold text-sm text-slate-700">Olá, {primeiroNome}</span>
                        <button onClick={handleLogout} className="text-slate-400 text-xs hover:text-slate-600 transition-colors">
                            Sair
                        </button>
                    </div>
                    <div className="w-9 h-9 bg-slate-200 rounded-full flex-shrink-0"></div>
                </div>
            </header>

            {/* CONTEÚDO PRINCIPAL */}
            <main className="max-w-[1200px] mx-auto px-6 py-8">

                {/* Breadcrumb (Navegação) */}
                <nav className="flex items-center gap-2 text-sm font-medium mb-6">
                    <a href="/dashboard-aluno" className="text-slate-400 hover:text-blue-500 transition-colors">Suas Disciplinas</a>
                    <CaretRight size={14} className="text-slate-400" />
                    <span className="text-blue-500">{disciplina.nome}</span>
                </nav>

                {/* Alerta Amarelo */}
                {disciplina.alerta && (
                    <div className="bg-[#FEF3C7] border border-[#FDE68A] text-[#92400E] px-4 py-3 rounded-lg flex items-center justify-center gap-2 font-semibold text-sm mb-8 shadow-sm">
                        <Warning size={18} weight="bold" className="text-[#D97706]" />
                        {disciplina.alerta}
                    </div>
                )}

                {/* Cabeçalho da Disciplina */}
                <section className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 mb-1">{disciplina.nome}</h1>
                    <p className="text-slate-500 text-sm font-medium">Prof. {disciplina.professor}</p>
                </section>

                {/* GRID DE LAYOUT: 2 Colunas (Esquerda: 2/3, Direita: 1/3) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

                    {/* COLUNA ESQUERDA (Avisos e Materiais) */}
                    <div className="lg:col-span-2 flex flex-col gap-6">

                        {/* Mural de Avisos */}
                        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                            <h2 className="text-lg font-bold text-slate-800 mb-4">Mural de Avisos</h2>

                            <div className="flex flex-col gap-4">
                                {disciplina.avisos.map((aviso) => (
                                    <p key={aviso.id} className="text-sm text-slate-600 leading-relaxed">
                                        <span className="text-slate-400">Postado {aviso.tempo} por {aviso.autor}: </span>
                                        {aviso.mensagem}
                                    </p>
                                ))}
                            </div>
                        </div>

                        {/* Material de Aula / Downloads */}
                        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                            <h2 className="text-lg font-bold text-slate-800 mb-4">Material de Aula / Downloads</h2>

                            <div className="flex flex-col gap-3">
                                {disciplina.arquivos.map((arquivo) => (
                                    <div key={arquivo.id} className="bg-slate-50 border border-slate-100 rounded-lg p-3 flex items-center justify-between hover:border-slate-200 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <FilePdf size={24} className="text-slate-400" />
                                            <span className="text-sm font-medium text-slate-700">{arquivo.nome} <span className="text-slate-400 font-normal">({arquivo.tamanho})</span></span>
                                        </div>
                                        <a href={arquivo.link} className="flex items-center gap-1 text-blue-500 hover:text-blue-700 text-xs font-bold transition-colors">
                                            Baixar arquivo
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* COLUNA DIREITA (Próximas Entregas - Timeline) */}
                    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm min-h-[400px]">
                        <h2 className="text-lg font-bold text-slate-800 mb-6">Próximas Entregas</h2>

                        <div className="flex flex-col">
                            {disciplina.entregas.map((entrega, index) => (
                                <div key={entrega.id} className="flex gap-4 relative">

                                    {/* Linha e Bolinha da Timeline */}
                                    <div className="flex flex-col items-center relative">
                                        <div className={`w-2.5 h-2.5 rounded-full z-10 mt-1.5 ${entrega.urgente ? 'bg-red-500' : 'bg-slate-300'}`}></div>
                                        {/* Renderiza a linha conectora apenas se não for o último item */}
                                        {index !== disciplina.entregas.length - 1 && (
                                            <div className="w-[2px] h-full bg-slate-100 absolute top-3"></div>
                                        )}
                                    </div>

                                    {/* Conteúdo da Entrega */}
                                    <div className="pb-8">
                                        <p className="text-sm font-bold text-slate-800 mb-1">
                                            {entrega.data} — {entrega.titulo}
                                        </p>
                                        <div className="flex gap-2">
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${entrega.urgente ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-500'}`}>
                                                {entrega.tagTempo}
                                            </span>
                                            <span className="bg-slate-100 text-slate-500 text-[10px] font-bold px-2 py-0.5 rounded">
                                                {entrega.tagValor}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>

            </main>
        </div>
    );
}