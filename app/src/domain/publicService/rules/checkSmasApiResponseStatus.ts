function checkSmasApiResponseStatus(apiResponse: any) {
	console.log(apiResponse)
	if (apiResponse === 404) return [{ nisNotFound: true }, true]
	if (apiResponse === 500) return [{ nisNotFound: true }, true] // serverError

	return [{ ...apiResponse }, false]
}

export { checkSmasApiResponseStatus }
