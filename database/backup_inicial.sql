--
-- PostgreSQL database dump
--

\restrict t4SRnXMbuZ2o4kk5hd4KdAqGYS6pJDdKA9QY5dsKKhXs2Vker5jukvmVM6JtKee

-- Dumped from database version 18.4
-- Dumped by pg_dump version 18.4

-- Started on 2026-07-25 13:10:11

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 875 (class 1247 OID 24578)
-- Name: tipo_usuario_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.tipo_usuario_enum AS ENUM (
    'ESTUDANTE',
    'PROFESSOR'
);


ALTER TYPE public.tipo_usuario_enum OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 230 (class 1259 OID 24660)
-- Name: avaliacoes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.avaliacoes (
    id integer CONSTRAINT atividades_id_not_null NOT NULL,
    titulo character varying(150) CONSTRAINT atividades_titulo_not_null NOT NULL,
    descricao text,
    data_vencimento timestamp without time zone CONSTRAINT atividades_data_entrega_not_null NOT NULL,
    disciplina_id integer CONSTRAINT atividades_disciplina_id_not_null NOT NULL,
    peso numeric(5,2)
);


ALTER TABLE public.avaliacoes OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 24659)
-- Name: atividades_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.atividades_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.atividades_id_seq OWNER TO postgres;

--
-- TOC entry 5061 (class 0 OID 0)
-- Dependencies: 229
-- Name: atividades_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.atividades_id_seq OWNED BY public.avaliacoes.id;


--
-- TOC entry 232 (class 1259 OID 24679)
-- Name: comunicados; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comunicados (
    id integer NOT NULL,
    titulo character varying(150) NOT NULL,
    conteudo text NOT NULL,
    data_publicacao timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    urgente boolean DEFAULT false,
    disciplina_id integer NOT NULL
);


ALTER TABLE public.comunicados OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 24678)
-- Name: comunicados_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.comunicados_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.comunicados_id_seq OWNER TO postgres;

--
-- TOC entry 5062 (class 0 OID 0)
-- Dependencies: 231
-- Name: comunicados_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.comunicados_id_seq OWNED BY public.comunicados.id;


--
-- TOC entry 240 (class 1259 OID 32950)
-- Name: comunicados_mural; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comunicados_mural (
    id integer NOT NULL,
    disciplina_id integer,
    titulo character varying(150) NOT NULL,
    conteudo text NOT NULL,
    data_publicacao timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    urgente boolean DEFAULT false
);


ALTER TABLE public.comunicados_mural OWNER TO postgres;

--
-- TOC entry 239 (class 1259 OID 32949)
-- Name: comunicados_mural_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.comunicados_mural_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.comunicados_mural_id_seq OWNER TO postgres;

--
-- TOC entry 5063 (class 0 OID 0)
-- Dependencies: 239
-- Name: comunicados_mural_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.comunicados_mural_id_seq OWNED BY public.comunicados_mural.id;


--
-- TOC entry 226 (class 1259 OID 24620)
-- Name: disciplinas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.disciplinas (
    id integer NOT NULL,
    nome character varying(100) NOT NULL,
    codigo_turma character varying(50) NOT NULL,
    professor_id integer NOT NULL,
    semestre integer DEFAULT 1
);


ALTER TABLE public.disciplinas OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 24619)
-- Name: disciplinas_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.disciplinas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.disciplinas_id_seq OWNER TO postgres;

--
-- TOC entry 5064 (class 0 OID 0)
-- Dependencies: 225
-- Name: disciplinas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.disciplinas_id_seq OWNED BY public.disciplinas.id;


--
-- TOC entry 223 (class 1259 OID 24597)
-- Name: estudantes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.estudantes (
    usuario_id integer NOT NULL,
    semestre_atual integer DEFAULT 1
);


ALTER TABLE public.estudantes OWNER TO postgres;

--
-- TOC entry 236 (class 1259 OID 32916)
-- Name: horarios_aula; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.horarios_aula (
    id integer NOT NULL,
    disciplina_id integer,
    dia_semana character varying(20) NOT NULL,
    hora_inicio time without time zone NOT NULL,
    hora_fim time without time zone NOT NULL,
    laboratorio character varying(50)
);


ALTER TABLE public.horarios_aula OWNER TO postgres;

--
-- TOC entry 235 (class 1259 OID 32915)
-- Name: horarios_aula_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.horarios_aula_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.horarios_aula_id_seq OWNER TO postgres;

--
-- TOC entry 5065 (class 0 OID 0)
-- Dependencies: 235
-- Name: horarios_aula_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.horarios_aula_id_seq OWNED BY public.horarios_aula.id;


--
-- TOC entry 238 (class 1259 OID 32932)
-- Name: materiais_aula; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.materiais_aula (
    id integer NOT NULL,
    disciplina_id integer,
    nome_arquivo character varying(255) NOT NULL,
    tamanho character varying(20),
    url_caminho text NOT NULL,
    data_upload timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.materiais_aula OWNER TO postgres;

--
-- TOC entry 237 (class 1259 OID 32931)
-- Name: materiais_aula_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.materiais_aula_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.materiais_aula_id_seq OWNER TO postgres;

--
-- TOC entry 5066 (class 0 OID 0)
-- Dependencies: 237
-- Name: materiais_aula_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.materiais_aula_id_seq OWNED BY public.materiais_aula.id;


--
-- TOC entry 228 (class 1259 OID 24638)
-- Name: matriculas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.matriculas (
    id integer NOT NULL,
    estudante_id integer NOT NULL,
    disciplina_id integer NOT NULL
);


ALTER TABLE public.matriculas OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 24637)
-- Name: matriculas_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.matriculas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.matriculas_id_seq OWNER TO postgres;

--
-- TOC entry 5067 (class 0 OID 0)
-- Dependencies: 227
-- Name: matriculas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.matriculas_id_seq OWNED BY public.matriculas.id;


--
-- TOC entry 224 (class 1259 OID 24608)
-- Name: professores; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.professores (
    usuario_id integer NOT NULL
);


ALTER TABLE public.professores OWNER TO postgres;

--
-- TOC entry 242 (class 1259 OID 33001)
-- Name: submissoes_avaliacoes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.submissoes_avaliacoes (
    id integer NOT NULL,
    avaliacao_id integer NOT NULL,
    estudante_id integer NOT NULL,
    url_arquivo text NOT NULL,
    nome_arquivo character varying(255) NOT NULL,
    data_envio timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    nota numeric(4,2) DEFAULT NULL::numeric
);


ALTER TABLE public.submissoes_avaliacoes OWNER TO postgres;

--
-- TOC entry 241 (class 1259 OID 33000)
-- Name: submissoes_avaliacoes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.submissoes_avaliacoes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.submissoes_avaliacoes_id_seq OWNER TO postgres;

--
-- TOC entry 5068 (class 0 OID 0)
-- Dependencies: 241
-- Name: submissoes_avaliacoes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.submissoes_avaliacoes_id_seq OWNED BY public.submissoes_avaliacoes.id;


--
-- TOC entry 234 (class 1259 OID 24699)
-- Name: tarefas_privadas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tarefas_privadas (
    id integer NOT NULL,
    titulo character varying(150) NOT NULL,
    descricao text,
    data_limite timestamp without time zone,
    concluida boolean DEFAULT false,
    estudante_id integer NOT NULL
);


ALTER TABLE public.tarefas_privadas OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 24698)
-- Name: tarefas_privadas_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tarefas_privadas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tarefas_privadas_id_seq OWNER TO postgres;

--
-- TOC entry 5069 (class 0 OID 0)
-- Dependencies: 233
-- Name: tarefas_privadas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tarefas_privadas_id_seq OWNED BY public.tarefas_privadas.id;


--
-- TOC entry 222 (class 1259 OID 24584)
-- Name: usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios (
    id integer NOT NULL,
    nome character varying(100) NOT NULL,
    matricula_siape character varying(100) CONSTRAINT usuarios_email_not_null NOT NULL,
    senha_hash character varying(255) NOT NULL,
    tipo_usuario public.tipo_usuario_enum NOT NULL,
    primeiro_acesso boolean DEFAULT true
);


ALTER TABLE public.usuarios OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 24583)
-- Name: usuarios_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuarios_id_seq OWNER TO postgres;

--
-- TOC entry 5070 (class 0 OID 0)
-- Dependencies: 221
-- Name: usuarios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;


--
-- TOC entry 4819 (class 2604 OID 24663)
-- Name: avaliacoes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.avaliacoes ALTER COLUMN id SET DEFAULT nextval('public.atividades_id_seq'::regclass);


--
-- TOC entry 4820 (class 2604 OID 24682)
-- Name: comunicados id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comunicados ALTER COLUMN id SET DEFAULT nextval('public.comunicados_id_seq'::regclass);


--
-- TOC entry 4828 (class 2604 OID 32953)
-- Name: comunicados_mural id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comunicados_mural ALTER COLUMN id SET DEFAULT nextval('public.comunicados_mural_id_seq'::regclass);


--
-- TOC entry 4816 (class 2604 OID 24623)
-- Name: disciplinas id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.disciplinas ALTER COLUMN id SET DEFAULT nextval('public.disciplinas_id_seq'::regclass);


--
-- TOC entry 4825 (class 2604 OID 32919)
-- Name: horarios_aula id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.horarios_aula ALTER COLUMN id SET DEFAULT nextval('public.horarios_aula_id_seq'::regclass);


--
-- TOC entry 4826 (class 2604 OID 32935)
-- Name: materiais_aula id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.materiais_aula ALTER COLUMN id SET DEFAULT nextval('public.materiais_aula_id_seq'::regclass);


--
-- TOC entry 4818 (class 2604 OID 24641)
-- Name: matriculas id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.matriculas ALTER COLUMN id SET DEFAULT nextval('public.matriculas_id_seq'::regclass);


--
-- TOC entry 4831 (class 2604 OID 33004)
-- Name: submissoes_avaliacoes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.submissoes_avaliacoes ALTER COLUMN id SET DEFAULT nextval('public.submissoes_avaliacoes_id_seq'::regclass);


--
-- TOC entry 4823 (class 2604 OID 24702)
-- Name: tarefas_privadas id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tarefas_privadas ALTER COLUMN id SET DEFAULT nextval('public.tarefas_privadas_id_seq'::regclass);


--
-- TOC entry 4813 (class 2604 OID 24587)
-- Name: usuarios id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);


--
-- TOC entry 5043 (class 0 OID 24660)
-- Dependencies: 230
-- Data for Name: avaliacoes; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5045 (class 0 OID 24679)
-- Dependencies: 232
-- Data for Name: comunicados; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5053 (class 0 OID 32950)
-- Dependencies: 240
-- Data for Name: comunicados_mural; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.comunicados_mural VALUES (1, 54134, 'Material de Motores Gráficos', 'Pessoal, os slides da aula sobre Arquitetura de Motores Gráficos já estão disponíveis na seção de arquivos abaixo. Não esqueçam de revisar para a entrega do protótipo.', '2026-07-13 15:20:19.434164', false);


