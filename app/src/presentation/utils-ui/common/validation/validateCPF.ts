function validateCPF(cpf: string) {
	const cleanCPF = cpf.replace(/[^\d]/g, '')

	if (cleanCPF.length !== 11) return false
	if (/^(\d)\1+$/.test(cleanCPF)) return false

	const digits = cleanCPF.slice(0, -2)
	const verifierDigits = cleanCPF.slice(-2)
	const calculatedVerifier = calculateCPFVerifier(digits)

	if (verifierDigits !== calculatedVerifier) return false

	return true
}

function calculateCPFVerifier(verifiedDigits: string) {
	let digits = verifiedDigits

	const weights = [10, 9, 8, 7, 6, 5, 4, 3, 2]
	const sumFirstVerifier = digits.split('').reduce((acc, digit, index) => {
		return acc + (parseInt(digit) * weights[index])
	}, 0)
	const remainderFirstVerifier = sumFirstVerifier % 11
	const firstVerifier = remainderFirstVerifier < 2 ? 0 : 11 - remainderFirstVerifier

	digits += firstVerifier
	weights.unshift(11)

	const sumSecondVerifier = digits.split('').reduce((acc, digit, index) => {
		return acc + (parseInt(digit) * weights[index])
	}, 0)
	const remainderSecondVerifier = sumSecondVerifier % 11
	const secondVerifier = remainderSecondVerifier < 2 ? 0 : 11 - remainderSecondVerifier

	return `${firstVerifier}${secondVerifier}`
}

export { validateCPF }
