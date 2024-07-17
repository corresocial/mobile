function checkMediaType(uri: string): 'picture' | 'video' | '' {
	const picturesExtensions = ['jpg', 'jpeg', 'png', 'gif', 'svg', 'bpm']
	const videoExtensions = ['mp4', 'mov', 'avi', 'mkv', 'webm']

	const extension = uri?.split('.').pop()?.toLowerCase().split('?')[0] ?? ''
	if (picturesExtensions.includes(extension)) return 'picture'
	if (videoExtensions.includes(extension)) return 'video'

	return ''
}

export { checkMediaType }
