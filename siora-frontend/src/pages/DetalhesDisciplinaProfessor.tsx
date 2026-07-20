import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import iconSiora from '../assets/icon-siora.svg';
import { UploadSimple, Warning, Trash, CaretRight } from '@phosphor-icons/react';

interface InfoDisciplina {
  id: number;
  nome: string;
  codigo_turma: string;
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

interface MaterialAula {
  id: number;
  nome_arquivo: string;
  tamanho: string;
  url_caminho: string;
  data_upload: string;
}

export function DetalhesDisciplinaProfessor() {
  const { id } = useParams<{ id: string }>();

  const [info, setInfo] = useState<InfoDisciplina | null>(null);
  const [comunicados, setComunicados] = useState<Comunicado[]>([]);
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [carregando, setCarregando] = useState(true);

  // Estados dos Formulários
  const [novaSala, setNovaSala] = useState('');
  const [conteudoMural, setConteudoMural] = useState('');
  const [nomeAtividade, setNomeAtividade] = useState('');
  const [dataVencimento, setDataVencimento] = useState('');
  const [pesoValor, setPesoValor] = useState('');

  const userString = localStorage.getItem('@siora:user');
  const user = userString ? JSON.parse(userString) : null;
  const nomeProfessor = user?.nome ? `Prof. ${user.nome.split(' ')[0]}` : 'Professor';

  const userId = user?.id || user?.id_usuario;
  const perfilDoUsuario = (user?.perfil || user?.tipo_usuario || '').toUpperCase();
  const matriculaSiape = user?.matricula_siape;

  const [materiais, setMateriais] = useState<MaterialAula[]>([]);

  useEffect(() => {
    if (!userString || (!userId && !matriculaSiape) || (perfilDoUsuario !== 'PROFESSOR' && perfilDoUsuario !== 'DOCENTE')) {
      window.location.href = '/login';
      return;
    }

    async function carregarDadosCompletos() {
      try {
        setCarregando(true);
        const response = await axios.get(`http://localhost:3000/api/dashboard/disciplina/${id}`);
        if (response.data) {
          setInfo(response.data.info || null);
          setComunicados(response.data.comunicados || []);
          setAvaliacoes(response.data.avaliacoes || []);
          setMateriais(response.data.materiais || []);
        }
      } catch (err) {
        console.error("Erro ao buscar dados da disciplina:", err);
      } finally {
        setCarregando(false);
      }
    }

    if (id) {
      carregarDadosCompletos();
    }
  }, [id, userId, perfilDoUsuario, matriculaSiape, userString]);

  async function atualizarDadosLocais() {
    try {
      const response = await axios.get(`http://localhost:3000/api/dashboard/disciplina/${id}`);
      if (response.data) {
        setComunicados(response.data.comunicados || []);
        setAvaliacoes(response.data.avaliacoes || []);
        setMateriais(response.data.materiais || []);
      }
    } catch (err) {
      console.error("Erro ao atualizar dados:", err);
    }
  }

  function handleLogout(e: React.MouseEvent) {
    e.preventDefault();
    localStorage.removeItem('@siora:user');
    window.location.href = '/login';
  }

  // DELETAR COMUNICADO/ALERTA
  async function handleDeletarComunicado(comunicadoId: number) {
    if (!confirm('Deseja realmente remover este aviso?')) return;
    try {
      await axios.delete(`http://localhost:3000/api/dashboard/professor/comunicado/${comunicadoId}`);
      setComunicados(prev => prev.filter(c => c.id !== comunicadoId));
    } catch (err) {
      console.error(err);
      alert('Erro ao deletar aviso.');
    }
  }

  // DELETAR AVALIAÇÃO
  async function handleDeletarAvaliacao(avaliacaoId: number) {
    if (!confirm('Deseja realmente remover esta atividade?')) return;
    try {
      await axios.delete(`http://localhost:3000/api/dashboard/professor/avaliacao/${avaliacaoId}`);
      setAvaliacoes(prev => prev.filter(a => a.id !== avaliacaoId));
    } catch (err) {
      console.error(err);
      alert('Erro ao deletar atividade.');
    }
  }

  // DELETAR MATERIAL
  async function handleDeletarMaterial(materialId: number) {
    if (!confirm('Deseja realmente remover este material de aula?')) return;
    try {
      await axios.delete(`http://localhost:3000/api/dashboard/professor/material/${materialId}`);
      setMateriais(prev => prev.filter(m => m.id !== materialId));
    } catch (err) {
      console.error(err);
      alert('Erro ao deletar material de aula.');
    }
  }

  // ENVIAR LOCALIZAÇÃO (ALERTA URGENTE)
  async function handleAtualizarLocalizacao() {
    if (!novaSala.trim()) return alert('Digite o local ou laboratório!');
    try {
      await axios.post('http://localhost:3000/api/dashboard/professor/comunicado', {
        disciplina_id: Number(id),
        titulo: 'Atenção',
        conteudo: `A aula de hoje será no ${novaSala}.`,
        urgente: true
      });
      setNovaSala('');
      atualizarDadosLocais();
    } catch (err) {
      console.error(err);
    }
  }

  // PUBLICAR NO MURAL
  async function handlePublicarMural() {
    if (!conteudoMural.trim()) return alert('Escreva o texto do comunicado!');
    try {
      await axios.post('http://localhost:3000/api/dashboard/professor/comunicado', {
        disciplina_id: Number(id),
        titulo: 'Aviso',
        conteudo: conteudoMural,
        urgente: false
      });
      setConteudoMural('');
      atualizarDadosLocais();
    } catch (err) {
      console.error(err);
    }
  }

  // AGENDAR AVALIAÇÃO
  async function handleAgendarAvaliacao() {
    if (!nomeAtividade || !dataVencimento || !pesoValor) return alert('Preencha todos os campos!');
    try {
      await axios.post('http://localhost:3000/api/dashboard/professor/avaliacao', {
        disciplina_id: Number(id),
        titulo: nomeAtividade,
        descricao: 'Submissão via portal.',
        data_vencimento: dataVencimento,
        peso: Number(pesoValor)
      });
      setNomeAtividade('');
      setDataVencimento('');
      setPesoValor('');
      atualizarDadosLocais();
    } catch (err) {
      console.error(err);
    }
  }

  // UPLOAD DE ARQUIVO
  async function handleUploadArquivo(e: React.ChangeEvent<HTMLInputElement>) {
    const arquivosSelecionados = e.target.files;
    if (!arquivosSelecionados || arquivosSelecionados.length === 0) return;

    const arquivo = arquivosSelecionados[0];
    const formData = new FormData();
    formData.append('disciplina_id', String(id));
    formData.append('file', arquivo);

    try {
      await axios.post('http://localhost:3000/api/dashboard/professor/material', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert(`Upload de "${arquivo.name}" concluído com sucesso!`);
      atualizarDadosLocais();
    } catch (err) {
      console.error('Erro no upload do arquivo:', err);
      alert('Falha ao enviar arquivo para o servidor.');
    }
  }

  if (carregando) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center font-sans">
        <p className="text-slate-500 animate-pulse font-medium">Carregando diário de classe...</p>
      </div>
    );
  }

