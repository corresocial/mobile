import React from 'react'
import { StatusBar, ViewStyle } from 'react-native'

import { Container, SafeAreaViewContainer } from './styles'

interface ScreenContainerProps {
	children: React.ReactElement | React.ReactElement[]
	topSafeAreaColor?: string
	bottomSafeAreaColor?: string
	justifyContent?: ViewStyle['justifyContent']
	alignItems?: ViewStyle['alignItems']
	withPadding?: boolean
	infinityBottom?: boolean
}

function ScreenContainer({ ...props }: ScreenContainerProps) {
	return (
		<>
			<SafeAreaViewContainer safeAreaColor={props.topSafeAreaColor} withoutFlex />
			{
				!props.infinityBottom
					? (
						<SafeAreaViewContainer safeAreaColor={props.bottomSafeAreaColor}>
							<StatusBar backgroundColor={props.topSafeAreaColor} />
							<Container
								justifyContent={props.justifyContent}
								alignItems={props.alignItems}
								withPadding={!!props.withPadding}
							>
								{props.children}
							</Container>
						</SafeAreaViewContainer>
					)
					: (
						<>
							<StatusBar backgroundColor={props.topSafeAreaColor} />
							<Container
								justifyContent={props.justifyContent}
								alignItems={props.alignItems}
								withPadding={!!props.withPadding}
							>
								{props.children}
							</Container>
						</>
					)
			}

		</>
	)
}

ScreenContainer.defaultProps = {
	topSafeAreaColor: 'white',
	justifyContent: 'space-between',
	alignItems: 'center',
	withPadding: false
}

export { ScreenContainer }
