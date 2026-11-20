# Guia de voz e tom — Falandou

Para qualquer texto novo do site, dos anúncios, do WhatsApp e dos materiais.
Base: análise de copywriting (ponto 12), novembro de 2026.

## 1. A voz em três pares

| É | Não é |
|---|---|
| **Direto e concreto** — situação real, número real, próximo passo claro | Motivacional e vago — "transforme sua vida", "seja fluente" |
| **Institucional com calor humano** — fala com autoridade e com respeito | Corporativo frio — jargão, voz passiva, "soluções" |
| **Exigente consigo mesmo** — mostra como mede e admite o que depende do aluno | Autocongratulatório — "a melhor escola", "método revolucionário" |

Regras práticas:

- Cada título carrega **uma prova ou uma dor específica**. Nunca uma promessa sem âncora.
- Dor é **situação**, não sintoma: "trava na call com o cliente de fora", não "dificuldade com inglês técnico".
- Números só de `src/data/stats.ts` e `src/data/plans.ts`. Nada estimado, nada arredondado para cima.
- Sem exclamações em páginas institucionais (/sobre, /metodo, /resultados).
- O botão completa a frase que o visitante está pensando naquele ponto da página (ver seção 4).

## 2. O que a escola NÃO promete (nunca escrever)

- **Consulta, conversa inicial ou aula experimental gratuita** — a escola não oferece.
- **Turma, aula em grupo ou turma online** — toda aula é de um aluno para um professor. "Grupo" só aparece como contraste.
- **Garantia de resultado** — o que existe é o exame antes e depois e a revisão do plano.
- Datas de oferta, vagas limitadas ou qualquer urgência inventada. Urgência legítima é a do aluno (a data dele).
- Depoimentos, cargos ou empresas sem autorização e sem a fala real do aluno.

Fatos que podem ser usados: resposta em até 1h · cancele quando quiser · reembolso integral em até 7 dias se
nenhuma sessão tiver sido feita · exame CEFR no início e no fim · sessões de 25 ou 50 minutos.

## 3. Dez exemplos de antes e depois

| # | Antes | Depois |
|---|---|---|
| 1 | Sem compromisso. | Cancele quando quiser. Reembolso integral em até 7 dias se nenhuma sessão tiver sido feita. |
| 2 | Inglês funcional para o trabalho. | O inglês que faltava para a próxima fase da sua carreira. |
| 3 | Fale inglês com confiança. | De B1 para B2 em 11 semanas. Com um plano feito só para você. |
| 4 | Feito para quem precisa de inglês no trabalho, de verdade. | Feito para profissionais que usam inglês no trabalho — ou precisarão usar. |
| 5 | O inglês que falta para a sua carreira. | 79% sobe 1 nível CEFR em 90 dias. O próximo pode ser você. |
| 6 | Plano individual — nenhum profissional faz o mesmo plano. | Você não perde tempo com o que já sabe — o plano começa onde você parou. |
| 7 | Resultado em número — exame CEFR antes e depois. | Você sai com um número — não com uma sensação. E pode mostrar isso num processo seletivo. |
| 8 | Dificuldade em apresentar projetos para clientes internacionais. | Trava na call com o cliente de fora quando precisa defender o projeto. |
| 9 | Quero começar (em todos os botões). | Esse sou eu — quero saber mais · Como funciona o meu plano? · Falar com a equipe agora. |
| 10 | Máxima imersão e resultados. | Você tem uma data. Este plano foi feito para isso. |

Preservar: "Você não travou por falta de esforço." — a melhor linha do site.

## 4. CTAs por estágio

| Onde | O visitante está | Botão |
|---|---|---|
| Hero | Descobrindo | Quero começar |
| Para quem é | Se identificando | Esse sou eu — quero saber mais |
| Por que não avançou | Entendendo o diferencial | Como funciona o meu plano? |
| CTA final (laranja) | Pronto para decidir | Falar com a equipe agora |
| Depois do FAQ | Última objeção removida | Montar o meu plano com a equipe |
| Roteiro / material | Ainda avaliando | Receber o roteiro gratuito |
| /sobre | Validando a escola | Ver como funciona o método |

