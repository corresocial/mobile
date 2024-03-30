function picturesUrlUpdatedDM(picturesUrl: string[]) {
	return (
		picturesUrl && picturesUrl.length > 0
		&& !allPicturesAlreadyUploadedDM(picturesUrl)
	)
}

function allPicturesAlreadyUploadedDM(picturesUrl: string[]) {
	return picturesUrl.filter((url: string) => url.includes('https://')).length === picturesUrl.length
}

export { picturesUrlUpdatedDM }