--
-- TOC entry 5039 (class 0 OID 24620)
-- Dependencies: 226
-- Data for Name: disciplinas; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.disciplinas VALUES (54113, 'Administração e Informática', 'BEL.0812', 3, 2);
INSERT INTO public.disciplinas VALUES (54114, 'Filosofia, Ética e Desenvolvimento Humano', 'BEL.0813', 29, 2);
INSERT INTO public.disciplinas VALUES (54115, 'Fundamentos de Cálculo', 'BEL.0810', 31, 2);
INSERT INTO public.disciplinas VALUES (54116, 'Linguagem de Programação I', 'BEL.0809', 38, 2);
INSERT INTO public.disciplinas VALUES (54117, 'Metodologia da Pesquisa Científica', 'BEL.0814', 43, 2);
INSERT INTO public.disciplinas VALUES (54118, 'Sistemas Digitais', 'BEL.0811', 47, 2);
INSERT INTO public.disciplinas VALUES (54887, 'Algoritmos', 'BEL.0804', 65, 2);
INSERT INTO public.disciplinas VALUES (54119, 'Análise e Projeto de Sistemas', 'BEL.0823', 50, 4);
INSERT INTO public.disciplinas VALUES (54121, 'Fundamentos de Estatística', 'BEL.0822', 66, 4);
INSERT INTO public.disciplinas VALUES (54122, 'Humanidade e Cidadania', 'BEL.0825', 29, 4);
INSERT INTO public.disciplinas VALUES (54123, 'Prática Curricular de Extensão I', 'BEL.0826', 50, 4);
INSERT INTO public.disciplinas VALUES (54124, 'Sistemas Operacionais', 'BEL.0824', 71, 4);
INSERT INTO public.disciplinas VALUES (54120, 'Banco de Dados II', 'BEL.0821', 65, 4);
INSERT INTO public.disciplinas VALUES (54126, 'Estágio Supervisionado', 'BEL.0833', 38, 6);
INSERT INTO public.disciplinas VALUES (54127, 'Gerenciamento de Processos de Negócio', 'BEL.0837', 3, 6);
INSERT INTO public.disciplinas VALUES (54128, 'Gerenciamento de Redes', 'BEL.0835', 83, 6);
INSERT INTO public.disciplinas VALUES (54129, 'Gestão de Projeto de Software', 'BEL.0834', 47, 6);
INSERT INTO public.disciplinas VALUES (54130, 'Prática Curricular de Extensão III', 'BEL.0838', 71, 6);
INSERT INTO public.disciplinas VALUES (54125, 'Desenvolvimento para Dispositivos Móveis', 'BEL.0836', 76, 6);
INSERT INTO public.disciplinas VALUES (54131, 'Empreendedorismo e Cooperativismo', 'BEL.0844', 3, 8);
INSERT INTO public.disciplinas VALUES (54132, 'Sistema de Apoio à Decisão', 'BEL.0843', 91, 8);
INSERT INTO public.disciplinas VALUES (54136, 'Tópicos Avançados em Engenharia de Software', 'BEL.0855', 95, 8);
INSERT INTO public.disciplinas VALUES (54135, 'Tópicos Avançados em Banco de Dados', 'BEL.0845', 83, 8);
INSERT INTO public.disciplinas VALUES (54134, 'Desenvolvimento de Jogos', 'BEL.0850', 76, 8);
INSERT INTO public.disciplinas VALUES (54133, 'Trabalho de Conclusão de Curso II', 'BEL.0065', 91, 8);


--
-- TOC entry 5036 (class 0 OID 24597)
-- Dependencies: 223
-- Data for Name: estudantes; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.estudantes VALUES (4, 2);
INSERT INTO public.estudantes VALUES (5, 2);
INSERT INTO public.estudantes VALUES (6, 2);
INSERT INTO public.estudantes VALUES (20, 2);
INSERT INTO public.estudantes VALUES (21, 2);
INSERT INTO public.estudantes VALUES (22, 2);
INSERT INTO public.estudantes VALUES (23, 2);
INSERT INTO public.estudantes VALUES (24, 2);
INSERT INTO public.estudantes VALUES (25, 2);
INSERT INTO public.estudantes VALUES (26, 2);
INSERT INTO public.estudantes VALUES (27, 2);
INSERT INTO public.estudantes VALUES (28, 2);
INSERT INTO public.estudantes VALUES (32, 4);
INSERT INTO public.estudantes VALUES (33, 4);
INSERT INTO public.estudantes VALUES (34, 4);
INSERT INTO public.estudantes VALUES (35, 4);
INSERT INTO public.estudantes VALUES (36, 8);
INSERT INTO public.estudantes VALUES (37, 8);
INSERT INTO public.estudantes VALUES (39, 4);
INSERT INTO public.estudantes VALUES (40, 4);
INSERT INTO public.estudantes VALUES (41, 4);
INSERT INTO public.estudantes VALUES (42, 4);
INSERT INTO public.estudantes VALUES (44, 8);
INSERT INTO public.estudantes VALUES (45, 4);
INSERT INTO public.estudantes VALUES (46, 8);
INSERT INTO public.estudantes VALUES (48, 8);
INSERT INTO public.estudantes VALUES (49, 2);
INSERT INTO public.estudantes VALUES (51, 4);
INSERT INTO public.estudantes VALUES (52, 10);
INSERT INTO public.estudantes VALUES (53, 10);
INSERT INTO public.estudantes VALUES (54, 6);
INSERT INTO public.estudantes VALUES (55, 4);
INSERT INTO public.estudantes VALUES (56, 4);
INSERT INTO public.estudantes VALUES (57, 4);
INSERT INTO public.estudantes VALUES (58, 4);
INSERT INTO public.estudantes VALUES (59, 4);
INSERT INTO public.estudantes VALUES (60, 4);
INSERT INTO public.estudantes VALUES (61, 4);
INSERT INTO public.estudantes VALUES (62, 4);
INSERT INTO public.estudantes VALUES (63, 4);
INSERT INTO public.estudantes VALUES (64, 4);
INSERT INTO public.estudantes VALUES (67, 10);
INSERT INTO public.estudantes VALUES (68, 6);
INSERT INTO public.estudantes VALUES (7, 2);
INSERT INTO public.estudantes VALUES (8, 2);
INSERT INTO public.estudantes VALUES (9, 2);
INSERT INTO public.estudantes VALUES (10, 2);
INSERT INTO public.estudantes VALUES (11, 2);
INSERT INTO public.estudantes VALUES (12, 2);
INSERT INTO public.estudantes VALUES (13, 2);
INSERT INTO public.estudantes VALUES (14, 2);
INSERT INTO public.estudantes VALUES (15, 2);
INSERT INTO public.estudantes VALUES (16, 2);
INSERT INTO public.estudantes VALUES (17, 2);
INSERT INTO public.estudantes VALUES (18, 2);
INSERT INTO public.estudantes VALUES (19, 2);
INSERT INTO public.estudantes VALUES (69, 4);
INSERT INTO public.estudantes VALUES (70, 10);
INSERT INTO public.estudantes VALUES (72, 6);
INSERT INTO public.estudantes VALUES (73, 6);
INSERT INTO public.estudantes VALUES (77, 6);
INSERT INTO public.estudantes VALUES (78, 6);
INSERT INTO public.estudantes VALUES (1, 8);
INSERT INTO public.estudantes VALUES (79, 6);
INSERT INTO public.estudantes VALUES (80, 6);
INSERT INTO public.estudantes VALUES (81, 6);
INSERT INTO public.estudantes VALUES (82, 10);
INSERT INTO public.estudantes VALUES (84, 8);
INSERT INTO public.estudantes VALUES (85, 8);
INSERT INTO public.estudantes VALUES (86, 8);
INSERT INTO public.estudantes VALUES (87, 10);
INSERT INTO public.estudantes VALUES (88, 8);
INSERT INTO public.estudantes VALUES (89, 8);
INSERT INTO public.estudantes VALUES (90, 8);
INSERT INTO public.estudantes VALUES (92, 10);
INSERT INTO public.estudantes VALUES (93, 8);
INSERT INTO public.estudantes VALUES (94, 8);


