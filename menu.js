document.addEventListener("DOMContentLoaded", iniciarMenu);

window.addEventListener("pageshow", (event) => {
  if (event.persisted) iniciarMenu();
});

let listenersLigados = false;

function iniciarMenu(){
  const fade = document.querySelector(".fade");
  if (fade) fade.classList.remove("on");

  carregarFotoUsuario();

  const ativos = Array.from(document.querySelectorAll(".grid .card.is-active"));

  ativos.forEach((c) => {
    c.classList.remove("enrolando", "desenrolando");
    c.style.width = "";
  });

  desenrolarEmOrdem(ativos);

  if (!listenersLigados) {
    ligarClicks();
    ligarLogout();
    listenersLigados = true;
  }
}

function carregarFotoUsuario(){
  const userPhoto = document.getElementById("userPhoto");

  if (!userPhoto) return;

  const fotoSalva =
    localStorage.getItem("bookUserPhoto") ||
    localStorage.getItem("userPhoto") ||
    "/img/icons/icon-192.png";

  userPhoto.src = fotoSalva;
}

function desenrolarEmOrdem(cards){
  let i = 0;

  const proximo = () => {
    if (i >= cards.length) return;

    const el = cards[i];
    i++;

    el.style.width = "0%";

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.classList.add("desenrolando");
      });
    });

    el.addEventListener("animationend", () => {
      el.classList.remove("desenrolando");
      el.style.width = "";
      setTimeout(proximo, 120);
    }, { once: true });
  };

  proximo();
}

function ligarClicks(){
  const fade = document.querySelector(".fade");

  document.querySelectorAll(".grid .card").forEach((card) => {
    card.addEventListener("click", function(e){
      const destino = this.dataset.go;
      if (!destino) return;

      e.preventDefault();

      if (this.classList.contains("enrolando")) return;

      if (fade) fade.classList.add("on");

      this.classList.remove("desenrolando");
      this.classList.add("enrolando");

      this.addEventListener("animationend", () => {
        window.location.href = destino;
      }, { once: true });
    });
  });
}

function ligarLogout(){
  const btnLogout = document.getElementById("btnLogout");

  if (!btnLogout) return;

  btnLogout.addEventListener("click", () => {
    window.location.href = "./index.html";
  });
}