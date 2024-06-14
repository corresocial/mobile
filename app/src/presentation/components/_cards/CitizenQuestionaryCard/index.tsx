import React, { useState } from 'react'

import { CitizenNameContainer, CitizenNameText, Container, ContainerInner, CreatedAtText, CreatorContainer, CreatorDataContainer, CreatorNameText, QuestionaryContainer } from './styles'
import QuestionaryIcon from '@assets/icons/questionary-white.svg'
import { relativeScreenDensity, relativeScreenWidth } from '@common/screenDimensions'

import { CitizenRegistrationQuestionary } from '@screens/citizenRegistrationScreens/CitizenOfflineRegistrationList'

interface CitizenQuestionaryCardProps {
	questionaryData: CitizenRegistrationQuestionary
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
							{questionaryData.name}
						</CitizenNameText>
					</CitizenNameContainer>

					<CreatorContainer>
						<QuestionaryIcon width={relativeScreenDensity(30)} height={relativeScreenDensity(30)} />
						<CreatorDataContainer>
							<CreatorNameText>
								{questionaryData.censusTakerName}
							</CreatorNameText>
							<CreatedAtText>
								{questionaryData.createdAt.toDateString()}
							</CreatedAtText>
						</CreatorDataContainer>
					</CreatorContainer>
				</QuestionaryContainer>
			</ContainerInner>
		</Container>
	)
}

export { CitizenQuestionaryCard }
