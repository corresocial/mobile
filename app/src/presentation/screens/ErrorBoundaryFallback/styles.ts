// Componente FallBack não aceita styled-components

import { StyleSheet } from 'react-native'

import { relativeScreenDensity } from '@common/screenDimensions'
import { theme } from '@common/theme'

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: theme.red2,
		alignItems: 'center',
		justifyContent: 'center'
	},

	content: {
		height: relativeScreenDensity(300),
		width: '88%',
		backgroundColor: theme.black4,
		borderRadius: relativeScreenDensity(15),
		borderWidth: relativeScreenDensity(5),
		justifyContent: 'space-between',
		borderColor: theme.black4,
		borderRightWidth: relativeScreenDensity(14)
	},

	containerInner: {
		height: '100%',
		width: '100%',
		backgroundColor: theme.white3,
		padding: relativeScreenDensity(25),
		borderRadius: relativeScreenDensity(10),
		justifyContent: 'space-between'
	},

	title: {
		fontFamily: 'Arvo_700Bold',
		fontSize: relativeScreenDensity(30),
		color: theme.black4
	},

	description: {
		fontFamily: 'Arvo_400Regular',
		fontSize: relativeScreenDensity(16),
		color: theme.black4
	}
})
