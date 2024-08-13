import React from 'react'
import { StatusBar } from 'react-native'

import { WeekdaysFrequency } from '@domain/post/entity/types'

import { ButtonsContainer, Container } from './styles'
import CalendarBusinessDay from '@assets/icons/calendarBusinessDay-white.svg'
import CalendarEveryday from '@assets/icons/calendarEveryday-white.svg'
import CalendarSomeday from '@assets/icons/calendarSomeday-white.svg'
import CalendarToday from '@assets/icons/calendarToday-white.svg'
import TrashWhiteIcon from '@assets/icons/trash-white.svg'
import { relativeScreenHeight, relativeScreenWidth } from '@common/screenDimensions'
import { theme } from '@common/theme'
// CURRENT REmove direct import

import { BackButton } from '@components/_buttons/BackButton'
import { OptionButton } from '@components/_buttons/OptionButton'
import { SmallButton } from '@components/_buttons/SmallButton'
import { InstructionCard } from '@components/_cards/InstructionCard'
import { DefaultHeaderContainer } from '@components/_containers/DefaultHeaderContainer'
import { FormContainer } from '@components/_containers/FormContainer'
import { HorizontalSpacing } from '@components/_space/HorizontalSpacing'

interface PostFrequencyProps {
	backgroundColor: string
	buttonColor?: string
	navigateBackwards: () => void
	skipScreen?: () => void
	savePostFrequency: (serviceFrequency: WeekdaysFrequency) => void
}

function PostFrequency({
	backgroundColor,
	buttonColor,
	navigateBackwards,
	skipScreen,
	savePostFrequency
}: PostFrequencyProps) {
	return (
		<Container>
			<StatusBar backgroundColor={theme.colors.white[3]} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				relativeHeight={relativeScreenHeight(26)}
				centralized
				backgroundColor={backgroundColor}
			>
				<BackButton onPress={navigateBackwards} />
				<InstructionCard
					fontSize={16}
					message={'qual é a frequência?'}
					highlightedWords={['frequência']}
				/>
				{
					skipScreen ? (
						<>
							<HorizontalSpacing />
							<SmallButton
								SvgIcon={TrashWhiteIcon}
								color={theme.colors.red[3]}
								height={relativeScreenWidth(11)}
								relativeWidth={relativeScreenWidth(11)}
								svgScale={['60%', '60%']}
								onPress={skipScreen}
							/>
						</>
					)
						: <></>
				}
			</DefaultHeaderContainer>
			<FormContainer
				backgroundColor={theme.colors.white[3]}
			>
				<ButtonsContainer>
					<OptionButton
						color={theme.colors.white[3]}
						label={'só hoje'}
						highlightedWords={['hoje']}
						labelSize={18}
						SvgIcon={CalendarToday}
						svgIconScale={['50%', '50%']}
						leftSideWidth={'25%'}
						leftSideColor={buttonColor || theme.colors.green[3]}
						onPress={() => savePostFrequency('today')}
					/>
					<OptionButton
						color={theme.colors.white[3]}
						label={'todos os dias'}
						highlightedWords={['todos']}
						labelSize={18}
						SvgIcon={CalendarEveryday}
						svgIconScale={['50%', '50%']}
						leftSideWidth={'25%'}
						leftSideColor={buttonColor || theme.colors.green[3]}
						onPress={() => savePostFrequency('everyday')}
					/>
					<OptionButton
						color={theme.colors.white[3]}
						label={'alguns dias'}
						highlightedWords={['alguns']}
						labelSize={18}
						SvgIcon={CalendarSomeday}
						svgIconScale={['50%', '50%']}
						leftSideWidth={'25%'}
						leftSideColor={buttonColor || theme.colors.green[3]}
						onPress={() => savePostFrequency('someday')}
					/>
					<OptionButton
						color={theme.colors.white[3]}
						label={'dias comerciais'}
						highlightedWords={['comerciais']}
						labelSize={18}
						SvgIcon={CalendarBusinessDay}
						svgIconScale={['50%', '50%']}
						leftSideWidth={'25%'}
						leftSideColor={buttonColor || theme.colors.green[3]}
						onPress={() => savePostFrequency('businessDay')}
					/>
				</ButtonsContainer>
			</FormContainer>
		</Container>
	)
}

export { PostFrequency }
