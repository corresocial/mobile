import React, { ReactNode } from 'react'
import { StatusBar } from 'react-native'

import { Container, FirstSection, FooterSection, SafeAreaViewContainer, SecondSection, ThirdSection } from './styles'

export type ScreenContainerTones = 'white' | 'white' | 'orange' | 'blue' | 'purple' | 'pink' | 'green'

interface ScreenContainerProps {
	children?: React.ReactElement | React.ReactElement[]
	firstSection?: ReactNode
	secondSection?: ReactNode
	thirdSecton?: ReactNode
	footerSection?: ReactNode
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
									props.firstSection && !props.children && (
										<FirstSection
											tone={props.tone}
											withPadding={!!props.enableSectionPadding}
										>
											{props.firstSection}
										</FirstSection>
									)
								}
								{
									props.secondSection && !props.children && (
										<SecondSection
											tone={props.tone}
											withPadding={!!props.enableSectionPadding}
										>
											{props.secondSection}
										</SecondSection>
									)
								}
								{
									props.thirdSecton && !props.children && (
										<ThirdSection
											tone={props.tone}
											withPadding={!!props.enableSectionPadding}
										>
											{props.thirdSecton}
										</ThirdSection>
									)
								}
								{
									props.footerSection && !props.children && (
										<SecondSection tone={props.tone} >
											{props.footerSection}
										</SecondSection>
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
									props.firstSection && !props.children && (
										<FirstSection
											tone={props.tone}
											withPadding={!!props.enableSectionPadding}
										>
											{props.firstSection}
										</FirstSection>
									)
								}
								{
									props.secondSection && !props.children && (
										<SecondSection
											tone={props.tone}
											withPadding={!!props.enableSectionPadding}
										>
											{props.secondSection}
										</SecondSection>
									)
								}
								{
									props.thirdSecton && !props.children && (
										<ThirdSection
											tone={props.tone}
											withPadding={!!props.enableSectionPadding}
										>
											{props.thirdSecton}
										</ThirdSection>
									)
								}
								{
									props.footerSection && !props.children && (
										<FooterSection tone={props.tone} >
											{props.footerSection}
										</FooterSection>
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

export { ScreenContainer }
