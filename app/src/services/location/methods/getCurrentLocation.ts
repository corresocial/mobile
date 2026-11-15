import * as Location from 'expo-location'

// O ideal é utilizar getCurrentPositionAsync
// Mas a função está apresentando problemas ainda não solucionados
// https://github.com/expo/expo/issues/10756

const FIRST_POSITION_TIMEOUT_MS = 15000

async function getCurrentLocation() {
	let subscription: Location.LocationSubscription | null = null
	let timeoutId: ReturnType<typeof setTimeout> | undefined
	let settled = false

	// O watcher só é removido pelo remove(): sem isso cada chamada deixava o GPS ligado pelo resto da sessão
	const stopWatching = () => {
		settled = true
		timeoutId && clearTimeout(timeoutId)
		subscription?.remove()
		subscription = null
	}

	const currentLocation = await new Promise<Location.LocationObject>((resolve, reject) => {
		// Sem timeout a promise nunca termina quando o GPS não retorna posição e quem chama não chega no fallback.
		// Ao esgotar o tempo usa a última posição conhecida, se houver
		const resolveWithLastKnownPosition = async () => {
			stopWatching()
			try {
				const lastKnownPosition = await Location.getLastKnownPositionAsync()
				if (lastKnownPosition) return resolve(lastKnownPosition)
			} catch (error) {
				console.log(error)
			}
			reject(new Error('Tempo esgotado ao obter a localização atual'))
		}

		Location.watchPositionAsync({
			accuracy: Location.Accuracy.Highest,
			timeInterval: 1000,
			distanceInterval: 1,
		}, (position) => {
			stopWatching()
			resolve(position)
		}, (reason) => {
			stopWatching()
			reject(new Error(reason))
		})
			.then((newSubscription) => {
				if (settled) {
					newSubscription.remove()
					return
				}
				subscription = newSubscription
				// O prazo conta só depois que o watcher começou (no Android o diálogo de ativar a localização vem antes)
				timeoutId = setTimeout(resolveWithLastKnownPosition, FIRST_POSITION_TIMEOUT_MS)
			})
			.catch((error) => {
				stopWatching()
				reject(error)
			})
	})

	return currentLocation
}

export { getCurrentLocation }
