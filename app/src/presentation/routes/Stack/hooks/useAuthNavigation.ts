import { useNavigation } from '@react-navigation/native'

function useAuthNavigation() {
	const router = useNavigation/* <UserStackScreenProps['navigation']> */() // CURRENT TYpe

	const navigateToHome = () => {
		router.reset({
			index: 0,
			routes: [{ name: 'UserStack' }] as any // CURRENT TYpe
		})
	}

	const navigateToAuthScreen = () => {
		router.reset({
			index: 0,
			routes: [{ name: 'SelectAuthRegister' }] as any // CURRENT TYpe
		})
	}

	return { navigateToHome, navigateToAuthScreen }
}

export { useAuthNavigation }
