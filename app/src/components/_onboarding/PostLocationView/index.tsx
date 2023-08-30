import React from 'react'
import { StatusBar } from 'react-native'

import { ButtonsContainer, Container } from './styles'
import { theme } from '../../../common/theme'
import EyeDashedWhiteIcon from '../../../assets/icons/eyeDashed-white.svg'
import PinWhiteIcon from '../../../assets/icons/pin-white.svg'
import EyeWhiteIcon from '../../../assets/icons/eye-white.svg'

import { LocationViewType } from '../../../services/firebase/types'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { FormContainer } from '../../../components/_containers/FormContainer'
import { BackButton } from '../../../components/_buttons/BackButton'
import { InstructionCard } from '../../../components/_cards/InstructionCard'
import { ProgressBar } from '../../../components/ProgressBar'
import { relativeScreenHeight } from '../../../common/screenDimensions'
import { OptionButton } from '../../_buttons/OptionButton'

interface PostLocationViewProps {
	backgroundColor: string
	itemsColor: string
	progress: [value: number, range: number]
	saveLocationViewType: (locationView: LocationViewType) => void
	navigateBackwards: () => void
}

function PostLocationView({ backgroundColor, itemsColor, progress, saveLocationViewType, navigateBackwards }: PostLocationViewProps) {
	return (
		<Container>
			<StatusBar backgroundColor={backgroundColor} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				relativeHeight={relativeScreenHeight(28)}
				centralized
				backgroundColor={backgroundColor}
			>
				<BackButton onPress={navigateBackwards} />
				<InstructionCard
					fontSize={16}
					message={'como você prefere que outros usuários vejam sua localização?'}
					highlightedWords={['como', 'você', 'prefere', 'vejam', 'sua', 'localização']}
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
					<OptionButton
						label={'privada'}
						highlightedWords={['privada']}
						shortDescription={'os usuários podem \nver seu perfil, mas não tem \nacesso a sua localização'}
						shortDescriptionHighlightedWords={['mas', 'não', 'tem', '\nacesso', 'a', 'sua', 'localização']}
						shortDescriptionFontSize={14}
						relativeHeight={'26%'}
						SvgIcon={EyeDashedWhiteIcon}
						svgIconScale={['50%', '60%']}
						leftSideColor={itemsColor}
						leftSideWidth={'25%'}
						onPress={() => saveLocationViewType('private')}
					/>
					<OptionButton
						label={'aproximada'}
						highlightedWords={['aproximada']}
						shortDescription={'os usuários podem ver a \nsua região aproximada'}
						shortDescriptionHighlightedWords={['\nsua', 'região', 'aproximada']}
						shortDescriptionFontSize={14}
						relativeHeight={'26%'}
						SvgIcon={PinWhiteIcon}
						svgIconScale={['40%', '45%']}
						leftSideColor={itemsColor}
						leftSideWidth={'25%'}
						onPress={() => saveLocationViewType('approximate')}
					/>
					<OptionButton
						label={'pública'}
						highlightedWords={['pública']}
						shortDescription={'os usuários podem ver \nexatamente onde você está'}
						shortDescriptionHighlightedWords={['\nexatamente', 'onde', 'você', 'está']}
						shortDescriptionFontSize={14}
						relativeHeight={'26%'}
						SvgIcon={EyeWhiteIcon}
						svgIconScale={['50%', '60%']}
						leftSideColor={itemsColor}
						leftSideWidth={'25%'}
						onPress={() => saveLocationViewType('public')}
					/>
				</ButtonsContainer>
			</FormContainer>
		</Container>
	)
}

export { PostLocationView }
