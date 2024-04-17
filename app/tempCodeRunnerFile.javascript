// Função para calcular o valor total com base no número de parcelas e no valor da parcela
function calcularValorTotal(parcelas, valorParcela) {
	return parcelas * valorParcela
}

// Array com os valores das parcelas
const valoresParcelas = [169.70, 182.63, 198.16, 217.17, 240.96, 271.59, 312.46, 369.73, 455.70, 599.05, 885.88, 1697.00]
const parcelas = [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]

// Calcular o valor total para cada item do array
const valoresTotais = valoresParcelas.map((valor, index) => {
	return calcularValorTotal(parcelas[index], valor)
})

// Calcular a diferença entre os valores totais
const diferencaValores = Math.abs(valoresTotais[0] - valoresTotais[1])

console.log('Valor total para cada item:', valoresTotais)
console.log('Diferença entre os valores totais:', diferencaValores)
