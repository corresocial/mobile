interface SmasRepositoryAdapterInterface {
	local: {
		getNisFromStorage: () => Promise<string>
		setNisOnStorage: (nis: string) => Promise<boolean>
		clearStoragedNis: () => Promise<boolean>
	}
	remote: {

	}
}

export { SmasRepositoryAdapterInterface }
