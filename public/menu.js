document.addEventListener("DOMContentLoaded", iniciarMenu);
window.addEventListener("pageshow", (event) => {
  // quando volta do "voltar" e vem do cache
  if (event.persisted) iniciarMenu();
});

let listenersLigados = false;

function iniciarMenu(){
  const fade = document.querySelector(".fade");
  if (fade) fade.classList.remove("on");

  // 1) sequência: desenrolar todos os ativos (ordem do HTML)
  const ativos = Array.from(document.querySelectorAll(".grid .card.is-active"));

  // reseta estado visual (sem mexer no resto)
  ativos.forEach((c) => {
    c.classList.remove("enrolando", "desenrolando");
    c.style.width = ""; // limpa width
  });

  // desenrola um por um (só os ativos)
  desenrolarEmOrdem(ativos);

  // 2) listeners (uma vez só)
  if (!listenersLigados) {
    ligarClicks();
    listenersLigados = true;
  }
}

function desenrolarEmOrdem(cards){
  let i = 0;

  const proximo = () => {
    if (i >= cards.length) return;

    const el = cards[i];
    i++;

    // só anima desenrolar se estiver marcado como primário OU se você quiser em todos:
    // aqui vou animar em todos os ativos (como você pediu).
    el.style.width = "0%";
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.classList.add("desenrolando");
      });
    });

    // quando terminar, vai pro próximo
    el.addEventListener("animationend", () => {
      el.classList.remove("desenrolando");
      el.style.width = ""; // volta ao normal
      // pequeno intervalo entre eles (fica bonito)
      setTimeout(proximo, 120);
    }, { once: true });
  };

  proximo();
}

function ligarClicks(){
  const fade = document.querySelector(".fade");

  document.querySelectorAll(".grid .card").forEach((card) => {
    card.addEventListener("click", function(e){
      // se não tiver página ainda, não navega
      const destino = this.dataset.go;
      if (!destino) return;

      // só o clicado enrola
      e.preventDefault();
      if (this.classList.contains("enrolando")) return;

      // esmaece fundo
      if (fade) fade.classList.add("on");

      // se o clicado não for o primário, ainda assim enrola (você pode limitar depois)
      this.classList.remove("desenrolando");
      this.classList.add("enrolando");

      this.addEventListener("animationend", () => {
        window.location.href = destino;
      }, { once: true });
    });
  });
}