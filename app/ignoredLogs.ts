export const ignoredLogs = [
	`ViewPropTypes will be removed from React Native. Migrate to ViewPropTypes exported from 'deprecated-react-native-prop-types'`,
	`Provided value to SecureStore is larger than 2048 bytes. An attempt to store such a value will throw an error in SDK 35`,
	`AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage`,
	'Key "cancelled" in the image picker result is deprecated and will be removed in SDK 48, use "canceled" instead',
	`FlashList's rendered size is not usable. Either the height or width is too small (<2px). Please make sure that the parent view of the list has a valid size. FlashList will match the size of the parent.`,
	'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.'
]
