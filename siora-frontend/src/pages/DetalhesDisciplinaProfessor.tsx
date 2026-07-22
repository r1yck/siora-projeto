import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { CaretRight } from '@phosphor-icons/react';

import { HeaderProfessor } from '../components/dashboard-professor/HeaderProfessor';
import { LocalizacaoSection } from '../components/detalhes-disciplina-professor/LocalizacaoSection';
import { MuralAvisosProfessor } from '../components/detalhes-disciplina-professor/MuralAvisosProfessor';
import { MateriaisAulaProfessor } from '../components/detalhes-disciplina-professor/MateriaisAulaProfessor';
import { AgendarAvaliacaoSection } from '../components/detalhes-disciplina-professor/AgendarAvaliacaoSection';
import { SubmissoesModal } from '../components/detalhes-disciplina-professor/SubmissoesModal';

import type {
  InfoDisciplina,
  Comunicado,
  Avaliacao,
  MaterialAula,
  SubmissaoAluno,
} from '../types/detalhesDisciplinaProfessor';

export function DetalhesDisciplinaProfessor() {
  const { id } = useParams<{ id: string }>();

  const [info, setInfo] = useState<InfoDisciplina | null>(null);
  const [comunicados, setComunicados] = useState<Comunicado[]>([]);
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [materiais, setMateriais] = useState<MaterialAula[]>([]);
  const [carregando, setCarregando] = useState(true);

  const [novaSala, setNovaSala] = useState('');
  const [conteudoMural, setConteudoMural] = useState('');
  const [nomeAtividade, setNomeAtividade] = useState('');
  const [dataVencimento, setDataVencimento] = useState('');
  const [pesoValor, setPesoValor] = useState('');

  const [modalAberta, setModalAberta] = useState(false);
  const [avaliacaoSelecionada, setAvaliacaoSelecionada] = useState<Avaliacao | null>(null);
  const [submissoes, setSubmissoes] = useState<SubmissaoAluno[]>([]);
  const [carregandoSubmissoes, setCarregandoSubmissoes] = useState(false);
  const [notasInputs, setNotasInputs] = useState<{ [key: number]: string }>({});
  const [salvandoNotaId, setSalvandoNotaId] = useState<number | null>(null);

  const userString = localStorage.getItem('@siora:user');
  const user = userString ? JSON.parse(userString) : null;
  const nomeProfessor = user?.nome ? `Prof. ${user.nome.split(' ')[0]}` : 'Professor';

  const userId = user?.id || user?.id_usuario;
  const perfilDoUsuario = (user?.perfil || user?.tipo_usuario || '').toUpperCase();
  const matriculaSiape = user?.matricula_siape;

  useEffect(() => {
    if (
      !userString ||
      (!userId && !matriculaSiape) ||
      (perfilDoUsuario !== 'PROFESSOR' && perfilDoUsuario !== 'DOCENTE')
    ) {
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

  async function handleAbrirModalEntregas(avaliacao: Avaliacao) {
    setAvaliacaoSelecionada(avaliacao);
    setModalAberta(true);
    setCarregandoSubmissoes(true);

    try {
      const res = await axios.get(`http://localhost:3000/api/avaliacoes/${avaliacao.id}/submissoes`);
      const listaSubmissoes: SubmissaoAluno[] = res.data.submissoes || [];
      setSubmissoes(listaSubmissoes);

      const inputsIniciais: { [key: number]: string } = {};
      listaSubmissoes.forEach((s) => {
        if (s.nota !== null && s.nota !== undefined) {
          inputsIniciais[s.id] = String(s.nota);
        }
      });
      setNotasInputs(inputsIniciais);
    } catch (err) {
      console.error("Erro ao buscar submissões:", err);
      alert("Erro ao carregar entregas dos alunos.");
    } finally {
      setCarregandoSubmissoes(false);
    }
  }

  async function handleSalvarNota(submissaoId: number) {
    const valorNota = notasInputs[submissaoId];
    if (valorNota === undefined || valorNota === '') {
      return alert('Digite o valor da nota antes de salvar.');
    }

    const notaNum = parseFloat(valorNota.replace(',', '.'));
    if (isNaN(notaNum) || notaNum < 0 || notaNum > 10) {
      return alert('A nota deve ser um número entre 0.0 e 10.0');
    }

    try {
      setSalvandoNotaId(submissaoId);
      await axios.patch(`http://localhost:3000/api/submissoes/${submissaoId}/nota`, {
        nota: notaNum,
      });

      setSubmissoes((prev) =>
        prev.map((s) => (s.id === submissaoId ? { ...s, nota: notaNum } : s))
      );
      alert('Nota atribuída com sucesso!');
    } catch (err) {
      console.error('Erro ao lançar nota:', err);
      alert('Erro ao salvar nota no banco de dados.');
    } finally {
      setSalvandoNotaId(null);
    }
  }

  async function handleDeletarComunicado(comunicadoId: number) {
    if (!confirm('Deseja realmente remover este aviso?')) return;
    try {
      await axios.delete(`http://localhost:3000/api/dashboard/professor/comunicado/${comunicadoId}`);
      setComunicados((prev) => prev.filter((c) => c.id !== comunicadoId));
    } catch (err) {
      console.error(err);
      alert('Erro ao deletar aviso.');
    }
  }

  async function handleDeletarAvaliacao(avaliacaoId: number) {
    if (!confirm('Deseja realmente remover esta atividade?')) return;
    try {
      await axios.delete(`http://localhost:3000/api/dashboard/professor/avaliacao/${avaliacaoId}`);
      setAvaliacoes((prev) => prev.filter((a) => a.id !== avaliacaoId));
    } catch (err) {
      console.error(err);
      alert('Erro ao deletar atividade.');
    }
  }

  async function handleDeletarMaterial(materialId: number) {
    if (!confirm('Deseja realmente remover este material de aula?')) return;
    try {
      await axios.delete(`http://localhost:3000/api/dashboard/professor/material/${materialId}`);
      setMateriais((prev) => prev.filter((m) => m.id !== materialId));
    } catch (err) {
      console.error(err);
      alert('Erro ao deletar material de aula.');
    }
  }

  async function handleAtualizarLocalizacao() {
    if (!novaSala.trim()) return alert('Digite o local ou laboratório!');
    try {
      await axios.patch('http://localhost:3000/api/dashboard/professor/localizacao', {
        disciplina_id: Number(id),
        laboratorio: novaSala,
      });
      setNovaSala('');
      atualizarDadosLocais();
      alert('Localização atualizada e aviso urgente emitido!');
    } catch (err) {
      console.error(err);
      alert('Erro ao atualizar localização.');
    }
  }

  async function handlePublicarMural() {
    if (!conteudoMural.trim()) return alert('Escreva o texto do comunicado!');
    try {
      await axios.post('http://localhost:3000/api/dashboard/professor/comunicado', {
        disciplina_id: Number(id),
        titulo: 'Aviso',
        conteudo: conteudoMural,
        urgente: false,
      });
      setConteudoMural('');
      atualizarDadosLocais();
    } catch (err) {
      console.error(err);
    }
  }

  async function handleAgendarAvaliacao() {
    if (!nomeAtividade || !dataVencimento || !pesoValor)
      return alert('Preencha todos os campos!');
    try {
      await axios.post('http://localhost:3000/api/dashboard/professor/avaliacao', {
        disciplina_id: Number(id),
        titulo: nomeAtividade,
        descricao: 'Submissão via portal.',
        data_vencimento: dataVencimento,
        peso: Number(pesoValor),
      });
      setNomeAtividade('');
      setDataVencimento('');
      setPesoValor('');
      atualizarDadosLocais();
    } catch (err) {
      console.error(err);
    }
  }

  async function handleUploadArquivo(e: React.ChangeEvent<HTMLInputElement>) {
    const arquivosSelecionados = e.target.files;
    if (!arquivosSelecionados || arquivosSelecionados.length === 0) return;

    const arquivo = arquivosSelecionados[0];
    const formData = new FormData();
    formData.append('disciplina_id', String(id));
    formData.append('file', arquivo);

    try {
      await axios.post('http://localhost:3000/api/dashboard/professor/material', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
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

  const alertaDeSalaAtual = comunicados.find((c) => c.urgente);
  const muralNormal = comunicados.filter((c) => !c.urgente);

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-800 font-sans relative">
      <HeaderProfessor nomeProfessor={nomeProfessor} onLogout={handleLogout} />

      <main className="max-w-[1200px] mx-auto px-6 py-10">
        <nav className="text-sm font-medium mb-6 flex items-center gap-2">
          <a
            href="/dashboard-professor"
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            Suas Turmas
          </a>
          <CaretRight size={14} className="text-slate-400" />
          <span className="text-siora-blue font-semibold">{info.nome}</span>
        </nav>

        <LocalizacaoSection
          novaSala={novaSala}
          setNovaSala={setNovaSala}
          onAtualizarLocalizacao={handleAtualizarLocalizacao}
          alertaDeSalaAtual={alertaDeSalaAtual}
          onDeletarComunicado={handleDeletarComunicado}
        />

        <section className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 mb-1 tracking-tight">
            {info.nome}
          </h1>
          <p className="text-slate-400 text-sm font-medium">
            Turma: {info.codigo_turma} • {user?.nome}
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <MuralAvisosProfessor
              conteudoMural={conteudoMural}
              setConteudoMural={setConteudoMural}
              onPublicarMural={handlePublicarMural}
              muralNormal={muralNormal}
              onDeletarComunicado={handleDeletarComunicado}
            />

            <MateriaisAulaProfessor
              onUploadArquivo={handleUploadArquivo}
              materiais={materiais}
              onDeletarMaterial={handleDeletarMaterial}
            />
          </div>

          <AgendarAvaliacaoSection
            nomeAtividade={nomeAtividade}
            setNomeAtividade={setNomeAtividade}
            dataVencimento={dataVencimento}
            setDataVencimento={setDataVencimento}
            pesoValor={pesoValor}
            setPesoValor={setPesoValor}
            onAgendarAvaliacao={handleAgendarAvaliacao}
            avaliacoes={avaliacoes}
            onDeletarAvaliacao={handleDeletarAvaliacao}
            onAbrirModalEntregas={handleAbrirModalEntregas}
          />
        </div>
      </main>

      <SubmissoesModal
        modalAberta={modalAberta}
        avaliacaoSelecionada={avaliacaoSelecionada}
        onFecharModal={() => setModalAberta(false)}
        carregandoSubmissoes={carregandoSubmissoes}
        submissoes={submissoes}
        notasInputs={notasInputs}
        setNotasInputs={setNotasInputs}
        onSalvarNota={handleSalvarNota}
        salvandoNotaId={salvandoNotaId}
      />
    </div>
  );
}