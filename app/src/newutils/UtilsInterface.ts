interface UtilsInterface {
	objectValuesAreEquals: (completeObject: object, partialObject: object) => boolean
	remoteDuplicatedObjectItemsByKey: (array: any[], key: string) => any[]
}

export { UtilsInterface }
