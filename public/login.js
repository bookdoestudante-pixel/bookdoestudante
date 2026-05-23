const form = document.getElementById("loginForm");
const msg = document.getElementById("msg");

function isEmail(str) {
  // validação simples (boa o suficiente pra front-end)
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const usuarioRaw = document.getElementById("usuario").value;
  const senhaRaw = document.getElementById("senha").value;

  const usuario = (usuarioRaw || "").trim().toLowerCase();
  const senha = (senhaRaw || "").trim();

  // regras do seu teste atual:
  // - aceita "aluno" OU qualquer e-mail válido
  // - senha ainda é "1234" (teste)
  const usuarioOk = (usuario === "aluno") || isEmail(usuario);
  const senhaOk = (senha === "1234");

  if (usuarioOk && senhaOk) {
    msg.textContent = "✅ Login OK! Indo para o app...";
    setTimeout(() => (window.location.href = "/menu.html"), 600);
  } else {
    // mensagens mais úteis
    if (!usuarioOk) {
      msg.textContent = "❌ Informe um usuário válido (ex: aluno) ou um e-mail válido.";
      return;
    }
    msg.textContent = "❌ Senha inválida.";
  }
});