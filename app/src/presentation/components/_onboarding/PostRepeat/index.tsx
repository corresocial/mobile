import React from 'react'
import { StatusBar } from 'react-native'

import { EventRepeatType } from '@domain/post/entity/types'

import { Container, ButtonsContainer } from './styles'
import CalendarBiweeklyWhiteIcon from '@assets/icons/calendarBiweekly-white.svg'
import CalendarInfinityWhiteIcon from '@assets/icons/calendarInfinity-white.svg'
import CalendarMonthlyWhiteIcon from '@assets/icons/calendarMonthly-white.svg'
import CalendarWeeklyWhiteIcon from '@assets/icons/calendarWeekly-white.svg'
import CalendarXWhiteIcon from '@assets/icons/calendarX-white.svg'
import { relativeScreenHeight } from '@common/screenDimensions'
import { theme } from '@common/theme'

import { BackButton } from '@components/_buttons/BackButton'
import { OptionButton } from '@components/_buttons/OptionButton'
import { InstructionCard } from '@components/_cards/InstructionCard'
import { DefaultHeaderContainer } from '@components/_containers/DefaultHeaderContainer'
import { FormContainer } from '@components/_containers/FormContainer'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'

interface PostRepeatProps {
	backgroundColor: string
	itemsColor: string
	savePostRepeat: (repeat: EventRepeatType) => void
	navigateBackwards: () => void
}

function PostRepeat({ backgroundColor, itemsColor, savePostRepeat, navigateBackwards }: PostRepeatProps) {
	return (
		<Container>
			<StatusBar backgroundColor={backgroundColor} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				relativeHeight={relativeScreenHeight(26)}
				centralized
				backgroundColor={backgroundColor}
			>
				<BackButton onPress={navigateBackwards} />
				<InstructionCard
					fontSize={16}
					message={'se repete?'}
					highlightedWords={['repete']}
				/>
			</DefaultHeaderContainer>
			<FormContainer
				backgroundColor={theme.white3}
			>
				<ButtonsContainer>
					<OptionButton
						label={'todos os dias'}
						highlightedWords={['todos']}
						labelSize={18}
						relativeHeight={'15%'}
						SvgIcon={CalendarInfinityWhiteIcon}
						svgIconScale={['80%', '80%']}
						leftSideColor={itemsColor}
						leftSideWidth={'25%'}
						onPress={() => savePostRepeat('everyDay')}
					/>
					<OptionButton
						label={'1 vez por semana'}
						highlightedWords={['1', 'vez', 'semana']}
						labelSize={18}
						relativeHeight={'15%'}
						SvgIcon={CalendarWeeklyWhiteIcon}
						svgIconScale={['80%', '80%']}
						leftSideColor={itemsColor}
						leftSideWidth={'25%'}
						onPress={() => savePostRepeat('weekly')}
					/>
					<OptionButton
						label={'a cada 15 dias'}
						highlightedWords={['15', 'dias']}
						labelSize={18}
						relativeHeight={'15%'}
						SvgIcon={CalendarBiweeklyWhiteIcon}
						svgIconScale={['80%', '80%']}
						leftSideColor={itemsColor}
						leftSideWidth={'25%'}
						onPress={() => savePostRepeat('biweekly')}
					/>
					<OptionButton
						label={'1 vez no mês'}
						highlightedWords={['1', 'vez', 'mês']}
						labelSize={18}
						relativeHeight={'15%'}
						SvgIcon={CalendarMonthlyWhiteIcon}
						svgIconScale={['80%', '80%']}
						leftSideColor={itemsColor}
						leftSideWidth={'25%'}
						onPress={() => savePostRepeat('monthly')}
					/>
					<OptionButton
						label={'não se repete'}
						highlightedWords={['não', 'repete']}
						labelSize={18}
						relativeHeight={'15%'}
						SvgIcon={CalendarXWhiteIcon}
						svgIconScale={['80%', '80%']}
						leftSideColor={itemsColor}
						leftSideWidth={'25%'}
						onPress={() => savePostRepeat('unrepeatable')}
					/>
					<VerticalSpacing />
				</ButtonsContainer>
			</FormContainer>
		</Container>
	)
}

export { PostRepeat }
