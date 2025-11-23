// ==============================
// main.js — GreenMinds Protótipo
// ==============================

// Função chamada pelo botão "Próximo" da tela de características
function enviarCaracteristicas() {
  console.log("📦 Coletando características selecionadas...");

  // Captura os valores selecionados
  const segmento = document.querySelector('input[name="segmento"]:checked')?.value;
  const agua = document.querySelector('input[name="agua"]:checked')?.value;
  const energia = document.querySelector('input[name="energia"]:checked')?.value;
  const custo = document.querySelector('input[name="custo"]:checked')?.value;
  const meta = document.querySelector('input[name="meta"]:checked')?.value;

  // Verifica se o usuário selecionou todas as opções
  if (!segmento || !agua || !energia || !custo || !meta) {
    alert("⚠️ Por favor, selecione todas as características antes de continuar.");
    return;
  }

  // Monta o objeto com os dados selecionados
  const dados = {
    segmento: segmento,
    agua: agua,
    energia: energia,
    custo: custo,
    meta: meta
  };

  console.log("✅ Dados prontos para envio:", dados);

  // Envia os dados ao backend Flask
  fetch("/processar_caracteristicas", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Erro na resposta do servidor");
      }
      return response.json();
    })
    .then(resultado => {
      console.log("📊 Resultados recebidos do backend:", resultado);

      // Salva os resultados no localStorage para uso na próxima página
      localStorage.setItem("resultados", JSON.stringify(resultado));

      // Redireciona para a página de resultados
      window.location.href = "/resultados";
    })
    .catch(error => {
      console.error("❌ Erro ao enviar dados:", error);
      alert("Ocorreu um erro ao processar as informações. Tente novamente.");
    });
}

// ==============================
// Exibição dos resultados
// ==============================

// Essa parte é executada na página de resultados
document.addEventListener("DOMContentLoaded", () => {
  const pagina = window.location.pathname;

  if (pagina.includes("resultados")) {
    const container = document.getElementById("resultado-container");
    const dados = JSON.parse(localStorage.getItem("resultados"));

    if (!dados) {
      container.innerHTML = "<p>Nenhum resultado encontrado. Retorne e selecione as características.</p>";
      return;
    }

    // Exibe os resultados formatados
    container.innerHTML = `
      <h2>Resultados da Análise</h2>
      <p><strong>Redução de CO₂:</strong> ${dados["Redução CO2 (t/ano)"]} t/ano</p>
      <p><strong>Economia Anual:</strong> R$ ${dados["Economia Anual (R$)"]}</p>
      <p><strong>ROI:</strong> ${dados["ROI (meses)"]} meses</p>
      <p><strong>Redução de Água:</strong> ${dados["Redução Água (%)"]}%</p>
      <p><strong>Redução de Energia:</strong> ${dados["Redução Energia (%)"]}%</p>

      <h3>Fornecedores Recomendados</h3>
      <ul>
        <li>${dados["Fornecedor 1"] || "—"}</li>
        <li>${dados["Fornecedor 2"] || "—"}</li>
        <li>${dados["Fornecedor 3"] || "—"}</li>
      </ul>

      <h3>Metas Previstas</h3>
      <ul>
        <li>${dados["Meta 1"] || "—"}</li>
        <li>${dados["Meta 2"] || "—"}</li>
        <li>${dados["Meta 3"] || "—"}</li>
        <li>${dados["Meta 4"] || "—"}</li>
        <li>${dados["Meta 5"] || "—"}</li>
      </ul>
    `;
  }
});