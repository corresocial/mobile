import React from 'react'
import { StatusBar } from 'react-native'

import { ButtonsContainer, Container } from './styles'
import { theme } from '../../../common/theme'
import CalendarToday from '../../../assets/icons/calendarToday-white.svg'
import CalendarEveryday from '../../../assets/icons/calendarEveryday-white.svg'
import CalendarSomeday from '../../../assets/icons/calendarSomeday-white.svg'
import CalendarBusinessDay from '../../../assets/icons/calendarBusinessDay-white.svg'
import TrashWhiteIcon from '../../../assets/icons/trash-white.svg'

import { WeekdaysFrequency } from '../../../services/firebase/types'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { FormContainer } from '../../../components/_containers/FormContainer'
import { BackButton } from '../../../components/_buttons/BackButton'
import { InstructionCard } from '../../../components/_cards/InstructionCard'
import { OptionButton } from '../../../components/_buttons/OptionButton'
import { relativeScreenHeight, relativeScreenWidth } from '../../../common/screenDimensions'
import { HorizontalSpacing } from '../../_space/HorizontalSpacing'
import { SmallButton } from '../../_buttons/SmallButton'

interface PostFrequencyProps {
	backgroundColor: string
	navigateBackwards: () => void
	skipScreen?: () => void
	savePostFrequency: (serviceFrequency: WeekdaysFrequency) => void
}

function PostFrequency({
	backgroundColor,
	navigateBackwards,
	skipScreen,
	savePostFrequency
}: PostFrequencyProps) {
	return (
		<Container>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
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
								color={theme.red3}
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
				backgroundColor={theme.white3}
			>
				<ButtonsContainer>
					<OptionButton
						color={theme.white3}
						label={'só hoje'}
						highlightedWords={['hoje']}
						labelSize={18}
						SvgIcon={CalendarToday}
						svgIconScale={['50%', '50%']}
						leftSideWidth={'25%'}
						leftSideColor={theme.green3}
						onPress={() => savePostFrequency('today')}
					/>
					<OptionButton
						color={theme.white3}
						label={'todos os dias'}
						highlightedWords={['todos']}
						labelSize={18}
						SvgIcon={CalendarEveryday}
						svgIconScale={['50%', '50%']}
						leftSideWidth={'25%'}
						leftSideColor={theme.green3}
						onPress={() => savePostFrequency('everyday')}
					/>
					<OptionButton
						color={theme.white3}
						label={'alguns dias'}
						highlightedWords={['alguns']}
						labelSize={18}
						SvgIcon={CalendarSomeday}
						svgIconScale={['50%', '50%']}
						leftSideWidth={'25%'}
						leftSideColor={theme.green3}
						onPress={() => savePostFrequency('someday')}
					/>
					<OptionButton
						color={theme.white3}
						label={'dias comerciais'}
						highlightedWords={['comerciais']}
						labelSize={18}
						SvgIcon={CalendarBusinessDay}
						svgIconScale={['50%', '50%']}
						leftSideWidth={'25%'}
						leftSideColor={theme.green3}
						onPress={() => savePostFrequency('businessDay')}
					/>
				</ButtonsContainer>
			</FormContainer>
		</Container>
	)
}

export { PostFrequency }
