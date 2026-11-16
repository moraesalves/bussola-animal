# Dados

## `castra-aqui.json`

Uma entrada por município, dentro de `municipios`.

| Campo | Significado |
|---|---|
| `id` | identificador sem acentos, usado no endereço (`#cidade=guarulhos`) |
| `nome` | nome do município |
| `status` | `conferido` (ficha completa) ou `em_verificacao` (mostra o caminho geral) |
| `orgao` | órgão responsável |
| `programa` | nome do programa |
| `quem` | quem pode pedir |
| `passos` | passo a passo, em ordem |
| `documentos` | o que levar |
| `contatos` | lista de `{rotulo, valor, href}` |
| `observacoes` | avisos úteis |
| `fontes` | lista de `{titulo, url}`, sempre páginas oficiais |
| `pista` | só em cidades em verificação: `{texto, rotulo, href}` com o que já foi achado, ainda sem confirmação |
| `conferido_em` | data da última verificação (AAAA-MM-DD) |

Regras: só entra o que estiver em página oficial; datas de mutirão não entram; quando a fonte não informa algo, a ficha diz isso em vez de supor.

## `denuncie-certo.json`

- `geral.canais`: caminhos que valem em todo o país.
- `estados`: uma entrada por unidade da federação, com `status` (`conferido` ou `em_verificacao`), `canais` (`{titulo, texto, href, rotulo}`), `fontes` e `conferido_em`.
- `vozes`: pessoas citadas, com `nome`, `descricao` e `instagram` (sem o @).
- `organizacoes`: entidades citadas, com `nome`, `descricao` e `url`.

Regra para `vozes`: só entra perfil cujo endereço foi confirmado em fonte pública, e a descrição é neutra, sem partido nem adjetivo.
