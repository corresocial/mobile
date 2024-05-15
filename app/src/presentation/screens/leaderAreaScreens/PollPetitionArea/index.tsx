import React from 'react'
import { useTheme } from 'styled-components'

import { PollPetitionAreaScreenProps } from '@routes/Stack/LeaderAreaStack/screenProps'

import { Container, Header, HeaderButtonsContainer, HeaderSection } from './styles'
import DescriptionWhiteIcon from '@assets/icons/description-white.svg'
import FormHearthWhiteIcon from '@assets/icons/formHearth-white.svg'
import PaperInfoWhiteIcon from '@assets/icons/paperInfo-white.svg'
import { relativeScreenDensity } from '@common/screenDimensions'

import { SmallButton } from '@components/_buttons/SmallButton'
import { SubtitleCard } from '@components/_cards/SubtitleCard'
import { ScreenContainer } from '@components/_containers/ScreenContainer'
import { DefaultPostViewHeader } from '@components/DefaultPostViewHeader'

export function PollPetitionArea({ navigation } : PollPetitionAreaScreenProps) {
	const theme = useTheme()

	/*
	const viewPoll = () => {
		navigation.navigate('PollStack' as any, {
			screen: 'ViewPoll',
			params: { pollId: 'HQfVYgjD6ksvDUQF3ZJg' }
		})
	}

	const viewPetition = () => {
		navigation.navigate('PetitionStack' as any, {
			screen: 'ViewPetition',
			params: { petitionId: 'PWJ6XxVOo4VLOy98vgGq' }
		})
	}
	*/

	return (
		<ScreenContainer topSafeAreaColor={theme.white3} >
			<Container>
				<Header>
					<DefaultPostViewHeader
						ignorePlatform
						text={'enquetes e \nabaixo assinados'}
						highlightedWords={['enquetes', '\nabaixo', 'assinados']}
						SvgIcon={PaperInfoWhiteIcon}
						smallIconArea
						onBackPress={() => navigation.goBack()}
					/>
				</Header>
				<HeaderButtonsContainer>
					<HeaderSection>
						<SmallButton
							label={'criar enquete'}
							labelColor={theme.black4}
							height={relativeScreenDensity(55)}
							fontSize={10}
							textMarginTop
							onPress={() => navigation.navigate('PollStack')}
							SvgIcon={DescriptionWhiteIcon}
							svgScale={['45%', '80%']}
							flexDirection={'column'}
						/>
					</HeaderSection>
					<HeaderSection>
						<SmallButton
							label={'criar abaixo assinado'}
							labelColor={theme.black4}
							height={relativeScreenDensity(55)}
							fontSize={10}
							textMarginTop
							onPress={() => navigation.navigate('PetitionStack')}
							SvgIcon={FormHearthWhiteIcon}
							svgScale={['45%', '80%']}
							flexDirection={'column'}
						/>
					</HeaderSection>
				</HeaderButtonsContainer>
				<SubtitleCard
					text={'suas enquetes'}
					highlightedText={['enquetes']}
					SvgIcon={DescriptionWhiteIcon}
					onPress={() => console.log('navigate')}
					seeMoreText
				/>
				<SubtitleCard
					text={'seus abaixo assinados'}
					highlightedText={['abaixo', 'assinados']}
					SvgIcon={FormHearthWhiteIcon}
					onPress={() => console.log('navigate')}
					seeMoreText
				/>
			</Container>
		</ScreenContainer>
	)
}