--
-- TOC entry 5049 (class 0 OID 32916)
-- Dependencies: 236
-- Data for Name: horarios_aula; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.horarios_aula VALUES (1, NULL, 'SEGUNDA-FEIRA', '07:30:00', '09:30:00', NULL);
INSERT INTO public.horarios_aula VALUES (2, NULL, 'SEGUNDA-FEIRA', '09:50:00', '11:50:00', NULL);
INSERT INTO public.horarios_aula VALUES (3, NULL, 'TERÇA-FEIRA', '07:30:00', '09:30:00', NULL);
INSERT INTO public.horarios_aula VALUES (4, NULL, 'TERÇA-FEIRA', '09:50:00', '11:50:00', NULL);
INSERT INTO public.horarios_aula VALUES (5, NULL, 'TERÇA-FEIRA', '13:30:00', '15:30:00', NULL);
INSERT INTO public.horarios_aula VALUES (6, NULL, 'QUARTA-FEIRA', '07:30:00', '09:30:00', NULL);
INSERT INTO public.horarios_aula VALUES (7, NULL, 'QUARTA-FEIRA', '09:50:00', '11:50:00', NULL);
INSERT INTO public.horarios_aula VALUES (8, NULL, 'QUINTA-FEIRA', '07:30:00', '09:30:00', NULL);
INSERT INTO public.horarios_aula VALUES (9, NULL, 'QUINTA-FEIRA', '09:50:00', '11:50:00', NULL);
INSERT INTO public.horarios_aula VALUES (10, NULL, 'SEXTA-FEIRA', '07:30:00', '09:30:00', NULL);
INSERT INTO public.horarios_aula VALUES (11, NULL, 'SEGUNDA-FEIRA', '13:30:00', '16:40:00', NULL);
INSERT INTO public.horarios_aula VALUES (12, NULL, 'TERÇA-FEIRA', '07:30:00', '09:30:00', NULL);
INSERT INTO public.horarios_aula VALUES (13, NULL, 'TERÇA-FEIRA', '09:50:00', '11:50:00', NULL);
INSERT INTO public.horarios_aula VALUES (14, NULL, 'TERÇA-FEIRA', '13:30:00', '15:30:00', NULL);
INSERT INTO public.horarios_aula VALUES (15, NULL, 'TERÇA-FEIRA', '15:50:00', '17:50:00', NULL);
INSERT INTO public.horarios_aula VALUES (16, NULL, 'QUARTA-FEIRA', '07:30:00', '09:30:00', NULL);
INSERT INTO public.horarios_aula VALUES (17, NULL, 'QUARTA-FEIRA', '09:50:00', '11:50:00', NULL);
INSERT INTO public.horarios_aula VALUES (18, NULL, 'QUINTA-FEIRA', '09:50:00', '11:50:00', NULL);
INSERT INTO public.horarios_aula VALUES (19, NULL, 'QUINTA-FEIRA', '13:30:00', '16:40:00', NULL);
INSERT INTO public.horarios_aula VALUES (20, NULL, 'SEXTA-FEIRA', '09:50:00', '11:50:00', NULL);
INSERT INTO public.horarios_aula VALUES (21, NULL, 'SEGUNDA-FEIRA', '09:50:00', '11:50:00', NULL);
INSERT INTO public.horarios_aula VALUES (22, NULL, 'TERÇA-FEIRA', '07:30:00', '09:30:00', NULL);
INSERT INTO public.horarios_aula VALUES (23, NULL, 'TERÇA-FEIRA', '09:50:00', '11:50:00', NULL);
INSERT INTO public.horarios_aula VALUES (24, NULL, 'QUARTA-FEIRA', '07:30:00', '09:30:00', NULL);
INSERT INTO public.horarios_aula VALUES (25, NULL, 'QUARTA-FEIRA', '09:50:00', '11:50:00', NULL);
INSERT INTO public.horarios_aula VALUES (26, NULL, 'QUINTA-FEIRA', '07:30:00', '09:30:00', NULL);
INSERT INTO public.horarios_aula VALUES (27, NULL, 'QUINTA-FEIRA', '09:50:00', '11:50:00', NULL);
INSERT INTO public.horarios_aula VALUES (28, NULL, 'QUINTA-FEIRA', '13:30:00', '16:40:00', NULL);
INSERT INTO public.horarios_aula VALUES (29, NULL, 'SEXTA-FEIRA', '07:30:00', '09:30:00', NULL);
INSERT INTO public.horarios_aula VALUES (30, NULL, 'SEXTA-FEIRA', '09:50:00', '11:50:00', NULL);
INSERT INTO public.horarios_aula VALUES (32, 54120, 'TERÇA-FEIRA', '07:30:00', '09:30:00', NULL);
INSERT INTO public.horarios_aula VALUES (33, NULL, 'TERÇA-FEIRA', '09:50:00', '11:50:00', NULL);
INSERT INTO public.horarios_aula VALUES (36, 54120, 'QUARTA-FEIRA', '09:50:00', '11:50:00', NULL);
INSERT INTO public.horarios_aula VALUES (39, NULL, 'SEXTA-FEIRA', '09:50:00', '11:50:00', NULL);
INSERT INTO public.horarios_aula VALUES (83, 54132, 'SEXTA-FEIRA', '09:50:00', '11:50:00', NULL);
INSERT INTO public.horarios_aula VALUES (84, 54136, 'SEGUNDA-FEIRA', '09:50:00', '11:50:00', NULL);
INSERT INTO public.horarios_aula VALUES (85, 54136, 'TERÇA-FEIRA', '13:30:00', '15:30:00', NULL);
INSERT INTO public.horarios_aula VALUES (40, 54127, 'SEGUNDA-FEIRA', '09:50:00', '11:50:00', NULL);
INSERT INTO public.horarios_aula VALUES (41, 54126, 'TERÇA-FEIRA', '07:30:00', '09:30:00', NULL);
INSERT INTO public.horarios_aula VALUES (46, 54129, 'QUINTA-FEIRA', '09:50:00', '11:50:00', NULL);
INSERT INTO public.horarios_aula VALUES (48, 54130, 'SEXTA-FEIRA', '07:30:00', '09:30:00', NULL);
INSERT INTO public.horarios_aula VALUES (49, 54129, 'SEXTA-FEIRA', '09:50:00', '11:50:00', NULL);
INSERT INTO public.horarios_aula VALUES (47, 54130, 'QUINTA-FEIRA', '13:30:00', '16:50:00', NULL);
INSERT INTO public.horarios_aula VALUES (44, 54125, 'QUARTA-FEIRA', '09:50:00', '11:50:00', 'Lab 117');
INSERT INTO public.horarios_aula VALUES (45, 54125, 'QUINTA-FEIRA', '07:30:00', '09:30:00', 'Lab 117');
INSERT INTO public.horarios_aula VALUES (37, 54133, 'QUINTA-FEIRA', '07:30:00', '09:30:00', 'Lab 124');
INSERT INTO public.horarios_aula VALUES (31, 54135, 'QUARTA-FEIRA', '09:50:00', '11:50:00', 'Lab 107');
INSERT INTO public.horarios_aula VALUES (34, 54135, 'TERÇA-FEIRA', '07:30:00', '09:30:00', 'Lab 107');
INSERT INTO public.horarios_aula VALUES (42, 54128, 'TERÇA-FEIRA', '09:50:00', '11:50:00', 'Lab 107');
INSERT INTO public.horarios_aula VALUES (43, 54128, 'QUARTA-FEIRA', '07:30:00', '09:30:00', 'Lab 107');
INSERT INTO public.horarios_aula VALUES (50, 54113, 'SEGUNDA-FEIRA', '07:30:00', '09:30:00', NULL);
INSERT INTO public.horarios_aula VALUES (51, 54114, 'SEGUNDA-FEIRA', '09:50:00', '11:50:00', NULL);
INSERT INTO public.horarios_aula VALUES (52, 54115, 'TERÇA-FEIRA', '07:30:00', '09:30:00', NULL);
INSERT INTO public.horarios_aula VALUES (53, 54116, 'TERÇA-FEIRA', '09:50:00', '11:50:00', NULL);
INSERT INTO public.horarios_aula VALUES (54, 54887, 'TERÇA-FEIRA', '09:50:00', '11:50:00', NULL);
INSERT INTO public.horarios_aula VALUES (55, 54113, 'TERÇA-FEIRA', '13:30:00', '15:30:00', NULL);
INSERT INTO public.horarios_aula VALUES (56, 54116, 'QUARTA-FEIRA', '07:30:00', '09:30:00', NULL);
INSERT INTO public.horarios_aula VALUES (57, 54887, 'QUARTA-FEIRA', '07:30:00', '09:30:00', NULL);
INSERT INTO public.horarios_aula VALUES (58, 54117, 'QUARTA-FEIRA', '09:50:00', '11:50:00', NULL);
INSERT INTO public.horarios_aula VALUES (59, 54118, 'QUINTA-FEIRA', '07:30:00', '09:30:00', NULL);
INSERT INTO public.horarios_aula VALUES (60, 54115, 'QUINTA-FEIRA', '09:50:00', '11:50:00', NULL);
INSERT INTO public.horarios_aula VALUES (61, 54118, 'SEXTA-FEIRA', '07:30:00', '09:30:00', NULL);
INSERT INTO public.horarios_aula VALUES (64, 54120, 'TERÇA-FEIRA', '07:30:00', '09:30:00', NULL);
INSERT INTO public.horarios_aula VALUES (65, 54124, 'TERÇA-FEIRA', '09:50:00', '11:50:00', NULL);
INSERT INTO public.horarios_aula VALUES (69, 54120, 'QUARTA-FEIRA', '09:50:00', '11:50:00', NULL);
INSERT INTO public.horarios_aula VALUES (70, 54124, 'QUINTA-FEIRA', '09:50:00', '11:50:00', NULL);
INSERT INTO public.horarios_aula VALUES (73, 54122, 'SEXTA-FEIRA', '09:50:00', '11:50:00', NULL);
INSERT INTO public.horarios_aula VALUES (75, 54131, 'TERÇA-FEIRA', '09:50:00', '11:50:00', NULL);
INSERT INTO public.horarios_aula VALUES (79, 54121, 'SEGUNDA-FEIRA', '13:30:00', '16:50:00', NULL);
INSERT INTO public.horarios_aula VALUES (81, 54123, 'QUINTA-FEIRA', '13:30:00', '16:50:00', NULL);
INSERT INTO public.horarios_aula VALUES (82, 54123, 'TERÇA-FEIRA', '15:50:00', '17:50:00', NULL);
INSERT INTO public.horarios_aula VALUES (35, 54134, 'QUARTA-FEIRA', '07:30:00', '09:30:00', 'Laboratório 124');
INSERT INTO public.horarios_aula VALUES (38, 54134, 'QUINTA-FEIRA', '09:50:00', '11:50:00', 'Laboratório 124');
INSERT INTO public.horarios_aula VALUES (66, 54119, 'TERÇA-FEIRA', '13:30:00', '15:30:00', 'Laboratório 124');
INSERT INTO public.horarios_aula VALUES (68, 54119, 'QUARTA-FEIRA', '07:30:00', '09:30:00', 'Laboratório 124');


