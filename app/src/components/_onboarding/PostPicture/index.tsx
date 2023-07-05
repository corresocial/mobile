import React from 'react'

import { ButtonsContainer, Container } from './styles'
import { relativeScreenHeight } from '../../../common/screenDimensions'
import { theme } from '../../../common/theme'
import XWhiteIcon from '../../../assets/icons/x-white.svg'
import CheckWhiteIcon from '../../../assets/icons/check-white.svg'

import { DefaultHeaderContainer } from '../../_containers/DefaultHeaderContainer'
import { FormContainer } from '../../_containers/FormContainer'
import { BackButton } from '../../_buttons/BackButton'
import { PrimaryButton } from '../../_buttons/PrimaryButton'
import { InstructionCard } from '../../_cards/InstructionCard'
import { ProgressBar } from '../../ProgressBar'

interface PostPictureTypeProps {
	backgroundColor: string
	progress: [value: number, range: number]
	skipPostPicture: () => void
	navigateToPicturePreview: () => void
	navigateBackwards: () => void
}

function PostPicture({ backgroundColor,
	progress,
	skipPostPicture,
	navigateToPicturePreview,
	navigateBackwards
}: PostPictureTypeProps) {
	return (
		<Container>
			<DefaultHeaderContainer
				relativeHeight={relativeScreenHeight(28)}
				centralized
				backgroundColor={backgroundColor}
			>
				<BackButton onPress={navigateBackwards} />
				<InstructionCard
					borderLeftWidth={3}
					fontSize={17}
					message={'que tal adicionar algumas fotos?'}
					highlightedWords={['adicionar', 'algumas', 'fotos']}
				>
					<ProgressBar
						value={progress[0]}
						range={progress[1]}
					/>
				</InstructionCard>
			</DefaultHeaderContainer>
			<FormContainer
				backgroundColor={theme.white3}
			>
				<ButtonsContainer>
					<PrimaryButton
						flexDirection={'row-reverse'}
						color={theme.red3}
						relativeHeight={'30%'}
						labelColor={theme.white3}
						label={'não, obrigado'}
						highlightedWords={['não']}
						SecondSvgIcon={XWhiteIcon}
						svgIconScale={['40%', '18%']}
						onPress={skipPostPicture}
					/>
					<PrimaryButton
						flexDirection={'row-reverse'}
						color={theme.green3}
						relativeHeight={'30%'}
						labelColor={theme.white3}
						label={'opa, vou adicionar'}
						highlightedWords={['vou', 'adicionar']}
						SvgIcon={CheckWhiteIcon}
						onPress={navigateToPicturePreview}
					/>
				</ButtonsContainer>
			</FormContainer>
		</Container>
	)
}

export { PostPicture }