## 5. Checklist de revisão (antes de publicar)

- [ ] O título tem prova ou dor específica?
- [ ] Algum número que não está em `stats.ts`/`plans.ts`?
- [ ] Alguma promessa de consulta gratuita, garantia ou urgência inventada?
- [ ] A dor descreve uma situação que o aluno reconheceria?
- [ ] O botão combina com o momento da página (seção 4)?
- [ ] Dá para cortar um adjetivo sem perder sentido? Corte.
- [ ] Tem exclamação em página institucional? Tire.
- [ ] Lido em voz alta, soa como uma escola séria falando com um adulto?
- [ ] Crase, acentos (inglês, reconhecê-las) e hífen conferidos (seção 9)?
- [ ] Palavras em inglês em itálico; aspas só em falas e citações?
- [ ] Vocabulário institucional: profissional, sessão, atividade (seção 8)?
- [ ] "Fluência" usada sem confundir com nível CEFR (seção 10)?
- [ ] Exemplos em inglês revisados por um segundo professor?

## 6. Voz editorial do blog (SEO §19, revisão editorial §29 e §48)

- **Quem assina:** um professor por categoria (decisão da escola, revisão editorial §29 e §48). O texto continua na voz da escola, sem primeira pessoa.
  - Carreira e Negócios e Jurídico: Adriel Pelegrino;
  - CEFR e Certificações: Amanda Bennett;
  - Dicas de Estudo: Sara El Hamdaoui.
  - A regra está em `src/lib/teachers.ts`. O campo `autor` no frontmatter muda a assinatura de um artigo específico.
  - **Antes de publicar, o professor que assina lê e aprova o texto.** Assim a assinatura corresponde a uma revisão real.
- **Tom:** especialista acessível. Profissional sem ser pedante, como alguém que já percorreu o caminho e explica o atalho.
- **Vocabulário nos artigos:**
  - "profissional", não "aluno";
  - "atividade", não "tarefa";
  - "sessão", não "aula";
  - "aula em grupo" ou "turma" nunca como proposta de valor.
- **Parágrafos curtos:** no máximo três linhas na tela do celular.
- **Use:** dados concretos e com fonte (os de `stats.ts`, ou exames e instituições citados por nome), exemplos reais do trabalho e transições claras entre as seções.
- **Evite:** jargão pedagógico, generalizações ("todo mundo sabe que…"), promessas vagas ("em pouco tempo", "sem compromisso") e números sem fonte.
- **Estrutura e SEO de cada post:** ver `docs/seo-conteudo.md`, seção 11.

## 7. Seis adjetivos da voz (revisão editorial §49)

Valem para o site, o blog, o YouTube, o WhatsApp e qualquer material novo.

| Adjetivo | Como aparece no texto |
|---|---|
| **Direta** | "Exame CEFR no início e no fim." — não "uma jornada transformadora de aprendizado". |
| **Respeitosa** | Trata o leitor como um adulto ocupado: sem diminutivos, sem "você vai conseguir!". |
| **Orientada a resultado** | Fala do que muda no trabalho: "conduzir a reunião", "responder ao cliente sem tradutor". |
| **Precisa** | Número com fonte e contexto: "79% dos 87 profissionais avaliados no exame CEFR, ciclo jan–set 2024". |
| **Acessível sem ser informal** | Termo técnico com explicação curta na primeira vez: *shadowing* (repetir o áudio ao mesmo tempo que o falante). |
| **Sem enrolação** | Corte o adjetivo que não muda o sentido. Uma ideia por frase. |

Tratamento: **"você"** em todo o texto institucional. Não misture com "o senhor", "tu" ou terceira pessoa no mesmo bloco (§43).

## 8. Nomenclatura (revisão editorial §16, §31–§34)

**Vocabulário institucional** (home, planos, método, sobre, professores, resultados, landing pages):

