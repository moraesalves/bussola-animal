(function () {
  "use strict";

  var REPO = "https://github.com/moraesalves/bussola-animal";

  function el(tag, classe, texto) {
    var no = document.createElement(tag);
    if (classe) no.className = classe;
    if (texto) no.textContent = texto;
    return no;
  }

  function link(texto, href, classe) {
    var a = el("a", classe, texto);
    a.href = href.replace(/\s/g, "");
    if (/^https?:/.test(href)) { a.target = "_blank"; a.rel = "noopener"; }
    return a;
  }

  function dataBr(iso) {
    var p = iso.split("-");
    return p[2] + "/" + p[1] + "/" + p[0];
  }

  function cartaoCanal(canal) {
    var cartao = el("article", "cartao");
    cartao.appendChild(el("h3", null, canal.titulo));
    cartao.appendChild(el("p", null, canal.texto));
    if (canal.href) cartao.appendChild(link(canal.rotulo, canal.href, "botao botao-pequeno"));
    return cartao;
  }

  function fichaEstado(estado, geral) {
    var ficha = el("article", "ficha" + (estado.status === "conferido" ? "" : " espera"));
    var topo = el("header", "ficha-topo");
    topo.appendChild(el("h3", null, estado.nome));
    topo.appendChild(el("p", null, estado.status === "conferido"
      ? "Canais próprios do estado, além dos que valem em todo o país."
      : "Ainda não conferimos os canais próprios deste estado. Use os caminhos que valem em todo o país."));
    ficha.appendChild(topo);

    var corpo = el("div", "ficha-corpo");
    var grade = el("div", "cartoes");
    (estado.status === "conferido" ? estado.canais : geral.canais).forEach(function (c) {
      grade.appendChild(cartaoCanal(c));
    });
    corpo.appendChild(grade);
    if (estado.observacao) {
      var aviso = el("section", "aviso");
      aviso.appendChild(el("h4", null, "Vale saber"));
      aviso.appendChild(el("p", null, estado.observacao));
      corpo.appendChild(aviso);
    }
    if (estado.status !== "conferido") {
      var dica = el("section", "aviso");
      dica.appendChild(el("h4", null, "Dica"));
      dica.appendChild(el("p", null, "Procure no site da Polícia Civil de " + estado.nome + " por \"delegacia eletrônica\" ou \"delegacia virtual\". Muitos estados aceitam o registro de maus-tratos pela internet."));
      corpo.appendChild(dica);
    }
    ficha.appendChild(corpo);

    var pe = el("footer", "ficha-pe");
    if (estado.status === "conferido") {
      pe.appendChild(el("span", "selo selo-ok", "Conferida em " + dataBr(estado.conferido_em)));
      estado.fontes.forEach(function (f) { pe.appendChild(link("Fonte: " + f.titulo, f.url)); });
    } else {
      pe.appendChild(el("span", "selo selo-espera", "Em verificação"));
      pe.appendChild(link("Sabe qual é o canal oficial em " + estado.nome + "? Conte para nós",
        REPO + "/issues/new?title=" + encodeURIComponent("Denuncie Certo: " + estado.nome)));
    }
    ficha.appendChild(pe);
    return ficha;
  }

  function cartaoPerfil(nome, descricao, rotulo, href) {
    var cartao = el("article", "perfil");
    cartao.appendChild(el("h4", null, nome));
    cartao.appendChild(el("p", null, descricao));
    cartao.appendChild(link(rotulo, href));
    return cartao;
  }

  var seletor = document.getElementById("estado");
  var saida = document.getElementById("resultado-estado");

  fetch("dados/denuncie-certo.json")
    .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(function (dados) {
      var gerais = document.getElementById("canais-gerais");
      dados.geral.canais.forEach(function (c) { gerais.appendChild(cartaoCanal(c)); });

      dados.estados.slice().sort(function (a, b) { return a.nome.localeCompare(b.nome, "pt-BR"); })
        .forEach(function (e) {
          var opcao = el("option", null, e.nome + (e.status === "conferido" ? " (conferido)" : ""));
          opcao.value = e.uf;
          seletor.appendChild(opcao);
        });

      function mostrar(uf) {
        saida.textContent = "";
        var estado = dados.estados.filter(function (e) { return e.uf === uf; })[0];
        if (!estado) return;
        saida.appendChild(fichaEstado(estado, dados.geral));
        if (history.replaceState) history.replaceState(null, "", "#uf=" + uf);
      }
      seletor.addEventListener("change", function () { mostrar(seletor.value); });
      var inicial = /^#uf=([A-Z]{2})$/.exec(location.hash);
      if (inicial) { seletor.value = inicial[1]; mostrar(inicial[1]); }

      var vozes = document.getElementById("vozes");
      dados.vozes.forEach(function (v) {
        vozes.appendChild(cartaoPerfil(v.nome, v.descricao, "@" + v.instagram, "https://www.instagram.com/" + v.instagram + "/"));
      });
      var orgs = document.getElementById("organizacoes");
      dados.organizacoes.forEach(function (o) {
        orgs.appendChild(cartaoPerfil(o.nome, o.descricao, o.url.replace(/^https?:\/\//, ""), o.url));
      });
    })
    .catch(function () {
      saida.textContent = "";
      var caixa = el("div", "vazio");
      caixa.appendChild(el("strong", null, "Os canais não carregaram."));
      caixa.appendChild(el("p", null, "Verifique sua conexão e recarregue a página. Em emergência, ligue 190."));
      saida.appendChild(caixa);
    });

  /* ---------- Montador do texto ---------- */
  var formulario = document.getElementById("form-denuncia");
  var caixaTexto = document.getElementById("texto-pronto");
  var campoTexto = document.getElementById("texto-denuncia");
  var avisoCopia = document.getElementById("copiado");

  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();
    var f = formulario.elements;
    var provas = Array.prototype.filter.call(formulario.querySelectorAll("input[name=provas]"), function (c) { return c.checked; })
      .map(function (c) { return c.value; });
    var linhas = [];
    linhas.push("DENÚNCIA DE MAUS-TRATOS A ANIMAL");
    linhas.push("");
    linhas.push("Situação: " + f.tipo.value + ".");
    linhas.push("Animal: " + f.especie.value + (f.descricao.value.trim() ? " (" + f.descricao.value.trim() + ")" : "") + ".");
    linhas.push("Local: " + f.endereco.value.trim() + ".");
    if (f.referencia.value.trim()) linhas.push("Ponto de referência: " + f.referencia.value.trim() + ".");
    if (f.quando.value.trim()) linhas.push("Quando: " + f.quando.value.trim() + ".");
    linhas.push("");
    linhas.push("Relato:");
    linhas.push(f.relato.value.trim());
    linhas.push("");
    linhas.push(provas.length
      ? "Tenho para apresentar: " + provas.join(", ") + "."
      : "No momento não tenho fotos nem vídeos, mas posso prestar esclarecimentos.");
    linhas.push("");
    linhas.push("Os fatos podem configurar o crime do artigo 32 da Lei 9.605/1998, com a pena prevista pela Lei 14.064/2020 quando a vítima é cão ou gato. Peço a apuração e as providências para proteger o animal.");
    campoTexto.value = linhas.join("\n");
    caixaTexto.hidden = false;
    avisoCopia.textContent = "";
    caixaTexto.scrollIntoView({ block: "start", behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  });

  document.getElementById("copiar").addEventListener("click", function () {
    function pronto() { avisoCopia.textContent = "Texto copiado."; }
    function manual() {
      campoTexto.focus();
      campoTexto.select();
      try { document.execCommand("copy"); pronto(); }
      catch (erro) { avisoCopia.textContent = "Selecione o texto e copie manualmente."; }
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(campoTexto.value).then(pronto, manual);
    } else {
      manual();
    }
  });
})();
