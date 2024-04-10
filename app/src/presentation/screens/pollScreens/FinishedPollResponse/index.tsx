import React from 'react'
import { useTheme } from 'styled-components'

import { FinishedPollResponseScreenProps } from '@routes/Stack/PollStack/screenProps'

import { ButtonOptionsContainer, Container, InstructionButtonContainer } from './styles'
import SendFileWhiteIcon from '@assets/icons/sendFile-white.svg'
import { relativeScreenHeight } from '@common/screenDimensions'

import { PrimaryButton } from '@components/_buttons/PrimaryButton'
import { InstructionCard } from '@components/_cards/InstructionCard'
import { DefaultHeaderContainer } from '@components/_containers/DefaultHeaderContainer'
import { FormContainer } from '@components/_containers/FormContainer'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'
import { ProgressBar } from '@components/ProgressBar'
import { SmallUserIdentification } from '@components/SmallUserIdentification'

function FinishedPollResponse({ navigation }: FinishedPollResponseScreenProps) {
	const theme = useTheme()

	const owner = {
		name: 'change',
		profilePictureUrl: ['https://cc-prod.scene7.com/is/image/CCProdAuthor/FF-SEO-text-to-image-marquee-mobile-2x?$pjpeg$&jpegSize=100&wid=600']
	}
	const responseProgress = [3, 3]

	const sendPollResponses = () => {
		console.log('Send poll responses')
		navigation.navigate('ViewPoll', {} as any)
		navigation.goBack()
		// Call domain
	}

	return (
		<Container>
			<DefaultHeaderContainer
				relativeHeight={relativeScreenHeight(80)}
				centralized
				backgroundColor={theme.purple2}
				flexDirection={'column'}
			>
				<InstructionButtonContainer >
					<InstructionCard
						fontSize={16}
						message={'muito obrigado por responder a enquete!'}
						highlightedWords={['muito', 'obrigado', 'por', 'responder', 'a', 'enquete!']}
					>
						<VerticalSpacing />
						<SmallUserIdentification
							userName={owner.name}
							profilePictureUrl={owner.profilePictureUrl[0] || ''}
							showLeaderSeal
						/>
						<ProgressBar value={responseProgress[0]} range={responseProgress[1]} />
					</InstructionCard>
				</InstructionButtonContainer>
			</DefaultHeaderContainer>
			<FormContainer>
				<ButtonOptionsContainer>
					<PrimaryButton
						color={theme.green3}
						label={'enviar responsas'}
						labelColor={theme.white3}
						SecondSvgIcon={SendFileWhiteIcon}
						onPress={sendPollResponses}
					/>
				</ButtonOptionsContainer>
			</FormContainer>
		</Container>
	)
}

export { FinishedPollResponse }
