function mediaUrlUpdatedDM(mediaUrl: string[]) {
	return (
		mediaUrl && mediaUrl.length > 0
		&& !allMediasAlreadyUploadedDM(mediaUrl)
	)
}

function allMediasAlreadyUploadedDM(mediaUrl: string[]) {
	return mediaUrl.filter((url: string) => url.includes('https://')).length === mediaUrl.length
}

export { mediaUrlUpdatedDM }
