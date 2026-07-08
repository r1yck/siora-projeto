--
-- PostgreSQL database dump
--

\restrict pKtcG9TNXS4Crjhd6I1HteoNIKRURnMpkS2fUV4yOPJHQNIR7JaVwO7upH7HAhY

-- Dumped from database version 18.4
-- Dumped by pg_dump version 18.4

-- Started on 2026-07-08 02:44:08

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
-- TOC entry 867 (class 1247 OID 24578)
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
-- Name: atividades; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.atividades (
    id integer NOT NULL,
    titulo character varying(150) NOT NULL,
    descricao text,
    data_entrega timestamp without time zone NOT NULL,
    local_aula character varying(100) DEFAULT 'Sala Padrão'::character varying,
    disciplina_id integer NOT NULL
);


ALTER TABLE public.atividades OWNER TO postgres;

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
-- TOC entry 5005 (class 0 OID 0)
-- Dependencies: 229
-- Name: atividades_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.atividades_id_seq OWNED BY public.atividades.id;


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
-- TOC entry 5006 (class 0 OID 0)
-- Dependencies: 231
-- Name: comunicados_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.comunicados_id_seq OWNED BY public.comunicados.id;


--
-- TOC entry 226 (class 1259 OID 24620)
-- Name: disciplinas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.disciplinas (
    id integer NOT NULL,
    nome character varying(100) NOT NULL,
    codigo_turma character varying(50) NOT NULL,
    professor_id integer NOT NULL
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
-- TOC entry 5007 (class 0 OID 0)
-- Dependencies: 225
-- Name: disciplinas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.disciplinas_id_seq OWNED BY public.disciplinas.id;


--
-- TOC entry 223 (class 1259 OID 24597)
-- Name: estudantes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.estudantes (
    usuario_id integer NOT NULL
);


ALTER TABLE public.estudantes OWNER TO postgres;

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
-- TOC entry 5008 (class 0 OID 0)
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
-- TOC entry 5009 (class 0 OID 0)
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
    email character varying(100) NOT NULL,
    senha_hash character varying(255) NOT NULL,
    tipo_usuario public.tipo_usuario_enum NOT NULL
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
-- TOC entry 5010 (class 0 OID 0)
-- Dependencies: 221
-- Name: usuarios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;


--
-- TOC entry 4796 (class 2604 OID 24663)
-- Name: atividades id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.atividades ALTER COLUMN id SET DEFAULT nextval('public.atividades_id_seq'::regclass);


--
-- TOC entry 4798 (class 2604 OID 24682)
-- Name: comunicados id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comunicados ALTER COLUMN id SET DEFAULT nextval('public.comunicados_id_seq'::regclass);


--
-- TOC entry 4794 (class 2604 OID 24623)
-- Name: disciplinas id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.disciplinas ALTER COLUMN id SET DEFAULT nextval('public.disciplinas_id_seq'::regclass);


--
-- TOC entry 4795 (class 2604 OID 24641)
-- Name: matriculas id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.matriculas ALTER COLUMN id SET DEFAULT nextval('public.matriculas_id_seq'::regclass);


--
-- TOC entry 4801 (class 2604 OID 24702)
-- Name: tarefas_privadas id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tarefas_privadas ALTER COLUMN id SET DEFAULT nextval('public.tarefas_privadas_id_seq'::regclass);


--
-- TOC entry 4793 (class 2604 OID 24587)
-- Name: usuarios id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);


--
-- TOC entry 4995 (class 0 OID 24660)
-- Dependencies: 230
-- Data for Name: atividades; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.atividades (id, titulo, descricao, data_entrega, local_aula, disciplina_id) FROM stdin;
\.


--
-- TOC entry 4997 (class 0 OID 24679)
-- Dependencies: 232
-- Data for Name: comunicados; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.comunicados (id, titulo, conteudo, data_publicacao, urgente, disciplina_id) FROM stdin;
\.


