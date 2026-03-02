// Navegação básica + clique nos tópicos

document.addEventListener("DOMContentLoaded", () => {
  const btnVoltar = document.getElementById("btnVoltar");
  const btnHome = document.getElementById("btnHome");

  // Voltar: usa histórico se existir; se não, volta pro menu
  btnVoltar.addEventListener("click", () => {
    if (history.length > 1) history.back();
    else window.location.href = "../menu.html";
  });

  // Home: leva pro menu
  btnHome.addEventListener("click", () => {
    window.location.href = "../menu.html";
  });

  // Clique nos 6 tópicos
  document.querySelectorAll(".topic-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const topic = btn.dataset.topic;

      alert(`Tópico selecionado: ${btn.textContent.trim()}\n(id: ${topic})`);

      // window.location.href = `./topicos/${topic}.html`;
    });
  });
});