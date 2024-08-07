/* eslint-disable valid-typeof */
export class Converter {
	static convertToInt(str: string): number {
		const parsed = parseInt(str, 10)
		if (!Number.isNaN(parsed)) {
			return parsed
		}
		return str as any
	}
}
