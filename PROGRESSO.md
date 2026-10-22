# Progresso do app AACJ: onde paramos

> Para o Claude em outro PC: leia este arquivo inteiro antes de mexer no código. Ele resume o que já foi
> feito, as regras combinadas com o Tiago e o que falta. Confira o código antes de confiar no que está
> aqui: o arquivo pode estar desatualizado em relação aos commits mais novos (`git log`).

Última atualização: 22/10/2026, último commit `14bea97`.

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
  - local: Joana tem id 29, Sub-13 Feminino e 6 treinos de 03/11 a 14/11;
  - servidor: Joana tem id 17.

## Regras combinadas com o Tiago

- **Commits sem coautoria** (sem a linha `Co-Authored-By`). Mensagem em português com prefixo `feat:` ou `fix:`.
  Commit e push só quando ele pedir.
- **Antes de qualquer commit ou deploy, conferir:**
  - `SERVIDOR` em `src/config/api.ts` está no endereço de **produção**;
  - `HORARIO_SIMULADO` em `src/app/agenda.tsx` está `null` (é um horário fixo usado só para teste).
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
| Home: saudação | Bom dia / Boa tarde / Boa noite pelo horário do aparelho | `home.tsx` |
| Home: "Seus números" e modal de estatísticas | `GET /atleta/estatisticas`: `total` e `por_time` (seletor de time). `null` aparece como "—", diferente de 0. Gols e assistências vêm `null` até o backend registrar. Defesas e gols sofridos do goleiro não existem na API e mostram "—" | `home.tsx` |
| Editar perfil | `GET` e `PATCH /atleta` (manda só o que mudou). Nome, telefone, e-mail, CPF e data de nascimento editáveis; categoria e matrícula só leitura. A API só deixa mudar dia e mês da data (ano diferente dá 422 com a mensagem da secretaria) | `editar-perfil.tsx`, `utils/formatos.ts` |
| Alterar senha | `PUT /atleta/senha`, segue o guia do professor. A lista de requisitos ficou só com "Mínimo 8 caracteres", com o check reagindo ao que é digitado | `alterar-senha.tsx` |
| Agenda (só visual) | Timeline com dados **fixos**: "Próximo compromisso" troca na virada do minuto, a lista abre rolada nos 3 últimos passados e só a timeline rola | `agenda.tsx` |
| Desempenho | Desativado: saiu do menu, da Home e da Ajuda. As telas continuam no projeto | — |

## O que falta (sugestão de ordem)

1. **Agenda real** (`agenda.tsx`, hoje com o array fixo `compromissos`). Dados de `GET /agenda?page=N`: `proximos` paginados
   (20 por página, bloco `paginacao`) e `passados` (os 3 últimos). Pontos a decidir **com o Tiago** antes de codar:
   - a tela mostra uma faixa de semana e o mês fixos ("Agosto 2026"), mas a API manda uma lista de vários dias.
     Decidir se a faixa de dias filtra pela data ou se a lista vira por data;
   - mapear `tipo` (JOGO, TREINO, CAMPEONATO, EVENTO, REUNIAO, CONFRATERNIZACAO, AVALIACAO) para os filtros do app
     (Todos, Treinos, Campeonatos, Avaliações, Reuniões) e decidir onde entram EVENTO e CONFRATERNIZACAO;
   - `situacao` só vem `CONFIRMADO` ou `CANCELADO`: o status "Alterado" do app deve sumir, porque a mudança chega como aviso;
   - mostrar `descricao` e, no jogo, "Chegar às HH:MM" (`jogo.horario_chegada`);
   - horário `null` aparece como "A definir".
2. **Avisos**: contador do sino em `components/botaoNotificacoes.tsx` (hoje o padrão é 2) com `GET /notificacoes/nao-lidas`;
   tela `notificacoes.tsx` (dados fixos) com `GET /notificacoes`, `PATCH /notificacoes/{id}/lida` e `PATCH /notificacoes/lidas`.
3. **Sair da conta** (`configuracoes.tsx`): hoje só navega para `/`. Precisa chamar `POST /auth/logout`, apagar `token` e
   `perfil` e ir para `/selecao-perfil`.
4. **Esqueci minha senha** (`esqueci-senha.tsx`, recebe `perfil` por parâmetro): `POST /auth/esqueci-senha` com `email` e `perfil`.
   A resposta é sempre a mesma, exista ou não o e-mail.
5. **Responsáveis no Perfil** (`perfil.tsx` tem um comentário marcando o lugar): `GET /atleta` traz
   `responsaveis: [{ nome, grau_parentesco }]`.
6. **Login e área do responsável**: `login-responsavel.tsx` hoje só navega para `/home`. Depois vêm a escolha do filho
   (`GET /responsavel/atletas`) e as mesmas telas do atleta em modo leitura, sob `/responsavel/atletas/{idAtleta}/...`.
7. Na Home, o 401 da `/agenda` e das estatísticas é ignorado; só o de `/atleta` volta para o login. É um detalhe.

## Pendências do lado do backend

- Gols e assistências por atleta (hoje `null`) dependem do painel registrar quem fez cada gol.
- `defesas` e `gols_sofridos` do goleiro não existem na rota de estatísticas. Pedir só se o Tiago quiser.
