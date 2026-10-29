# Progresso do app AACJ: onde paramos

> Para o Claude em outro PC: leia este arquivo inteiro antes de mexer no código. Ele resume o que já foi
> feito, as regras combinadas com o Tiago e o que falta. Confira o código antes de confiar no que está
> aqui: o arquivo pode estar desatualizado em relação aos commits mais novos (`git log`).

Última atualização: 26/10/2026. Para o último commit, veja `git log`.

## O projeto

- App da escolinha de futebol AACJ (área do atleta e do responsável), em **React Native + Expo SDK 57 + Expo Router**.
  Leia `AGENTS.md`: as docs do Expo dessa versão ficam em https://docs.expo.dev/versions/v57.0.0/.
- Telas em `src/app/`, estilos separados em `src/styles/<tela>Style.ts`, cores e fontes em `src/styles/variaveis.ts`,
  componentes em `src/components/` (`tabBar`, `botaoNotificacoes`) e utilitários de formatação em `src/utils/formatos.ts`.
- Fluxo de entrada: `index.tsx` (preloader) → `selecao-perfil.tsx` → `login-atleta.tsx` ou `login-responsavel.tsx` → `home.tsx`.

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
| Home: carrossel do topo | Slides nesta ordem: (1) o **próximo jogo**: primeiro `JOGO` não cancelado de `GET /agenda?tipo=JOGO` (servidor sem o filtro ignora o `?tipo`; se a chamada falhar, usa a página 1 da agenda); toque abre o detalhe do jogo. (2) os **campeonatos do atleta**: `GET /campeonatos-do-atleta` (fundo `banner_url`, escudo `logo_url`, sem imagem usa as padrão; tipo, "Em andamento"/"Começa em", nome, "Convocação no Sub-13 Feminino · camisa 8" ou as categorias, datas); toque abre Campeonatos (telas ainda com dados de exemplo, sem id); servidor sem a rota (404) só pula. (3) os **banners do painel**: `GET /banners` (público; foto, título e subtítulo; ordem e ativo vêm do painel). Passa sozinho a cada 6 s, desliza com o dedo e os pontos levam ao slide (na web o mouse não arrasta). Espera a agenda chegar e volta ao 1º slide quando a lista muda. Sem nenhum slide, some | `home.tsx` |
| Home: próximas atividades | Os 3 primeiros não cancelados de `proximos` (mesma chamada do banner): "Hoje / Amanhã / Quarta-feira · 28/10/2026", título, local (sem local, a categoria) e horário (sem horário, "A definir"). Vazio: "Nenhuma atividade marcada por enquanto." Toque abre o detalhe do compromisso (servidor sem o detalhe: a Agenda) | `home.tsx` |
| Home: sessão | Qualquer uma das chamadas (atleta, agenda, jogos, estatísticas, campeonatos) com 401 ou 403 apaga a sessão e volta para o login | `home.tsx` |
| Home: saudação | Bom dia / Boa tarde / Boa noite pelo horário do aparelho | `home.tsx` |
| Home: "Seus números" e modal de estatísticas | `GET /atleta/estatisticas`. "Seus números" usa o `total`. No modal, o botão da categoria (ex.: "Sub-13") mostra os 6 números de `categoria_atual`; o botão "Total" mostra **só os gols** de `total` (desde que entrou, somando todas as categorias). Sem `categoria_atual` (`null` ou servidor sem o bloco), só aparece o "Total". `null` aparece como "—", diferente de 0. Gols e assistências vêm `null` até o backend registrar. Defesas e gols sofridos do goleiro não existem na API e mostram "—" | `home.tsx` |
| Editar perfil | `GET` e `PATCH /atleta` (manda só o que mudou). Nome, telefone, e-mail, CPF e data de nascimento editáveis; categoria e matrícula só leitura. A API só deixa mudar dia e mês da data (ano diferente dá 422 com a mensagem da secretaria) | `editar-perfil.tsx`, `utils/formatos.ts` |
| Responsáveis no Perfil | `responsaveis` de `GET /atleta`: uma linha "Responsável" por pessoa, com o parentesco entre parênteses ("Carla Exemplo (Mãe)"). Sem nenhum, não aparece. No Editar perfil aparecem só para leitura | `perfil.tsx`, `editar-perfil.tsx`, `utils/formatos.ts` |
| Trocar foto | No Editar perfil, tocar na foto, no ícone da câmera ou em "Alterar foto" abre o modal: Tirar foto (não aparece na web), Escolher da galeria, Remover foto (com foto atual) ou "Cancelar foto enviada" (só com foto esperando aprovação) e Cancelar. Recorte quadrado (`expo-image-picker`, permissões no `app.json`). Envia `POST /atleta/foto` (multipart, campo `foto`) e remove com `DELETE /atleta/foto`; a resposta deve ser o atleta como no `GET`. Não apaga o que foi digitado e não salvo. A foto fica pendente até a secretaria aprovar: o app mostra a `message` da API e, com `foto_pendente: true`, o aviso "Sua nova foto está aguardando aprovação da secretaria." embaixo da foto (a atual continua). A secretaria aprova ou recusa no painel (Atletas) e o atleta recebe o AVISO "Foto aprovada" ou "Foto não aprovada". Publicado em produção e testado em 29/10 (enviar, aprovar, recusar e remover). Servidor sem a rota (404): "A troca de foto ainda não está disponível." | `editar-perfil.tsx` |
| Configurações | O "Notificações" da Conta virou um botão de ligar e desligar (vermelho ligado, bolinha branca), guardado só no aparelho (`notificacoes_ativas` no AsyncStorage). Ainda não muda nada: a API não manda aviso no celular nem tem rota de preferência. O "Notificações" repetido do Aplicativo saiu | `configuracoes.tsx` |
| Área do responsável | `POST /auth/login` com `perfil: "responsavel"` guarda `token`, `perfil` e `nome_responsavel`. Com um filho, vai direto para a Home; com mais, abre **Escolha o atleta** (`GET /responsavel/atletas`: foto, nome, matrícula e bolinha dos avisos não lidos) e guarda `atleta_selecionado`. As telas do atleta (Home, Agenda, detalhe, Comissão Técnica, Notificações e o sino) usam `urlDoAtleta()`, que troca `/atleta` e as outras rotas por `/responsavel/atletas/{id}/...`. Home: "Bom dia, Carla" em cima e o nome do filho grande. Perfil: subtítulo "Atleta que você acompanha" e "Trocar atleta →" no lugar de "Editar perfil". 404 do filho (inativado ou desvinculado) volta para a escolha. Testado em 29/10 com a Carla em produção | `login-responsavel.tsx`, `escolha-atleta.tsx`, `utils/sessao.ts` |
| Meus dados (responsável) | Aberta pelo Perfil do responsável. `GET` e `PATCH /responsavel` (manda só o que mudou): e-mail (login), telefone e WhatsApp editáveis. Com o servidor novo (o GET manda `endereco.compartilhado_com`), também nome, CPF e o endereço em campos separados: o CEP com 8 dígitos preenche rua, bairro, cidade e UF pelo ViaCEP, e o botão "Mudar também o endereço de Joana" (já ligado, só quando o endereço muda e é o mesmo de um filho) manda `endereco_dos_filhos`; nome novo atualiza a saudação da Home. Testado em produção em 29/10 (nome, CPF, CEP e o endereço levando a Joana junto). Sem esse campo (servidor antigo), nome, CPF e endereço (numa linha só) ficam em cards cinza. "Alterar senha" do responsável usa a mesma tela do atleta com `PUT /responsavel/senha` | `meus-dados.tsx`, `alterar-senha.tsx` |
| Sair da conta | `sairDaConta()` chama `POST /auth/logout` (desiste em 5 s), apaga a sessão (`CHAVES_SESSAO`: token, perfil, atleta_selecionado e nome_responsavel) mesmo se falhar e vai para `/selecao-perfil`. Usada no Perfil e em Configurações | `utils/sessao.ts` |
| Alterar senha | `PUT /atleta/senha`, segue o guia do professor. A lista de requisitos ficou só com "Mínimo 8 caracteres", com o check reagindo ao que é digitado | `alterar-senha.tsx` |
| Agenda | `GET /agenda?page=N`, recarrega ao voltar para a tela e busca mais páginas ao rolar. Timeline: os 3 `passados` da API, o card de próximo compromisso (primeiro que **não terminou** e não foi cancelado; ao terminar, vira passado na virada do minuto) e os futuros, com cabeçalho a cada dia ("Hoje", "Quinta · 05/11"). Filtros: um botão por tipo da API. Status só Confirmado ou Cancelado. O card mostra a descrição e "Chegar às" nos jogos. O card do próximo ("Ver detalhes") e qualquer item da timeline abrem o detalhe do compromisso; servidor sem o detalhe (sem o campo `responsavel` nos eventos) esconde o "Ver detalhes" e o toque não faz nada. A linha de pessoa mostra o `responsavel` ou, sem ele, a `categoria`. A faixa mostra a semana do dia selecionado (bolinha = dia com compromisso; toque rola a lista). Rolando com o dedo, o mês, a semana e o dia destacado seguem o dia que está no alto da lista (com os passados no alto, fica em hoje); durante a rolagem feita pelo app (toque nos dias, setas, calendário) o cabeçalho espera ela terminar. As setas de mês e de semana não voltam antes de hoje; o botão do calendário e a troca de filtro voltam para hoje. Um cancelado antes do próximo fica antes do card, na ordem das datas | `agenda.tsx` |
| Detalhe do compromisso | `GET /agenda/{idEvento}`, uma tela para todos os tipos (visual da antiga `treino-tecnico.tsx`): Confirmado/Cancelado, "Faltam 2h 15min" / "Faltam 3 dias" / "Acontecendo agora" / "Concluído", título inteiro, dia, horário com duração, local. No jogo, card "AACJ × adversário" (placar quando jogado), campeonato ou "Amistoso", fase, pênaltis, confronto e "Chegar às" (só antes do jogo). Categoria, responsável e descrição só quando vêm. Ações rápidas: Abrir mapa (Google Maps pelo local), Adicionar ao calendário (link do Google Agenda preenchido), Compartilhar (compartilhamento do sistema; onde não há, copia o texto) e Entrar em contato. O "Entrar em contato" e o toque na linha "Responsável" (com ›) abrem o perfil da Comissão Técnica e só existem com `responsavel_id`; o responsável em texto antigo aparece sem botão. 404: "Este compromisso não está mais na sua agenda." As telas antigas (`treino-tecnico`, `detalhe-proxima-partida`, `agenda-local`) continuam no projeto com dados de exemplo | `detalhe-compromisso.tsx`, `utils/eventos.ts` |
| Comissão Técnica | `GET /comissao-tecnica/{id}` (o `responsavel_id` do compromisso), aberta pelo detalhe do compromisso: foto (só a autorizada; sem ela, o ícone), nome, cargo, categoria principal, tempo na AACJ, licença, especialidade e categorias atendidas (a principal em destaque). Cada linha só aparece com o dado. Contato institucional: some quando `contato` é `null`; o telefone abre a discagem e o e-mail o app de e-mail. 404 (profissional desativado): "Este profissional não está mais disponível." Sem o selo "Confirmado" | `comissao-tecnica.tsx` |
| Sino (todas as telas) | O próprio componente busca `GET /notificacoes/nao-lidas` sempre que a tela aparece; nenhuma tela passa o número. 0 esconde a bolinha; mais de 9 mostra "9+". Com o responsável, conta os avisos que ele ainda não leu do filho escolhido | `components/botaoNotificacoes.tsx` |
| Notificações | `GET /notificacoes?page=N` (20 por página, mais ao rolar). Seções Hoje / Ontem / Esta semana (desde segunda) / Anteriores, pela `data`. Categorias: **Agenda** (INSCRICAO, REMOCAO, ALTERACAO, CANCELAMENTO, REATIVACAO e AGENDA) e **Avisos da AACJ** (AVISO). Tocar marca como lido (`PATCH /notificacoes/{id}/lida`) e, se for da Agenda, abre a Agenda; o recado da AACJ não abre outra tela. "Marcar todas como lidas": com "Todas" usa `PATCH /notificacoes/lidas`; com uma categoria, marca só os avisos dela que estão na tela | `notificacoes.tsx` |
| Esqueci minha senha | `POST /auth/esqueci-senha` com `email` e o `perfil` que vem do login (atleta ou responsável). O modal mostra a `message` da API (link vale 24 horas); o OK volta para o login do perfil. Erros (vazio, 422, 429, sem conexão) aparecem acima do botão. A resposta é a mesma exista ou não o e-mail. No backend local o e-mail vai para o log; e-mail de verdade só pela produção, e só para quem pode entrar no app | `esqueci-senha.tsx` |
| Desempenho | Desativado: saiu do menu, da Home e da Ajuda. As telas continuam no projeto | — |

