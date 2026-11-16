(function () {
  "use strict";

  var REPO = "https://github.com/moraesalves/bussola-animal";

  /* ---------- Bússola ---------- */
  var bussola = document.getElementById("bussola");
  var agulha = document.getElementById("agulha");
  var dica = document.getElementById("dica-bussola");
  var dicaPadrao = dica.textContent;
  var marcas = document.getElementById("marcas");

  for (var i = 0; i < 24; i++) {
    var linha = document.createElementNS("http://www.w3.org/2000/svg", "line");
    var grande = i % 6 === 0;
    linha.setAttribute("x1", 200);
    linha.setAttribute("x2", 200);
    linha.setAttribute("y1", 56);
    linha.setAttribute("y2", grande ? 72 : 66);
    linha.setAttribute("stroke-width", grande ? 6 : 3);
    linha.setAttribute("transform", "rotate(" + i * 15 + " 200 200)");
    marcas.appendChild(linha);
  }

  var anguloAtual = 0;
  function apontar(alvo) {
    // gira pelo caminho mais curto
    var diferenca = ((alvo - anguloAtual + 540) % 360) - 180;
    anguloAtual += diferenca;
    agulha.style.transform = "rotate(" + anguloAtual + "deg)";
  }

  bussola.classList.add("assentando");
  bussola.addEventListener("animationend", function () {
    bussola.classList.remove("assentando");
  });

  Array.prototype.forEach.call(document.querySelectorAll(".destino"), function (destino) {
    function entrar() {
      apontar(Number(destino.dataset.angulo));
      dica.textContent = destino.dataset.dica;
    }
    function sair() {
      apontar(0);
      dica.textContent = dicaPadrao;
    }
    destino.addEventListener("mouseenter", entrar);
    destino.addEventListener("focus", entrar);
    destino.addEventListener("mouseleave", sair);
    destino.addEventListener("blur", sair);
  });

  /* ---------- Castra Aqui ---------- */
  var campo = document.getElementById("cidade");
  var lista = document.getElementById("sugestoes");
  var resultado = document.getElementById("resultado");
  var listaCidades = document.getElementById("lista-cidades");
  var formulario = document.getElementById("busca");
  var municipios = [];
  var selecionada = -1;

  function normalizar(texto) {
    return texto.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  }

  function el(tag, classe, texto) {
    var no = document.createElement(tag);
    if (classe) no.className = classe;
    if (texto) no.textContent = texto;
    return no;
  }

  function dataPorExtenso(iso) {
    var p = iso.split("-");
    return p[2] + "/" + p[1] + "/" + p[0];
  }

  function bloco(titulo, itens, classe, ordenada) {
    var secao = el("section");
    secao.appendChild(el("h4", null, titulo));
    var ul = el(ordenada ? "ol" : "ul", classe);
    itens.forEach(function (item) {
      var li = el("li");
      if (ordenada) li.appendChild(el("span", null, item));
      else li.textContent = item;
      ul.appendChild(li);
    });
    secao.appendChild(ul);
    return secao;
  }

  function fichaConferida(m) {
    var ficha = el("article", "ficha");
    var topo = el("header", "ficha-topo");
    topo.appendChild(el("h3", null, m.nome));
    topo.appendChild(el("p", null, m.programa));
    ficha.appendChild(topo);

    var corpo = el("div", "ficha-corpo");
    corpo.appendChild(bloco("Quem pode pedir", m.quem, "marcados"));
    corpo.appendChild(bloco("Passo a passo", m.passos, "passos", true));
    corpo.appendChild(bloco("O que levar", m.documentos, "marcados"));

    var contatos = el("section");
    contatos.appendChild(el("h4", null, "Onde resolver"));
    var ul = el("ul", "contatos");
    m.contatos.forEach(function (c) {
      var li = el("li");
      li.appendChild(el("span", "rotulo", c.rotulo + ":"));
      if (c.href) {
        var a = el("a", null, c.valor);
        a.href = c.href;
        if (/^https?:/.test(c.href)) { a.target = "_blank"; a.rel = "noopener"; }
        li.appendChild(a);
      } else {
        li.appendChild(el("span", null, c.valor));
      }
      ul.appendChild(li);
    });
    contatos.appendChild(ul);
    contatos.appendChild(el("p", "orgao", "Responsável: " + m.orgao + "."));
    corpo.appendChild(contatos);

    if (m.observacoes && m.observacoes.length) {
      var aviso = el("section", "aviso");
      aviso.appendChild(el("h4", null, "Vale saber"));
      var obs = el("ul", "marcados");
      m.observacoes.forEach(function (o) { obs.appendChild(el("li", null, o)); });
      aviso.appendChild(obs);
      corpo.appendChild(aviso);
    }
    ficha.appendChild(corpo);

    var pe = el("footer", "ficha-pe");
    pe.appendChild(el("span", "selo selo-ok", "Conferida em " + dataPorExtenso(m.conferido_em)));
    m.fontes.forEach(function (f) {
      var a = el("a", null, "Fonte: " + f.titulo);
      a.href = f.url; a.target = "_blank"; a.rel = "noopener";
      pe.appendChild(a);
    });
    ficha.appendChild(pe);
    return ficha;
  }

  function fichaEmVerificacao(m) {
    var ficha = el("article", "ficha espera");
    var topo = el("header", "ficha-topo");
    topo.appendChild(el("h3", null, m.nome));
    topo.appendChild(el("p", null, "Ainda não conferimos esta cidade. Este é o caminho geral, que vale para qualquer município paulista."));
    ficha.appendChild(topo);

    var corpo = el("div", "ficha-corpo");
    corpo.appendChild(bloco("Por onde começar", [
      "Procure \"castração\" no site da Prefeitura de " + m.nome + " ou ligue para a prefeitura e peça o setor de zoonoses ou de bem-estar animal.",
      "Pergunte se há programa permanente, fila de espera ou mutirão previsto, e quais documentos levar.",
      "Cadastre seu animal no SinPatinhas, o RG Animal gratuito do governo federal. Muitas cidades pedem esse cadastro."
    ], "passos", true));

    var aviso = el("section", "aviso");
    aviso.appendChild(el("h4", null, "Vale saber"));
    var obs = el("ul", "marcados");
    obs.appendChild(el("li", null, "Ter o RG Animal não garante vaga. Quem define critérios e agenda é cada prefeitura."));
    obs.appendChild(el("li", null, "O Governo do Estado leva mutirões gratuitos aos municípios pelo programa Pro Pet SP. A inscrição é feita pela prefeitura da cidade."));
    aviso.appendChild(obs);
    corpo.appendChild(aviso);

    var contatos = el("section");
    contatos.appendChild(el("h4", null, "Links úteis"));
    var ul = el("ul", "contatos");
    var li = el("li");
    li.appendChild(el("span", "rotulo", "RG Animal:"));
    var a = el("a", null, "sinpatinhas.mma.gov.br");
    a.href = "https://sinpatinhas.mma.gov.br"; a.target = "_blank"; a.rel = "noopener";
    li.appendChild(a);
    ul.appendChild(li);
    contatos.appendChild(ul);
    corpo.appendChild(contatos);
    ficha.appendChild(corpo);

    var pe = el("footer", "ficha-pe");
    pe.appendChild(el("span", "selo selo-espera", "Em verificação"));
    var ajuda = el("a", null, "Sabe como funciona em " + m.nome + "? Conte para nós");
    ajuda.href = REPO + "/issues/new?title=" + encodeURIComponent("Castra Aqui: " + m.nome);
    ajuda.target = "_blank"; ajuda.rel = "noopener";
    pe.appendChild(ajuda);
    ficha.appendChild(pe);
    return ficha;
  }

  function mostrar(m) {
    resultado.textContent = "";
    resultado.appendChild(m.status === "conferido" ? fichaConferida(m) : fichaEmVerificacao(m));
    campo.value = m.nome;
    fecharSugestoes();
    if (history.replaceState) history.replaceState(null, "", "#cidade=" + m.id);
    resultado.scrollIntoView({ block: "start", behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }

  function naoEncontrada(texto) {
    resultado.textContent = "";
    var caixa = el("div", "vazio");
    caixa.appendChild(el("strong", null, "Não achamos \"" + texto + "\" na lista."));
    caixa.appendChild(el("p", null, "Por enquanto cobrimos a capital e a Região Metropolitana de São Paulo. Confira a grafia ou abra a lista das 39 cidades logo abaixo. Se a sua cidade fica fora dessa região, procure \"castração\" no site da prefeitura e cadastre o animal no SinPatinhas."));
    resultado.appendChild(caixa);
  }

  function filtrar(texto) {
    var alvo = normalizar(texto);
    if (!alvo) return [];
    return municipios.filter(function (m) { return m.chave.indexOf(alvo) !== -1; })
      .sort(function (a, b) { return (a.chave.indexOf(alvo) - b.chave.indexOf(alvo)) || a.nome.localeCompare(b.nome, "pt-BR"); })
      .slice(0, 8);
  }

  function fecharSugestoes() {
    lista.hidden = true;
    lista.textContent = "";
    selecionada = -1;
    campo.setAttribute("aria-expanded", "false");
    campo.removeAttribute("aria-activedescendant");
  }

  function abrirSugestoes(itens) {
    lista.textContent = "";
    selecionada = -1;
    if (!itens.length) { fecharSugestoes(); return; }
    itens.forEach(function (m, indice) {
      var li = el("li");
      li.id = "sug-" + indice;
      li.setAttribute("role", "option");
      li.setAttribute("aria-selected", "false");
      li.appendChild(el("span", null, m.nome));
      if (m.status === "conferido") li.appendChild(el("small", null, "conferida"));
      li.addEventListener("mousedown", function (evento) { evento.preventDefault(); mostrar(m); });
      li.dados = m;
      lista.appendChild(li);
    });
    lista.hidden = false;
    campo.setAttribute("aria-expanded", "true");
  }

  function marcar(indice) {
    var itens = lista.children;
    if (!itens.length) return;
    selecionada = (indice + itens.length) % itens.length;
    Array.prototype.forEach.call(itens, function (li, i) {
      li.setAttribute("aria-selected", i === selecionada ? "true" : "false");
    });
    campo.setAttribute("aria-activedescendant", itens[selecionada].id);
    itens[selecionada].scrollIntoView({ block: "nearest" });
  }

  campo.addEventListener("input", function () { abrirSugestoes(filtrar(campo.value)); });
  campo.addEventListener("blur", function () { setTimeout(fecharSugestoes, 120); });
  campo.addEventListener("keydown", function (evento) {
    if (lista.hidden) return;
    if (evento.key === "ArrowDown") { evento.preventDefault(); marcar(selecionada + 1); }
    else if (evento.key === "ArrowUp") { evento.preventDefault(); marcar(selecionada - 1); }
    else if (evento.key === "Escape") { fecharSugestoes(); }
    else if (evento.key === "Enter" && selecionada >= 0) { evento.preventDefault(); mostrar(lista.children[selecionada].dados); }
  });

  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();
    var texto = campo.value.trim();
    if (!texto) { campo.focus(); return; }
    var alvo = normalizar(texto);
    var exata = municipios.filter(function (m) { return m.chave === alvo; })[0];
    var achada = exata || filtrar(texto)[0];
    if (achada) mostrar(achada); else naoEncontrada(texto);
  });

  function montarLista() {
    municipios.slice().sort(function (a, b) { return a.nome.localeCompare(b.nome, "pt-BR"); }).forEach(function (m) {
      var li = el("li");
      var botao = el("button", m.status === "conferido" ? "ok" : null, m.nome);
      botao.type = "button";
      botao.addEventListener("click", function () { mostrar(m); });
      li.appendChild(botao);
      listaCidades.appendChild(li);
    });
  }

  fetch("dados/castra-aqui.json")
    .then(function (resposta) {
      if (!resposta.ok) throw new Error("HTTP " + resposta.status);
      return resposta.json();
    })
    .then(function (dados) {
      municipios = dados.municipios.map(function (m) { m.chave = normalizar(m.nome); return m; });
      montarLista();
      var marcador = /^#cidade=([a-z0-9-]+)$/.exec(location.hash);
      if (marcador) {
        var inicial = municipios.filter(function (m) { return m.id === marcador[1]; })[0];
        if (inicial) mostrar(inicial);
      }
    })
    .catch(function () {
      resultado.textContent = "";
      var caixa = el("div", "vazio");
      caixa.appendChild(el("strong", null, "As fichas não carregaram."));
      caixa.appendChild(el("p", null, "Verifique sua conexão e recarregue a página."));
      resultado.appendChild(caixa);
    });
})();