--
-- TOC entry 4991 (class 0 OID 24620)
-- Dependencies: 226
-- Data for Name: disciplinas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.disciplinas (id, nome, codigo_turma, professor_id) FROM stdin;
54113	Administração e Informática	BEL.0812	3
54114	Filosofia, Ética e Desenvolvimento Humano	BEL.0813	29
54115	Fundamentos de Cálculo	BEL.0810	31
54116	Linguagem de Programação I	BEL.0809	38
54117	Metodologia da Pesquisa Científica	BEL.0814	43
54118	Sistemas Digitais	BEL.0811	47
54119	Análise e Projeto de Sistemas	BEL.0823	50
54120	Banco de Dados II	BEL.0821	65
54121	Fundamentos de Estatística	BEL.0822	66
54122	Humanidade e Cidadania	BEL.0825	29
54123	Prática Curricular de Extensão I	BEL.0826	50
54124	Sistemas Operacionais	BEL.0824	71
54126	Estágio Supervisionado	BEL.0833	38
54127	Gerenciamento de Processos de Negócio	BEL.0837	3
54128	Gerenciamento de Redes	BEL.0835	83
54129	Gestão de Projeto de Software	BEL.0834	47
54130	Prática Curricular de Extensão III	BEL.0838	71
54131	Empreendedorismo e Cooperativismo	BEL.0844	3
54132	Sistema de Apoio à Decisão	BEL.0843	91
54135	Tópicos Avançados em Banco de Dados	BEL.0845	83
54136	Tópicos Avançados em Engenharia de Software	BEL.0855	95
54887	Algoritmos	BEL.0804	65
54134	Desenvolvimento de Jogos	BEL.0850	76
54125	Desenvolvimento para Dispositivos Móveis	BEL.0836	76
54133	Trabalho de Conclusão de Curso II	BEL.0065	91
\.


--
-- TOC entry 4988 (class 0 OID 24597)
-- Dependencies: 223
-- Data for Name: estudantes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.estudantes (usuario_id) FROM stdin;
1
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
32
33
34
35
36
37
39
40
41
42
44
45
46
48
49
51
52
53
54
55
56
57
58
59
60
61
62
63
64
67
68
69
70
72
73
77
78
79
80
81
82
84
85
86
87
88
89
90
92
93
94
\.


