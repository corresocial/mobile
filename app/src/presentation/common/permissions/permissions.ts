import { askLocationPermissions } from './methods/askLocationPermissions'
import { hasLocationPermissions } from './methods/hasLocationPemissions'
import { PermissionsInterface } from './PermissionsInterface'

const Permissions: PermissionsInterface = {
	askLocationPermissions: askLocationPermissions,
	hasLocationPermissions: hasLocationPermissions
}

export { Permissions }