## O que falta (sugestão de ordem)

1. Detalhes da Agenda, sem pressa (testada em 24/10 com a Joana local, a do servidor e 48 compromissos simulados):
   - a contagem dos filtros usa os `totais` da API (todas as páginas); só no servidor sem `totais` ela soma o que já carregou;
   - com poucos compromissos, o dia tocado no fim da lista não chega ao topo, porque a lista acaba antes;
   - títulos longos são cortados na timeline ("Time Azul x Time Visi…"); no detalhe do compromisso aparecem inteiros;

## Pendências do lado do backend

- Gols e assistências por atleta (hoje `null`) dependem do painel registrar quem fez cada gol.
- `defesas` e `gols_sofridos` do goleiro não existem na rota de estatísticas. Pedir só se o Tiago quiser.
- Treino com categoria "Geral (sem categoria)" vem com `categoria: null` de propósito.
- **Publicado na produção em 24/10** (conferido em 25/10): agenda com `?tipo=`, `?de=&ate=` (até 93 dias; muda a resposta
  para `{ periodo, eventos, totais }`), `totais` por tipo e `concluido`; detalhe `GET /agenda/{idEvento}` (só campos
  seguros: adversário, fase, rodada, prorrogação, pênaltis, confronto; sem colegas nem escalação); `responsavel` em todo
  evento (campo opcional "Responsável pela atividade" no evento e na Grade de Treinos); e a súmula (S2), que preenche
  gols e assistências nas estatísticas quando o jogo tem gol lançado (sem súmula continua `null`). O `?de=&ate=` ainda
  não é usado pelo app (serviria para voltar a semanas passadas na Agenda).
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
- **Pendente no backend (pedido em 26/10):** esconder a barra do subtítulo vazio no carrossel do site; avisar no
  painel ao escolher arquivo acima de 10 MB; recusar time masculino da AACJ em categoria feminina (feminino em
  masculino continua permitido até o professor responder a pergunta 14); limpar os dados de teste locais (banner
  "TESTE - apagar", "Campeonato Teste Imagens" e a convocação da Joana). `imagens:reprocessar` na produção só com
  o OK do Tiago e backup. A Joana local se chama "Joana maria" (nome mudado num teste do Editar perfil).
- **Pushes do backend:** durante o desenvolvimento, só `git push origin feature/agenda-eventos`; a `main` do GitHub fica
  igual ao servidor e só recebe o código na publicação.
- Produção: e-mails por SMTP desde 24/10 (antes `MAIL_MAILER=log` e nada saía). No terminal SSH do Plesk, use
  `/opt/plesk/php/8.4/bin/php artisan ...` (o `php` padrão é 7.2; o site roda o 8.4).