--
-- TOC entry 5051 (class 0 OID 32932)
-- Dependencies: 238
-- Data for Name: materiais_aula; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5041 (class 0 OID 24638)
-- Dependencies: 228
-- Data for Name: matriculas; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.matriculas VALUES (1, 4, 54113);
INSERT INTO public.matriculas VALUES (2, 5, 54113);
INSERT INTO public.matriculas VALUES (3, 6, 54113);
INSERT INTO public.matriculas VALUES (4, 20, 54113);
INSERT INTO public.matriculas VALUES (5, 21, 54113);
INSERT INTO public.matriculas VALUES (6, 22, 54113);
INSERT INTO public.matriculas VALUES (7, 23, 54113);
INSERT INTO public.matriculas VALUES (8, 24, 54113);
INSERT INTO public.matriculas VALUES (9, 25, 54113);
INSERT INTO public.matriculas VALUES (10, 26, 54113);
INSERT INTO public.matriculas VALUES (11, 27, 54113);
INSERT INTO public.matriculas VALUES (12, 28, 54113);
INSERT INTO public.matriculas VALUES (13, 7, 54113);
INSERT INTO public.matriculas VALUES (14, 8, 54113);
INSERT INTO public.matriculas VALUES (15, 9, 54113);
INSERT INTO public.matriculas VALUES (16, 10, 54113);
INSERT INTO public.matriculas VALUES (17, 11, 54113);
INSERT INTO public.matriculas VALUES (18, 12, 54113);
INSERT INTO public.matriculas VALUES (19, 13, 54113);
INSERT INTO public.matriculas VALUES (20, 14, 54113);
INSERT INTO public.matriculas VALUES (21, 15, 54113);
INSERT INTO public.matriculas VALUES (22, 16, 54113);
INSERT INTO public.matriculas VALUES (23, 17, 54113);
INSERT INTO public.matriculas VALUES (24, 18, 54113);
INSERT INTO public.matriculas VALUES (25, 19, 54113);
INSERT INTO public.matriculas VALUES (26, 4, 54114);
INSERT INTO public.matriculas VALUES (27, 5, 54114);
INSERT INTO public.matriculas VALUES (28, 6, 54114);
INSERT INTO public.matriculas VALUES (29, 20, 54114);
INSERT INTO public.matriculas VALUES (30, 21, 54114);
INSERT INTO public.matriculas VALUES (31, 22, 54114);
INSERT INTO public.matriculas VALUES (32, 23, 54114);
INSERT INTO public.matriculas VALUES (33, 24, 54114);
INSERT INTO public.matriculas VALUES (34, 25, 54114);
INSERT INTO public.matriculas VALUES (35, 26, 54114);
INSERT INTO public.matriculas VALUES (36, 27, 54114);
INSERT INTO public.matriculas VALUES (37, 28, 54114);
INSERT INTO public.matriculas VALUES (38, 7, 54114);
INSERT INTO public.matriculas VALUES (39, 8, 54114);
INSERT INTO public.matriculas VALUES (40, 9, 54114);
INSERT INTO public.matriculas VALUES (41, 10, 54114);
INSERT INTO public.matriculas VALUES (42, 11, 54114);
INSERT INTO public.matriculas VALUES (43, 12, 54114);
INSERT INTO public.matriculas VALUES (44, 13, 54114);
INSERT INTO public.matriculas VALUES (45, 14, 54114);
INSERT INTO public.matriculas VALUES (46, 15, 54114);
INSERT INTO public.matriculas VALUES (47, 16, 54114);
INSERT INTO public.matriculas VALUES (48, 17, 54114);
INSERT INTO public.matriculas VALUES (49, 18, 54114);
INSERT INTO public.matriculas VALUES (50, 19, 54114);
INSERT INTO public.matriculas VALUES (51, 4, 54115);
INSERT INTO public.matriculas VALUES (52, 5, 54115);
INSERT INTO public.matriculas VALUES (53, 6, 54115);
INSERT INTO public.matriculas VALUES (54, 20, 54115);
INSERT INTO public.matriculas VALUES (55, 21, 54115);
INSERT INTO public.matriculas VALUES (56, 22, 54115);
INSERT INTO public.matriculas VALUES (57, 23, 54115);
INSERT INTO public.matriculas VALUES (58, 24, 54115);
INSERT INTO public.matriculas VALUES (59, 25, 54115);
INSERT INTO public.matriculas VALUES (60, 26, 54115);
INSERT INTO public.matriculas VALUES (61, 27, 54115);
INSERT INTO public.matriculas VALUES (62, 28, 54115);
INSERT INTO public.matriculas VALUES (63, 32, 54115);
INSERT INTO public.matriculas VALUES (64, 33, 54115);
INSERT INTO public.matriculas VALUES (65, 34, 54115);
INSERT INTO public.matriculas VALUES (66, 35, 54115);
INSERT INTO public.matriculas VALUES (67, 36, 54115);
INSERT INTO public.matriculas VALUES (68, 37, 54115);
INSERT INTO public.matriculas VALUES (69, 7, 54115);
INSERT INTO public.matriculas VALUES (70, 8, 54115);
INSERT INTO public.matriculas VALUES (71, 9, 54115);
INSERT INTO public.matriculas VALUES (72, 10, 54115);
INSERT INTO public.matriculas VALUES (73, 11, 54115);
INSERT INTO public.matriculas VALUES (74, 12, 54115);
INSERT INTO public.matriculas VALUES (75, 13, 54115);
INSERT INTO public.matriculas VALUES (76, 14, 54115);
INSERT INTO public.matriculas VALUES (77, 15, 54115);
INSERT INTO public.matriculas VALUES (78, 16, 54115);
INSERT INTO public.matriculas VALUES (79, 17, 54115);
INSERT INTO public.matriculas VALUES (80, 18, 54115);
INSERT INTO public.matriculas VALUES (81, 19, 54115);
INSERT INTO public.matriculas VALUES (82, 6, 54116);
INSERT INTO public.matriculas VALUES (83, 20, 54116);
INSERT INTO public.matriculas VALUES (84, 21, 54116);
INSERT INTO public.matriculas VALUES (85, 22, 54116);
INSERT INTO public.matriculas VALUES (86, 24, 54116);
INSERT INTO public.matriculas VALUES (87, 25, 54116);
INSERT INTO public.matriculas VALUES (88, 26, 54116);
INSERT INTO public.matriculas VALUES (89, 27, 54116);
INSERT INTO public.matriculas VALUES (90, 28, 54116);
INSERT INTO public.matriculas VALUES (91, 32, 54116);
INSERT INTO public.matriculas VALUES (92, 33, 54116);
INSERT INTO public.matriculas VALUES (93, 34, 54116);
INSERT INTO public.matriculas VALUES (94, 39, 54116);
INSERT INTO public.matriculas VALUES (95, 40, 54116);
INSERT INTO public.matriculas VALUES (96, 41, 54116);
INSERT INTO public.matriculas VALUES (97, 42, 54116);
INSERT INTO public.matriculas VALUES (98, 7, 54116);
INSERT INTO public.matriculas VALUES (99, 9, 54116);
INSERT INTO public.matriculas VALUES (100, 11, 54116);
INSERT INTO public.matriculas VALUES (101, 12, 54116);
INSERT INTO public.matriculas VALUES (102, 14, 54116);
INSERT INTO public.matriculas VALUES (103, 15, 54116);
INSERT INTO public.matriculas VALUES (104, 17, 54116);
INSERT INTO public.matriculas VALUES (105, 19, 54116);
INSERT INTO public.matriculas VALUES (106, 4, 54117);
INSERT INTO public.matriculas VALUES (107, 5, 54117);
INSERT INTO public.matriculas VALUES (108, 6, 54117);
INSERT INTO public.matriculas VALUES (109, 20, 54117);
INSERT INTO public.matriculas VALUES (110, 21, 54117);
INSERT INTO public.matriculas VALUES (111, 22, 54117);
INSERT INTO public.matriculas VALUES (112, 23, 54117);
INSERT INTO public.matriculas VALUES (113, 24, 54117);
INSERT INTO public.matriculas VALUES (114, 25, 54117);
INSERT INTO public.matriculas VALUES (115, 26, 54117);
INSERT INTO public.matriculas VALUES (116, 28, 54117);
INSERT INTO public.matriculas VALUES (117, 35, 54117);
INSERT INTO public.matriculas VALUES (118, 37, 54117);
INSERT INTO public.matriculas VALUES (119, 39, 54117);
INSERT INTO public.matriculas VALUES (120, 44, 54117);
INSERT INTO public.matriculas VALUES (121, 45, 54117);
INSERT INTO public.matriculas VALUES (122, 46, 54117);
INSERT INTO public.matriculas VALUES (123, 7, 54117);
INSERT INTO public.matriculas VALUES (124, 8, 54117);
INSERT INTO public.matriculas VALUES (125, 9, 54117);
INSERT INTO public.matriculas VALUES (126, 10, 54117);
INSERT INTO public.matriculas VALUES (127, 11, 54117);
INSERT INTO public.matriculas VALUES (128, 12, 54117);
INSERT INTO public.matriculas VALUES (129, 13, 54117);
INSERT INTO public.matriculas VALUES (130, 14, 54117);
INSERT INTO public.matriculas VALUES (131, 15, 54117);
INSERT INTO public.matriculas VALUES (132, 16, 54117);
INSERT INTO public.matriculas VALUES (133, 17, 54117);
INSERT INTO public.matriculas VALUES (134, 18, 54117);
INSERT INTO public.matriculas VALUES (135, 19, 54117);
INSERT INTO public.matriculas VALUES (136, 4, 54118);
INSERT INTO public.matriculas VALUES (137, 5, 54118);
INSERT INTO public.matriculas VALUES (138, 6, 54118);
INSERT INTO public.matriculas VALUES (139, 20, 54118);
INSERT INTO public.matriculas VALUES (140, 21, 54118);
INSERT INTO public.matriculas VALUES (141, 22, 54118);
INSERT INTO public.matriculas VALUES (142, 23, 54118);
INSERT INTO public.matriculas VALUES (143, 24, 54118);
INSERT INTO public.matriculas VALUES (144, 25, 54118);
INSERT INTO public.matriculas VALUES (145, 26, 54118);
INSERT INTO public.matriculas VALUES (146, 27, 54118);
INSERT INTO public.matriculas VALUES (147, 28, 54118);
INSERT INTO public.matriculas VALUES (148, 44, 54118);
INSERT INTO public.matriculas VALUES (149, 48, 54118);
INSERT INTO public.matriculas VALUES (150, 49, 54118);
INSERT INTO public.matriculas VALUES (151, 7, 54118);
INSERT INTO public.matriculas VALUES (152, 8, 54118);
INSERT INTO public.matriculas VALUES (153, 9, 54118);
INSERT INTO public.matriculas VALUES (154, 10, 54118);
INSERT INTO public.matriculas VALUES (155, 11, 54118);
INSERT INTO public.matriculas VALUES (156, 12, 54118);
INSERT INTO public.matriculas VALUES (157, 13, 54118);
INSERT INTO public.matriculas VALUES (158, 14, 54118);
INSERT INTO public.matriculas VALUES (159, 15, 54118);
INSERT INTO public.matriculas VALUES (160, 16, 54118);
INSERT INTO public.matriculas VALUES (161, 17, 54118);
INSERT INTO public.matriculas VALUES (162, 18, 54118);
INSERT INTO public.matriculas VALUES (163, 19, 54118);
INSERT INTO public.matriculas VALUES (164, 35, 54119);
INSERT INTO public.matriculas VALUES (165, 48, 54119);
INSERT INTO public.matriculas VALUES (166, 51, 54119);
INSERT INTO public.matriculas VALUES (167, 52, 54119);
INSERT INTO public.matriculas VALUES (168, 53, 54119);
INSERT INTO public.matriculas VALUES (169, 54, 54119);
INSERT INTO public.matriculas VALUES (170, 55, 54119);
INSERT INTO public.matriculas VALUES (171, 56, 54119);
INSERT INTO public.matriculas VALUES (172, 57, 54119);
INSERT INTO public.matriculas VALUES (173, 58, 54119);
INSERT INTO public.matriculas VALUES (174, 59, 54119);
INSERT INTO public.matriculas VALUES (175, 60, 54119);
INSERT INTO public.matriculas VALUES (176, 61, 54119);
INSERT INTO public.matriculas VALUES (177, 62, 54119);
INSERT INTO public.matriculas VALUES (178, 63, 54119);
INSERT INTO public.matriculas VALUES (179, 64, 54119);
INSERT INTO public.matriculas VALUES (180, 42, 54120);
INSERT INTO public.matriculas VALUES (181, 51, 54120);
INSERT INTO public.matriculas VALUES (182, 55, 54120);
INSERT INTO public.matriculas VALUES (183, 56, 54120);
INSERT INTO public.matriculas VALUES (184, 58, 54120);
INSERT INTO public.matriculas VALUES (185, 59, 54120);
INSERT INTO public.matriculas VALUES (186, 60, 54120);
INSERT INTO public.matriculas VALUES (187, 61, 54120);
INSERT INTO public.matriculas VALUES (188, 62, 54120);
INSERT INTO public.matriculas VALUES (189, 63, 54120);
INSERT INTO public.matriculas VALUES (190, 64, 54120);
INSERT INTO public.matriculas VALUES (191, 32, 54121);
INSERT INTO public.matriculas VALUES (192, 33, 54121);
INSERT INTO public.matriculas VALUES (193, 34, 54121);
INSERT INTO public.matriculas VALUES (194, 35, 54121);
INSERT INTO public.matriculas VALUES (195, 41, 54121);
INSERT INTO public.matriculas VALUES (196, 42, 54121);
INSERT INTO public.matriculas VALUES (197, 44, 54121);
INSERT INTO public.matriculas VALUES (198, 45, 54121);
INSERT INTO public.matriculas VALUES (199, 46, 54121);
INSERT INTO public.matriculas VALUES (200, 51, 54121);
INSERT INTO public.matriculas VALUES (201, 52, 54121);
INSERT INTO public.matriculas VALUES (202, 55, 54121);
INSERT INTO public.matriculas VALUES (203, 56, 54121);
INSERT INTO public.matriculas VALUES (204, 57, 54121);
INSERT INTO public.matriculas VALUES (205, 58, 54121);
INSERT INTO public.matriculas VALUES (206, 59, 54121);
INSERT INTO public.matriculas VALUES (207, 60, 54121);
INSERT INTO public.matriculas VALUES (208, 61, 54121);
INSERT INTO public.matriculas VALUES (209, 62, 54121);
INSERT INTO public.matriculas VALUES (210, 63, 54121);
INSERT INTO public.matriculas VALUES (211, 67, 54121);
INSERT INTO public.matriculas VALUES (212, 68, 54121);
INSERT INTO public.matriculas VALUES (213, 69, 54121);
INSERT INTO public.matriculas VALUES (214, 70, 54121);
INSERT INTO public.matriculas VALUES (215, 32, 54122);
INSERT INTO public.matriculas VALUES (216, 33, 54122);
INSERT INTO public.matriculas VALUES (217, 34, 54122);
INSERT INTO public.matriculas VALUES (218, 35, 54122);
INSERT INTO public.matriculas VALUES (219, 40, 54122);
INSERT INTO public.matriculas VALUES (220, 42, 54122);
INSERT INTO public.matriculas VALUES (221, 45, 54122);
INSERT INTO public.matriculas VALUES (222, 51, 54122);
INSERT INTO public.matriculas VALUES (223, 55, 54122);
INSERT INTO public.matriculas VALUES (224, 56, 54122);
INSERT INTO public.matriculas VALUES (225, 57, 54122);
INSERT INTO public.matriculas VALUES (226, 58, 54122);
INSERT INTO public.matriculas VALUES (227, 59, 54122);
INSERT INTO public.matriculas VALUES (228, 60, 54122);
INSERT INTO public.matriculas VALUES (229, 61, 54122);
INSERT INTO public.matriculas VALUES (230, 62, 54122);
INSERT INTO public.matriculas VALUES (231, 63, 54122);
INSERT INTO public.matriculas VALUES (232, 64, 54122);
INSERT INTO public.matriculas VALUES (233, 69, 54122);
INSERT INTO public.matriculas VALUES (234, 32, 54123);
INSERT INTO public.matriculas VALUES (235, 33, 54123);
INSERT INTO public.matriculas VALUES (236, 34, 54123);
INSERT INTO public.matriculas VALUES (237, 35, 54123);
INSERT INTO public.matriculas VALUES (238, 40, 54123);
INSERT INTO public.matriculas VALUES (239, 42, 54123);
INSERT INTO public.matriculas VALUES (240, 45, 54123);
INSERT INTO public.matriculas VALUES (241, 51, 54123);
INSERT INTO public.matriculas VALUES (242, 55, 54123);
INSERT INTO public.matriculas VALUES (243, 56, 54123);
INSERT INTO public.matriculas VALUES (244, 57, 54123);
INSERT INTO public.matriculas VALUES (245, 58, 54123);
INSERT INTO public.matriculas VALUES (246, 59, 54123);
INSERT INTO public.matriculas VALUES (247, 60, 54123);
INSERT INTO public.matriculas VALUES (248, 61, 54123);
INSERT INTO public.matriculas VALUES (249, 62, 54123);
INSERT INTO public.matriculas VALUES (250, 63, 54123);
INSERT INTO public.matriculas VALUES (251, 64, 54123);
INSERT INTO public.matriculas VALUES (252, 69, 54123);
INSERT INTO public.matriculas VALUES (253, 45, 54124);
INSERT INTO public.matriculas VALUES (254, 51, 54124);
INSERT INTO public.matriculas VALUES (255, 54, 54124);
INSERT INTO public.matriculas VALUES (256, 55, 54124);
INSERT INTO public.matriculas VALUES (257, 56, 54124);
INSERT INTO public.matriculas VALUES (258, 57, 54124);
INSERT INTO public.matriculas VALUES (259, 58, 54124);
INSERT INTO public.matriculas VALUES (260, 59, 54124);
INSERT INTO public.matriculas VALUES (261, 60, 54124);
INSERT INTO public.matriculas VALUES (262, 61, 54124);
INSERT INTO public.matriculas VALUES (263, 62, 54124);
INSERT INTO public.matriculas VALUES (264, 63, 54124);
INSERT INTO public.matriculas VALUES (265, 64, 54124);
INSERT INTO public.matriculas VALUES (266, 72, 54124);
INSERT INTO public.matriculas VALUES (267, 73, 54124);
INSERT INTO public.matriculas VALUES (268, 52, 54125);
INSERT INTO public.matriculas VALUES (269, 53, 54125);
INSERT INTO public.matriculas VALUES (270, 54, 54125);
INSERT INTO public.matriculas VALUES (271, 67, 54125);
INSERT INTO public.matriculas VALUES (272, 68, 54125);
INSERT INTO public.matriculas VALUES (273, 73, 54125);
INSERT INTO public.matriculas VALUES (274, 77, 54125);
INSERT INTO public.matriculas VALUES (275, 78, 54125);
INSERT INTO public.matriculas VALUES (276, 79, 54125);
INSERT INTO public.matriculas VALUES (277, 80, 54125);
INSERT INTO public.matriculas VALUES (278, 81, 54125);
INSERT INTO public.matriculas VALUES (279, 46, 54126);
INSERT INTO public.matriculas VALUES (280, 67, 54126);
INSERT INTO public.matriculas VALUES (281, 68, 54126);
INSERT INTO public.matriculas VALUES (282, 72, 54126);
INSERT INTO public.matriculas VALUES (283, 73, 54126);
INSERT INTO public.matriculas VALUES (284, 77, 54126);
INSERT INTO public.matriculas VALUES (285, 82, 54126);
INSERT INTO public.matriculas VALUES (286, 28, 54127);
INSERT INTO public.matriculas VALUES (287, 32, 54127);
INSERT INTO public.matriculas VALUES (288, 33, 54127);
INSERT INTO public.matriculas VALUES (289, 36, 54127);
INSERT INTO public.matriculas VALUES (290, 37, 54127);
INSERT INTO public.matriculas VALUES (291, 40, 54127);
INSERT INTO public.matriculas VALUES (292, 42, 54127);
INSERT INTO public.matriculas VALUES (293, 54, 54127);
INSERT INTO public.matriculas VALUES (294, 61, 54127);
INSERT INTO public.matriculas VALUES (295, 68, 54127);
INSERT INTO public.matriculas VALUES (296, 12, 54127);
INSERT INTO public.matriculas VALUES (297, 69, 54127);
INSERT INTO public.matriculas VALUES (298, 72, 54127);
INSERT INTO public.matriculas VALUES (299, 73, 54127);
INSERT INTO public.matriculas VALUES (300, 77, 54127);
INSERT INTO public.matriculas VALUES (301, 78, 54127);
INSERT INTO public.matriculas VALUES (302, 79, 54127);
INSERT INTO public.matriculas VALUES (303, 80, 54127);
INSERT INTO public.matriculas VALUES (304, 81, 54127);
INSERT INTO public.matriculas VALUES (305, 46, 54128);
INSERT INTO public.matriculas VALUES (306, 67, 54128);
INSERT INTO public.matriculas VALUES (307, 77, 54128);
INSERT INTO public.matriculas VALUES (308, 78, 54128);
INSERT INTO public.matriculas VALUES (309, 79, 54128);
INSERT INTO public.matriculas VALUES (310, 80, 54128);
INSERT INTO public.matriculas VALUES (311, 84, 54128);
INSERT INTO public.matriculas VALUES (312, 85, 54128);
INSERT INTO public.matriculas VALUES (313, 68, 54129);
INSERT INTO public.matriculas VALUES (314, 77, 54129);
INSERT INTO public.matriculas VALUES (315, 78, 54129);
INSERT INTO public.matriculas VALUES (316, 79, 54129);
INSERT INTO public.matriculas VALUES (317, 80, 54129);
INSERT INTO public.matriculas VALUES (318, 81, 54129);
INSERT INTO public.matriculas VALUES (319, 36, 54130);
INSERT INTO public.matriculas VALUES (320, 37, 54130);
INSERT INTO public.matriculas VALUES (321, 54, 54130);
INSERT INTO public.matriculas VALUES (322, 72, 54130);
INSERT INTO public.matriculas VALUES (323, 73, 54130);
INSERT INTO public.matriculas VALUES (324, 77, 54130);
INSERT INTO public.matriculas VALUES (325, 78, 54130);
INSERT INTO public.matriculas VALUES (326, 79, 54130);
INSERT INTO public.matriculas VALUES (327, 80, 54130);
INSERT INTO public.matriculas VALUES (328, 81, 54130);
INSERT INTO public.matriculas VALUES (329, 86, 54130);
INSERT INTO public.matriculas VALUES (330, 36, 54131);
INSERT INTO public.matriculas VALUES (331, 37, 54131);
INSERT INTO public.matriculas VALUES (332, 44, 54131);
INSERT INTO public.matriculas VALUES (333, 52, 54131);
INSERT INTO public.matriculas VALUES (334, 70, 54131);
INSERT INTO public.matriculas VALUES (335, 81, 54131);
INSERT INTO public.matriculas VALUES (336, 87, 54131);
INSERT INTO public.matriculas VALUES (337, 88, 54131);
INSERT INTO public.matriculas VALUES (338, 89, 54131);
INSERT INTO public.matriculas VALUES (339, 90, 54131);
INSERT INTO public.matriculas VALUES (340, 36, 54132);
INSERT INTO public.matriculas VALUES (341, 37, 54132);
INSERT INTO public.matriculas VALUES (342, 44, 54132);
INSERT INTO public.matriculas VALUES (343, 46, 54132);
INSERT INTO public.matriculas VALUES (344, 48, 54132);
INSERT INTO public.matriculas VALUES (345, 52, 54132);
INSERT INTO public.matriculas VALUES (346, 54, 54132);
INSERT INTO public.matriculas VALUES (347, 67, 54132);
INSERT INTO public.matriculas VALUES (348, 88, 54132);
INSERT INTO public.matriculas VALUES (349, 90, 54132);
INSERT INTO public.matriculas VALUES (350, 92, 54132);
INSERT INTO public.matriculas VALUES (351, 1, 54133);
INSERT INTO public.matriculas VALUES (352, 82, 54133);
INSERT INTO public.matriculas VALUES (353, 84, 54133);
INSERT INTO public.matriculas VALUES (354, 85, 54133);
INSERT INTO public.matriculas VALUES (355, 87, 54133);
INSERT INTO public.matriculas VALUES (356, 88, 54133);
INSERT INTO public.matriculas VALUES (357, 90, 54133);
INSERT INTO public.matriculas VALUES (358, 93, 54133);
INSERT INTO public.matriculas VALUES (359, 94, 54133);
INSERT INTO public.matriculas VALUES (360, 44, 54134);
INSERT INTO public.matriculas VALUES (361, 1, 54134);
INSERT INTO public.matriculas VALUES (362, 82, 54134);
INSERT INTO public.matriculas VALUES (363, 87, 54134);
INSERT INTO public.matriculas VALUES (364, 88, 54134);
INSERT INTO public.matriculas VALUES (365, 90, 54134);
INSERT INTO public.matriculas VALUES (366, 93, 54134);
INSERT INTO public.matriculas VALUES (367, 94, 54134);
INSERT INTO public.matriculas VALUES (368, 1, 54135);
INSERT INTO public.matriculas VALUES (369, 84, 54135);
INSERT INTO public.matriculas VALUES (370, 87, 54135);
INSERT INTO public.matriculas VALUES (371, 90, 54135);
INSERT INTO public.matriculas VALUES (372, 94, 54135);
INSERT INTO public.matriculas VALUES (373, 84, 54136);
INSERT INTO public.matriculas VALUES (374, 85, 54136);
INSERT INTO public.matriculas VALUES (375, 4, 54887);
INSERT INTO public.matriculas VALUES (376, 5, 54887);
INSERT INTO public.matriculas VALUES (377, 23, 54887);
INSERT INTO public.matriculas VALUES (378, 8, 54887);
INSERT INTO public.matriculas VALUES (379, 10, 54887);
INSERT INTO public.matriculas VALUES (380, 13, 54887);
INSERT INTO public.matriculas VALUES (381, 16, 54887);
INSERT INTO public.matriculas VALUES (382, 18, 54887);
INSERT INTO public.matriculas VALUES (383, 69, 54887);


