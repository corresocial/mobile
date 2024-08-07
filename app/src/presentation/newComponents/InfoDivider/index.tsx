import React from 'react'

import { IconName } from '@assets/icons/iconMap/types'

import { ButtonArea, Container, DividerView, SubTitle, TextArea, Title, TitleContainer } from './styles'

import { IconComponent } from '@newComponents/IconComponent'
import { StandardButton } from '@newComponents/StandardButton'

interface InfoDividerProps {
	title: string | number
	leftIcon?: IconName
	buttonIcon?: IconName
	subTitle?: string
	buttonTitle?: string
	onPress?: () => void
}

function InfoDivider({ title, leftIcon, buttonIcon, subTitle, buttonTitle, onPress }: InfoDividerProps) {
	return (
		<Container>
			<DividerView>
				<TextArea>
					<TitleContainer>
						{
							leftIcon && (
								<IconComponent relativeWidth={40} relativeHeight={40} iconName={leftIcon} />
							)
						}
						<Title>
							{title}
						</Title>
					</TitleContainer>

					{
						subTitle && (
							<SubTitle>
								{subTitle}
							</SubTitle>
						)
					}
				</TextArea>
				<ButtonArea>
					{
						onPress && (
							<StandardButton
								text={buttonTitle ?? undefined}
								heightPreset={'small'}
								icon={buttonIcon}
								reversed
								onPress={onPress}
							/>
						)
					}
				</ButtonArea>
			</DividerView>
		</Container>

	)
}

export { InfoDivider }
