/* eslint-disable react/destructuring-assignment */
import React from 'react'
import { StatusBar, View, Text } from 'react-native'

import { styles } from './styles'
import HomeTabIconGreen from '@assets/icons/home-green.svg'
import { theme } from '@common/theme'

import { PrimaryButton } from '@components/_buttons/PrimaryButton'

interface ErrorBoundaryFallbackProps {
	error: Error,
	resetError: Function
}

function ErrorBoundaryFallback({ error = new Error('test error'), resetError }: ErrorBoundaryFallbackProps) {
	return (
		<View style={styles.container}>
			<StatusBar backgroundColor={theme.colors.red[2]} barStyle={'dark-content'} />
			<View style={styles.content}>
				<View style={styles.containerInner}>
					<Text style={styles.title}>{'vish!'}</Text>
					<Text style={styles.description}>{'alguma coisa deu errado em nosso aplicativo, já enviamos uma mensagem para o nosso time.'}</Text>
					<PrimaryButton
						color={theme.colors.green[3]}
						label={'voltar para home'}
						highlightedWords={['home']}
						labelColor={theme.colors.white[3]}
						fontSize={16}
						SvgIcon={HomeTabIconGreen}
						svgIconScale={['80%', '12%']}
						onPress={() => resetError()}
					/>
				</View>
			</View>
		</View>
	)
}

export { ErrorBoundaryFallback }