  if (!info) return <p className="text-center mt-10">Turma não encontrada.</p>;

  const alertaDeSalaAtual = comunicados.find(c => c.urgente);
  const muralNormal = comunicados.filter(c => !c.urgente);

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-800 font-sans">
      
      {/* HEADER ORIGINAL COMPLETO */}
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
            <button onClick={handleLogout} className="text-slate-400 text-xs hover:text-slate-600 transition-colors">
              Sair
            </button>
          </div>
          <div className="w-9 h-9 bg-slate-200 rounded-full flex-shrink-0"></div>
        </div>
      </header>

      <main className="max-w-[1200px] mx-auto px-6 py-10">
        
        {/* BREADCRUMB ORIGINAL */}
        <nav className="text-sm font-medium mb-6 flex items-center gap-2">
          <a href="/dashboard-professor" className="text-slate-400 hover:text-slate-600 transition-colors">Suas Turmas</a>
          <CaretRight size={14} className="text-slate-400" />
          <span className="text-blue-500 font-semibold">{info.nome}</span>
        </nav>

        {/* CONTROLE DE LOCALIZAÇÃO ORIGINAL CORRIGIDO */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 mb-8 shadow-sm">
          <h2 className="text-sm font-bold text-slate-700 mb-3">Definir Localização da Aula de Hoje</h2>
          <div className="flex flex-wrap items-center gap-4">
            <input
              type="text"
              value={novaSala}
              onChange={(e) => setNovaSala(e.target.value)}
              placeholder="Ex: Laboratório 124"
              className="flex-1 max-w-sm bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
            <button onClick={handleAtualizarLocalizacao} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2.5 px-6 rounded-lg text-sm transition-colors shadow-sm">
              Atualizar Localização
            </button>
            {alertaDeSalaAtual && (
              <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 px-4 py-2 rounded-lg text-xs font-semibold text-amber-800 ml-auto">
                <span>Ativo: {alertaDeSalaAtual.conteudo}</span>
                <button onClick={() => handleDeletarComunicado(alertaDeSalaAtual.id)} className="text-red-500 hover:text-red-700">
                  <Trash size={16} weight="bold" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* CABEÇALHO DA DISCIPLINA */}
        <section className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 mb-1 tracking-tight">{info.nome}</h1>
          <p className="text-slate-400 text-sm font-medium">Turma: {info.codigo_turma} • {user?.nome}</p>
        </section>

        {/* GRID PRINCIPAL */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* COLUNA ESQUERDA (Mural e Materiais) */}
          <div className="lg:col-span-2 flex flex-col gap-6">

            {/* MURAL DE AVISOS */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-4">Mural de Avisos</h2>
              <textarea
                value={conteudoMural}
                onChange={(e) => setConteudoMural(e.target.value)}
                placeholder="Escreva um novo comunicado para a turma..."
                rows={3}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3 px-4 text-sm mb-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-slate-700"
              ></textarea>
              <div className="flex justify-end mb-6">
                <button onClick={handlePublicarMural} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2.5 px-6 rounded-lg text-sm transition-colors shadow-sm">
                  Publicar no Mural
                </button>
              </div>

              {/* Lista dos Avisos já postados */}
              <div className="border-t border-slate-100 pt-4 flex flex-col gap-3">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Avisos Ativos no Mural</h3>
                {muralNormal.length === 0 ? (
                  <p className="text-sm text-slate-400 italic">Nenhum aviso publicado no mural.</p>
                ) : (
                  muralNormal.map(aviso => (
                    <div key={aviso.id} className="flex justify-between items-start bg-slate-50 border border-slate-100 p-3 rounded-lg text-sm">
                      <div>
                        <span className="text-xs text-slate-400 font-medium block mb-0.5">Postado em {new Date(aviso.data_publicacao).toLocaleDateString('pt-BR')}</span>
                        <p className="text-slate-700 leading-relaxed">{aviso.conteudo}</p>
                      </div>
                      <button onClick={() => handleDeletarComunicado(aviso.id)} className="text-slate-400 hover:text-red-500 p-1 transition-colors">
                        <Trash size={16} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* UPLOAD DE MATERIAL */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-4">Material de Aula / Downloads</h2>

              <label className="border-2 border-dashed border-slate-300 rounded-lg p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-50 transition-all">
                <input
                  type="file"
                  onChange={handleUploadArquivo}
                  className="hidden"
                />
                <p className="text-slate-500 text-sm font-semibold mb-2">Clique aqui para enviar arquivos de aula</p>
                <p className="text-slate-400 text-xs mb-3">Aceita qualquer formato (PDF, Slides, ZIP, Imagens) até 20MB</p>
                <UploadSimple size={36} className="text-blue-500" weight="bold" />
              </label>

              {/* Lista dos arquivos que o professor já subiu */}
              <div className="border-t border-slate-100 pt-4 mt-6 flex flex-col gap-3">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Arquivos Disponíveis para a Turma</h3>
                {materiais.length === 0 ? (
                  <p className="text-sm text-slate-400 italic">Nenhum arquivo anexado a esta disciplina.</p>
                ) : (
                  materiais.map(arquivo => (
                    <div key={arquivo.id} className="flex justify-between items-center bg-slate-50 border border-slate-100 p-3 rounded-lg text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-700 font-medium truncate max-w-[280px] md:max-w-[400px]">
                          {arquivo.nome_arquivo}
                        </span>
                        <span className="text-xs text-slate-400">({arquivo.tamanho})</span>
                      </div>
                      <button
                        onClick={() => handleDeletarMaterial(arquivo.id)}
                        className="text-slate-400 hover:text-red-500 p-1 transition-colors"
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>

          {/* COLUNA DIREITA (Agendar Avaliação) */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col">
            <h2 className="text-lg font-bold text-slate-900 mb-6">Agendar Nova Avaliação</h2>
            <div className="flex flex-col gap-4 mb-6">
              <input type="text" value={nomeAtividade} onChange={(e) => setNomeAtividade(e.target.value)} placeholder="Nome da Atividade" className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3 px-4 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all" />
              <input type="datetime-local" value={dataVencimento} onChange={(e) => setDataVencimento(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3 px-4 text-sm text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all" />
              <input type="text" value={pesoValor} onChange={(e) => setPesoValor(e.target.value)} placeholder="Peso/Valor (Ex: 4.0)" className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3 px-4 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all" />
              <button onClick={handleAgendarAvaliacao} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 rounded-lg text-sm flex items-center justify-center gap-2 shadow-sm transition-colors">
                Salvar e Disparar Alerta <Warning size={16} weight="bold" />
              </button>
            </div>

            {/* Lista de Avaliações Agendadas */}
            <div className="border-t border-slate-100 pt-4 flex flex-col gap-3">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Prazos Agendados</h3>
              {avaliacoes.length === 0 ? (
                <p className="text-sm text-slate-400 italic text-center py-4">Nenhuma atividade criada.</p>
              ) : (
                avaliacoes.map(entrega => (
                  <div key={entrega.id} className="flex justify-between items-center bg-slate-50 border border-slate-100 p-3 rounded-lg text-xs">
                    <div>
                      <strong className="text-slate-700 block">{entrega.titulo}</strong>
                      <span className="text-slate-400">Prazo: {new Date(entrega.data_vencimento).toLocaleDateString('pt-BR')} • Valor: {entrega.peso}</span>
                    </div>
                    <button onClick={() => handleDeletarAvaliacao(entrega.id)} className="text-slate-400 hover:text-red-500 p-1">
                      <Trash size={16} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}