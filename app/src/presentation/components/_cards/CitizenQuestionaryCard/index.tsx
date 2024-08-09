import React, { useState } from 'react'

import { CitizenRegisterEntity } from '@domain/citizenRegister/model/entities/types'

import { UiUtils } from '@utils-ui/common/UiUtils'

import { CitizenNameContainer, CitizenNameText, Container, ContainerInner, CreatedAtText, CreatorContainer, CreatorDataContainer, CreatorNameText, QuestionaryContainer } from './styles'
import QuestionaryIcon from '@assets/icons/questionary-white.svg'
import { relativeScreenDensity } from '@common/screenDimensions'

const { formatRelativeDate } = UiUtils()

interface CitizenQuestionaryCardProps {
	questionaryData: CitizenRegisterEntity
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
				buttonPressed={buttonPressed}
			>
				<QuestionaryContainer>
					<CitizenNameContainer>
						<CitizenNameText numberOfLines={1}>
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
								{formatRelativeDate(questionaryData.createdAt)}
							</CreatedAtText>
						</CreatorDataContainer>
					</CreatorContainer>
				</QuestionaryContainer>
			</ContainerInner>
		</Container>
	)
}

export { CitizenQuestionaryCard }
