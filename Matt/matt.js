// Navegação básica + botões internos

document.addEventListener("DOMContentLoaded", () => {

  const btnVoltar = document.getElementById("btnVoltar");
  const btnHome = document.getElementById("btnHome");

  btnVoltar.addEventListener("click", () => {
    if (history.length > 1) {
      history.back();
    } else {
      window.location.href = "../menu.html";
    }
  });

  btnHome.addEventListener("click", () => {
    window.location.href = "../menu.html";
  });

  document.querySelectorAll("[data-go]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const destino = btn.dataset.go;

      if (destino) {
        window.location.href = destino;
      }
    });
  });

});