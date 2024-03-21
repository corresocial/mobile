interface SmasRepositoryInterface {
	local: {
		getNisValue: () => Promise<string | null>
		saveNisValue: (nis: string) => Promise<boolean>
		clearNisValue: () => Promise<boolean>
	}
	remote: {
		getNotificationTokenByNis: (nis: string) => Promise<string | boolean>
		updateSmasTokenNotification: (nis: string, tokenNotification: string) => Promise<boolean>
	}
}

export { SmasRepositoryInterface }
