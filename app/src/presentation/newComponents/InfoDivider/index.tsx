import React from 'react'

import { IconName } from '@assets/icons/iconMap/types'

import { ButtonArea, Container, DividerView, SubTitle, TextArea, Title } from './styles'

import { StandardButton } from '@newComponents/StandardButton'

interface InfoDividerProps {
	title: string | number
	icon?: IconName
	subTitle?: string
	buttonTitle?: string
	onPress?: () => void
}

function InfoDivider({ title, icon, subTitle, buttonTitle, onPress }: InfoDividerProps) {
	return (
		<Container>
			<DividerView>
				<TextArea>
					<Title>
						{title}
					</Title>
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
								icon={icon}
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
