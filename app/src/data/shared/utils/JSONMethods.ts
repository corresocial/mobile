export class JSONMethods {
	static convertToJson(object: object | []) {
		return JSON.stringify(object)
	}

	static convertFromJson(json: string) {
		return JSON.parse(json)
	}
}
