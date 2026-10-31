# Progresso do app AACJ: onde paramos

> Para o Claude em outro PC: leia este arquivo inteiro antes de mexer no código. Ele resume o que já foi
> feito, as regras combinadas com o Tiago e o que falta. Confira o código antes de confiar no que está
> aqui: o arquivo pode estar desatualizado em relação aos commits mais novos (`git log`).

Última atualização: 31/10/2026. Para o último commit, veja `git log`.

## O projeto

- App da escolinha de futebol AACJ (área do atleta e do responsável), em **React Native + Expo SDK 57 + Expo Router**.
  Leia `AGENTS.md`: as docs do Expo dessa versão ficam em https://docs.expo.dev/versions/v57.0.0/.
- Telas em `src/app/`, estilos separados em `src/styles/<tela>Style.ts`, cores e fontes em `src/styles/variaveis.ts`,
  componentes em `src/components/` (`tabBar`, `botaoNotificacoes`) e utilitários de formatação em `src/utils/formatos.ts`.
- Fluxo de entrada: `index.tsx` mantém a animação e retoma a sessão salva: sem token → seleção de perfil; atleta ou responsável com filho selecionado → Home; responsável sem filho selecionado → escolha do atleta. Se outra tela ganhar foco (por exemplo, pelo push), o redirecionamento inicial é cancelado.

## API (backend Laravel, em outro repositório)

- **Documentação oficial (é o contrato):** https://coderatech.tipi5.smpsistema.com.br/AACJ/api/documentacao
- O endereço fica num lugar só, em `src/config/api.ts`:
  - produção: `SERVIDOR = "https://coderatech.tipi5.smpsistema.com.br/AACJ"` (o `API` acrescenta `/api/v1`);
  - local (Docker do backend): `http://localhost:8080`. Só funciona no navegador do PC. No emulador Android é `http://10.0.2.2:8080`.
    Não confunda com a 8081, que é a porta do Metro, o servidor do próprio app.
- Token Bearer (Sanctum, vale 30 dias), salvo no AsyncStorage em `token`, junto com `perfil` (`"atleta"`) e `device_id`.
- Todo erro vem como `{ success: false, message }` em português. O 422 traz também `errors` por campo
  (use `mensagensDeErro` de `utils/formatos.ts`).
- Padrão das telas: sem token → `router.replace("/selecao-perfil")`; 401 ou 403 → apagar `token` e `perfil` e voltar para `/selecao-perfil`.
- **Banco local trocado pelo do colega (29/10):** a Joana não existe mais no local. Para testar o app com a API local
  sem mexer em senha, crie um token temporário pelo tinker (ex.: `Atleta` Anthony, id 11, `createToken("teste")`) e
  apague o token depois (`personal_access_tokens` pelo nome). Na produção, além da Joana, há a conta do **Tiago Silva**
  (login com o Tiago), com treinos e locais cadastrados.
- Contas de teste: **Joana Exemplo** (atleta, `joana@exemplo.com`) e **Carla Exemplo** (responsável, mãe da Joana,
  `carla@exemplo.com`). A senha está com o Tiago; não a coloque em arquivo. Os dados são **diferentes** no local e no servidor:
  - local: Joana tem id 29, Sub-13 Feminino e 6 treinos de 03/11 a 14/11. Os 6 avisos dela já foram marcados como lidos
    no teste de 24/10 (a API não desmarca); para testar "não lidas", crie um aviso novo pelo admin;
  - servidor: Joana tem id 17.

## Regras combinadas com o Tiago

- **Commits sem coautoria** (sem a linha `Co-Authored-By`). Mensagem em português com prefixo `feat:` ou `fix:`.
  Commit e push só quando ele pedir.
- **Antes de qualquer commit ou deploy, conferir:**
  - `SERVIDOR` em `src/config/api.ts` está no endereço de **produção**.
- O projeto usa o **React Compiler** (`app.json`): rode `npx eslint` nos arquivos alterados. Não leia `ref.current`
  durante a renderização nem chame `setState` dentro de efeito; isso dá erro nas regras `react-hooks`.
- Na dúvida sobre regra de negócio ou formato da API, **perguntar antes** de inventar campo ou rota. Se faltar algo na API,
  escrever um prompt para o Claude do backend em vez de contornar no app.
