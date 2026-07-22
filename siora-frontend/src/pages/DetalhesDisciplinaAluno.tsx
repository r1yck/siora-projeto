import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import iconSiora from '../assets/icon-siora.svg';
import { Warning, FilePdf, CaretRight, CheckCircle, Paperclip } from '@phosphor-icons/react';

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

interface SubmissaoAluno {
    enviado: boolean;
    submissao?: {
        id: number;
        nome_arquivo: string;
        url_arquivo: string;
        data_envio: string;
        nota?: number;
    };
}

export function DetalhesDisciplinaAluno() {
    const { id } = useParams<{ id: string }>();

    const [info, setInfo] = useState<InfoDisciplina | null>(null);
    const [materiais, setMateriais] = useState<MaterialAula[]>([]);
    const [comunicados, setComunicados] = useState<Comunicado[]>([]);
    const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
    const [submissoes, setSubmissoes] = useState<{ [key: number]: SubmissaoAluno }>({});
    const [carregando, setCarregando] = useState(true);
    const [enviandoId, setEnviandoId] = useState<number | null>(null);

    const userString = localStorage.getItem('@siora:user');
    const user = userString ? JSON.parse(userString) : null;
    const primeiroNome = user?.nome ? user.nome.split(' ')[0] : 'Aluno';
    const userId = user?.id || user?.id_usuario;

    useEffect(() => {
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

                    const listaAvaliacoes = response.data.avaliacoes || [];
                    setAvaliacoes(listaAvaliacoes);

                    // Checa o status de entrega para cada avaliação
                    listaAvaliacoes.forEach(async (av: Avaliacao) => {
                        try {
                            const resSubmissao = await axios.get(
                                `http://localhost:3000/api/avaliacoes/${av.id}/estudante/${userId}`
                            );
                            setSubmissoes(prev => ({
                                ...prev,
                                [av.id]: resSubmissao.data
                            }));
                        } catch (err) {
                            console.error(`Erro ao buscar submissão da avaliação ${av.id}:`, err);
                        }
                    });
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

    // Função para tratar o upload de QUALQUER arquivo pelo Aluno
    async function handleFileUpload(avaliacaoId: number, event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (!file) return;

        // Removida a trava de extensão .zip! Agora aceita qualquer arquivo.

        const formData = new FormData();
        formData.append('arquivo', file);
        formData.append('estudanteId', String(userId));

        try {
            setEnviandoId(avaliacaoId);
            const res = await axios.post(
                `http://localhost:3000/api/avaliacoes/${avaliacaoId}/submeter`,
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );

            // Atualiza o estado da submissão na tela em tempo real
            setSubmissoes(prev => ({
                ...prev,
                [avaliacaoId]: {
                    enviado: true,
                    submissao: res.data.submissao
                }
            }));

            alert('Trabalho enviado com sucesso!');
        } catch (err) {
            console.error('Erro ao submeter arquivo:', err);
            alert('Erro ao enviar o arquivo. Tente novamente.');
        } finally {
            setEnviandoId(null);
        }
    }

    function handleLogout(e: React.MouseEvent) {
        e.preventDefault();
        localStorage.removeItem('@siora:user');
        window.location.href = '/login';
    }

    function formatarDataSurch(dataString: string) {
        const data = new Date(dataString);
        return data.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }).replace('.', '');
    }

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

    const comunicadoUrgente = comunicados.find(c => c.urgente);
    const comunicadosFiltados = comunicados.filter(aviso => !aviso.urgente);

    return (
        <div className="min-h-screen bg-[#F8F9FA] text-slate-800 font-sans">

            {/* CABEÇALHO */}
            <header className="flex justify-between items-center bg-white px-8 py-4 border-b border-slate-200 shadow-sm">
                <img
                    src={iconSiora}
                    alt="Logo SIORA"
                    onClick={() => window.location.href = '/dashboard-aluno'}
                    className="w-10 h-10 object-contain cursor-pointer hover:opacity-80 transition-opacity"
                />

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

                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm font-medium mb-6">
                    <a href="/dashboard-aluno" className="text-slate-400 hover:text-blue-500 transition-colors">Suas Disciplinas</a>
                    <CaretRight size={14} className="text-slate-400" />
                    <span className="text-blue-500">{info.nome}</span>
                </nav>

                {/* Alerta Amarelo Dinâmico */}
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

                    {/* COLUNA ESQUERDA */}
                    <div className="lg:col-span-2 flex flex-col gap-6">

                        {/* Mural de Avisos */}
                        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                            <h2 className="text-lg font-bold text-slate-800 mb-4">Mural de Avisos</h2>

                            {comunicadosFiltados.length === 0 ? (
                                <p className="text-sm text-slate-400 italic">Nenhum aviso publicado nesta disciplina.</p>
                            ) : (
                                <div className="flex flex-col gap-4">
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

                    {/* COLUNA DIREITA (Próximas Entregas - Timeline + Upload do Figma) */}
                    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm min-h-[400px]">
                        <h2 className="text-lg font-bold text-slate-800 mb-6">Próximas Entregas</h2>

                        {avaliacoes.length === 0 ? (
                            <p className="text-sm text-slate-400 italic text-center mt-12">Nenhuma atividade agendada.</p>
                        ) : (
                            <div className="flex flex-col">
                                {avaliacoes.map((entrega, index) => {
                                    const tagTempoStr = calcularDiasRestantes(entrega.data_vencimento);
                                    const ehUrgente = tagTempoStr.includes('1') || tagTempoStr.includes('hoje');
                                    const statusSubmissao = submissoes[entrega.id];

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
                                            <div className="pb-8 flex-1">
                                                <p className="text-sm font-bold text-slate-800 mb-1">
                                                    {formatarDataSurch(entrega.data_vencimento)} — {entrega.titulo}
                                                </p>
                                                <p className="text-xs text-slate-400 mb-2 leading-relaxed">{entrega.descricao}</p>

                                                <div className="flex gap-2 mb-3">
                                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${ehUrgente ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-500'}`}>
                                                        {tagTempoStr}
                                                    </span>
                                                    {entrega.peso && (
                                                        <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded">
                                                            Valor: {entrega.peso}
                                                        </span>
                                                    )}
                                                </div>

                                                {/* COMPONENTE DE UPLOAD / STATUS DE ENTREGA E EXIBIÇÃO DE NOTA */}
                                                {statusSubmissao?.enviado ? (
                                                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 flex flex-col gap-2 text-xs">
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center gap-2 text-emerald-600 font-semibold">
                                                                <CheckCircle size={18} weight="fill" />
                                                                <span className="truncate max-w-[140px]">
                                                                    Enviado ({statusSubmissao.submissao?.nome_arquivo})
                                                                </span>
                                                            </div>

                                                            <label className="text-siora-blue font-semibold cursor-pointer hover:underline text-[11px]">
                                                                Substituir arquivo
                                                                <input
                                                                    type="file"
                                                                    className="hidden"
                                                                    onChange={(e) => handleFileUpload(entrega.id, e)}
                                                                />
                                                            </label>
                                                        </div>

                                                        {/* BADGE DE EXIBIÇÃO DA NOTA ATRIBUÍDA PELO PROFESSOR */}
                                                        {statusSubmissao.submissao?.nota !== null && statusSubmissao.submissao?.nota !== undefined ? (
                                                            <div className="mt-1 pt-2 border-t border-slate-200/60 flex items-center justify-between">
                                                                <span className="text-slate-500 font-medium">Nota atribuída pelo professor:</span>
                                                                <span className="bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-md text-xs">
                                                                    {Number(statusSubmissao.submissao.nota).toFixed(1)} / {entrega.peso}
                                                                </span>
                                                            </div>
                                                        ) : (
                                                            <div className="mt-1 pt-1.5 border-t border-slate-200/60 text-[11px] text-slate-400 italic">
                                                                Aguardando correção do professor.
                                                            </div>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <label className={`w-full flex items-center justify-center gap-2 bg-siora-blue hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg text-xs cursor-pointer transition-colors shadow-sm ${enviandoId === entrega.id ? 'opacity-50' : ''}`}>
                                                        <Paperclip size={16} />
                                                        {enviandoId === entrega.id ? 'Enviando...' : 'Enviar Resolução'}
                                                        <input
                                                            type="file"
                                                            accept="*"
                                                            className="hidden"
                                                            disabled={enviandoId === entrega.id}
                                                            onChange={(e) => handleFileUpload(entrega.id, e)}
                                                        />
                                                    </label>
                                                )}

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