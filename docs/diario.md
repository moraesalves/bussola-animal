# Diário do projeto

Registro das decisões, fontes e correções da Bússola Animal. Serve de base para o artigo no DEV.

## 2026-11-16 — Dia zero

### De onde veio a ideia

A inspiração foi o projeto [Ghost Rovers](https://dev.to/earlgreyhot1701d/ghost-rovers-i-called-12-machines-nasa-left-behind-one-picked-up-2575): um site estático, feito em cerca de nove horas com apoio de IA, usando só registros públicos conferidos um a um. A pergunta foi: dá para fazer algo igualmente simples que ajude cães e gatos de verdade, sem gastar nada?

### Ideias avaliadas

1. **Os que esperam** — site sobre os animais há mais tempo no Centro Municipal de Adoção de São Paulo. Descartada por ora: não confirmamos se há dados individuais de tempo de espera.
2. **A conta que não fecha** — painel com dados nacionais de entradas e saídas de abrigos. Descartada: informa, mas não leva a uma ação.
3. **Mapa da castração gratuita** — escolhida.

### O que a pesquisa mudou

O problema da castração gratuita não é geográfico, é de burocracia. Há três camadas sobrepostas (federal, estadual e municipal), cada uma com sua porta de entrada. Exemplo: cadastrar o animal no SinPatinhas não garante vaga; critérios e agendamento ficam com cada município. Por isso o "mapa" virou um decodificador por cidade, o **Castra Aqui**.

### Decisões

- **Nome:** Bússola Animal, porque o projeto passou a ter três módulos (Castra Aqui, Denuncie Certo, Primeiros 90 Dias) e todos fazem a mesma coisa: orientar.
- **Escopo inicial:** capital paulista e Região Metropolitana (39 municípios), não os 645 do estado.
- **Só informação estável:** programas permanentes e canais de inscrição. Datas de mutirão ficam de fora.
- **Data de verificação em cada ficha**, com link para a fonte oficial.
- **Hospedagem:** GitHub Pages, custo zero.

### Pendências

- Verificar se o nome "Bússola Animal" já é usado por outro projeto.
- Levantar as fichas dos 39 municípios.