- Mostrar o plano e esperar aprovação em tarefas grandes. Ao terminar, rodar `npx tsc --noEmit` e dizer o que foi e o que não foi testado.
- Manter o layout das telas existentes; mudar só o necessário.

## Deploy web (EAS Hosting)

```
npx expo export --platform web
eas deploy --prod
```

Sem `--prod`, o deploy vira só uma prévia (`aacjapp--xxxx.expo.app`). A produção (https://aacjapp.expo.app) leva
um ou dois minutos para trocar; depois disso, recarregar sem cache. Para testar no celular: `npx expo start` e abrir no Expo Go,
com o `SERVIDOR` em produção.

## O que já está feito

| Parte | Situação | Onde |
|---|---|---|
| Login do atleta | Integrado (`POST /auth/login` com `perfil: "atleta"`), mensagem de erro na tela, "Entrando..." | `login-atleta.tsx`, `config/api.ts` |
| Home: nome, categoria, foto, posição | `GET /atleta`. Foto `null` → ícone padrão. Goleiro pela `posicao_atleta` | `home.tsx` |
| Home: carrossel do topo | Slides nesta ordem: (1) o **próximo jogo**: primeiro `JOGO` não cancelado de `GET /agenda?tipo=JOGO` (servidor sem o filtro ignora o `?tipo`; se a chamada falhar, usa a página 1 da agenda); toque abre o detalhe do jogo. (2) os **campeonatos do atleta**: `GET /campeonatos-do-atleta` (fundo `banner_url`, escudo `logo_url`, sem imagem usa as padrão; tipo, "Em andamento"/"Começa em", nome, "Convocação no Sub-13 Feminino · camisa 8" ou as categorias, datas); toque abre o detalhe do campeonato com seu id; servidor sem a rota (404) só pula. (3) os **banners do painel**: `GET /banners` (público; foto, título e subtítulo; ordem e ativo vêm do painel). Passa sozinho a cada 6 s, desliza com o dedo e os pontos levam ao slide (na web o mouse não arrasta). Espera a agenda chegar e volta ao 1º slide quando a lista muda. Sem nenhum slide, some | `home.tsx` |
| Home: próximas atividades | Os 3 primeiros não cancelados de `proximos` (mesma chamada do banner): "Hoje / Amanhã / Quarta-feira · 28/10/2026", título, local (sem local, a categoria) e horário (sem horário, "A definir"). Vazio: "Nenhuma atividade marcada por enquanto." Toque abre o detalhe do compromisso (servidor sem o detalhe: a Agenda) | `home.tsx` |
| Home: sessão | Qualquer uma das chamadas (atleta, agenda, jogos, estatísticas, campeonatos) com 401 ou 403 apaga a sessão e volta para o login | `home.tsx` |
| Home: saudação | Bom dia / Boa tarde / Boa noite pelo horário do aparelho | `home.tsx` |
| Home: "Seus números" e modal de estatísticas | `GET /atleta/estatisticas`. "Seus números" usa o `total`. No modal, o botão da categoria (ex.: "Sub-13") mostra os 6 números de `categoria_atual`; o botão "Total" mostra **só os gols** de `total` (desde que entrou, somando todas as categorias). Sem `categoria_atual` (`null` ou servidor sem o bloco), só aparece o "Total". `null` aparece como "—", diferente de 0. Gols e assistências vêm `null` até o backend registrar. Defesas e gols sofridos do goleiro não existem na API e mostram "—" | `home.tsx` |
| Editar perfil | `GET` e `PATCH /atleta` (manda só o que mudou). Nome, telefone, e-mail, CPF e data de nascimento editáveis; categoria e matrícula só leitura. A API só deixa mudar dia e mês da data (ano diferente dá 422 com a mensagem da secretaria) | `editar-perfil.tsx`, `utils/formatos.ts` |
| Responsáveis no Perfil | `responsaveis` de `GET /atleta`: uma linha "Responsável" por pessoa, com o parentesco entre parênteses ("Carla Exemplo (Mãe)"). Sem nenhum, não aparece. No Editar perfil aparecem só para leitura | `perfil.tsx`, `editar-perfil.tsx`, `utils/formatos.ts` |
| Trocar foto | No Editar perfil, tocar na foto, no ícone da câmera ou em "Alterar foto" abre o modal: Tirar foto (no app sempre; na web só em tela de toque, `pointer: coarse`, onde o seletor abre a câmera com `capture`; no computador não aparece), Escolher da galeria, Remover foto (com foto atual) ou "Cancelar foto enviada" (só com foto esperando aprovação) e Cancelar. Recorte quadrado (`expo-image-picker`, permissões no `app.json`). Envia `POST /atleta/foto` (multipart, campo `foto`) e remove com `DELETE /atleta/foto`; a resposta deve ser o atleta como no `GET`. Não apaga o que foi digitado e não salvo. A foto fica pendente até a secretaria aprovar: o app mostra a `message` da API e, com `foto_pendente: true`, o aviso "Sua nova foto está aguardando aprovação da secretaria." embaixo da foto (a atual continua). A secretaria aprova ou recusa no painel (Atletas) e o atleta recebe o AVISO "Foto aprovada" ou "Foto não aprovada". Publicado em produção e testado em 29/10 (enviar, aprovar, recusar e remover). Servidor sem a rota (404): "A troca de foto ainda não está disponível." | `editar-perfil.tsx` |
| Configurações e notificações no celular | Push pela Expo (`expo-notifications`, plugin no `app.json`), em `utils/notificacoes.ts`. Só no **app instalado** (build do EAS): na web, no simulador e no Expo Go não há push (`pushDisponivel` false) e a linha "Notificações" some das Configurações. A Home registra o aparelho em `POST /dispositivos` `{ token, plataforma, notificacoes_ativas }`; o botão das Configurações reenvia com a preferência (sem permissão: volta para desligado com aviso); "Sair" chama `DELETE /dispositivos` (no máximo 3 s). Toque na notificação (`_layout.tsx`): `data.id_evento` abre o detalhe do compromisso, senão a lista de avisos; com `data.id_atleta`, o responsável troca para esse filho. **As rotas e o envio ainda não existem no backend** (pedido em 30/10); servidor sem a rota (404) é ignorado. Para funcionar falta também: Firebase/FCM (Android) e Apple Developer/APNs (iPhone) no EAS | `configuracoes.tsx`, `utils/notificacoes.ts`, `_layout.tsx` |
| Área do responsável | `POST /auth/login` com `perfil: "responsavel"` guarda `token`, `perfil` e `nome_responsavel`. Com um filho, vai direto para a Home; com mais, abre **Escolha o atleta** (`GET /responsavel/atletas`: foto, nome, matrícula e bolinha dos avisos não lidos) e guarda `atleta_selecionado`. As telas do atleta (Home, Agenda, detalhe, Comissão Técnica, Notificações e o sino) usam `urlDoAtleta()`, que troca `/atleta` e as outras rotas por `/responsavel/atletas/{id}/...`. Home: "Bom dia, Carla" em cima e o nome do filho grande. Perfil: subtítulo "Atleta que você acompanha" e "Trocar atleta →" no lugar de "Editar perfil". 404 do filho (inativado ou desvinculado) volta para a escolha. Testado em 29/10 com a Carla em produção | `login-responsavel.tsx`, `escolha-atleta.tsx`, `utils/sessao.ts` |
| Meus dados (responsável) | Aberta pelo Perfil do responsável. `GET` e `PATCH /responsavel` (manda só o que mudou): e-mail (login), telefone e WhatsApp editáveis. Com o servidor novo (o GET manda `endereco.compartilhado_com`), também nome, CPF e o endereço em campos separados: o CEP com 8 dígitos preenche rua, bairro, cidade e UF pelo ViaCEP, e o botão "Mudar também o endereço de Joana" (já ligado, só quando o endereço muda e é o mesmo de um filho) manda `endereco_dos_filhos`; nome novo atualiza a saudação da Home. Testado em produção em 29/10 (nome, CPF, CEP e o endereço levando a Joana junto). Sem esse campo (servidor antigo), nome, CPF e endereço (numa linha só) ficam em cards cinza. "Alterar senha" do responsável usa a mesma tela do atleta com `PUT /responsavel/senha` | `meus-dados.tsx`, `alterar-senha.tsx` |
| Sair da conta | `sairDaConta()` chama `POST /auth/logout` (desiste em 5 s), apaga a sessão (`CHAVES_SESSAO`: token, perfil, atleta_selecionado e nome_responsavel) mesmo se falhar e vai para `/selecao-perfil`. Usada no Perfil e em Configurações | `utils/sessao.ts` |
| Alterar senha | `PUT /atleta/senha`, segue o guia do professor. A lista de requisitos ficou só com "Mínimo 8 caracteres", com o check reagindo ao que é digitado | `alterar-senha.tsx` |
| Agenda | `GET /agenda?page=N`, recarrega ao voltar para a tela e busca mais páginas ao rolar. Timeline: os 3 `passados` da API, o card de próximo compromisso (primeiro que **não terminou** e não foi cancelado; ao terminar, vira passado na virada do minuto) e os futuros, com cabeçalho a cada dia ("Hoje", "Quinta · 05/11"). Filtros: um botão por tipo da API. Status só Confirmado ou Cancelado. O card mostra a descrição e "Chegar às" nos jogos. O card do próximo ("Ver detalhes") e qualquer item da timeline abrem o detalhe do compromisso; servidor sem o detalhe (sem o campo `responsavel` nos eventos) esconde o "Ver detalhes" e o toque não faz nada. A linha de pessoa mostra o `responsavel` ou, sem ele, a `categoria`. A faixa mostra a semana do dia selecionado (bolinha = dia com compromisso; toque rola a lista). Rolando com o dedo, o mês, a semana e o dia destacado seguem o dia que está no alto da lista (com os passados no alto, fica em hoje); durante a rolagem feita pelo app (toque nos dias, setas, calendário) o cabeçalho espera ela terminar. As setas de mês e de semana não voltam antes de hoje; o botão do calendário e a troca de filtro voltam para hoje. Um cancelado antes do próximo fica antes do card, na ordem das datas | `agenda.tsx` |
| Detalhe do compromisso | `GET /agenda/{idEvento}`, uma tela para todos os tipos (visual da antiga `treino-tecnico.tsx`): Confirmado/Cancelado, "Faltam 2h 15min" / "Faltam 3 dias" / "Acontecendo agora" / "Concluído", título inteiro, dia, horário com duração, local (com local cadastrado: o `local_detalhe.nome` e o endereço embaixo). No jogo, card "AACJ × adversário" (placar quando jogado), campeonato ou "Amistoso", fase, pênaltis, confronto e "Chegar às" (só antes do jogo). Categoria, responsável e descrição só quando vêm. Ações rápidas: Abrir mapa (o `local_detalhe.mapa_url`; com `local_detalhe: null`, local só em texto, o botão some; servidor antigo sem o campo: busca pelo texto do local), Adicionar ao calendário (link do Google Agenda preenchido; local = nome + ", " + endereço), Compartilhar (compartilhamento do sistema, com nome + endereço; onde não há, copia o texto) e Entrar em contato. O "Entrar em contato" e o toque na linha "Responsável" (com ›) abrem o perfil da Comissão Técnica e só existem com `responsavel_id`; o responsável em texto antigo aparece sem botão. 404: "Este compromisso não está mais na sua agenda." A contagem atualiza na virada do minuto enquanto a tela está em foco e usa fim, início ou dia para concluir, mesmo se `concluido` ainda vier false. As rotas antigas `treino-tecnico` e `agenda-local` foram removidas; os estilos compartilhados do detalhe foram preservados | `detalhe-compromisso.tsx`, `utils/eventos.ts` |
| Comissão Técnica | `GET /comissao-tecnica/{id}` (o `responsavel_id` do compromisso), aberta pelo detalhe do compromisso: foto (só a autorizada; sem ela, o ícone), nome, cargo, categoria principal, tempo na AACJ, licença, especialidade e categorias atendidas (a principal em destaque). Cada linha só aparece com o dado. Contato institucional: some quando `contato` é `null`; o telefone abre a discagem e o e-mail o app de e-mail. 404 (profissional desativado): "Este profissional não está mais disponível." Sem o selo "Confirmado" | `comissao-tecnica.tsx` |
| Sino (todas as telas) | O próprio componente busca `GET /notificacoes/nao-lidas` sempre que a tela aparece; nenhuma tela passa o número. 0 esconde a bolinha; mais de 9 mostra "9+". Com o responsável, conta os avisos que ele ainda não leu do filho escolhido | `components/botaoNotificacoes.tsx` |
| Notificações | `GET /notificacoes?page=N` (20 por página, mais ao rolar). Seções Hoje / Ontem / Esta semana (desde segunda) / Anteriores, pela `data`. Categorias: **Agenda** (INSCRICAO, REMOCAO, ALTERACAO, CANCELAMENTO, REATIVACAO e AGENDA) e **Avisos da AACJ** (AVISO). Tocar marca como lido (`PATCH /notificacoes/{id}/lida`) e, se for da Agenda e houver `id_evento`, abre o detalhe do compromisso; sem id, abre a Agenda; o recado da AACJ não abre outra tela. "Marcar todas como lidas": com "Todas" usa `PATCH /notificacoes/lidas`; com uma categoria, marca só os avisos dela que estão na tela | `notificacoes.tsx` |
| Esqueci minha senha | POST /auth/esqueci-senha com email e perfil (atleta ou responsável), usando prazo de 15 s. Sucesso abre modal sobre código de quatro dígitos; fechar pelo OK ou pelo sistema abre /redefinir-senha com email e perfil. Estados e nomes seguem o resumo do guia do professor. Erros aparecem em erroSolicitacao | `esqueci-senha.tsx` |
| Redefinir senha | Quatro dígitos numéricos com avanço de foco e Backspace. Na mesma salvarNovaSenha: POST /auth/validar-codigo com email, perfil e codigo; depois POST /auth/redefinir-senha com reset_token, nova_senha e nova_senha_confirmation. O token fica apenas na memória da tentativa. Só o sucesso final retorna ao login do perfil. Validações locais na ordem do guia, 422 por campo e prazo de 15 s por chamada; aguarda publicação do backend | `redefinir-senha.tsx` |
| Campeonatos | Tudo com a API (30/10). **Lista** (`GET /campeonatos` + `campeonatos-do-atleta`): filtros Todos/Meus/Em andamento/Em breve/Encerrados, card com `resumo` ("Fase de grupos · Rodada 4 de 5" só com `rodada_atual` e `total_rodadas`, senão "6 de 10 jogos"; sem resumo, pelas datas) e a participação ("Convocação no Sub-13 · camisa 10"). **Detalhe** (`GET /campeonatos/{id}`): categorias, informações, progresso, campanha da AACJ calculada somente com exatamente um time com `da_aacj === true` e resultado válido (nos pênaltis conta quem passou), próxima partida ("Ver detalhes" só se o jogo está na agenda), classificação resumida, últimos resultados com Vitória/Empate/Derrota, próximas partidas e "Ver completo". **Classificação**, **Últimos resultados** e **Próximas partidas** completas (`?id=&categoria=`). Busca e regras em `utils/campeonatos.ts`; o vínculo com a agenda usa os dias dos jogos em períodos de até 93 dias (`de`, `ate`, `tipo=JOGO`), sem paginação. Mata-mata vem com tabela zerada: não aparece. A antiga `detalhe-proxima-partida` saiu | `campeonatos.tsx`, `campeonato-detalhe.tsx`, `classificacao.tsx`, `ultimos-resultados.tsx`, `proxima-partida.tsx` |
| Sua participação (jogo) | No detalhe do compromisso, `jogo.participacao` (sempre presente): convocação e camisa, escalação (titular/reserva e posição) ou "A definir pelo técnico" | `detalhe-compromisso.tsx` |
| Tela inicial e cabeçalhos | "Fazer matrícula" abre `SITE/cadastro` e "Conheça a AACJ" a home do site (`SITE` em `config/api.ts`). O ícone da loja saiu de todos os cabeçalhos (30/10) | `selecao-perfil.tsx` |
| Fale conosco | Formulário no app: POST autenticado em /fale-conosco para atleta ou responsável, assunto e mensagem obrigatórios, carregando, 422 por campo, 404 com aviso de indisponibilidade e 429 com Retry-After. Só o sucesso 201 limpa os campos. A rota ainda depende da publicação do backend; não usa /contato do site | `fale-conosco.tsx` |
| Conexão e fontes | `buscarComPrazo` limita fetch a 15 s nos dois logins, Home (inclusive banners), detalhe, hook de campeonato e recuperação de senha; erros mostram mensagem de conexão. Falha de fontes libera a splash e permite o fallback do sistema | `utils/buscarComPrazo.ts`, `_layout.tsx` |
| Desempenho | Desativado: saiu do menu, da Home e da Ajuda. As oito telas foram mantidas por decisão do Tiago em 31/10 | — |

## O que falta (sugestão de ordem)

### Concluído em 31/10/2026

- Entrada com sessão salva e cancelamento do redirecionamento quando outra tela recebe foco.
- Campanha e resultados somente com identificação válida da AACJ; pênaltis exigem os dois placares.
- Avisos da Agenda abrem o compromisso quando há id_evento; lista e push compartilham o destino.
- Falha de fontes não prende a splash; contagem do compromisso atualiza por minuto e para ao sair.
- Detalhes das partidas usam a agenda por períodos de até 93 dias, cobrindo os dias dos jogos do campeonato.
- Prazo de 15 s nos fluxos solicitados, sem trocar o endereço de produção ou criar uma camada global de HTTP.
- Configurações: Privacidade removida por decisão do Tiago; Atualizações mostra somente a versão, sem seta.
- Ajuda: categoria e orientações de Desempenho removidas; a busca inativa foi escondida.
- Fale conosco mantém o formulário no app e envia assunto e mensagem à nova rota autenticada. Campos são
  preservados em 404, 422, 429, erro de conexão e timeout; somente 201 confirma e limpa. Retry-After aceita
  segundos ou data HTTP e bloqueia novo envio até o prazo. A decisão final substitui a abertura de /contato.
- Rotas de exemplo treino-tecnico e agenda-local removidas. Os estilos treinoTecnicoStyle e
  detalheProximaPartidaStyle continuam porque o detalhe do compromisso usa ambos.

### Antes de entregar ao cliente

1. Backend: implementar/publicar POST /api/v1/fale-conosco, autenticado para atleta e responsável, com
   { assunto, mensagem }. Contrato informado pelo Tiago: 201 no sucesso, 422 com errors por campo,
   429 com Retry-After. Enquanto retornar 404, o app mostra “O envio de mensagens ainda não está disponível.”.
   No 429: “Você enviou muitas mensagens. Tente de novo em alguns instantes.”.
   Para a web ler o prazo, expor Retry-After no CORS (Access-Control-Expose-Headers). O backend não foi alterado.
2. Validar a entrega real da mensagem depois da publicação da rota; os cenários desta etapa usaram respostas
   interceptadas no navegador, sem enviar mensagens, autenticar ou alterar dados na produção.
3. Notificações no celular: backend (pedido em 30/10), Firebase/FCM e Apple/APNs; testar o toque em push real
   num aparelho. Nesta etapa foi verificada a navegação equivalente no navegador, não a entrega nativa.
4. Produção: conferir e limpar dados de teste e passar os acessos ao cliente; nenhuma limpeza foi feita aqui.
5. As oito telas de Desempenho permanecem por decisão do Tiago: desempenho, avaliacao-fisica, conquistas,
   evolucao, historico-avaliacao, indicadores, metas e observacao. Não apagar sem nova autorização.
6. Recuperação por código: finalizar/publicar validar-codigo e redefinir-senha no backend e confirmar o envio
   de código de quatro dígitos por esqueci-senha. O app está integrado ao contrato fornecido pelo Tiago;
   nenhuma senha ou conta real foi alterada nos testes.

### Agenda e trabalho posterior

- Os filtros da Agenda e das notificações ainda operam sobre os itens já carregados; corrigir a combinação
  entre filtro e paginação em outra etapa. A contagem dos filtros da Agenda já usa totais de todas as páginas.
- Com poucos compromissos, o dia tocado no fim da lista pode não chegar ao topo por falta de espaço de rolagem.
- Títulos longos continuam cortados na timeline; no detalhe aparecem inteiros.
- Adiados por orientação do Tiago: SecureStore, HTTP unificado, estado central de sessão, validação de todo
  JSON, listas virtualizadas, testes/CI e revisão de acessibilidade.

### Verificação desta etapa

- git pull sem novidades; npm install sem alterações no package-lock.json. Sem push, build ou deploy.
- TypeScript passou sem emitir arquivos. Lint inicial: 20 erros e 4 avisos; após as mudanças: 7 erros e
  3 avisos, todos preexistentes. A atualização da entrada eliminou os alertas daquele arquivo.
- Navegador com Expo web e API simulada: quatro destinos de entrada e navegação antecipada; campanha e
  resultados; avisos com e sem evento; falha das cinco fontes; relógio antes/durante/depois e conclusão sem
  fim ou horário; 27 partidas em dois períodos nos dois perfis; timeout nos fluxos solicitados; controles,
  rotas removidas e formulário de contato (validação, 201, 404, 422, 429, falha de rede, timeout e 401).
- O formulário foi testado como atleta e responsável; Retry-After foi verificado em segundos e em data HTTP.
- Os scripts de verificação são temporários e externos ao repositório; nenhuma suíte de testes foi adicionada.

### Recuperação por código — 31/10/2026

- A solicitação e a redefinição seguem o resumo das etapas 1 a 11 do guia do professor fornecido pelo Tiago.
  Os nomes de estados, funções, botões e estilos pedidos foram mantidos; os estilos existentes não foram alterados.
- Diferenças do app: email e perfil seguem juntos até a validação; o modal orienta sobre código; o sucesso
  retorna para login-atleta ou login-responsavel porque a rota inicial retoma sessões; reset_token não é persistido.
- Contrato de validar-codigo: envia email, perfil e codigo (string com quatro dígitos); recebe data.reset_token.
  Contrato de redefinir-senha: envia somente reset_token, nova_senha e nova_senha_confirmation.
- Cenários simulados no Expo web: sucesso dos dois perfis, estados Enviando/Salvando, ordem das chamadas,
  parâmetros e payloads, código com zero inicial, cinco validações locais na ordem do guia, foco e Backspace,
  ausência de reset_token, 422 de e-mail/código/senha, falha de rede nas três rotas e timeout de 15 s em cada uma.
  Verificado que senha e token não foram escritos em localStorage/sessionStorage. Layout conferido em 320 e 430 px.
- TypeScript passou; os quatro arquivos de tela/estilo passaram no lint sem avisos. Lint geral continua com
  os 7 erros preexistentes e agora 2 avisos (o import sem uso de redefinir-senha foi removido).
- Preservados CRLF, o SERVIDOR de produção e as dependências. Sem envios reais, alteração do Laravel, build,
  deploy ou push. A entrega de e-mail e o fluxo nativo ainda precisam de validação após a publicação da API.

## Pendências do lado do backend

- Gols e assistências por atleta (hoje `null`) dependem do painel registrar quem fez cada gol.
- `defesas` e `gols_sofridos` do goleiro não existem na rota de estatísticas. Pedir só se o Tiago quiser.
- Treino com categoria "Geral (sem categoria)" vem com `categoria: null` de propósito.
- **Publicado na produção em 24/10** (conferido em 25/10): agenda com `?tipo=`, `?de=&ate=` (até 93 dias; muda a resposta
  para `{ periodo, eventos, totais }`), `totais` por tipo e `concluido`; detalhe `GET /agenda/{idEvento}` (só campos
  seguros: adversário, fase, rodada, prorrogação, pênaltis, confronto; sem colegas nem escalação); `responsavel` em todo
  evento (campo opcional "Responsável pela atividade" no evento e na Grade de Treinos); e a súmula (S2), que preenche
  gols e assistências nas estatísticas quando o jogo tem gol lançado (sem súmula continua `null`). O `?de=&ate=` agora é usado
  nos detalhes dos campeonatos; a tela Agenda continua usando a resposta paginada.
- **Comissão técnica: publicada na produção em 25/10** (C1 cadastro no admin, C2 select "Responsável pela atividade" no
  Calendário e na Grade, C3 `GET /comissao-tecnica/{id}`). Agenda e detalhe trazem `responsavel` (texto) e
  `responsavel_id`. Falta o Tiago conferir no admin da produção o select e o cadastro com foto, e escolher um
  profissional em algum compromisso da Joana para ver o botão no app.
- **Publicado em 26/10:** telefone institucional com 10 ou 11 dígitos (API devolve só dígitos; o app formata com
  `exibirTelefone`); `GET /campeonatos-do-atleta` (participa quem foi convocado em qualquer categoria ou tem a
  categoria atual no campeonato com time da AACJ; ativos e não terminados; em andamento primeiro) e `tipo_label` no
  `GET /campeonatos`; tratamento de imagens no envio (Intervention Image): Banners 1920x1080 JPG, banner do
  campeonato 1920x960 JPG (2:1, quase o formato do carrossel do app), logo 512x512 PNG inteira; recorte com prévia
  no painel, limite de 10 MB, nomes de arquivo gerados. As URLs da API não mudaram. Docker local: rode
  `docker compose build php` e `docker compose up -d` no outro PC (limite de upload e GD com JPEG).
- **Publicado na produção em 29/10 (2297215):** foto F1 e F2 (aprovar ou recusar no painel, com AVISO
  "Foto aprovada" / "Foto não aprovada" e motivo) e `PATCH /responsavel` com nome, CPF (422 se inválido ou repetido),
  `endereco` e `endereco_dos_filhos` (padrão true; false dá ao responsável um endereço próprio), histórico em
  `tbl_responsavel_historico`. Duas migrations. Depois de publicar, o backend faz o curl de 11 MB por causa do nginx.
  Pendência anotada: o "Editar" do atleta no painel regrava os dados do responsável e pode desfazer o que ele mudou
  pelo app.
- **Publicado e testado em 29/10 (correções 1 e 2 do endereço):** o `compartilhado_com` compara o registro (`id_endereco`), não o
  texto; cadastros pelo site criam um registro para cada pessoa e nunca mostravam o botão. Correção 1: o "Editar
  Atleta" mostra o endereço do responsável quando é outro registro e deixa claro no histórico que mudou só o dele.
  Correção 2: `compartilhado_com` também lista os filhos com o mesmo texto de endereço em outro registro; com true,
  cada registro recebe o endereço novo. O app não muda.
- **Locais: publicados na produção em 29/10 (L1 a L3) e testados no app:** CADASTROS › Locais (`tbl_local`, endereço
  e link do Google Maps), select de local nos eventos, na grade, no jogo e no campeonato, cartão "Locais usados que ainda
  não estão cadastrados" e o atalho "Ligar os N usos". A agenda e o detalhe trazem `local_detalhe: { nome, endereco,
  mapa_url }` (null com local só em texto ou sem local; `mapa_url` é o link cadastrado ou a busca do Google com nome e
  endereço). Na produção o "Campo AACJ" foi cadastrado e ligado (23 compromissos do Tiago Silva com endereço). Conferir
  se o endereço dele é o real (o de teste tinha "Bloco 1 Apto 31"). Eventos com local em texto ficam sem "Abrir mapa"
  no app até o local ser cadastrado e ligado.
- **Pendente no backend (pedido em 26/10):** esconder a barra do subtítulo vazio no carrossel do site; avisar no
  painel ao escolher arquivo acima de 10 MB; recusar time masculino da AACJ em categoria feminina (feminino em
  masculino continua permitido até o professor responder a pergunta 14); limpar os dados de teste locais (banner
  "TESTE - apagar", "Campeonato Teste Imagens" e a convocação da Joana). `imagens:reprocessar` na produção só com
  o OK do Tiago e backup. A Joana local se chama "Joana maria" (nome mudado num teste do Editar perfil).
- **Pushes do backend:** durante o desenvolvimento, só `git push origin feature/agenda-eventos`; a `main` do GitHub fica
  igual ao servidor e só recebe o código na publicação.
- Produção: e-mails por SMTP desde 24/10 (antes `MAIL_MAILER=log` e nada saía). No terminal SSH do Plesk, use
  `/opt/plesk/php/8.4/bin/php artisan ...` (o `php` padrão é 7.2; o site roda o 8.4).
