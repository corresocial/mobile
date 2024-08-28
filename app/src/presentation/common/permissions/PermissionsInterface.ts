interface PermissionsInterface {
	askLocationPermissions: () => Promise<any>
	hasLocationPermissions: () => Promise<boolean>
}

export { PermissionsInterface }
