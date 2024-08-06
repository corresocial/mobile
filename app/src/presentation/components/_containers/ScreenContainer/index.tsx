import React, { ReactNode } from 'react'
import { StatusBar } from 'react-native'
import { useTheme } from 'styled-components'

import { Container, FirstSection, getScreenContainerColorByTone, SafeAreaViewContainer, SecondSection, ThirdSection } from './styles'

export type ScreenContainerTones = 'white' | 'white' | 'orange' | 'blue' | 'purple' | 'pink' | 'green'

interface ScreenContainerProps {
	children?: React.ReactElement | React.ReactElement[]
	firstSection?: ReactNode
	secondSection?: ReactNode
	thirdSecton?: ReactNode
	tone?: ScreenContainerTones
	enableScreenPadding?: boolean
	enableSectionPadding?: boolean
	topSafeAreaColor?: string
	bottomSafeAreaColor?: string
	withPadding?: boolean
	infinityBottom?: boolean
}

/** Este componente não aceita `children` e `componentes de section` ao mesmo tempo */
function ScreenContainer({ ...props }: ScreenContainerProps) {
	const theme = useTheme()

	return (
		<>
			<SafeAreaViewContainer
				safeAreaColor={props.topSafeAreaColor}
				tone={props.tone}
				withoutFlex
			/>
			{
				!props.infinityBottom
					? (
						<SafeAreaViewContainer safeAreaColor={props.bottomSafeAreaColor}>
							<StatusBar backgroundColor={props.topSafeAreaColor || getScreenContainerColorByTone(theme, props.tone!, 1)} barStyle={'dark-content'} />
							<Container
								withPadding={!!props.enableScreenPadding}
							>
								{
									props.firstSection && (
										<FirstSection
											tone={props.tone}
											withPadding={!!props.enableSectionPadding}
										>
											{props.firstSection}
										</FirstSection>
									)
								}
								{
									props.secondSection && (
										<SecondSection
											tone={props.tone}
											withPadding={!!props.enableSectionPadding}
										>
											{props.secondSection}
										</SecondSection>
									)
								}
								{
									props.thirdSecton && (
										<ThirdSection
											tone={props.tone}
											withPadding={!!props.enableSectionPadding}
										>
											{props.thirdSecton}
										</ThirdSection>
									)
								}
								{
									!(props.firstSection
										&& props.secondSection
										&& props.thirdSecton) && props.children && (
										props.children
									)
								}
							</Container>
						</SafeAreaViewContainer>
					)
					: (
						<>
							<StatusBar backgroundColor={props.topSafeAreaColor || getScreenContainerColorByTone(theme, props.tone!, 1)} barStyle={'dark-content'} />
							<Container
								withPadding={!!props.enableScreenPadding}
							>
								{
									props.firstSection && (
										<FirstSection
											tone={props.tone}
											withPadding={!!props.enableSectionPadding}
										>
											{props.firstSection}
										</FirstSection>
									)
								}
								{
									props.secondSection && (
										<SecondSection
											tone={props.tone}
											withPadding={!!props.enableSectionPadding}
										>
											{props.secondSection}
										</SecondSection>
									)
								}
								{
									props.thirdSecton && (
										<ThirdSection
											tone={props.tone}
											withPadding={!!props.enableSectionPadding}
										>
											{props.thirdSecton}
										</ThirdSection>
									)
								}
								{
									!(props.firstSection
										&& props.secondSection
										&& props.thirdSecton) && props.children && (
										props.children
									)
								}
							</Container>
						</>
					)
			}
		</>
	)
}

ScreenContainer.defaultProps = {
	tone: 'default',
	enableScreenPadding: false,
	enableSectionPadding: false,
	withPadding: false
}

export { ScreenContainer }
