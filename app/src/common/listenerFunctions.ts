import { Keyboard } from 'react-native'

const removeAllKeyboardEventListeners = () => {
	Keyboard.removeAllListeners('keyboardDidShow')
	Keyboard.removeAllListeners('keyboardDidHide')
}

export { removeAllKeyboardEventListeners }