export type ContactUsType = 'erro' | 'denúncia' | 'melhoria' | 'outro'

export type ContactUsOptions = {
	userId: string,
	type: ContactUsType,
	message: string,
}
