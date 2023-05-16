import React from 'react'
import { StatusBar } from 'react-native'

import { ButtonsContainer, Container } from './styles'
import { theme } from '../../../common/theme'
import CalendarToday from '../../../assets/icons/calendarToday-unfilled.svg'
import CalendarEveryday from '../../../assets/icons/calendarEveryday-unfilled.svg'
import CalendarSomeday from '../../../assets/icons/calendarSomeday-unfilled.svg'
import CalendarBusinessDay from '../../../assets/icons/calendarBusinessDay-unfilled.svg'
import DeniedWhiteIcon from '../../../assets/icons/denied-white.svg'

import { WeekdaysFrequency } from '../../../services/firebase/types'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { FormContainer } from '../../../components/_containers/FormContainer'
import { BackButton } from '../../../components/_buttons/BackButton'
import { InstructionCard } from '../../../components/_cards/InstructionCard'
import { ProgressBar } from '../../../components/ProgressBar'
import { OptionButton } from '../../../components/_buttons/OptionButton'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { relativeScreenHeight } from '../../../common/screenDimensions'

interface PostFrequencyProps {
	backgroundColor: string
	progress: [value: number, range: number]
	navigateBackwards: () => void
	skipScreen?: () => void
	savePostFrequency: (serviceFrequency: WeekdaysFrequency) => void
}

function PostFrequency({
	backgroundColor,
	progress,
	navigateBackwards,
	skipScreen,
	savePostFrequency
}: PostFrequencyProps) {
	return (
		<Container>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				relativeHeight={relativeScreenHeight(24)}
				centralized
				backgroundColor={theme.white3}
			>
				<BackButton onPress={navigateBackwards} />
				<InstructionCard
					borderLeftWidth={3}
					fontSize={17}
					message={'quando?'}
					highlightedWords={['quando']}
				>
					<ProgressBar
						value={progress[0]}
						range={progress[1]}
					/>
				</InstructionCard>
			</DefaultHeaderContainer>
			<FormContainer
				backgroundColor={backgroundColor}
			>
				<ButtonsContainer>
					<OptionButton
						color={theme.white3}
						label={'só hoje'}
						highlightedWords={['hoje']}
						labelColor={theme.black3}
						labelSize={20}
						labelAlign={'left'}
						SvgIcon={CalendarToday}
						svgIconScale={['50%', '50%']}
						leftSideWidth={'20%'}
						leftSideColor={theme.orange2}
						onPress={() => savePostFrequency('today')}
					/>
					<OptionButton
						color={theme.white3}
						label={'todos os dias'}
						highlightedWords={['todos']}
						labelColor={theme.black3}
						labelSize={20}
						labelAlign={'left'}
						SvgIcon={CalendarEveryday}
						svgIconScale={['50%', '50%']}
						leftSideWidth={'20%'}
						leftSideColor={theme.red2}
						onPress={() => savePostFrequency('everyday')}
					/>
					<OptionButton
						color={theme.white3}
						label={'alguns dias'}
						highlightedWords={['alguns']}
						labelColor={theme.black3}
						labelSize={20}
						labelAlign={'left'}
						SvgIcon={CalendarSomeday}
						svgIconScale={['50%', '50%']}
						leftSideWidth={'20%'}
						leftSideColor={theme.yellow2}
						onPress={() => savePostFrequency('someday')}
					/>
					<OptionButton
						color={theme.white3}
						label={'dias comerciais'}
						highlightedWords={['comerciais']}
						labelColor={theme.black3}
						labelSize={20}
						labelAlign={'left'}
						SvgIcon={CalendarBusinessDay}
						svgIconScale={['50%', '50%']}
						leftSideWidth={'20%'}
						leftSideColor={theme.green2}
						onPress={() => savePostFrequency('businessDay')}
					/>
					<PrimaryButton
						flexDirection={'row-reverse'}
						color={theme.yellow3}
						label={'pular'}
						highlightedWords={['pular']}
						labelColor={theme.black4}
						SecondSvgIcon={DeniedWhiteIcon}
						svgIconScale={['40%', '18%']}
						onPress={skipScreen}
					/>
				</ButtonsContainer>
			</FormContainer>
		</Container>
	)
}

export { PostFrequency }
