const obje1 = { name: 'person1', age: 5 }
const obje2 = { name: 'persn1', age: 5 }

function propValueAreEquals(old, novo) {
	const res = Object.entries(novo).reduce((acc, [key, value]) => {
		return [...acc, old[key] === value]
	}, [])

	console.log(res)
	const areEquals = res.every((item) => item === true)
	console.log(areEquals)
	return areEquals ? 'são iguais' : 'não são iguais'
}

console.log(propValueAreEquals(obje1, obje2))
