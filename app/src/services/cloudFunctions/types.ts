export type SearchParams = { // TODO Isso não deveria estar aqui
	state: string
	city: string
	district: string
	postRange: 'near' | 'city'
}

export type RequestData = {
	userId: string
	userName: string
	postDescription: string
}

export type RequestBody = {
	searchParams: SearchParams
	requestData: RequestData
}