--
-- TOC entry 5037 (class 0 OID 24608)
-- Dependencies: 224
-- Data for Name: professores; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.professores VALUES (3);
INSERT INTO public.professores VALUES (29);
INSERT INTO public.professores VALUES (30);
INSERT INTO public.professores VALUES (31);
INSERT INTO public.professores VALUES (38);
INSERT INTO public.professores VALUES (43);
INSERT INTO public.professores VALUES (47);
INSERT INTO public.professores VALUES (50);
INSERT INTO public.professores VALUES (65);
INSERT INTO public.professores VALUES (66);
INSERT INTO public.professores VALUES (71);
INSERT INTO public.professores VALUES (76);
INSERT INTO public.professores VALUES (83);
INSERT INTO public.professores VALUES (91);
INSERT INTO public.professores VALUES (95);


--
-- TOC entry 5055 (class 0 OID 33001)
-- Dependencies: 242
-- Data for Name: submissoes_avaliacoes; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5047 (class 0 OID 24699)
-- Dependencies: 234
-- Data for Name: tarefas_privadas; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.tarefas_privadas VALUES (23, 'Teste', NULL, NULL, false, 1);
INSERT INTO public.tarefas_privadas VALUES (24, 'Teste Hugo', NULL, NULL, false, 59);


--
-- TOC entry 5035 (class 0 OID 24584)
-- Dependencies: 222
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.usuarios VALUES (38, 'Clesio Rubens de Matos', '@prof.clesio', '$2b$10$5e8uRtdkyXCuju7yGmox5u9LvmyK3I.yUlStT.Aw2iQf2ZK5gZZO2', 'PROFESSOR', true);
INSERT INTO public.usuarios VALUES (3, 'Samuel Santos Oliveira', '@prof.samuel', '$2b$10$5e8uRtdkyXCuju7yGmox5u9LvmyK3I.yUlStT.Aw2iQf2ZK5gZZO2', 'PROFESSOR', true);
INSERT INTO public.usuarios VALUES (4, 'Alexandre dos Santos Coqueiro', '20251ITA01GB0029', '$2b$10$5e8uRtdkyXCuju7yGmox5u9LvmyK3I.yUlStT.Aw2iQf2ZK5gZZO2', 'ESTUDANTE', true);
INSERT INTO public.usuarios VALUES (5, 'Anthony Leite Santana', '20251ITA01GB0021', '$2b$10$5e8uRtdkyXCuju7yGmox5u9LvmyK3I.yUlStT.Aw2iQf2ZK5gZZO2', 'ESTUDANTE', true);
INSERT INTO public.usuarios VALUES (32, 'Amilly Moreira Nolasco', '20241ITA01GB0003', '$2b$10$5e8uRtdkyXCuju7yGmox5u9LvmyK3I.yUlStT.Aw2iQf2ZK5gZZO2', 'ESTUDANTE', true);
INSERT INTO public.usuarios VALUES (33, 'Luan Rikelmo Santana Cordeiro', '20241ITA01GB0042', '$2b$10$5e8uRtdkyXCuju7yGmox5u9LvmyK3I.yUlStT.Aw2iQf2ZK5gZZO2', 'ESTUDANTE', true);
INSERT INTO public.usuarios VALUES (34, 'Michel Júnior Ferreira', '20241ITA01GB0037', '$2b$10$5e8uRtdkyXCuju7yGmox5u9LvmyK3I.yUlStT.Aw2iQf2ZK5gZZO2', 'ESTUDANTE', true);
INSERT INTO public.usuarios VALUES (35, 'Murillo Santos Lima', '20241ITA01GB0008', '$2b$10$5e8uRtdkyXCuju7yGmox5u9LvmyK3I.yUlStT.Aw2iQf2ZK5gZZO2', 'ESTUDANTE', true);
INSERT INTO public.usuarios VALUES (36, 'Pedro Lucca Pires Lima e Silva', '20221ITA01GB0014', '$2b$10$5e8uRtdkyXCuju7yGmox5u9LvmyK3I.yUlStT.Aw2iQf2ZK5gZZO2', 'ESTUDANTE', true);
INSERT INTO public.usuarios VALUES (37, 'Vinicius Morais Viana de Sá', '20221ITA01GB0007', '$2b$10$5e8uRtdkyXCuju7yGmox5u9LvmyK3I.yUlStT.Aw2iQf2ZK5gZZO2', 'ESTUDANTE', true);
INSERT INTO public.usuarios VALUES (53, 'Bruno Sousa da Silva', '20211ITA01GB0004', '$2b$10$5e8uRtdkyXCuju7yGmox5u9LvmyK3I.yUlStT.Aw2iQf2ZK5gZZO2', 'ESTUDANTE', true);
INSERT INTO public.usuarios VALUES (54, 'Crístian Batista Souto', '20231ITA01GB0027', '$2b$10$5e8uRtdkyXCuju7yGmox5u9LvmyK3I.yUlStT.Aw2iQf2ZK5gZZO2', 'ESTUDANTE', true);
INSERT INTO public.usuarios VALUES (55, 'Cristyan Alves de Oliveira Almeida', '20241ITA01GB0012', '$2b$10$5e8uRtdkyXCuju7yGmox5u9LvmyK3I.yUlStT.Aw2iQf2ZK5gZZO2', 'ESTUDANTE', true);
INSERT INTO public.usuarios VALUES (56, 'Eduardo Leite Lapa Canguçu', '20241ITA01GB0020', '$2b$10$5e8uRtdkyXCuju7yGmox5u9LvmyK3I.yUlStT.Aw2iQf2ZK5gZZO2', 'ESTUDANTE', true);
INSERT INTO public.usuarios VALUES (57, 'Eloiza Pereira Silva', '20241ITA01GB0029', '$2b$10$5e8uRtdkyXCuju7yGmox5u9LvmyK3I.yUlStT.Aw2iQf2ZK5gZZO2', 'ESTUDANTE', true);
INSERT INTO public.usuarios VALUES (58, 'Guilherme Dias do Nascimento', '20241ITA01GB0002', '$2b$10$5e8uRtdkyXCuju7yGmox5u9LvmyK3I.yUlStT.Aw2iQf2ZK5gZZO2', 'ESTUDANTE', true);
INSERT INTO public.usuarios VALUES (60, 'Juan Pablo de Aquino Salgado', '20241ITA01GB0004', '$2b$10$5e8uRtdkyXCuju7yGmox5u9LvmyK3I.yUlStT.Aw2iQf2ZK5gZZO2', 'ESTUDANTE', true);
INSERT INTO public.usuarios VALUES (14, 'Lucas Santos Alves', '20251ITA01GB0010', '$2b$10$5e8uRtdkyXCuju7yGmox5u9LvmyK3I.yUlStT.Aw2iQf2ZK5gZZO2', 'ESTUDANTE', true);
INSERT INTO public.usuarios VALUES (15, 'Maria Eduarda Soares Andrade', '20251ITA01GB0030', '$2b$10$5e8uRtdkyXCuju7yGmox5u9LvmyK3I.yUlStT.Aw2iQf2ZK5gZZO2', 'ESTUDANTE', true);
INSERT INTO public.usuarios VALUES (59, 'Hugo Santos Barros', '20241ITA01GB0014', '$2b$10$5e8uRtdkyXCuju7yGmox5u9LvmyK3I.yUlStT.Aw2iQf2ZK5gZZO2', 'ESTUDANTE', true);
INSERT INTO public.usuarios VALUES (39, 'Alison Ferreira dos Santos', '20241ITA01GB0025', '$2b$10$5e8uRtdkyXCuju7yGmox5u9LvmyK3I.yUlStT.Aw2iQf2ZK5gZZO2', 'ESTUDANTE', true);
INSERT INTO public.usuarios VALUES (40, 'Ellen Costa Cardoso', '20241ITA01GB0021', '$2b$10$5e8uRtdkyXCuju7yGmox5u9LvmyK3I.yUlStT.Aw2iQf2ZK5gZZO2', 'ESTUDANTE', true);
INSERT INTO public.usuarios VALUES (41, 'Ney Aldrin Caldas Lima', '20241ITA01GB0040', '$2b$10$5e8uRtdkyXCuju7yGmox5u9LvmyK3I.yUlStT.Aw2iQf2ZK5gZZO2', 'ESTUDANTE', true);
INSERT INTO public.usuarios VALUES (42, 'Sarah Santos Braga Souza', '20241ITA01GB0018', '$2b$10$5e8uRtdkyXCuju7yGmox5u9LvmyK3I.yUlStT.Aw2iQf2ZK5gZZO2', 'ESTUDANTE', true);
INSERT INTO public.usuarios VALUES (44, 'Daniel Sampaio Rocha', '20221ITA01GB0012', '$2b$10$5e8uRtdkyXCuju7yGmox5u9LvmyK3I.yUlStT.Aw2iQf2ZK5gZZO2', 'ESTUDANTE', true);
INSERT INTO public.usuarios VALUES (47, 'Antonio Cesar Souza dos Santos', '@prof.antonio', '$2b$10$5e8uRtdkyXCuju7yGmox5u9LvmyK3I.yUlStT.Aw2iQf2ZK5gZZO2', 'PROFESSOR', true);
INSERT INTO public.usuarios VALUES (43, 'Camila Fonseca Lopes Brandao', '@prof.camilafonseca', '$2b$10$5e8uRtdkyXCuju7yGmox5u9LvmyK3I.yUlStT.Aw2iQf2ZK5gZZO2', 'PROFESSOR', true);
INSERT INTO public.usuarios VALUES (45, 'Kauan Vasconcelos Gomes', '20241ITA01GB0015', '$2b$10$5e8uRtdkyXCuju7yGmox5u9LvmyK3I.yUlStT.Aw2iQf2ZK5gZZO2', 'ESTUDANTE', true);
INSERT INTO public.usuarios VALUES (46, 'Kauã Santos Souza', '20221ITA01GB0018', '$2b$10$5e8uRtdkyXCuju7yGmox5u9LvmyK3I.yUlStT.Aw2iQf2ZK5gZZO2', 'ESTUDANTE', true);
INSERT INTO public.usuarios VALUES (24, 'Samuel Cotrim Santos Luz', '20251ITA01GB0017', '$2b$10$5e8uRtdkyXCuju7yGmox5u9LvmyK3I.yUlStT.Aw2iQf2ZK5gZZO2', 'ESTUDANTE', true);
INSERT INTO public.usuarios VALUES (25, 'Tales Veríssimo Mota', '20251ITA01GB0018', '$2b$10$5e8uRtdkyXCuju7yGmox5u9LvmyK3I.yUlStT.Aw2iQf2ZK5gZZO2', 'ESTUDANTE', true);
INSERT INTO public.usuarios VALUES (26, 'Túlio Silva Sotero', '20251ITA01GB0020', '$2b$10$5e8uRtdkyXCuju7yGmox5u9LvmyK3I.yUlStT.Aw2iQf2ZK5gZZO2', 'ESTUDANTE', true);
INSERT INTO public.usuarios VALUES (27, 'Willem Moreira de Araújo', '20251ITA01GB0039', '$2b$10$5e8uRtdkyXCuju7yGmox5u9LvmyK3I.yUlStT.Aw2iQf2ZK5gZZO2', 'ESTUDANTE', true);
INSERT INTO public.usuarios VALUES (29, 'Camila Nunes Duarte Silveira', '@prof.camilanunes', '$2b$10$5e8uRtdkyXCuju7yGmox5u9LvmyK3I.yUlStT.Aw2iQf2ZK5gZZO2', 'PROFESSOR', true);
INSERT INTO public.usuarios VALUES (28, 'Ycaro Vagner Rocha Pereira', '20251ITA01GB0037', '$2b$10$5e8uRtdkyXCuju7yGmox5u9LvmyK3I.yUlStT.Aw2iQf2ZK5gZZO2', 'ESTUDANTE', true);
INSERT INTO public.usuarios VALUES (31, 'Fabricio Pereira da Silva', '@prof.fabricio', '$2b$10$5e8uRtdkyXCuju7yGmox5u9LvmyK3I.yUlStT.Aw2iQf2ZK5gZZO2', 'PROFESSOR', true);
INSERT INTO public.usuarios VALUES (50, 'Francisco Helio de Oliveira', '@prof.helio', '$2b$10$5e8uRtdkyXCuju7yGmox5u9LvmyK3I.yUlStT.Aw2iQf2ZK5gZZO2', 'PROFESSOR', true);
INSERT INTO public.usuarios VALUES (30, 'Lays Silva Santos', '@prof.lays', '$2b$10$5e8uRtdkyXCuju7yGmox5u9LvmyK3I.yUlStT.Aw2iQf2ZK5gZZO2', 'PROFESSOR', true);
INSERT INTO public.usuarios VALUES (48, 'Ígor Dias Campos', '20221ITA01GB0011', '$2b$10$5e8uRtdkyXCuju7yGmox5u9LvmyK3I.yUlStT.Aw2iQf2ZK5gZZO2', 'ESTUDANTE', true);
INSERT INTO public.usuarios VALUES (49, 'Rhyan Matheus Grisante dos Santos', '20251ITA01GB0027', '$2b$10$5e8uRtdkyXCuju7yGmox5u9LvmyK3I.yUlStT.Aw2iQf2ZK5gZZO2', 'ESTUDANTE', true);
INSERT INTO public.usuarios VALUES (51, 'Antônio Paulo Pinto Lima Silva', '20241ITA01GB0001', '$2b$10$5e8uRtdkyXCuju7yGmox5u9LvmyK3I.yUlStT.Aw2iQf2ZK5gZZO2', 'ESTUDANTE', true);
INSERT INTO public.usuarios VALUES (52, 'Arthur dos Santos Coqueiro', '20211ITA01GB0037', '$2b$10$5e8uRtdkyXCuju7yGmox5u9LvmyK3I.yUlStT.Aw2iQf2ZK5gZZO2', 'ESTUDANTE', true);
INSERT INTO public.usuarios VALUES (17, 'Pedro Henrique Gomes Oliveira Pereira', '20251ITA01GB0022', '$2b$10$5e8uRtdkyXCuju7yGmox5u9LvmyK3I.yUlStT.Aw2iQf2ZK5gZZO2', 'ESTUDANTE', true);
INSERT INTO public.usuarios VALUES (65, 'Eber Chagas Santos', '@prof.eber', '$2b$10$5e8uRtdkyXCuju7yGmox5u9LvmyK3I.yUlStT.Aw2iQf2ZK5gZZO2', 'PROFESSOR', true);
INSERT INTO public.usuarios VALUES (66, 'Gisele Bonfim Lima Pacheco', '@prof.gisele', '$2b$10$5e8uRtdkyXCuju7yGmox5u9LvmyK3I.yUlStT.Aw2iQf2ZK5gZZO2', 'PROFESSOR', true);
INSERT INTO public.usuarios VALUES (76, 'Heverton Santos Queiroz', '@prof.heverton', '$2b$10$5e8uRtdkyXCuju7yGmox5u9LvmyK3I.yUlStT.Aw2iQf2ZK5gZZO2', 'PROFESSOR', true);
INSERT INTO public.usuarios VALUES (72, 'Diogo Carneiro Limeira', '20231ITA01GB0006', '$2b$10$5e8uRtdkyXCuju7yGmox5u9LvmyK3I.yUlStT.Aw2iQf2ZK5gZZO2', 'ESTUDANTE', true);
INSERT INTO public.usuarios VALUES (73, 'Ryan Araújo Veiga Freitas', '20231ITA01GB0022', '$2b$10$5e8uRtdkyXCuju7yGmox5u9LvmyK3I.yUlStT.Aw2iQf2ZK5gZZO2', 'ESTUDANTE', true);
INSERT INTO public.usuarios VALUES (77, 'Almerinda de Araújo Gomes Rocha', '20231ITA01GB0014', '$2b$10$5e8uRtdkyXCuju7yGmox5u9LvmyK3I.yUlStT.Aw2iQf2ZK5gZZO2', 'ESTUDANTE', true);
INSERT INTO public.usuarios VALUES (78, 'Breno Gomes Pires de Oliveira', '20231ITA01GB0015', '$2b$10$5e8uRtdkyXCuju7yGmox5u9LvmyK3I.yUlStT.Aw2iQf2ZK5gZZO2', 'ESTUDANTE', true);
INSERT INTO public.usuarios VALUES (6, 'Arthur Lima Freire da Silva', '20251ITA01GB0026', '$2b$10$5e8uRtdkyXCuju7yGmox5u9LvmyK3I.yUlStT.Aw2iQf2ZK5gZZO2', 'ESTUDANTE', true);
INSERT INTO public.usuarios VALUES (20, 'Raul Teixeira Trindade', '20251ITA01GB0015', '$2b$10$5e8uRtdkyXCuju7yGmox5u9LvmyK3I.yUlStT.Aw2iQf2ZK5gZZO2', 'ESTUDANTE', true);
INSERT INTO public.usuarios VALUES (21, 'Riquelme de Jesus Ferreira', '20251ITA01GB0014', '$2b$10$5e8uRtdkyXCuju7yGmox5u9LvmyK3I.yUlStT.Aw2iQf2ZK5gZZO2', 'ESTUDANTE', true);
INSERT INTO public.usuarios VALUES (22, 'Ruan dos Santos Oliveira', '20251ITA01GB0016', '$2b$10$5e8uRtdkyXCuju7yGmox5u9LvmyK3I.yUlStT.Aw2iQf2ZK5gZZO2', 'ESTUDANTE', true);
INSERT INTO public.usuarios VALUES (23, 'Ryan Limoeiro Miranda', '20251ITA01GB0035', '$2b$10$5e8uRtdkyXCuju7yGmox5u9LvmyK3I.yUlStT.Aw2iQf2ZK5gZZO2', 'ESTUDANTE', true);
INSERT INTO public.usuarios VALUES (61, 'Leonardo Abrantes Santos', '20241ITA01GB0005', '$2b$10$5e8uRtdkyXCuju7yGmox5u9LvmyK3I.yUlStT.Aw2iQf2ZK5gZZO2', 'ESTUDANTE', true);
INSERT INTO public.usuarios VALUES (62, 'Matheus Lucas Campos', '20241ITA01GB0032', '$2b$10$5e8uRtdkyXCuju7yGmox5u9LvmyK3I.yUlStT.Aw2iQf2ZK5gZZO2', 'ESTUDANTE', true);
INSERT INTO public.usuarios VALUES (63, 'Ruan Rocha Carvalho Dutra', '20241ITA01GB0009', '$2b$10$5e8uRtdkyXCuju7yGmox5u9LvmyK3I.yUlStT.Aw2iQf2ZK5gZZO2', 'ESTUDANTE', true);
INSERT INTO public.usuarios VALUES (64, 'Ycaro Batista da Mota', '20241ITA01GB0011', '$2b$10$5e8uRtdkyXCuju7yGmox5u9LvmyK3I.yUlStT.Aw2iQf2ZK5gZZO2', 'ESTUDANTE', true);
INSERT INTO public.usuarios VALUES (67, 'Emanuel Brito da Silva', '20211ITA01GB0017', '$2b$10$5e8uRtdkyXCuju7yGmox5u9LvmyK3I.yUlStT.Aw2iQf2ZK5gZZO2', 'ESTUDANTE', true);
INSERT INTO public.usuarios VALUES (68, 'Israel Freire dos Santos', '20231ITA01GB0005', '$2b$10$5e8uRtdkyXCuju7yGmox5u9LvmyK3I.yUlStT.Aw2iQf2ZK5gZZO2', 'ESTUDANTE', true);
INSERT INTO public.usuarios VALUES (7, 'Fernanda Campos Vieira', '20251ITA01GB0031', '$2b$10$5e8uRtdkyXCuju7yGmox5u9LvmyK3I.yUlStT.Aw2iQf2ZK5gZZO2', 'ESTUDANTE', true);
INSERT INTO public.usuarios VALUES (8, 'Guilherme Carlos da Silva dos Santos', '20251ITA01GB0004', '$2b$10$5e8uRtdkyXCuju7yGmox5u9LvmyK3I.yUlStT.Aw2iQf2ZK5gZZO2', 'ESTUDANTE', true);
INSERT INTO public.usuarios VALUES (9, 'Guilherme Moreira Dias', '20251ITA01GB0038', '$2b$10$5e8uRtdkyXCuju7yGmox5u9LvmyK3I.yUlStT.Aw2iQf2ZK5gZZO2', 'ESTUDANTE', true);
INSERT INTO public.usuarios VALUES (10, 'Gustavo Lima Coqueiro', '20251ITA01GB0005', '$2b$10$5e8uRtdkyXCuju7yGmox5u9LvmyK3I.yUlStT.Aw2iQf2ZK5gZZO2', 'ESTUDANTE', true);
INSERT INTO public.usuarios VALUES (11, 'Henrique Alves Araujo', '20251ITA01GB0006', '$2b$10$5e8uRtdkyXCuju7yGmox5u9LvmyK3I.yUlStT.Aw2iQf2ZK5gZZO2', 'ESTUDANTE', true);
INSERT INTO public.usuarios VALUES (12, 'Higor Amarante Barbosa', '20251ITA01GB0025', '$2b$10$5e8uRtdkyXCuju7yGmox5u9LvmyK3I.yUlStT.Aw2iQf2ZK5gZZO2', 'ESTUDANTE', true);
INSERT INTO public.usuarios VALUES (13, 'Kauan Silva Oliveira', '20251ITA01GB0032', '$2b$10$5e8uRtdkyXCuju7yGmox5u9LvmyK3I.yUlStT.Aw2iQf2ZK5gZZO2', 'ESTUDANTE', true);
INSERT INTO public.usuarios VALUES (83, 'Fabio dos Santos Lima', '@prof.fabio', '$2b$10$5e8uRtdkyXCuju7yGmox5u9LvmyK3I.yUlStT.Aw2iQf2ZK5gZZO2', 'PROFESSOR', true);
INSERT INTO public.usuarios VALUES (71, 'Hudson Barros Oliveira', '@prof.hudsonbarros', '$2b$10$5e8uRtdkyXCuju7yGmox5u9LvmyK3I.yUlStT.Aw2iQf2ZK5gZZO2', 'PROFESSOR', true);
INSERT INTO public.usuarios VALUES (1, 'Henrique Fontoura Alves de Araújo', '20221ITA01GB0006', '$2b$10$5e8uRtdkyXCuju7yGmox5u9LvmyK3I.yUlStT.Aw2iQf2ZK5gZZO2', 'ESTUDANTE', true);
INSERT INTO public.usuarios VALUES (16, 'Pedro Carlos Fernandes Nascimento', '20251ITA01GB0036', '$2b$10$5e8uRtdkyXCuju7yGmox5u9LvmyK3I.yUlStT.Aw2iQf2ZK5gZZO2', 'ESTUDANTE', true);
INSERT INTO public.usuarios VALUES (18, 'Pedro Lucas Oliveira Pedroso', '20251ITA01GB0012', '$2b$10$5e8uRtdkyXCuju7yGmox5u9LvmyK3I.yUlStT.Aw2iQf2ZK5gZZO2', 'ESTUDANTE', true);
INSERT INTO public.usuarios VALUES (19, 'Plínio Reisdorfer Neto', '20251ITA01GB0013', '$2b$10$5e8uRtdkyXCuju7yGmox5u9LvmyK3I.yUlStT.Aw2iQf2ZK5gZZO2', 'ESTUDANTE', true);
INSERT INTO public.usuarios VALUES (69, 'Leonardo de Oliveira Silva', '20241ITA01GB0033', '$2b$10$5e8uRtdkyXCuju7yGmox5u9LvmyK3I.yUlStT.Aw2iQf2ZK5gZZO2', 'ESTUDANTE', true);
INSERT INTO public.usuarios VALUES (70, 'Tainá Barreto da Silva', '20211ITA01GB0013', '$2b$10$5e8uRtdkyXCuju7yGmox5u9LvmyK3I.yUlStT.Aw2iQf2ZK5gZZO2', 'ESTUDANTE', true);
INSERT INTO public.usuarios VALUES (79, 'Roberto Guimarães Santos', '20231ITA01GB0019', '$2b$10$5e8uRtdkyXCuju7yGmox5u9LvmyK3I.yUlStT.Aw2iQf2ZK5gZZO2', 'ESTUDANTE', true);
INSERT INTO public.usuarios VALUES (80, 'Silas Correia Leite da Silva', '20231ITA01GB0008', '$2b$10$5e8uRtdkyXCuju7yGmox5u9LvmyK3I.yUlStT.Aw2iQf2ZK5gZZO2', 'ESTUDANTE', true);
INSERT INTO public.usuarios VALUES (81, 'Werner Gomes Pires de Oliveira', '20231ITA01GB0016', '$2b$10$5e8uRtdkyXCuju7yGmox5u9LvmyK3I.yUlStT.Aw2iQf2ZK5gZZO2', 'ESTUDANTE', true);
INSERT INTO public.usuarios VALUES (82, 'Felipe Moreira Mares', '20211ITA01GB0007', '$2b$10$5e8uRtdkyXCuju7yGmox5u9LvmyK3I.yUlStT.Aw2iQf2ZK5gZZO2', 'ESTUDANTE', true);
INSERT INTO public.usuarios VALUES (84, 'Amanda Tavares Santos', '20221ITA01GB0001', '$2b$10$5e8uRtdkyXCuju7yGmox5u9LvmyK3I.yUlStT.Aw2iQf2ZK5gZZO2', 'ESTUDANTE', true);
INSERT INTO public.usuarios VALUES (85, 'Henrique da Silva dos Santos', '20221ITA01GB0032', '$2b$10$5e8uRtdkyXCuju7yGmox5u9LvmyK3I.yUlStT.Aw2iQf2ZK5gZZO2', 'ESTUDANTE', true);
INSERT INTO public.usuarios VALUES (86, 'Chaielle Emille Souza Brandão', '20221ITA01GB0015', '$2b$10$5e8uRtdkyXCuju7yGmox5u9LvmyK3I.yUlStT.Aw2iQf2ZK5gZZO2', 'ESTUDANTE', true);
INSERT INTO public.usuarios VALUES (87, 'Geovanna Alves dos Santos', '20211ITA01GB0041', '$2b$10$5e8uRtdkyXCuju7yGmox5u9LvmyK3I.yUlStT.Aw2iQf2ZK5gZZO2', 'ESTUDANTE', true);
INSERT INTO public.usuarios VALUES (88, 'Leonardo Carvalho de Melo Barreto', '20221ITA01GB0008', '$2b$10$5e8uRtdkyXCuju7yGmox5u9LvmyK3I.yUlStT.Aw2iQf2ZK5gZZO2', 'ESTUDANTE', true);
INSERT INTO public.usuarios VALUES (95, 'Hudson Antonio Alves da Silva', '@prof.hudsonantonio', '$2b$10$5e8uRtdkyXCuju7yGmox5u9LvmyK3I.yUlStT.Aw2iQf2ZK5gZZO2', 'PROFESSOR', true);
INSERT INTO public.usuarios VALUES (91, 'Roberta Mercia Rodrigues de Oliveira', '@prof.roberta', '$2b$10$5e8uRtdkyXCuju7yGmox5u9LvmyK3I.yUlStT.Aw2iQf2ZK5gZZO2', 'PROFESSOR', true);
INSERT INTO public.usuarios VALUES (89, 'Maria Fernanda Fernandes de Souza', '20221ITA01GB0004', '$2b$10$5e8uRtdkyXCuju7yGmox5u9LvmyK3I.yUlStT.Aw2iQf2ZK5gZZO2', 'ESTUDANTE', true);
INSERT INTO public.usuarios VALUES (90, 'Natanael dos Santos Gonçalves', '20221ITA01GB0003', '$2b$10$5e8uRtdkyXCuju7yGmox5u9LvmyK3I.yUlStT.Aw2iQf2ZK5gZZO2', 'ESTUDANTE', true);
INSERT INTO public.usuarios VALUES (92, 'Adimael Santos da Silva', '20211ITA01GB0034', '$2b$10$5e8uRtdkyXCuju7yGmox5u9LvmyK3I.yUlStT.Aw2iQf2ZK5gZZO2', 'ESTUDANTE', true);
INSERT INTO public.usuarios VALUES (93, 'Bruno Flores Silva', '20221ITA01GB0009', '$2b$10$5e8uRtdkyXCuju7yGmox5u9LvmyK3I.yUlStT.Aw2iQf2ZK5gZZO2', 'ESTUDANTE', true);
INSERT INTO public.usuarios VALUES (94, 'Hércules da Silva Santos', '20221ITA01GB0028', '$2b$10$5e8uRtdkyXCuju7yGmox5u9LvmyK3I.yUlStT.Aw2iQf2ZK5gZZO2', 'ESTUDANTE', true);


