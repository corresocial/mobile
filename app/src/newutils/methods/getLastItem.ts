export function getLastItem<T>(items: T[] | null | undefined): T | undefined {
	if (!items) return undefined
	if (items.length === 0) return undefined

	const lastItem = items[items.length - 1]

	if (typeof lastItem !== 'object' || lastItem === null) return undefined

	return lastItem
}