--
-- TOC entry 4993 (class 0 OID 24638)
-- Dependencies: 228
-- Data for Name: matriculas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.matriculas (id, estudante_id, disciplina_id) FROM stdin;
5	4	54113
6	5	54113
7	6	54113
8	7	54113
9	8	54113
10	9	54113
11	10	54113
12	11	54113
13	12	54113
14	13	54113
15	14	54113
16	15	54113
17	16	54113
18	17	54113
19	18	54113
20	19	54113
21	20	54113
22	21	54113
23	22	54113
24	23	54113
25	24	54113
26	25	54113
27	26	54113
28	27	54113
29	28	54113
30	4	54114
31	5	54114
32	6	54114
33	7	54114
34	8	54114
35	9	54114
36	10	54114
37	11	54114
38	12	54114
39	13	54114
40	14	54114
41	15	54114
42	16	54114
43	17	54114
44	18	54114
45	19	54114
46	20	54114
47	21	54114
48	22	54114
49	23	54114
50	24	54114
51	25	54114
52	26	54114
53	27	54114
54	28	54114
55	4	54115
56	32	54115
57	5	54115
58	6	54115
59	7	54115
60	8	54115
61	9	54115
62	10	54115
63	11	54115
64	12	54115
65	13	54115
66	33	54115
67	14	54115
68	15	54115
69	34	54115
70	35	54115
71	16	54115
72	17	54115
73	18	54115
74	36	54115
75	19	54115
76	20	54115
77	21	54115
78	22	54115
79	23	54115
80	24	54115
81	25	54115
82	26	54115
83	37	54115
84	27	54115
85	28	54115
86	39	54116
87	32	54116
88	6	54116
89	40	54116
90	7	54116
91	9	54116
92	11	54116
93	12	54116
94	33	54116
95	14	54116
96	15	54116
97	34	54116
98	41	54116
99	17	54116
100	19	54116
101	20	54116
102	21	54116
103	22	54116
104	24	54116
105	42	54116
106	25	54116
107	26	54116
108	27	54116
109	28	54116
110	4	54117
111	39	54117
112	5	54117
113	6	54117
114	44	54117
115	7	54117
116	8	54117
117	9	54117
118	10	54117
119	11	54117
120	12	54117
121	13	54117
122	45	54117
123	46	54117
124	14	54117
125	15	54117
126	35	54117
127	16	54117
128	17	54117
129	18	54117
130	19	54117
131	20	54117
132	21	54117
133	22	54117
134	23	54117
135	24	54117
136	25	54117
137	26	54117
138	37	54117
139	28	54117
140	4	54118
141	5	54118
142	6	54118
143	44	54118
144	7	54118
145	8	54118
146	9	54118
147	10	54118
148	11	54118
149	12	54118
150	48	54118
151	13	54118
152	14	54118
153	15	54118
154	16	54118
155	17	54118
156	18	54118
157	19	54118
158	20	54118
159	49	54118
160	21	54118
161	22	54118
162	23	54118
163	24	54118
164	25	54118
165	26	54118
166	27	54118
167	28	54118
168	51	54119
169	52	54119
170	53	54119
171	54	54119
172	55	54119
173	56	54119
174	57	54119
175	58	54119
176	59	54119
177	48	54119
178	60	54119
179	61	54119
180	62	54119
181	35	54119
182	63	54119
183	64	54119
184	51	54120
185	55	54120
186	56	54120
187	58	54120
188	59	54120
189	60	54120
190	61	54120
191	62	54120
192	63	54120
193	42	54120
194	64	54120
195	32	54121
196	51	54121
197	52	54121
198	55	54121
199	44	54121
200	56	54121
201	57	54121
202	67	54121
203	58	54121
204	59	54121
205	68	54121
206	60	54121
207	45	54121
208	46	54121
209	61	54121
210	69	54121
211	33	54121
212	62	54121
213	34	54121
214	35	54121
215	41	54121
216	63	54121
217	42	54121
218	70	54121
219	32	54122
220	51	54122
221	55	54122
222	56	54122
223	40	54122
224	57	54122
225	58	54122
226	59	54122
227	60	54122
228	45	54122
229	61	54122
230	69	54122
231	33	54122
232	62	54122
233	34	54122
234	35	54122
235	63	54122
236	42	54122
237	64	54122
238	32	54123
239	51	54123
240	55	54123
241	56	54123
242	40	54123
243	57	54123
244	58	54123
245	59	54123
246	60	54123
247	45	54123
248	61	54123
249	69	54123
250	33	54123
251	62	54123
252	34	54123
253	35	54123
254	63	54123
255	42	54123
256	64	54123
257	51	54124
258	54	54124
259	55	54124
260	72	54124
261	56	54124
262	57	54124
263	58	54124
264	59	54124
265	60	54124
266	45	54124
267	61	54124
268	62	54124
269	63	54124
270	73	54124
271	64	54124
283	77	54126
284	72	54126
285	67	54126
286	82	54126
287	68	54126
288	46	54126
289	73	54126
290	77	54127
291	32	54127
292	78	54127
293	54	54127
294	72	54127
295	40	54127
296	12	54127
297	68	54127
298	61	54127
299	69	54127
300	33	54127
301	36	54127
302	79	54127
303	73	54127
304	42	54127
305	80	54127
306	37	54127
307	81	54127
308	28	54127
309	77	54128
310	84	54128
311	78	54128
312	67	54128
313	85	54128
314	46	54128
315	79	54128
316	80	54128
317	77	54129
318	78	54129
319	68	54129
320	79	54129
321	80	54129
322	81	54129
323	77	54130
324	78	54130
325	86	54130
326	54	54130
327	72	54130
328	36	54130
329	79	54130
330	73	54130
331	80	54130
332	37	54130
333	81	54130
334	52	54131
335	44	54131
336	87	54131
337	88	54131
338	89	54131
339	90	54131
340	36	54131
341	70	54131
342	37	54131
343	81	54131
344	92	54132
345	52	54132
346	54	54132
347	44	54132
348	67	54132
349	48	54132
350	46	54132
351	88	54132
352	90	54132
353	36	54132
354	37	54132
355	84	54133
356	93	54133
357	82	54133
358	87	54133
359	85	54133
360	1	54133
361	94	54133
362	88	54133
363	90	54133
371	84	54135
372	87	54135
373	1	54135
374	94	54135
375	90	54135
376	84	54136
377	85	54136
378	4	54887
379	5	54887
380	8	54887
381	10	54887
382	13	54887
383	69	54887
384	16	54887
385	18	54887
386	23	54887
2	1	54134
364	93	54134
365	44	54134
366	82	54134
367	87	54134
368	94	54134
369	88	54134
370	90	54134
3	1	54125
272	77	54125
273	52	54125
274	78	54125
275	53	54125
276	54	54125
277	67	54125
278	68	54125
279	79	54125
280	73	54125
281	80	54125
282	81	54125
\.


