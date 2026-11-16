(function () {
  "use strict";

  var CHAVE = "bussola-animal-90-dias";
  var estado = { bicho: "cao", feitas: {} };

  function ler() {
    try {
      var salvo = JSON.parse(window.localStorage.getItem(CHAVE));
      if (salvo && typeof salvo === "object") {
        if (salvo.bicho === "cao" || salvo.bicho === "gato") estado.bicho = salvo.bicho;
        if (salvo.feitas && typeof salvo.feitas === "object") estado.feitas = salvo.feitas;
      }
    } catch (erro) { /* sem armazenamento: segue só na memória */ }
  }

  function gravar() {
    try { window.localStorage.setItem(CHAVE, JSON.stringify(estado)); }
    catch (erro) { /* idem */ }
  }

  ler();

  // Transforma cada item em uma caixa de marcar
  Array.prototype.forEach.call(document.querySelectorAll(".tarefas"), function (lista) {
    var fase = lista.dataset.fase;
    Array.prototype.forEach.call(lista.children, function (item) {
      var chave = fase + ":" + item.dataset.id;
      var texto = item.textContent;
      item.textContent = "";
      var rotulo = document.createElement("label");
      var caixa = document.createElement("input");
      caixa.type = "checkbox";
      caixa.checked = !!estado.feitas[chave];
      caixa.addEventListener("change", function () {
        if (caixa.checked) estado.feitas[chave] = true; else delete estado.feitas[chave];
        gravar();
      });
      var span = document.createElement("span");
      span.textContent = texto;
      rotulo.appendChild(caixa);
      rotulo.appendChild(span);
      item.appendChild(rotulo);
    });
  });

  var botoes = document.querySelectorAll(".escolha");
  function aplicarBicho() {
    Array.prototype.forEach.call(botoes, function (b) {
      var ativo = b.dataset.bicho === estado.bicho;
      b.classList.toggle("ativa", ativo);
      b.setAttribute("aria-pressed", ativo ? "true" : "false");
    });
    Array.prototype.forEach.call(document.querySelectorAll(".tarefas li[data-bicho]"), function (item) {
      item.hidden = item.dataset.bicho !== estado.bicho;
    });
  }
  Array.prototype.forEach.call(botoes, function (b) {
    b.addEventListener("click", function () { estado.bicho = b.dataset.bicho; gravar(); aplicarBicho(); });
  });
  aplicarBicho();
})();
