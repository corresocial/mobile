function remoteDuplicatedObjectItemsByKey(array: any[], key: string) {
	try {
		return array.filter((item, index, self) => index === self.findIndex((object) => (
			object[key] === item[key]
		)))
	} catch (error) {
		console.log(error)
		return []
	}
}

export { remoteDuplicatedObjectItemsByKey }