--
-- TOC entry 4989 (class 0 OID 24608)
-- Dependencies: 224
-- Data for Name: professores; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.professores (usuario_id) FROM stdin;
3
29
30
31
38
43
47
50
65
66
71
76
83
91
95
\.


--
-- TOC entry 4999 (class 0 OID 24699)
-- Dependencies: 234
-- Data for Name: tarefas_privadas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tarefas_privadas (id, titulo, descricao, data_limite, concluida, estudante_id) FROM stdin;
2	Estudar SQL para a prova de TABD	Revisar comandos DDL, DML e junções	\N	f	1
3	Revisar roteiro do TCC2 com o orientador	Alinhamento da escrita acadêmica	\N	t	1
\.


--
-- TOC entry 4987 (class 0 OID 24584)
-- Dependencies: 222
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuarios (id, nome, email, senha_hash, tipo_usuario) FROM stdin;
3	Samuel Santos Oliveira	prof.samuel@ifbaiano.edu.br		PROFESSOR
4	Alexandre dos Santos Coqueiro	20251ITA01GB0029		ESTUDANTE
5	Anthony Leite Santana	20251ITA01GB0021		ESTUDANTE
6	Arthur Lima Freire da Silva	20251ITA01GB0026		ESTUDANTE
7	Fernanda Campos Vieira	20251ITA01GB0031		ESTUDANTE
8	Guilherme Carlos da Silva dos Santos	20251ITA01GB0004		ESTUDANTE
9	Guilherme Moreira Dias	20251ITA01GB0038		ESTUDANTE
10	Gustavo Lima Coqueiro	20251ITA01GB0005		ESTUDANTE
11	Henrique Alves Araujo	20251ITA01GB0006		ESTUDANTE
12	Higor Amarante Barbosa	20251ITA01GB0025		ESTUDANTE
13	Kauan Silva Oliveira	20251ITA01GB0032		ESTUDANTE
14	Lucas Santos Alves	20251ITA01GB0010		ESTUDANTE
15	Maria Eduarda Soares Andrade	20251ITA01GB0030		ESTUDANTE
16	Pedro Carlos Fernandes Nascimento	20251ITA01GB0036		ESTUDANTE
17	Pedro Henrique Gomes Oliveira Pereira	20251ITA01GB0022		ESTUDANTE
18	Pedro Lucas Oliveira Pedroso	20251ITA01GB0012		ESTUDANTE
19	Plínio Reisdorfer Neto	20251ITA01GB0013		ESTUDANTE
20	Raul Teixeira Trindade	20251ITA01GB0015		ESTUDANTE
21	Riquelme de Jesus Ferreira	20251ITA01GB0014		ESTUDANTE
22	Ruan dos Santos Oliveira	20251ITA01GB0016		ESTUDANTE
23	Ryan Limoeiro Miranda	20251ITA01GB0035		ESTUDANTE
24	Samuel Cotrim Santos Luz	20251ITA01GB0017		ESTUDANTE
25	Tales Veríssimo Mota	20251ITA01GB0018		ESTUDANTE
26	Túlio Silva Sotero	20251ITA01GB0020		ESTUDANTE
27	Willem Moreira de Araújo	20251ITA01GB0039		ESTUDANTE
28	Ycaro Vagner Rocha Pereira	20251ITA01GB0037		ESTUDANTE
29	Camila Nunes Duarte Silveira	prof.camila@ifbaiano.edu.br		PROFESSOR
30	Lays Silva Santos	prof.lays@ifbaiano.edu.br		PROFESSOR
31	Fabricio Pereira da Silva	prof.fabricio@ifbaiano.edu.br		PROFESSOR
32	Amilly Moreira Nolasco	20241ITA01GB0003		ESTUDANTE
33	Luan Rikelmo Santana Cordeiro	20241ITA01GB0042		ESTUDANTE
34	Michel Júnior Ferreira	20241ITA01GB0037		ESTUDANTE
35	Murillo Santos Lima	20241ITA01GB0008		ESTUDANTE
36	Pedro Lucca Pires Lima e Silva	20221ITA01GB0014		ESTUDANTE
37	Vinicius Morais Viana de Sá	20221ITA01GB0007		ESTUDANTE
38	Clesio Rubens de Matos	prof.clesio@ifbaiano.edu.br		PROFESSOR
39	Alison Ferreira dos Santos	20241ITA01GB0025		ESTUDANTE
40	Ellen Costa Cardoso	20241ITA01GB0021		ESTUDANTE
41	Ney Aldrin Caldas Lima	20241ITA01GB0040		ESTUDANTE
42	Sarah Santos Braga Souza	20241ITA01GB0018		ESTUDANTE
43	Camila Fonseca Lopes Brandao	prof.camila.brandao@ifbaiano.edu.br		PROFESSOR
44	Daniel Sampaio Rocha	20221ITA01GB0012		ESTUDANTE
45	Kauan Vasconcelos Gomes	20241ITA01GB0015		ESTUDANTE
46	Kauã Santos Souza	20221ITA01GB0018		ESTUDANTE
47	Antonio Cesar Souza dos Santos	prof.antonio@ifbaiano.edu.br		PROFESSOR
48	Ígor Dias Campos	20221ITA01GB0011		ESTUDANTE
49	Rhyan Matheus Grisante dos Santos	20251ITA01GB0027		ESTUDANTE
50	Francisco Helio de Oliveira	prof.francisco@ifbaiano.edu.br		PROFESSOR
51	Antônio Paulo Pinto Lima Silva	20241ITA01GB0001		ESTUDANTE
52	Arthur dos Santos Coqueiro	20211ITA01GB0037		ESTUDANTE
53	Bruno Sousa da Silva	20211ITA01GB0004		ESTUDANTE
54	Crístian Batista Souto	20231ITA01GB0027		ESTUDANTE
55	Cristyan Alves de Oliveira Almeida	20241ITA01GB0012		ESTUDANTE
56	Eduardo Leite Lapa Canguçu	20241ITA01GB0020		ESTUDANTE
57	Eloiza Pereira Silva	20241ITA01GB0029		ESTUDANTE
58	Guilherme Dias do Nascimento	20241ITA01GB0002		ESTUDANTE
59	Hugo Santos Barros	20241ITA01GB0014		ESTUDANTE
60	Juan Pablo de Aquino Salgado	20241ITA01GB0004		ESTUDANTE
61	Leonardo Abrantes Santos	20241ITA01GB0005		ESTUDANTE
62	Matheus Lucas Campos	20241ITA01GB0032		ESTUDANTE
63	Ruan Rocha Carvalho Dutra	20241ITA01GB0009		ESTUDANTE
64	Ycaro Batista da Mota	20241ITA01GB0011		ESTUDANTE
65	Eber Chagas Santos	prof.eber@ifbaiano.edu.br		PROFESSOR
66	Gisele Bonfim Lima Pacheco	prof.gisele@ifbaiano.edu.br		PROFESSOR
67	Emanuel Brito da Silva	20211ITA01GB0017		ESTUDANTE
68	Israel Freire dos Santos	20231ITA01GB0005		ESTUDANTE
69	Leonardo de Oliveira Silva	20241ITA01GB0033		ESTUDANTE
70	Tainá Barreto da Silva	20211ITA01GB0013		ESTUDANTE
71	Hudson Barros Oliveira	prof.hudson@ifbaiano.edu.br		PROFESSOR
72	Diogo Carneiro Limeira	20231ITA01GB0006		ESTUDANTE
73	Ryan Araújo Veiga Freitas	20231ITA01GB0022		ESTUDANTE
76	Heverton Santos Queiroz	prof.heverton@ifbaiano.edu.br		PROFESSOR
77	Almerinda de Araújo Gomes Rocha	20231ITA01GB0014		ESTUDANTE
78	Breno Gomes Pires de Oliveira	20231ITA01GB0015		ESTUDANTE
1	Henrique Fontoura Alves de Araújo	20221ITA01GB0006		ESTUDANTE
79	Roberto Guimarães Santos	20231ITA01GB0019		ESTUDANTE
80	Silas Correia Leite da Silva	20231ITA01GB0008		ESTUDANTE
81	Werner Gomes Pires de Oliveira	20231ITA01GB0016		ESTUDANTE
82	Felipe Moreira Mares	20211ITA01GB0007		ESTUDANTE
83	Fabio dos Santos Lima	prof.fabio@ifbaiano.edu.br		PROFESSOR
84	Amanda Tavares Santos	20221ITA01GB0001		ESTUDANTE
85	Henrique da Silva dos Santos	20221ITA01GB0032		ESTUDANTE
86	Chaielle Emille Souza Brandão	20221ITA01GB0015		ESTUDANTE
87	Geovanna Alves dos Santos	20211ITA01GB0041		ESTUDANTE
88	Leonardo Carvalho de Melo Barreto	20221ITA01GB0008		ESTUDANTE
89	Maria Fernanda Fernandes de Souza	20221ITA01GB0004		ESTUDANTE
90	Natanael dos Santos Gonçalves	20221ITA01GB0003		ESTUDANTE
91	Roberta Mercia Rodrigues de Oliveira	prof.roberta@ifbaiano.edu.br		PROFESSOR
92	Adimael Santos da Silva	20211ITA01GB0034		ESTUDANTE
93	Bruno Flores Silva	20221ITA01GB0009		ESTUDANTE
94	Hércules da Silva Santos	20221ITA01GB0028		ESTUDANTE
95	Hudson Antonio Alves da Silva	prof.hudson.antonio@ifbaiano.edu.br		PROFESSOR
\.


