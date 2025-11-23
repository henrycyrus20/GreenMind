// Recupera filtros armazenados (ou padrão)
let filtros = JSON.parse(localStorage.getItem("filtrosGreenMinds")) || {
  segmento: "Indústria",
  agua: "501 a 2.000 m³",
  energia: "10.001 a 50.000 kWh",
  custo: "R$ 100 mil a 500 mil",
  meta: "Redução de emissões de carbono"
};

// Mock principal
const resultadosMock = [
  {
    segmento: "Indústria",
    agua: "501 a 2.000 m³",
    energia: "10.001 a 50.000 kWh",
    custo: "R$ 100 mil a 500 mil",
    meta: "Redução de emissões de carbono",
    reducaoCO2: 12,
    reducaoAgua: 46,
    reducaoEnergia: 38,
    economiaAnual: 320000,
    roi: 8,
    fornecedores: [
      {
        nome: "EcoEnergy Brasil",
        local: "Campinas/SP",
        produtos: [
          { nome: "Painel Solar Fotovoltaico", descricao: "Geração de energia limpa para reduzir emissões." }
        ]
      },
      {
        nome: "AquaLoop",
        local: "Curitiba/PR",
        produtos: [
          { nome: "Sistema de Reuso de Água", descricao: "Reduz consumo hídrico e custo de operação." }
        ]
      },
      {
        nome: "SmartWatt Solutions",
        local: "São Paulo/SP",
        produtos: [
          { nome: "Gestor de Energia Inteligente", descricao: "Monitoramento em tempo real da eficiência energética." }
        ]
      }
    ],
    metas: [
      "Reduzir CO₂ em 25% em 12 meses.",
      "Economizar R$ 150 mil anuais em energia.",
      "Implementar ISO 14001 até o próximo exercício.",
      "Reutilizar 50% da água consumida.",
      "Atingir 80% de eficiência energética em 2 anos."
    ]
  }
];

// Busca o resultado certo
function buscarResultados(filtros) {
  return (
    resultadosMock.find(item =>
      item.segmento === filtros.segmento &&
      item.agua === filtros.agua &&
      item.energia === filtros.energia &&
      item.custo === filtros.custo &&
      item.meta === filtros.meta
    ) || resultadosMock[0]
  );
}