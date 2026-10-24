# Progresso do app AACJ: onde paramos

> Para o Claude em outro PC: leia este arquivo inteiro antes de mexer no código. Ele resume o que já foi
> feito, as regras combinadas com o Tiago e o que falta. Confira o código antes de confiar no que está
> aqui: o arquivo pode estar desatualizado em relação aos commits mais novos (`git log`).

Última atualização: 24/10/2026. Para o último commit, veja `git log`.

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
| Home: banner | Próximo `JOGO` não cancelado da página 1 de `GET /agenda`. Sem jogo, o banner some | `home.tsx` |
| Home: próximas atividades | Os 3 primeiros não cancelados de `proximos` (mesma chamada do banner): "Hoje / Amanhã / Quarta-feira · 28/10/2026", título, local (sem local, a categoria) e horário (sem horário, "A definir"). Vazio: "Nenhuma atividade marcada por enquanto." Toque abre a Agenda | `home.tsx` |
| Home: saudação | Bom dia / Boa tarde / Boa noite pelo horário do aparelho | `home.tsx` |
| Home: "Seus números" e modal de estatísticas | `GET /atleta/estatisticas`. "Seus números" usa o `total`. No modal, o botão da categoria (ex.: "Sub-13") mostra os 6 números de `categoria_atual`; o botão "Total" mostra **só os gols** de `total` (desde que entrou, somando todas as categorias). Sem `categoria_atual` (`null` ou servidor sem o bloco), só aparece o "Total". `null` aparece como "—", diferente de 0. Gols e assistências vêm `null` até o backend registrar. Defesas e gols sofridos do goleiro não existem na API e mostram "—" | `home.tsx` |
| Editar perfil | `GET` e `PATCH /atleta` (manda só o que mudou). Nome, telefone, e-mail, CPF e data de nascimento editáveis; categoria e matrícula só leitura. A API só deixa mudar dia e mês da data (ano diferente dá 422 com a mensagem da secretaria) | `editar-perfil.tsx`, `utils/formatos.ts` |
| Sair da conta | `sairDaConta()` chama `POST /auth/logout` (desiste em 5 s), apaga `token` e `perfil` mesmo se falhar e vai para `/selecao-perfil`. Usada no Perfil e em Configurações | `utils/sessao.ts` |
| Alterar senha | `PUT /atleta/senha`, segue o guia do professor. A lista de requisitos ficou só com "Mínimo 8 caracteres", com o check reagindo ao que é digitado | `alterar-senha.tsx` |
| Agenda | `GET /agenda?page=N`, recarrega ao voltar para a tela e busca mais páginas ao rolar. Timeline: os 3 `passados` da API, o card de próximo compromisso (primeiro que **não terminou** e não foi cancelado; ao terminar, vira passado na virada do minuto) e os futuros, com cabeçalho a cada dia ("Hoje", "Quinta · 05/11"). Filtros: um botão por tipo da API. Status só Confirmado ou Cancelado. O card mostra a descrição e "Chegar às" nos jogos; "Ver detalhes" está **escondido** até as telas de detalhe usarem a API. A linha de pessoa mostra `responsavel` (pedido ao backend) ou, até lá, a `categoria`. A faixa mostra a semana do dia selecionado (bolinha = dia com compromisso; toque rola a lista). As setas de mês e de semana não voltam antes de hoje; o botão do calendário e a troca de filtro voltam para hoje. Um cancelado antes do próximo fica antes do card, na ordem das datas | `agenda.tsx` |
| Sino (todas as telas) | O próprio componente busca `GET /notificacoes/nao-lidas` sempre que a tela aparece; nenhuma tela passa o número. 0 esconde a bolinha; mais de 9 mostra "9+". Só busca com `perfil` = `"atleta"` (o responsável ainda não está integrado) | `components/botaoNotificacoes.tsx` |
| Notificações | `GET /notificacoes?page=N` (20 por página, mais ao rolar). Seções Hoje / Ontem / Esta semana (desde segunda) / Anteriores, pela `data`. Categorias: **Agenda** (INSCRICAO, REMOCAO, ALTERACAO, CANCELAMENTO, REATIVACAO e AGENDA) e **Avisos da AACJ** (AVISO). Tocar marca como lido (`PATCH /notificacoes/{id}/lida`) e, se for da Agenda, abre a Agenda; o recado da AACJ não abre outra tela. "Marcar todas como lidas": com "Todas" usa `PATCH /notificacoes/lidas`; com uma categoria, marca só os avisos dela que estão na tela | `notificacoes.tsx` |
| Esqueci minha senha | `POST /auth/esqueci-senha` com `email` e o `perfil` que vem do login (atleta ou responsável). O modal mostra a `message` da API (link vale 24 horas); o OK volta para o login do perfil. Erros (vazio, 422, 429, sem conexão) aparecem acima do botão. A resposta é a mesma exista ou não o e-mail. No backend local o e-mail vai para o log; e-mail de verdade só pela produção, e só para quem pode entrar no app | `esqueci-senha.tsx` |
| Desempenho | Desativado: saiu do menu, da Home e da Ajuda. As telas continuam no projeto | — |

## O que falta (sugestão de ordem)

1. **Responsáveis no Perfil** (`perfil.tsx` tem um comentário marcando o lugar): `GET /atleta` traz
   `responsaveis: [{ nome, grau_parentesco }]`.
2. **Login e área do responsável**: `login-responsavel.tsx` hoje só navega para `/home`. Depois vêm a escolha do filho
   (`GET /responsavel/atletas`) e as mesmas telas do atleta em modo leitura, sob `/responsavel/atletas/{idAtleta}/...`.
3. Na Home, o 401 da `/agenda` e das estatísticas é ignorado; só o de `/atleta` volta para o login. É um detalhe.
4. Detalhes da Agenda, sem pressa (testada em 24/10 com a Joana local, a do servidor e 48 compromissos simulados):
   - a contagem dos filtros só soma as páginas já carregadas e cresce ao rolar (a API não manda o total por tipo);
   - com poucos compromissos, o dia tocado no fim da lista não chega ao topo, porque a lista acaba antes;
   - títulos longos são cortados na timeline ("Time Azul x Time Visi…").

## Pendências do lado do backend

- Gols e assistências por atleta (hoje `null`) dependem do painel registrar quem fez cada gol.
- `defesas` e `gols_sofridos` do goleiro não existem na rota de estatísticas. Pedir só se o Tiago quiser.
- **Responsável do evento** (`responsavel` em cada evento de `GET /agenda`): o prompt já foi passado ao backend. Ele vem da Grade
  de Treinos ("Novo Horário") e é copiado pelo "Gerar agenda do mês". O app já mostra o campo quando ele vier.
- Treino com categoria "Geral (sem categoria)" vem com `categoria: null` de propósito.
- Pedidos para a agenda, passados ao backend em 24/10 (ainda sem resposta):
  - filtro por tipo (`?tipo=JOGO`): o banner da Home só procura o jogo na página 1 e some se houver mais de 20 eventos antes;
  - filtro por período (`?de=&ate=`), com os concluídos: para a Agenda mostrar semanas passadas e pular meses sem baixar página por página;
  - totais por tipo na resposta: para os contadores dos filtros da Agenda;
  - detalhe `GET /agenda/{idEvento}`: para o "Ver detalhes" da Agenda e do banner da Home, hoje sem destino.
- Produção: e-mails por SMTP desde 24/10 (antes `MAIL_MAILER=log` e nada saía). No terminal SSH do Plesk, use
  `/opt/plesk/php/8.3/bin/php artisan ...` (o `php` padrão é 7.2).