--
-- TOC entry 5011 (class 0 OID 0)
-- Dependencies: 229
-- Name: atividades_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.atividades_id_seq', 4, true);


--
-- TOC entry 5012 (class 0 OID 0)
-- Dependencies: 231
-- Name: comunicados_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.comunicados_id_seq', 2, true);


--
-- TOC entry 5013 (class 0 OID 0)
-- Dependencies: 225
-- Name: disciplinas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.disciplinas_id_seq', 1, false);


--
-- TOC entry 5014 (class 0 OID 0)
-- Dependencies: 227
-- Name: matriculas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.matriculas_id_seq', 386, true);


--
-- TOC entry 5015 (class 0 OID 0)
-- Dependencies: 233
-- Name: tarefas_privadas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tarefas_privadas_id_seq', 3, true);


--
-- TOC entry 5016 (class 0 OID 0)
-- Dependencies: 221
-- Name: usuarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuarios_id_seq', 95, true);


--
-- TOC entry 4823 (class 2606 OID 24672)
-- Name: atividades atividades_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.atividades
    ADD CONSTRAINT atividades_pkey PRIMARY KEY (id);


--
-- TOC entry 4826 (class 2606 OID 24692)
-- Name: comunicados comunicados_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comunicados
    ADD CONSTRAINT comunicados_pkey PRIMARY KEY (id);


