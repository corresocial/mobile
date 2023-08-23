import React from 'react'

import { Container, ButtonsContainer } from './styles'
import { theme } from '../../../common/theme'
import DeniedWhiteIcon from '../../../assets/icons/denied-white.svg'
import MapPointWhiteIcon from '../../../assets/icons/mapPoint-white.svg'
import CityWhiteIcon from '../../../assets/icons/city-white.svg'
import BrazilWhiteIcon from '../../../assets/icons/brazil-white.svg'

import { DeliveryMethod } from '../../../services/firebase/types'

import { DefaultHeaderContainer } from '../../_containers/DefaultHeaderContainer'
import { FormContainer } from '../../_containers/FormContainer'
import { BackButton } from '../../_buttons/BackButton'
import { InstructionCard } from '../../_cards/InstructionCard'
import { ProgressBar } from '../../ProgressBar'
import { relativeScreenHeight } from '../../../common/screenDimensions'
import { OptionButton } from '../../_buttons/OptionButton'

interface PostDeliveryMethodProps {
	backgroundColor: string
	itemsColor: string
	progress: [value: number, range: number]
	navigateBackwards: () => void
	saveDeliveryMethod: (deliveryMethod: DeliveryMethod) => void
}

function PostDeliveryMethod({ backgroundColor, itemsColor, progress, navigateBackwards, saveDeliveryMethod }: PostDeliveryMethodProps) {
	return (
		<Container>
			<DefaultHeaderContainer
				relativeHeight={relativeScreenHeight(28)}
				centralized
				backgroundColor={backgroundColor}
			>
				<BackButton onPress={navigateBackwards} />
				<InstructionCard
					fontSize={16}
					message={'você faz entregas ou \natende à distância?'}
					highlightedWords={['entregas', '\natende', 'à', 'distância']}
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
						label={'comprador busca'}
						highlightedWords={['busca']}
						labelSize={16}
						relativeHeight={'18%'}
						SvgIcon={DeniedWhiteIcon}
						svgIconScale={['50%', '50%']}
						leftSideColor={itemsColor}
						leftSideWidth={'25%'}
						onPress={() => saveDeliveryMethod('unavailable')}
					/>
					<OptionButton
						label={'entrego na região'}
						highlightedWords={['na', 'região']}
						labelSize={16}
						relativeHeight={'18%'}
						SvgIcon={MapPointWhiteIcon}
						svgIconScale={['50%', '50%']}
						leftSideColor={itemsColor}
						leftSideWidth={'25%'}
						onPress={() => saveDeliveryMethod('near')}
					/>
					<OptionButton
						label={'entrego na cidade'}
						highlightedWords={['na', 'cidade']}
						labelSize={16}
						relativeHeight={'18%'}
						SvgIcon={CityWhiteIcon}
						svgIconScale={['60%', '60%']}
						leftSideColor={itemsColor}
						leftSideWidth={'25%'}
						onPress={() => saveDeliveryMethod('city')}
					/>
					<OptionButton
						label={'atendo no brasil inteiro'}
						highlightedWords={['brasil', 'inteiro']}
						labelSize={16}
						relativeHeight={'18%'}
						SvgIcon={BrazilWhiteIcon}
						svgIconScale={['50%', '50%']}
						leftSideColor={itemsColor}
						leftSideWidth={'25%'}
						onPress={() => saveDeliveryMethod('country')}
					/>
				</ButtonsContainer>
			</FormContainer>
		</Container>
	)
}

export { PostDeliveryMethod }
