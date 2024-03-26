import React from 'react'

import { PostRange as PostRangeType } from '@domain/post/entity/types'
import { StripeProducts } from '@services/stripe/types'

import { ButtonsContainer, Container } from './styles'
import BrazilWhiteIcon from '@assets/icons/brazil-white.svg'
import CityWhiteIcon from '@assets/icons/city-white.svg'
import MapPointWhiteIcon from '@assets/icons/mapPoint-white.svg'
import { relativeScreenHeight } from '@common/screenDimensions'
import { theme } from '@common/theme'

import { BackButton } from '@components/_buttons/BackButton'
import { OptionButton } from '@components/_buttons/OptionButton'
import { InstructionCard } from '@components/_cards/InstructionCard'
import { DefaultHeaderContainer } from '@components/_containers/DefaultHeaderContainer'
import { FormContainer } from '@components/_containers/FormContainer'

import { ProgressBar } from '../../ProgressBar'

interface PostRangeProps {
	backgroundColor: string
	itemsColor: string
	isVacancy?: boolean
	cityPlanIsFree?: boolean
	plansAvailable: StripeProducts
	userSubscriptionRange: PostRangeType
	progress: [value: number, range: number]
	savePostRange: (postRange: PostRangeType) => void
	navigateBackwards: () => void
}

function PostRange({ backgroundColor, itemsColor, isVacancy, cityPlanIsFree, plansAvailable, userSubscriptionRange, progress, savePostRange, navigateBackwards }: PostRangeProps) {
	const getRelativeFooterValue = (range: PostRangeType) => {
		switch (range) {
			case 'near': {
				if (userSubscriptionRange !== 'near') return 'incluso \nno plano'
				return 'plano \ngrátis'
			}
			case 'city': {
				if (userSubscriptionRange === 'country' || cityPlanIsFree) return 'incluso \nno plano'
				if (userSubscriptionRange === 'city') return 'seu \nplano'
				return `r$ ${plansAvailable.cityMonthly.price},00 \n/ mês` || 'indisponível'
			}
			case 'country': {
				if (userSubscriptionRange === 'country') return 'seu \nplano'
				return `r$ ${plansAvailable.countryMonthly.price},00 \n/ mês` || 'indisponível'
			}
			default: return ''
		}
	}

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
					message={'onde você quer que sua postagem seja divulgada?'}
					highlightedWords={['onde', 'seja', 'divulgada']}
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
						label={'região'}
						highlightedWords={['região']}
						shortDescription={'a pessoas encontram seus \nposts e perfil  no bairro'}
						shortDescriptionHighlightedWords={['bairro']}
						shortDescriptionFontSize={14}
						relativeHeight={'26%'}
						SvgIcon={MapPointWhiteIcon}
						svgIconScale={['40%', '40%']}
						leftSideColor={itemsColor}
						leftSideWidth={'25%'}
						leftSideText={getRelativeFooterValue('near')}
						leftSideTextColor={isVacancy && theme.black4}
						onPress={() => savePostRange('near')}
					/>
					<OptionButton
						label={'cidade'}
						highlightedWords={['cidade']}
						shortDescription={'seus posts aparecem \nna cidade inteira, \ntambém pode postar em \nbairros específicos!'}
						shortDescriptionHighlightedWords={['cidade', 'inteira', '\nbairros', 'específicos!']}
						shortDescriptionFontSize={14}
						relativeHeight={'26%'}
						SvgIcon={CityWhiteIcon}
						svgIconScale={['50%', '60%']}
						leftSideColor={itemsColor}
						leftSideWidth={'25%'}
						leftSideText={getRelativeFooterValue('city')}
						leftSideTextColor={isVacancy && theme.black4}
						onPress={() => plansAvailable.cityMonthly.price && savePostRange('city')}
					/>
					<OptionButton
						label={'brasil'}
						highlightedWords={['brasil']}
						shortDescription={'postagens aparecem \nem cidades vizinhas \ne no brasil inteiro'}
						shortDescriptionHighlightedWords={['cidades', 'vizinhas', 'brasil', 'inteiro']}
						shortDescriptionFontSize={14}
						relativeHeight={'26%'}
						SvgIcon={BrazilWhiteIcon}
						svgIconScale={['50%', '50%']}
						leftSideColor={itemsColor}
						leftSideWidth={'25%'}
						leftSideText={getRelativeFooterValue('country')}
						leftSideTextColor={isVacancy && theme.black4}
						onPress={() => plansAvailable.countryMonthly.price && savePostRange('country')}
					/>
				</ButtonsContainer>
			</FormContainer>
		</Container>
	)
}

export { PostRange }