--
-- TOC entry 4813 (class 2606 OID 24631)
-- Name: disciplinas disciplinas_codigo_turma_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.disciplinas
    ADD CONSTRAINT disciplinas_codigo_turma_key UNIQUE (codigo_turma);


--
-- TOC entry 4815 (class 2606 OID 24629)
-- Name: disciplinas disciplinas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.disciplinas
    ADD CONSTRAINT disciplinas_pkey PRIMARY KEY (id);


--
-- TOC entry 4818 (class 2606 OID 24648)
-- Name: matriculas estudante_disciplina_unico; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.matriculas
    ADD CONSTRAINT estudante_disciplina_unico UNIQUE (estudante_id, disciplina_id);


--
-- TOC entry 4809 (class 2606 OID 24602)
-- Name: estudantes estudantes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estudantes
    ADD CONSTRAINT estudantes_pkey PRIMARY KEY (usuario_id);


--
-- TOC entry 4821 (class 2606 OID 24646)
-- Name: matriculas matriculas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.matriculas
    ADD CONSTRAINT matriculas_pkey PRIMARY KEY (id);


--
-- TOC entry 4811 (class 2606 OID 24613)
-- Name: professores professores_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.professores
    ADD CONSTRAINT professores_pkey PRIMARY KEY (usuario_id);


