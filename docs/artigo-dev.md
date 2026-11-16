# Bússola Animal: apontei uma IA para 39 prefeituras e descobri por que tanta gente não castra o próprio bicho

> Rascunho para publicação no DEV. Revise, ajuste o tom para a sua voz e troque o que estiver entre colchetes.

**Site:** https://moraesalves.github.io/bussola-animal/
**Código e dados:** https://github.com/moraesalves/bussola-animal

## A ideia

Li o [Ghost Rovers](https://dev.to/earlgreyhot1701d/ghost-rovers-i-called-12-machines-nasa-left-behind-one-picked-up-2575), um site feito em um dia com IA sobre as máquinas que a NASA deixou na Lua e em Marte, e fiquei com uma pergunta: dá para fazer algo igualmente simples que ajude cães e gatos de verdade, sem gastar nada além do uso da IA?

A resposta virou a Bússola Animal, um site estático com três módulos:

- **Castra Aqui:** você digita a cidade e recebe o passo a passo da castração gratuita.
- **Denuncie Certo:** onde denunciar maus-tratos, que provas juntar e um montador do texto da denúncia.
- **Primeiros 90 Dias:** um guia para quem acabou de adotar não desistir.

## O que eu fiz e o que a IA fez

Não escrevi o código. Dei a direção, escolhi entre as opções, defini as regras e cobrei rigor. O Claude pesquisou as fontes, montou as fichas, escreveu o site e testou. [Ajuste este parágrafo para descrever como foi para você.]

## A descoberta: o problema não é falta de serviço, é falta de mapa

Comecei achando que faltava um mapa de clínicas. A pesquisa mostrou outra coisa. A castração gratuita existe em três camadas (federal, estadual e municipal), e cada prefeitura tem uma porta de entrada diferente:

- portal 156 na capital;
- site próprio em Guarulhos;
- aplicativo em Santo André, Mogi das Cruzes e Ribeirão Pires;
- WhatsApp em São Bernardo;
- balcão presencial em Mauá;
- senha distribuída em dia marcado em Carapicuíba.

Muita gente cadastra o animal no sistema federal e acha que está na fila. Não está: quem agenda é a prefeitura.

## A regra que deu trabalho

Decidimos cedo que só entraria informação de página oficial, com data de conferência visível. Isso custou caro em número:

- das 39 cidades da Grande São Paulo, **23** têm ficha conferida;
- as outras **16** aparecem como "em verificação".

Dava para inflar. Várias prefeituras têm páginas sobre castração, só que de 2019, 2020 ou 2022. Em vez de publicar isso como certo ou esconder, criamos um terceiro estado: a **pista**. A ficha diz "ainda não conferimos" e mostra o que já foi achado, com o aviso de que falta confirmar.

## O que deu errado

- A busca aberta só devolvia notícia de mutirão, que envelhece em semanas. Passamos a buscar apenas dentro dos domínios das prefeituras.
- Uma cidade do tamanho de Osasco não tem, no site oficial, uma página atual dizendo como pedir a castração.
- As cidades pequenas quase não têm programa próprio. Dependem dos mutirões do Estado.
- [Acrescente aqui o que você sentiu de dificuldade no processo.]

## Como foi construído

- HTML, CSS e JavaScript puros, sem framework, publicados no GitHub Pages.
- Dados em dois arquivos JSON abertos. Qualquer pessoa pode sugerir correção.
- Ilustrações desenhadas em SVG no próprio código: uma bússola com agulha de patinha, um cão caramelo e um gato preto.
- Fontes tipográficas abertas servidas do próprio site, para não depender de terceiros.
- Nada de cadastro, anúncio ou coleta de dados. O montador da denúncia roda inteiro no navegador.
- Testes com navegador automatizado em tela de computador e de celular.

## O que falta

- Conferir as 16 cidades restantes, por telefone ou com ajuda de moradores.
- Levar o Denuncie Certo dos 5 estados conferidos para os 27.
- Revisão do guia de adoção por um médico-veterinário.

## Quer ajudar?

Se você sabe como funciona a castração gratuita na sua cidade, ou qual é o canal oficial de denúncia no seu estado, abra uma issue com o link da fonte. Não precisa saber programar.

O diário completo do projeto, com cada decisão e cada erro, está em [`docs/diario.md`](https://github.com/moraesalves/bussola-animal/blob/main/docs/diario.md).
