import React from 'react'

import { ButtonArea, Container, DividerView, SubTitle, TextArea, Title } from './styles'

import { StandardButton } from '@newComponents/StandardButton'

interface InfoDividerProps{
    title: string | number
    subTitle?: string
	  buttonTitle?: string
    onPress?: () => void
}

function InfoDivider({ title, subTitle, buttonTitle, onPress }: InfoDividerProps) {
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
						onPress && <StandardButton heightPreset={'small'} relativeWidth={'90%'} onPress={onPress} icon={'check'} text={buttonTitle ?? undefined}/>
					}
				</ButtonArea>
			</DividerView>
		</Container>

	)
}

export { InfoDivider }