--
-- TOC entry 4830 (class 2606 OID 24710)
-- Name: tarefas_privadas tarefas_privadas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tarefas_privadas
    ADD CONSTRAINT tarefas_privadas_pkey PRIMARY KEY (id);


--
-- TOC entry 4805 (class 2606 OID 24596)
-- Name: usuarios usuarios_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_email_key UNIQUE (email);


--
-- TOC entry 4807 (class 2606 OID 24594)
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);


--
-- TOC entry 4824 (class 1259 OID 24719)
-- Name: idx_atividades_disciplina; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_atividades_disciplina ON public.atividades USING btree (disciplina_id);


--
-- TOC entry 4827 (class 1259 OID 24720)
-- Name: idx_comunicados_disciplina; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_comunicados_disciplina ON public.comunicados USING btree (disciplina_id);


--
-- TOC entry 4816 (class 1259 OID 24717)
-- Name: idx_disciplinas_professor; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_disciplinas_professor ON public.disciplinas USING btree (professor_id);


--
-- TOC entry 4819 (class 1259 OID 24718)
-- Name: idx_matriculas_estudante; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_matriculas_estudante ON public.matriculas USING btree (estudante_id);


--
-- TOC entry 4828 (class 1259 OID 24721)
-- Name: idx_tarefas_estudante; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_tarefas_estudante ON public.tarefas_privadas USING btree (estudante_id);


--
-- TOC entry 4803 (class 1259 OID 24716)
-- Name: idx_usuarios_email; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_usuarios_email ON public.usuarios USING btree (email);


--
-- TOC entry 4836 (class 2606 OID 24673)
-- Name: atividades atividades_disciplina_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.atividades
    ADD CONSTRAINT atividades_disciplina_id_fkey FOREIGN KEY (disciplina_id) REFERENCES public.disciplinas(id) ON DELETE CASCADE;


--
-- TOC entry 4837 (class 2606 OID 24693)
-- Name: comunicados comunicados_disciplina_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comunicados
    ADD CONSTRAINT comunicados_disciplina_id_fkey FOREIGN KEY (disciplina_id) REFERENCES public.disciplinas(id) ON DELETE CASCADE;


--
-- TOC entry 4833 (class 2606 OID 24632)
-- Name: disciplinas disciplinas_professor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.disciplinas
    ADD CONSTRAINT disciplinas_professor_id_fkey FOREIGN KEY (professor_id) REFERENCES public.professores(usuario_id) ON DELETE RESTRICT;


--
-- TOC entry 4831 (class 2606 OID 24603)
-- Name: estudantes estudantes_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estudantes
    ADD CONSTRAINT estudantes_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id) ON DELETE CASCADE;


--
-- TOC entry 4834 (class 2606 OID 24654)
-- Name: matriculas matriculas_disciplina_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.matriculas
    ADD CONSTRAINT matriculas_disciplina_id_fkey FOREIGN KEY (disciplina_id) REFERENCES public.disciplinas(id) ON DELETE CASCADE;


--
-- TOC entry 4835 (class 2606 OID 24649)
-- Name: matriculas matriculas_estudante_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.matriculas
    ADD CONSTRAINT matriculas_estudante_id_fkey FOREIGN KEY (estudante_id) REFERENCES public.estudantes(usuario_id) ON DELETE CASCADE;


--
-- TOC entry 4832 (class 2606 OID 24614)
-- Name: professores professores_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.professores
    ADD CONSTRAINT professores_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id) ON DELETE CASCADE;


--
-- TOC entry 4838 (class 2606 OID 24711)
-- Name: tarefas_privadas tarefas_privadas_estudante_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tarefas_privadas
    ADD CONSTRAINT tarefas_privadas_estudante_id_fkey FOREIGN KEY (estudante_id) REFERENCES public.estudantes(usuario_id) ON DELETE CASCADE;


-- Completed on 2026-07-08 02:44:08

--
-- PostgreSQL database dump complete
--

\unrestrict pKtcG9TNXS4Crjhd6I1HteoNIKRURnMpkS2fUV4yOPJHQNIR7JaVwO7upH7HAhY

