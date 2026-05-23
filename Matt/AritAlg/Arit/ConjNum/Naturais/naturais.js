document.addEventListener("DOMContentLoaded", () => {

  const btnVoltar = document.getElementById("btnVoltar");
  const btnHome = document.getElementById("btnHome");

  const resumoPanel = document.getElementById("resumoPanel");
  const videoPanel = document.getElementById("videoPanel");

  const fecharResumo = document.getElementById("fecharResumo");
  const fecharVideo = document.getElementById("fecharVideo");

  const resumoHome = document.getElementById("resumoHome");
  const resumoVoltar = document.getElementById("resumoVoltar");
  const resumoAvancar = document.getElementById("resumoAvancar");

  const videoHome = document.getElementById("videoHome");
  const videoVoltar = document.getElementById("videoVoltar");
  const videoAvancar = document.getElementById("videoAvancar");
  const btnOfflineVideo = document.getElementById("btnOfflineVideo");

  btnVoltar.addEventListener("click", () => {
    if (algumPainelAberto()) {
      fecharTodosPaineis();
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

  document.querySelectorAll("[data-panel]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const painel = btn.dataset.panel;

      if (painel === "resumo") abrirPainel(resumoPanel);
      if (painel === "video") abrirPainel(videoPanel);
    });
  });

  document.querySelectorAll("[data-go]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const destino = btn.dataset.go;
      if (destino) window.location.href = destino;
    });
  });

  fecharResumo.addEventListener("click", fecharTodosPaineis);
  fecharVideo.addEventListener("click", fecharTodosPaineis);

  resumoHome.addEventListener("click", () => {
    window.location.href = "/menu.html";
  });

  videoHome.addEventListener("click", () => {
    window.location.href = "/menu.html";
  });

  resumoVoltar.addEventListener("click", () => {
    fecharTodosPaineis();
  });

videoVoltar.addEventListener("click", () => {
  abrirPainel(resumoPanel);
});

  resumoAvancar.addEventListener("click", () => {
    abrirPainel(videoPanel);
  });

  videoAvancar.addEventListener("click", () => {
    alert("Próximo tópico ainda será configurado.");
  });

  function abrirPainel(painel){
    fecharTodosPaineis();
    painel.classList.add("open");
    painel.setAttribute("aria-hidden", "false");
  }

  function fecharTodosPaineis(){
    [resumoPanel, videoPanel].forEach((painel) => {
      painel.classList.remove("open");
      painel.setAttribute("aria-hidden", "true");
    });
  }

  function algumPainelAberto(){
    return resumoPanel.classList.contains("open") ||
           videoPanel.classList.contains("open");
  }

});

document.addEventListener("fullscreenchange", () => {

  if (document.fullscreenElement) {

    if (screen.orientation && screen.orientation.lock) {
      screen.orientation.lock("landscape").catch(() => {});
    }

  } else {

    if (screen.orientation && screen.orientation.unlock) {
      screen.orientation.unlock();
    }

  }

});

btnOfflineVideo?.addEventListener("click", () => {

  alert(
    "Em breve este vídeo poderá ser disponibilizado offline no Book do Estudante."
  );

});