--
-- TOC entry 5071 (class 0 OID 0)
-- Dependencies: 229
-- Name: atividades_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.atividades_id_seq', 1, false);


--
-- TOC entry 5072 (class 0 OID 0)
-- Dependencies: 231
-- Name: comunicados_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.comunicados_id_seq', 1, false);


--
-- TOC entry 5073 (class 0 OID 0)
-- Dependencies: 239
-- Name: comunicados_mural_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.comunicados_mural_id_seq', 1, true);


--
-- TOC entry 5074 (class 0 OID 0)
-- Dependencies: 225
-- Name: disciplinas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.disciplinas_id_seq', 1, false);


--
-- TOC entry 5075 (class 0 OID 0)
-- Dependencies: 235
-- Name: horarios_aula_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.horarios_aula_id_seq', 85, true);


--
-- TOC entry 5076 (class 0 OID 0)
-- Dependencies: 237
-- Name: materiais_aula_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.materiais_aula_id_seq', 1, false);


--
-- TOC entry 5077 (class 0 OID 0)
-- Dependencies: 227
-- Name: matriculas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.matriculas_id_seq', 383, true);


--
-- TOC entry 5078 (class 0 OID 0)
-- Dependencies: 241
-- Name: submissoes_avaliacoes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.submissoes_avaliacoes_id_seq', 1, false);


