import { Keyboard } from 'react-native'

const removeAllKeyboardEventListeners = () => { // CURRENT ver se há necessidade
	Keyboard.removeAllListeners('keyboardDidShow')
	Keyboard.removeAllListeners('keyboardDidHide')
}

export { removeAllKeyboardEventListeners }
