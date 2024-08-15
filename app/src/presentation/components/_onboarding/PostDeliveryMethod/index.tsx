import React from 'react'

import { DeliveryMethod } from '@domain/post/entity/types'

import { Container, ButtonsContainer } from './styles'
import BrazilWhiteIcon from '@assets/icons/brazil-white.svg'
import CityWhiteIcon from '@assets/icons/city-white.svg'
import DeniedWhiteIcon from '@assets/icons/denied-white.svg'
import MapPointWhiteIcon from '@assets/icons/mapPoint-white.svg'
import { relativeScreenHeight } from '@common/screenDimensions'
import { theme } from '@common/theme'

import { BackButton } from '@components/_buttons/BackButton'
import { OptionButton } from '@components/_buttons/OptionButton'
import { InstructionCard } from '@components/_cards/InstructionCard'
import { DefaultHeaderContainer } from '@components/_containers/DefaultHeaderContainer'
import { FormContainer } from '@components/_containers/FormContainer'

interface PostDeliveryMethodProps {
	backgroundColor: string
	itemsColor: string
	navigateBackwards: () => void
	saveDeliveryMethod: (deliveryMethod: DeliveryMethod) => void
}

function PostDeliveryMethod({ backgroundColor, itemsColor, navigateBackwards, saveDeliveryMethod }: PostDeliveryMethodProps) {
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
				/>
			</DefaultHeaderContainer>
			<FormContainer
				backgroundColor={theme.colors.white[3]}
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
