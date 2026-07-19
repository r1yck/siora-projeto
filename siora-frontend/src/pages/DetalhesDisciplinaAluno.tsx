import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import iconSiora from '../assets/icon-siora.svg';
import { Warning, FilePdf, CaretRight } from '@phosphor-icons/react';

interface InfoDisciplina {
    id: number;
    nome: string;
    codigo_turma: string;
    professor_nome: string;
}

interface MaterialAula {
    id: number;
    nome_arquivo: string;
    tamanho: string;
    url_caminho: string;
    data_upload: string;
}

interface Comunicado {
    id: number;
    titulo: string;
    conteudo: string;
    data_publicacao: string;
    urgente: boolean;
}

interface Avaliacao {
    id: number;
    titulo: string;
    descricao: string;
    data_vencimento: string;
    peso: string | number;
}

export function DetalhesDisciplinaAluno() {
    const { id } = useParams<{ id: string }>();

    const [info, setInfo] = useState<InfoDisciplina | null>(null);
    const [materiais, setMateriais] = useState<MaterialAula[]>([]);
    const [comunicados, setComunicados] = useState<Comunicado[]>([]);
    const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
    const [carregando, setCarregando] = useState(true);

    // Buscamos o dado puro do localStorage
    const userString = localStorage.getItem('@siora:user');
    const user = userString ? JSON.parse(userString) : null;
    const primeiroNome = user?.nome ? user.nome.split(' ')[0] : 'Aluno';

    // Pegamos apenas o ID primitivo (número/string) para usar como dependência segura
    const userId = user?.id || user?.id_usuario || user?.matricula_siape;

    useEffect(() => {
        // Se não tiver usuário logado, chuta para o login
        if (!userString || !userId) {
            window.location.href = '/login';
            return;
        }

        async function fetchDadosDisciplina() {
            try {
                setCarregando(true);
                const response = await axios.get(`http://localhost:3000/api/dashboard/disciplina/${id}`);

                if (response.data) {
                    setInfo(response.data.info || null);
                    setMateriais(response.data.materiais || []);
                    setComunicados(response.data.comunicados || []);
                    setAvaliacoes(response.data.avaliacoes || []);
                }
            } catch (err) {
                console.error("Erro ao carregar detalhes da disciplina:", err);
            } finally {
                setCarregando(false);
            }
        }

        if (id) {
            fetchDadosDisciplina();
        }
    }, [id, userId, userString]);

    function handleLogout(e: React.MouseEvent) {
        e.preventDefault();
        localStorage.removeItem('@siora:user');
        window.location.href = '/login';
    }

    // Função utilitária para formatar a exibição da data de entrega (Ex: "18/Jul")
    function formatarDataSurch(dataString: string) {
        const data = new Date(dataString);
        return data.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }).replace('.', '');
    }

    // Função para calcular os dias restantes até o prazo
    function calcularDiasRestantes(dataString: string) {
        const dataVencimento = new Date(dataString).setHours(0, 0, 0, 0);
        const hoje = new Date().setHours(0, 0, 0, 0);
        const diferencaTempo = dataVencimento - hoje;
        const diferencaDias = Math.ceil(diferencaTempo / (1000 * 60 * 60 * 24));

        if (diferencaDias === 0) return 'Entrega hoje!';
        if (diferencaDias === 1) return 'Falta 1 dia';
        if (diferencaDias < 0) return 'Vencido';
        return `Faltam ${diferencaDias} dias`;
    }

    if (carregando) {
        return (
            <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center font-sans">
                <p className="text-slate-500 animate-pulse font-medium">Carregando conteúdos da disciplina...</p>
            </div>
        );
    }

    if (!info) {
        return (
            <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center font-sans">
                <p className="text-red-500 font-medium">Disciplina não encontrada no banco de dados.</p>
            </div>
        );
    }

    // Verifica se há algum comunicado marcado como urgente para atuar como o Alerta Superior
    const comunicadoUrgente = comunicados.find(c => c.urgente);
    const comunicadosFiltados = comunicados.filter(aviso => !aviso.urgente);

    return (
        <div className="min-h-screen bg-[#F8F9FA] text-slate-800 font-sans">

            {/* CABEÇALHO (Igual ao Dashboard) */}
            <header className="flex justify-between items-center bg-white px-8 py-4 border-b border-slate-200 shadow-sm">
                <img
                    src={iconSiora}
                    alt="Logo SIORA"
                    onClick={() => window.location.href = '/dashboard-aluno'}
                    className="w-10 h-10 object-contain cursor-pointer hover:opacity-80 transition-opacity"
                />

                {/* BARRINHA DE PROGRESSO DO CURSO TOTALMENTE DINÂMICA */}
                <div className="bg-emerald-100 text-emerald-600 px-5 py-1.5 rounded-full text-xs font-bold tracking-wide">
                    Progresso do Curso: {(() => {
                        const semestreDoEstudante = Number(localStorage.getItem('@siora:semestre_atual') || 1);
                        return Math.round(((semestreDoEstudante - 1) / 8) * 100);
                    })()}% concluído
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
                    <span className="text-blue-500">{info.nome}</span>
                </nav>

                {/* Alerta Amarelo Dinâmico vindo de Comunicados Urgentes */}
                {comunicadoUrgente && (
                    <div className="bg-[#FEF3C7] border border-[#FDE68A] text-[#92400E] px-4 py-3 rounded-lg flex items-center justify-center gap-2 font-semibold text-sm mb-8 shadow-sm animate-pulse">
                        <Warning size={18} weight="bold" className="text-[#D97706]" />
                        {comunicadoUrgente.titulo}: {comunicadoUrgente.conteudo}
                    </div>
                )}

                {/* Cabeçalho da Disciplina */}
                <section className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 mb-1">{info.nome}</h1>
                    <p className="text-slate-500 text-sm font-medium">Turma: {info.codigo_turma} • Prof. {info.professor_nome}</p>
                </section>

                {/* GRID DE LAYOUT */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

                    {/* COLUNA ESQUERDA (Avisos e Materiais) */}
                    <div className="lg:col-span-2 flex flex-col gap-6">

                        {/* Mural de Avisos - Atualizado e Limpo */}
                        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                            <h2 className="text-lg font-bold text-slate-800 mb-4">Mural de Avisos</h2>

                            {comunicadosFiltados.length === 0 ? (
                                <p className="text-sm text-slate-400 italic">Nenhum aviso publicado nesta disciplina.</p>
                            ) : (
                                <div className="flex flex-col gap-4 divider-y divider-slate-100">
                                    {comunicadosFiltados.map((aviso) => (
                                        <div key={aviso.id} className="text-sm text-slate-600 leading-relaxed border-b border-slate-50 pb-3 last:border-none last:pb-0">
                                            <span className="text-slate-400 font-medium">
                                                Postado em {new Date(aviso.data_publicacao).toLocaleDateString('pt-BR')}:{" "}
                                            </span>
                                            <span className="text-slate-700">{aviso.conteudo}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Material de Aula / Downloads */}
                        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                            <h2 className="text-lg font-bold text-slate-800 mb-4">Material de Aula / Downloads</h2>

                            {materiais.length === 0 ? (
                                <p className="text-sm text-slate-400 italic">Nenhum arquivo ou material anexado para download.</p>
                            ) : (
                                <div className="flex flex-col gap-3">
                                    {materiais.map((arquivo) => (
                                        <div key={arquivo.id} className="bg-slate-50 border border-slate-100 rounded-lg p-3 flex items-center justify-between hover:border-slate-200 transition-colors">
                                            <div className="flex items-center gap-3">
                                                <FilePdf size={24} className="text-slate-400" />
                                                <span className="text-sm font-medium text-slate-700">
                                                    {arquivo.nome_arquivo} {arquivo.tamanho && <span className="text-slate-400 font-normal">({arquivo.tamanho})</span>}
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

                    </div>

                    {/* COLUNA DIREITA (Próximas Entregas - Timeline) */}
                    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm min-h-[400px]">
                        <h2 className="text-lg font-bold text-slate-800 mb-6">Próximas Entregas</h2>

                        {avaliacoes.length === 0 ? (
                            <p className="text-sm text-slate-400 italic text-center mt-12">Nenhuma atividade agendada.</p>
                        ) : (
                            <div className="flex flex-col">
                                {avaliacoes.map((entrega, index) => {
                                    const tagTempoStr = calcularDiasRestantes(entrega.data_vencimento);
                                    const ehUrgente = tagTempoStr.includes('1') || tagTempoStr.includes('hoje');

                                    return (
                                        <div key={entrega.id} className="flex gap-4 relative">

                                            {/* Linha e Bolinha da Timeline */}
                                            <div className="flex flex-col items-center relative">
                                                <div className={`w-2.5 h-2.5 rounded-full z-10 mt-1.5 ${ehUrgente ? 'bg-red-500' : 'bg-slate-300'}`}></div>
                                                {index !== avaliacoes.length - 1 && (
                                                    <div className="w-[2px] h-full bg-slate-100 absolute top-3"></div>
                                                )}
                                            </div>

                                            {/* Conteúdo da Entrega */}
                                            <div className="pb-8">
                                                <p className="text-sm font-bold text-slate-800 mb-1">
                                                    {formatarDataSurch(entrega.data_vencimento)} — {entrega.titulo}
                                                </p>
                                                <p className="text-xs text-slate-400 mb-2 leading-relaxed">{entrega.descricao}</p>
                                                <div className="flex gap-2">
                                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${ehUrgente ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-500'}`}>
                                                        {tagTempoStr}
                                                    </span>
                                                    {entrega.peso && (
                                                        <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded">
                                                            Peso: {entrega.peso}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}