--
-- TOC entry 5079 (class 0 OID 0)
-- Dependencies: 233
-- Name: tarefas_privadas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tarefas_privadas_id_seq', 26, true);


--
-- TOC entry 5080 (class 0 OID 0)
-- Dependencies: 221
-- Name: usuarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuarios_id_seq', 95, true);


--
-- TOC entry 4854 (class 2606 OID 24672)
-- Name: avaliacoes atividades_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.avaliacoes
    ADD CONSTRAINT atividades_pkey PRIMARY KEY (id);


--
-- TOC entry 4867 (class 2606 OID 32962)
-- Name: comunicados_mural comunicados_mural_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comunicados_mural
    ADD CONSTRAINT comunicados_mural_pkey PRIMARY KEY (id);


--
-- TOC entry 4857 (class 2606 OID 24692)
-- Name: comunicados comunicados_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comunicados
    ADD CONSTRAINT comunicados_pkey PRIMARY KEY (id);


--
-- TOC entry 4844 (class 2606 OID 24631)
-- Name: disciplinas disciplinas_codigo_turma_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.disciplinas
    ADD CONSTRAINT disciplinas_codigo_turma_key UNIQUE (codigo_turma);


--
-- TOC entry 4846 (class 2606 OID 24629)
-- Name: disciplinas disciplinas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.disciplinas
    ADD CONSTRAINT disciplinas_pkey PRIMARY KEY (id);


