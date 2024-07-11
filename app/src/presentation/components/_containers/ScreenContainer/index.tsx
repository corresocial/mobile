import React, { ReactNode } from 'react'
import { StatusBar } from 'react-native'

import { Container, FirstSection, SafeAreaViewContainer, SecondSection, ThirdSection } from './styles'

export type ScreenContainerTones = 'white' | 'white' | 'orange' | 'blue' | 'purple' | 'pink' | 'green'

interface ScreenContainerProps {
	children: React.ReactElement | React.ReactElement[]
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

function ScreenContainer({ ...props }: ScreenContainerProps) {
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
							<StatusBar backgroundColor={props.topSafeAreaColor} />
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
							<StatusBar backgroundColor={props.topSafeAreaColor} />
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