| Use | Em vez de | Exceções |
|---|---|---|
| profissional | aluno | depoimentos (fala verbatim), "Plataforma do Aluno", "contrato do aluno", textos legais |
| sessão | aula | contraste negativo ("aula em grupo"), depoimentos |
| atividade | tarefa | — |
| sessões individuais / sessões 1 a 1 | aulas particulares | — |

**Nome da escola:**
- "a Falandou" na apresentação institucional (home, /sobre);
- "Escola Falandou" em contextos externos (imprensa, parceiros, diretórios);
- "Falandou" em menções curtas (blog, redes).
- Nunca "falandou" com minúscula nem "FALANDOU" em caixa alta, exceto no logo.

**Planos:** **Consistência**, **Resultado** e **Urgente**, sempre com essa grafia (site, WhatsApp, contrato, recibos). Os nomes antigos (Starter, Professional, Intensive) existem só no falandou.com antigo e não aparecem no site novo.

**Método:** "o método da Falandou", ou "Método Falandou" quando usado como nome, com maiúscula e sem aspas. Na primeira ocorrência de uma página, acompanhe a descrição: "o ciclo de 90 dias com exame CEFR, plano individual e sessões 1 a 1".

**Professores:**
- Nas páginas institucionais, nome e sobrenome ("Sara El Hamdaoui") com o cargo ao lado ("Professora"). Sem o prefixo "Prof.", porque o cargo já informa.
- No WhatsApp e nas redes, só o primeiro nome.
- Nunca misture as duas formas no mesmo contexto.
- Nenhum professor aparece como CTA ("Falar com o professor X"): o contato é sempre com a equipe (§41).

## 9. Ortografia e tipografia (revisão editorial §1–§8, §14, §17, §19)

- **Anglicismos compostos na grafia consagrada:** *feedback* (uma palavra), *follow-up*, *check-in*.
- **Acordo Ortográfico de 2009:**
  - prefixo + palavra sem hífen: autoavaliação, coautor, reescrever;
  - mantêm hífen: pré-, pós- e pró- tônicos (pré-preenchida, pós-ciclo) e prefixo + palavra iniciada pela mesma vogal ou por h (micro-ondas, anti-higiênico).
- **Acentos que mais escapam:** inglês, reconhecê-las, fazê-lo (infinitivo terminado em vogal tônica + pronome).
- **Regência:** "a diferença entre X e Y", nunca "diferença de X com Y".
- **Crase:** chegar à fluência, rumo à certificação, à reunião de amanhã. Sem crase antes de verbo ("a partir de", "a começar").
- **Palavras em inglês no meio do texto em português:** em *itálico*.
  - Aspas duplas só para falas e citações diretas, quando é o que a pessoa diz.
  - Nunca aspas simples.
- **Títulos de séries, filmes, livros e podcasts:** em itálico, sem aspas, no título original (*Breaking Bad*, *Project Hail Mary*). Se houver título oficial no Brasil, ele vai entre parênteses na primeira menção.
- **Tempos verbais:** maiúscula quando são o tema do título ("Como usar o Present Perfect"); minúscula no meio da frase ("o present perfect indica…").
- **IPA:** sempre com a palavra de exemplo e uma descrição acessível: /ɪ/, como em *ship* (vogal curta, língua relaxada).
- **Listas:** itens curtos sem pontuação final; itens longos (mais de 15 palavras) terminam em ponto e vírgula, e o último em ponto final.

## 10. Inglês, CEFR e precisão (revisão editorial §11–§13, §18, §20)

- **"Fluência" não é um nível CEFR.**
  - Use "fluência profissional (B2 ou acima)" para a capacidade de trabalhar em inglês.
  - C2 é o topo da escala ("proficiente"), não sinônimo de fluente.
  - "Certificação C2" só quando se referir a um certificado (ex.: Cambridge C2 Proficiency).