--
-- TOC entry 4849 (class 2606 OID 24648)
-- Name: matriculas estudante_disciplina_unico; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.matriculas
    ADD CONSTRAINT estudante_disciplina_unico UNIQUE (estudante_id, disciplina_id);


--
-- TOC entry 4840 (class 2606 OID 24602)
-- Name: estudantes estudantes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estudantes
    ADD CONSTRAINT estudantes_pkey PRIMARY KEY (usuario_id);


--
-- TOC entry 4863 (class 2606 OID 32925)
-- Name: horarios_aula horarios_aula_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.horarios_aula
    ADD CONSTRAINT horarios_aula_pkey PRIMARY KEY (id);


--
-- TOC entry 4865 (class 2606 OID 32943)
-- Name: materiais_aula materiais_aula_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.materiais_aula
    ADD CONSTRAINT materiais_aula_pkey PRIMARY KEY (id);


--
-- TOC entry 4852 (class 2606 OID 24646)
-- Name: matriculas matriculas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.matriculas
    ADD CONSTRAINT matriculas_pkey PRIMARY KEY (id);


--
-- TOC entry 4842 (class 2606 OID 24613)
-- Name: professores professores_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.professores
    ADD CONSTRAINT professores_pkey PRIMARY KEY (usuario_id);


--
-- TOC entry 4871 (class 2606 OID 33017)
-- Name: submissoes_avaliacoes submissao_estudante_avaliacao_unica; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.submissoes_avaliacoes
    ADD CONSTRAINT submissao_estudante_avaliacao_unica UNIQUE (avaliacao_id, estudante_id);


--
-- TOC entry 4873 (class 2606 OID 33015)
-- Name: submissoes_avaliacoes submissoes_avaliacoes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.submissoes_avaliacoes
    ADD CONSTRAINT submissoes_avaliacoes_pkey PRIMARY KEY (id);


--
-- TOC entry 4861 (class 2606 OID 24710)
-- Name: tarefas_privadas tarefas_privadas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tarefas_privadas
    ADD CONSTRAINT tarefas_privadas_pkey PRIMARY KEY (id);


--
-- TOC entry 4836 (class 2606 OID 24596)
-- Name: usuarios usuarios_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_email_key UNIQUE (matricula_siape);


--
-- TOC entry 4838 (class 2606 OID 24594)
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);


--
-- TOC entry 4855 (class 1259 OID 24719)
-- Name: idx_atividades_disciplina; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_atividades_disciplina ON public.avaliacoes USING btree (disciplina_id);


--
-- TOC entry 4858 (class 1259 OID 24720)
-- Name: idx_comunicados_disciplina; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_comunicados_disciplina ON public.comunicados USING btree (disciplina_id);


--
-- TOC entry 4847 (class 1259 OID 24717)
-- Name: idx_disciplinas_professor; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_disciplinas_professor ON public.disciplinas USING btree (professor_id);


--
-- TOC entry 4850 (class 1259 OID 24718)
-- Name: idx_matriculas_estudante; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_matriculas_estudante ON public.matriculas USING btree (estudante_id);


--
-- TOC entry 4868 (class 1259 OID 33028)
-- Name: idx_submissoes_avaliacao; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_submissoes_avaliacao ON public.submissoes_avaliacoes USING btree (avaliacao_id);


--
-- TOC entry 4869 (class 1259 OID 33029)
-- Name: idx_submissoes_estudante; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_submissoes_estudante ON public.submissoes_avaliacoes USING btree (estudante_id);


--
-- TOC entry 4859 (class 1259 OID 24721)
-- Name: idx_tarefas_estudante; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_tarefas_estudante ON public.tarefas_privadas USING btree (estudante_id);


--
-- TOC entry 4834 (class 1259 OID 24716)
-- Name: idx_usuarios_email; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_usuarios_email ON public.usuarios USING btree (matricula_siape);


--
-- TOC entry 4879 (class 2606 OID 24673)
-- Name: avaliacoes atividades_disciplina_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.avaliacoes
    ADD CONSTRAINT atividades_disciplina_id_fkey FOREIGN KEY (disciplina_id) REFERENCES public.disciplinas(id) ON DELETE CASCADE;


--
-- TOC entry 4880 (class 2606 OID 24693)
-- Name: comunicados comunicados_disciplina_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comunicados
    ADD CONSTRAINT comunicados_disciplina_id_fkey FOREIGN KEY (disciplina_id) REFERENCES public.disciplinas(id) ON DELETE CASCADE;


--
-- TOC entry 4884 (class 2606 OID 32963)
-- Name: comunicados_mural comunicados_mural_disciplina_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comunicados_mural
    ADD CONSTRAINT comunicados_mural_disciplina_id_fkey FOREIGN KEY (disciplina_id) REFERENCES public.disciplinas(id) ON DELETE CASCADE;


--
-- TOC entry 4876 (class 2606 OID 24632)
-- Name: disciplinas disciplinas_professor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.disciplinas
    ADD CONSTRAINT disciplinas_professor_id_fkey FOREIGN KEY (professor_id) REFERENCES public.professores(usuario_id) ON DELETE RESTRICT;


--
-- TOC entry 4874 (class 2606 OID 24603)
-- Name: estudantes estudantes_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estudantes
    ADD CONSTRAINT estudantes_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id) ON DELETE CASCADE;


--
-- TOC entry 4885 (class 2606 OID 33018)
-- Name: submissoes_avaliacoes fk_submissao_avaliacao; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.submissoes_avaliacoes
    ADD CONSTRAINT fk_submissao_avaliacao FOREIGN KEY (avaliacao_id) REFERENCES public.avaliacoes(id) ON DELETE CASCADE;


--
-- TOC entry 4886 (class 2606 OID 33023)
-- Name: submissoes_avaliacoes fk_submissao_estudante; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.submissoes_avaliacoes
    ADD CONSTRAINT fk_submissao_estudante FOREIGN KEY (estudante_id) REFERENCES public.estudantes(usuario_id) ON DELETE CASCADE;


--
-- TOC entry 4882 (class 2606 OID 32926)
-- Name: horarios_aula horarios_aula_disciplina_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.horarios_aula
    ADD CONSTRAINT horarios_aula_disciplina_id_fkey FOREIGN KEY (disciplina_id) REFERENCES public.disciplinas(id) ON DELETE CASCADE;


--
-- TOC entry 4883 (class 2606 OID 32944)
-- Name: materiais_aula materiais_aula_disciplina_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.materiais_aula
    ADD CONSTRAINT materiais_aula_disciplina_id_fkey FOREIGN KEY (disciplina_id) REFERENCES public.disciplinas(id) ON DELETE CASCADE;


--
-- TOC entry 4877 (class 2606 OID 24654)
-- Name: matriculas matriculas_disciplina_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.matriculas
    ADD CONSTRAINT matriculas_disciplina_id_fkey FOREIGN KEY (disciplina_id) REFERENCES public.disciplinas(id) ON DELETE CASCADE;


--
-- TOC entry 4878 (class 2606 OID 24649)
-- Name: matriculas matriculas_estudante_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.matriculas
    ADD CONSTRAINT matriculas_estudante_id_fkey FOREIGN KEY (estudante_id) REFERENCES public.estudantes(usuario_id) ON DELETE CASCADE;


--
-- TOC entry 4875 (class 2606 OID 24614)
-- Name: professores professores_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.professores
    ADD CONSTRAINT professores_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id) ON DELETE CASCADE;


--
-- TOC entry 4881 (class 2606 OID 24711)
-- Name: tarefas_privadas tarefas_privadas_estudante_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tarefas_privadas
    ADD CONSTRAINT tarefas_privadas_estudante_id_fkey FOREIGN KEY (estudante_id) REFERENCES public.estudantes(usuario_id) ON DELETE CASCADE;


-- Completed on 2026-07-25 13:10:11

--
-- PostgreSQL database dump complete
--

\unrestrict t4SRnXMbuZ2o4kk5hd4KdAqGYS6pJDdKA9QY5dsKKhXs2Vker5jukvmVM6JtKee

