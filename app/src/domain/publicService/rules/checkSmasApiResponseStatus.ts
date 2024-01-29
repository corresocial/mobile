function checkSmasApiResponseStatus(apiResponse: any) {
	if (apiResponse === 404) return [{ nisNotFound: true }, true]
	if (apiResponse === 500) return [{ serverError: true }, true]

	return [{ ...apiResponse }, false]
}

export { checkSmasApiResponseStatus }
