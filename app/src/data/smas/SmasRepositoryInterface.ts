interface SmasRepositoryInterface {
	localStorage: {
		getNisValue: () => Promise<string>
		saveNisValue: (nis: string) => Promise<boolean>
		clearNisValue: () => Promise<boolean>
	}
	remoteStorage: {
		getNotificationTokenByNis: (nis: string) => Promise<string | boolean>
		updateSmasTokenNotification: (nis: string, tokenNotification: string) => Promise<boolean>
	}
}

export { SmasRepositoryInterface }
