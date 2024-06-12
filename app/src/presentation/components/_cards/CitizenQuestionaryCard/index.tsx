import React, { useState } from 'react'

import { CitizenNameContainer, CitizenNameText, Container, ContainerInner, CreatedAtText, CreatorContainer, CreatorDataContainer, CreatorNameText, QuestionaryContainer } from './styles'
import QuestionaryIcon from '@assets/icons/questionary-white.svg'
import { relativeScreenWidth } from '@common/screenDimensions'

interface CitizenQuestionaryCardProps {
	questionaryData?: object
	onPress: () => void
}

function CitizenQuestionaryCard({ questionaryData, onPress }: CitizenQuestionaryCardProps) {
	const [buttonPressed, setButtomPressed] = useState<boolean>(false)

	function pressingButton() {
		setButtomPressed(true)
	}

	function notPressingButton() {
		setButtomPressed(false)
	}

	function releaseButton() {
		setButtomPressed(false)
		onPress()
	}

	return (
		<Container
			activeOpacity={1}
			onPressIn={pressingButton}
			onPressOut={notPressingButton}
			onPress={releaseButton}
		>
			<ContainerInner
				style={{ marginLeft: buttonPressed ? relativeScreenWidth(1.7) : 0 }}
			>

				<QuestionaryContainer>
					<CitizenNameContainer>
						<CitizenNameText>
							{'Cidadão Cadastrado'}
						</CitizenNameText>
					</CitizenNameContainer>

					<CreatorContainer>
						<QuestionaryIcon/>
						<CreatorDataContainer>
							<CreatorNameText>
								{'Recenseador'}
							</CreatorNameText>
							<CreatedAtText>
								{'Hoje, 20:00'}
							</CreatedAtText>
						</CreatorDataContainer>
					</CreatorContainer>

				</QuestionaryContainer>

			</ContainerInner>

		</Container>
	)
}

export { CitizenQuestionaryCard }