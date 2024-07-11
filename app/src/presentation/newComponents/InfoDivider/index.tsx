import React from 'react'

import { ButtonArea, Container, DividerView, SubTitle, TextArea, Title } from './styles'

interface InfoDividerProps {
	title: string | number
	subTitle?: string
	onPress?: () => void
}

function InfoDivider({ title, subTitle, onPress }: InfoDividerProps) {
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
					{/* Primary Button */}
				</ButtonArea>
			</DividerView>
		</Container>

	)
}

export { InfoDivider }
