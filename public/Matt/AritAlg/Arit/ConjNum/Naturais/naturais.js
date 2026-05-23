document.addEventListener("DOMContentLoaded", () => {

  const btnVoltar = document.getElementById("btnVoltar");
  const btnHome = document.getElementById("btnHome");

  const resumoPanel = document.getElementById("resumoPanel");
  const fecharResumo = document.getElementById("fecharResumo");

  const sheetHome = document.getElementById("sheetHome");
  const sheetVoltar = document.getElementById("sheetVoltar");
  const sheetAvancar = document.getElementById("sheetAvancar");

  btnVoltar.addEventListener("click", () => {
    if (resumoPanel.classList.contains("open")) {
      fecharPainelResumo();
      return;
    }

    if (history.length > 1) {
      history.back();
    } else {
      window.location.href = "../conjnum.html";
    }
  });

  btnHome.addEventListener("click", () => {
    window.location.href = "/menu.html";
  });

  sheetHome.addEventListener("click", () => {
    window.location.href = "/menu.html";
  });

  sheetVoltar.addEventListener("click", () => {
    window.location.href = "../conjnum.html";
  });

  sheetAvancar.addEventListener("click", () => {
    alert("Próxima tela do menu Naturais ainda será configurada.");
  });

  document.querySelectorAll("[data-panel]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const painel = btn.dataset.panel;

      if (painel === "resumo") {
        abrirPainelResumo();
      }
    });
  });

  document.querySelectorAll("[data-go]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const destino = btn.dataset.go;

      if (destino) {
        window.location.href = destino;
      }
    });
  });

  fecharResumo.addEventListener("click", () => {
    fecharPainelResumo();
  });

  function abrirPainelResumo(){
    resumoPanel.classList.add("open");
    resumoPanel.setAttribute("aria-hidden", "false");
  }

  function fecharPainelResumo(){
    resumoPanel.classList.remove("open");
    resumoPanel.setAttribute("aria-hidden", "true");
  }

});