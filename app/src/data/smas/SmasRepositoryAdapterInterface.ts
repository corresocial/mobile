interface SmasRepositoryAdapterInterface {
	local: {
		getNisFromStorage: () => Promise<string>
		setNisOnStorage: (nis: string) => Promise<boolean>
		clearStoragedNis: () => Promise<boolean>
	}
	remote: {
		getNotificationTokenByNis: (nis: string) => Promise<string>
		updateSmasTokenNotification: (nis: string, tokenNotification: string) => Promise<void>
	}
}

export { SmasRepositoryAdapterInterface }
