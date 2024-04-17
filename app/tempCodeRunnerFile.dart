// Função para calcular o valor de cada parcela
function calcularValorParcela(valorTotal, parcelas) {
    return valorTotal / parcelas;
}

// Valores totais calculados anteriormente
const valoresTotais =  [
    2036.3999999999999,
    2008.9299999999998,
    1981.6,
    1954.53,
    1927.68,
    1901.1299999999999,
    1874.7599999999998,
    1848.65,
    1822.8,
    1797.1499999999999,
    1771.76,
    1697
  ]
const parcelas = [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

// Calcular o valor de cada parcela
const valoresParcelas = valoresTotais.map((valor, index) => {
    return calcularValorParcela(valor, parcelas[index]);
});

// Encontrar a parcela com o menor valor
let melhorParcela = 0;
let menorValorParcela = valoresParcelas[0];
for (let i = 1; i < valoresParcelas.length; i++) {
    if (valoresParcelas[i] < menorValorParcela) {
        melhorParcela = i;
        menorValorParcela = valoresParcelas[i];
    }
}

console.log(`A melhor parcela é de ${parcelas[melhorParcela]}x com valor de ${menorValorParcela.toFixed(2)}`);
