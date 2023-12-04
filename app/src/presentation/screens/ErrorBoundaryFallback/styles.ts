// Componente FallBack não aceita styled-components

import { StyleSheet } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { theme } from '@common/theme'

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: theme.red2,
		alignItems: 'center',
		justifyContent: 'center'
	},

	content: {
		height: RFValue(300),
		width: '88%',
		backgroundColor: theme.black4,
		borderRadius: RFValue(15),
		borderWidth: RFValue(5),
		justifyContent: 'space-between',
		borderColor: theme.black4,
		borderRightWidth: RFValue(14)
	},

	containerInner: {
		height: '100%',
		width: '100%',
		backgroundColor: theme.white3,
		padding: RFValue(25),
		borderRadius: RFValue(10),
		justifyContent: 'space-between'
	},

	title: {
		fontFamily: 'Arvo_700Bold',
		fontSize: RFValue(30),
		color: theme.black4
	},

	description: {
		fontFamily: 'Arvo_400Regular',
		fontSize: RFValue(16),
		color: theme.black4
	}
})
