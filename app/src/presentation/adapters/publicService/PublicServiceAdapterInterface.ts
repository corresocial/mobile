interface PublicServiceAdapterInterface {
	validateNIS: (NISValue: string) => boolean
	validateName: (name: string) => boolean
}

export { PublicServiceAdapterInterface }
