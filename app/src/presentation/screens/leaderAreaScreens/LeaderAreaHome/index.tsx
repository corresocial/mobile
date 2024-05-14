import React from 'react'
import { useTheme } from 'styled-components'

import { Container, HeaderButtonsContainer, HeaderSection } from './styles'
import ClockArrowWhiteIcon from '@assets/icons/clockArrow-white.svg'
import DeniedWhiteIcon from '@assets/icons/denied-white.svg'
import FormHearthWhiteIcon from '@assets/icons/formHearth-white.svg'
import { relativeScreenDensity } from '@common/screenDimensions'

import { OptionButton } from '@components/_buttons/OptionButton'
import { SubtitleCard } from '@components/_cards/SubtitleCard'
import { ScreenContainer } from '@components/_containers/ScreenContainer'

export function LeaderAreaHome() {
	const theme = useTheme()

	return (
		<ScreenContainer topSafeAreaColor={theme.orange2} >
			<Container>
				<HeaderButtonsContainer>
					<HeaderSection>
						<OptionButton
							label={'enquetes \ne abaixo \nassinados'}
							highlightedWords={['enquetes', 'abaixo', '\nassinados']}
							labelSize={11}
							relativeHeight={relativeScreenDensity(70)}
							leftSideWidth={'28%'}
							leftSideColor={theme.purple3}
							SvgIcon={FormHearthWhiteIcon}
							svgIconScale={['80%', '120%']}
							onPress={() => console.log('navigate')}
						/>
					</HeaderSection>
					<HeaderSection>
						<OptionButton
							label={'0 problemas \nna região'}
							highlightedWords={['problemas', 'sua', 'região']}
							labelSize={11}
							relativeHeight={relativeScreenDensity(70)}
							leftSideWidth={'28%'}
							leftSideColor={theme.red3}
							SvgIcon={DeniedWhiteIcon}
							svgIconScale={['80%', '80%']}
							onPress={() => console.log('navigate')}
						/>
					</HeaderSection>
				</HeaderButtonsContainer>
				<SubtitleCard
					text={'aguardando aprovação'}
					highlightedText={['aguardando', 'aprovação']}
					SvgIcon={ClockArrowWhiteIcon}
					onPress={() => console.log('navigate')}
					seeMoreText
				/>
			</Container>
		</ScreenContainer>
	)
}
