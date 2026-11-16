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

### Primeira versão no ar

- **Nome:** uma busca por "Bússola Animal" não mostrou nenhum projeto com esse nome. Não é uma checagem de marca registrada.
- **Fichas:** levantadas seis cidades com página oficial clara: São Paulo, Guarulhos, Santo André, São Bernardo do Campo, Mauá e Ribeirão Pires. As outras 33 aparecem no site como "em verificação", com o caminho geral.
- **Achado da pesquisa:** cada cidade usa um canal diferente. Portal 156 na capital, site próprio em Guarulhos, aplicativo em Santo André e Ribeirão Pires, WhatsApp em São Bernardo e balcão presencial em Mauá. Isso confirma a tese do projeto.
- **O que deu errado:** a busca aberta trazia sobretudo notícias de mutirões, que envelhecem rápido. Passamos a buscar só dentro dos domínios das prefeituras. Para Osasco, só achamos páginas de 2020 a 2022, então a cidade ficou fora das conferidas.
- **Lacunas assumidas:** São Bernardo e Ribeirão Pires não publicam a lista de documentos; a ficha diz isso em vez de supor.
- **Visual:** bússola ilustrada com agulha de patinha que aponta para o destino escolhido, cão caramelo e gato preto desenhados em SVG, fontes abertas servidas do próprio site para não depender de terceiros.
- **Testes:** navegador automatizado em tela de computador e de celular: busca com sugestões, ficha conferida, ficha em verificação, cidade fora da lista. Sem erros no console e sem rolagem lateral.

### Segundo lote de fichas

- Conferidas mais sete cidades: São Caetano do Sul, Barueri, Carapicuíba, Cotia, Taboão da Serra, Suzano e Mogi das Cruzes. Total: 13 de 39.
- **Três modelos de atendimento apareceram:** fila permanente (capital, Santo André, Mauá, Mogi), cadastro para convocação (Suzano, São Caetano) e mutirão com inscrição em data marcada (Barueri, Carapicuíba, Cotia, Taboão). No terceiro modelo a ficha ensina a acompanhar a abertura, já que não registramos datas.
- **Ficaram de fora:** Diadema (a página oficial de castração ainda é a do programa de 2022), Itaquaquecetuba (o site só fala de adoção e vacinação) e Osasco (a carta de serviços cita a castração, mas sem dizer como pedir; as notícias que explicam são de 2022 e 2023).
- **Cuidado tomado:** critérios de idade e peso só entraram quando vinham de página de 2026, e a ficha diz o ano.

### Terceiro lote de fichas

- Conferidas mais seis cidades: Itapevi, Embu das Artes, Santana de Parnaíba, Itapecerica da Serra, Ferraz de Vasconcelos e Jandira. Total: 19 de 39.
- **Nova ideia que saiu do problema:** em cinco cidades achamos informação oficial, mas velha ou incompleta (Franco da Rocha, Poá, Caieiras, Osasco e Diadema). Em vez de escolher entre publicar como certo ou esconder, criamos o campo "pista": a ficha continua "em verificação", mas mostra o que já foi achado, com o aviso de que falta confirmar.
- **Particularidades:** Santana de Parnaíba exige que o morador esteja "homologado" no cadastro municipal; Ferraz só atende animais sem raça definida; Embu das Artes e Itapecerica pedem o SinPatinhas.
- **Sem resultado:** o site de Francisco Morato só trata de vacinação antirrábica.
- **Limite assumido:** a fonte mais recente de Itapevi é de julho de 2025, e a ficha diz isso.

### Quarto lote: fechamento das 39

- Pesquisadas todas as cidades que faltavam. Conferidas mais quatro: Guararema, Mairiporã, Santa Isabel e Franco da Rocha. Total final desta rodada: 23 de 39.
- Das 16 que ficaram em verificação, 15 ganharam pista. Só Embu-Guaçu ficou sem nada: a busca no site da prefeitura não devolveu nenhuma página sobre castração.
- **Padrão das cidades pequenas:** não têm programa próprio publicado e dependem dos mutirões do Estado (Pro Pet SP), com inscrição feita na prefeitura. É o caso de Juquitiba e Salesópolis.
- **Por que não forçamos o número:** várias cidades têm páginas oficiais, só que antigas (Cajamar 2020 a 2023, Vargem Grande Paulista 2019, Diadema 2022 e 2023) ou sem data (Rio Grande da Serra). Publicar isso com selo de "conferida" trairia a regra do projeto. Viraram pistas.
- **Segunda busca valeu a pena:** refazer a pesquisa de Franco da Rocha com outros termos trouxe as regras completas do CastraPet e a confirmação na lista de serviços da Prefeitura.
- **Limite do método:** tudo foi feito por busca em páginas públicas. Para as 16 restantes, o caminho é ligar para a prefeitura ou contar com moradores.

### Denuncie Certo

- **Estrutura:** botão de emergência (190) no topo, o que a lei considera maus-tratos, canais que valem em todo o país, canais por estado, lista de provas, montador do texto da denúncia e perfis que dão visibilidade à causa.
- **Estados conferidos em fonte oficial:** São Paulo (Depa), Rio de Janeiro (Linha Verde do Disque Denúncia), Minas Gerais (181 e LigMinas 155), Paraná (BO pela internet, 181 e 197) e Rio Grande do Sul (Delegacia Online Amiga dos Animais e 181). Os outros 22 mostram o caminho geral.
- **Montador do texto:** roda inteiro no navegador. Nada do que a pessoa digita sai do aparelho, o que mantém a promessa de não coletar dados.
- **Vozes da causa:** Luisa Mell, Delegado Bruno Lima, Felipe Becari e Julinho Casares, com o Instagram de cada um, além do Instituto Ampara Animal e do Instituto Caramelo. Só entrou perfil com endereço confirmado em fonte pública. As descrições são neutras e a seção avisa que marcar um perfil não substitui a denúncia oficial e que a lista não é apoio político.
- **Achado:** a pena para maus-tratos a cães e gatos (2 a 5 anos, Lei 14.064/2020) aparece em várias páginas oficiais, mas com a lei antiga em outras. O site cita as duas leis.

### Primeiros 90 Dias

- **Formato:** a regra prática dos três tempos (3 dias, 3 semanas, 3 meses), quatro fases com lista de tarefas, problemas comuns e um bloco "antes de desistir".
- **Cão ou gato:** um botão troca as tarefas específicas de cada espécie.
- **Lista de tarefas:** as marcações ficam no armazenamento do próprio navegador. Se ele estiver bloqueado, a página funciona do mesmo jeito, só não lembra.
- **Ligação entre módulos:** a tarefa de castrar leva ao Castra Aqui, e o bloco sobre abandono cita a mesma lei do Denuncie Certo.
- **Limite:** o conteúdo é orientação geral de adaptação, sem revisão de médico-veterinário. A página diz isso.

### Testes do site completo

- Navegador automatizado em tela de computador e de celular, nas três páginas: bússola e links, busca por cidade, as 39 fichas, seleção de estado, montagem e cópia do texto da denúncia, troca cão/gato e persistência das tarefas. Sem erros e sem rolagem lateral.

### Pendências

- 16 cidades e 22 estados em verificação, à espera de confirmação por telefone ou de colaboração de moradores.
- Revisão do guia Primeiros 90 Dias por um médico-veterinário.
- Conferir de tempos em tempos os perfis citados e os canais por estado.