- **CEFR** é o padrão no site. Na primeira ocorrência de cada página principal, explique: "CEFR, a escala internacional de níveis de inglês (A1 a C2)". No site, o termo usa a dica explicativa (`CEFRTooltip`). "Quadro Europeu Comum de Referência" aparece só como tradução, no guia do blog.
- **Termos técnicos** (*shadowing*, *connected speech*, *schwa*, *stress*) recebem uma definição curta na primeira ocorrência de cada artigo. No título, o termo em inglês pode ficar sem tradução.
- **Exemplos em inglês:** todo artigo com frases de exemplo passa por um segundo professor antes de publicar (revisão cruzada). Prioridade para artigos de gramática.
- **Títulos com palavras em inglês** são revisados por um professor com C2 antes de publicar.

## 11. Formatos (revisão editorial §37, §38, §40)

- **Datas:** "20 de novembro de 2026" (dia, mês por extenso em minúscula, ano).
- **Preço:** "R$ 217,90", com espaço entre o símbolo e o número, vírgula nos centavos e ponto no milhar ("R$ 1.467,90").
  - O PDF sugeria sem espaço, mas a forma com espaço é a usada pelo Banco Central e pelo próprio site (`formatBRL` em `src/data/plans.ts`).
  - O que importa é usar a mesma forma em todo lugar: site, WhatsApp, contrato e recibos.
- **WhatsApp por escrito:** (11) 97141-9047.
  - Nunca 11971419047, +55 11 97141-9047 nem (011).
  - Nos links, o formato técnico (`wa.me/5511971419047`) é obrigatório e não aparece para o leitor.

## 12. Hierarquia de CTAs (revisão editorial §28, §39)

| Nível | Texto | Onde |
|---|---|---|
| Primário (conversão) | **Quero começar** | Home, planos, rodapé, CTA final das páginas |
| Secundário (dúvida) | **Falar com a equipe** (ou "Falar com a equipe agora" no fechamento) | Páginas informativas, FAQ, landing pages |
| Hero de landing page | Variação ligada ao objetivo ("Quero me preparar para o exterior") | Só no hero da página daquele objetivo |
| Por estágio | Os da seção 4 | Seções específicas da home |

Todo botão que abre o WhatsApp diz isso por perto: "Pelo WhatsApp · a equipe responde em até 1h" ou "Abre o WhatsApp da equipe · resposta em até 1h".

## 13. Estrutura e argumentos (revisão editorial §9, §36, §44–§46)

- **Ordem de blocos novos:** problema → solução → prova → ação.
- **Contraste com outros formatos:** enquadramento positivo. "Enquanto a maioria dos formatos divide o professor, aqui ele é só seu." Nunca "diferente das escolas que…".
- **Limite de 25 profissionais por professor:** sempre com o porquê: "Acima disso, o acompanhamento individual perde qualidade."
- **Avisos sobre resultado:** no fluxo, uma frase positiva e honesta ("Resultados variam conforme o nível inicial e a dedicação de cada profissional"). O aviso completo fica nos termos, em letra menor.
- **Depoimentos:** nome completo, cargo e empresa (ou setor, se a empresa for confidencial). Foto e LinkedIn só com autorização. Texto sempre verbatim.

## 14. Anglicismos (revisão editorial §15)

Regra: se existe um equivalente em português igualmente preciso, use o português.

| Aprovados (nome próprio, termo técnico ou sem equivalente preciso) | Evitar (use o português) |
|---|---|
| WhatsApp, CEFR, IELTS, TOEFL | *upgrade* → melhoria |
| *feedback*, *follow-up* | *boost* → impulso |
| *shadowing*, *stress*, *schwa* (com definição) | *deadline* → prazo |
| *small talk* (com explicação) | *skill* → habilidade |
| *due diligence*, *compliance* (no blog jurídico) | *insight* → percepção, ideia |
| *Business English* (como nome de área) | *case* → caso, exemplo (fora do inglês jurídico) |

## 15. Revisão em dois níveis (revisão editorial §8, §13, §20)

1. **Autor, antes de publicar:** checklist da seção 5 e as regras das seções 8 a 14.
2. **Revisão editorial em até 48h depois de publicar:** ortografia, crase, regência, itálico e conferência dos exemplos em inglês por um segundo professor. Em artigos com exemplos em inglês, essa revisão vem antes de publicar.
