import { useNavigation } from '@react-navigation/native'

function useAuthNavigation() {
	const router = useNavigation/* <UserStackScreenProps['navigation']> */() // TODO TYpe

	const navigateToHome = () => {
		router.reset({
			index: 0,
			routes: [{ name: 'UserStack' }] as any // TODO TYpe
		})
	}

	const navigateToAuthScreen = () => {
		router.reset({
			index: 0,
			routes: [{ name: 'SelectAuthRegister' }] as any // TODO TYpe
		})
	}

	return { navigateToHome, navigateToAuthScreen }
}

export { useAuthNavigation }
