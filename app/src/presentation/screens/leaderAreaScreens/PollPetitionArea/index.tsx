import React, { useEffect, useState } from 'react'
import { RefreshControl } from 'react-native'
import { useTheme } from 'styled-components'

import { PetitionEntity } from '@domain/petition/entity/types'
import { usePetitionDomain } from '@domain/petition/usePetitionDomain'
import { PollEntity } from '@domain/poll/entity/types'
import { usePollDomain } from '@domain/poll/usePollDomain'

import { usePetitionRepository } from '@data/petition/usePetitionRepository'
import { usePollRepository } from '@data/poll/usePollRepository'

import { useAuthContext } from '@contexts/AuthContext'

import { PollPetitionAreaScreenProps } from '@routes/Stack/LeaderAreaStack/screenProps'

import { CardContainer, Header, HeaderButtonsContainer, HeaderSection, PollPetitionList } from './styles'
import DescriptionWhiteIcon from '@assets/icons/description-white.svg'
import FormHearthWhiteIcon from '@assets/icons/formHearth-white.svg'
import PaperInfoWhiteIcon from '@assets/icons/paperInfo-white.svg'
import { relativeScreenDensity } from '@common/screenDimensions'

import { SmallButton } from '@components/_buttons/SmallButton'
import { PetitionCard } from '@components/_cards/PetitionCard'
import { PollCard } from '@components/_cards/PollCard'
import { SubtitleCard } from '@components/_cards/SubtitleCard'
import { ScreenContainer } from '@components/_containers/ScreenContainer'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'
import { DefaultPostViewHeader } from '@components/DefaultPostViewHeader'

const { getPollsByOwner } = usePollDomain()
const { getPetitionsByOwner } = usePetitionDomain()

export function PollPetitionArea({ navigation } : PollPetitionAreaScreenProps) {
	const { userDataContext } = useAuthContext()

	const theme = useTheme()

	const [polls, setPolls] = useState<PollEntity[]>()
	const [petitions, setPetitions] = useState<PetitionEntity[]>()
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		loadPollsAndPetitions()
	}, [])

	const loadPollsAndPetitions = async (refresh?: boolean) => {
		console.log('loadPollsAndPetitions', refresh)
		try {
			refresh && setIsLoading(true)
			await loadPolls()
			await loadPetitions()
			refresh && setIsLoading(false)
		} catch (error) {
			console.log(error)
			setIsLoading(false)
		}
	}

	const loadPolls = async () => {
		const userPolls = await getPollsByOwner(usePollRepository, userDataContext.userId, 1)
		setPolls(userPolls)
	}

	const loadPetitions = async () => {
		const userPetitions = await getPetitionsByOwner(usePetitionRepository, userDataContext.userId, 1)
		setPetitions(userPetitions)
	}

	const navigateToViewPoll = (data: PollEntity) => {
		navigation.navigate('PollStack' as any, {
			screen: 'ViewPoll',
			params: { pollData: data }
		})
	}

	const navigateToViewPetition = (data: PetitionEntity) => {
		navigation.navigate('PetitionStack' as any, {
			screen: 'ViewPetition',
			params: { petitionData: data }
		})
	}

	const renderRegisterButtons = () => {
		return (
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
		)
	}

	const renderPolls = () => {
		if (!polls) return
		return (
			<>
				<SubtitleCard
					text={'suas enquetes'}
					highlightedText={['enquetes']}
					SvgIcon={DescriptionWhiteIcon}
					onPress={() => navigation.navigate('ViewPollList')}
					seeMoreText
				/>
				<VerticalSpacing/>
				{
					polls.map((pollData) => (
						<CardContainer key={pollData.pollId}>
							<PollCard
								pollData={pollData}
								owner={pollData.owner}
								isOwner={userDataContext.userId === pollData.owner.userId}
								onPress={() => navigateToViewPoll(pollData)}
							/>
							<VerticalSpacing/>
						</CardContainer>
					))
				}
			</>
		)
	}

	const renderPetitions = () => {
		if (!petitions) return
		return (
			<>
				<SubtitleCard
					text={'seus abaixo assinados'}
					highlightedText={['abaixo', 'assinados']}
					SvgIcon={FormHearthWhiteIcon}
					onPress={() => navigation.navigate('ViewPetitionList')}
					seeMoreText
				/>
				<VerticalSpacing/>
				{
					petitions.map((petitionData) => (
						<CardContainer key={petitionData.petitionId}>
							<PetitionCard
								petitionData={petitionData}
								owner={petitionData.owner}
								isOwner={userDataContext.userId === petitionData.owner.userId}
								onPress={() => navigateToViewPetition(petitionData)}
							/>
							<VerticalSpacing/>
						</CardContainer>
					))
				}
			</>
		)
	}

	const renderPollPetitions = () => {
		return (
			<>
				{renderRegisterButtons()}
				{renderPolls()}
				{renderPetitions()}
			</>
		)
	}

	return (
		<ScreenContainer topSafeAreaColor={theme.white3} >
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
			<PollPetitionList
				data={[1]}
				renderItem={(() => {}) as any}
				onEndReachedThreshold={0.4}
				CellRendererComponent={renderPollPetitions}
				refreshControl={(
					<RefreshControl
						refreshing={isLoading}
						onRefresh={() => loadPollsAndPetitions(true)}
						colors={[theme.white3]}
						size={relativeScreenDensity(20)}
					/>
				)}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ paddingBottom: relativeScreenDensity(60) }}
				/* ListHeaderComponent={(
					<>

					</>
				)} */
				ItemSeparatorComponent={() => <VerticalSpacing/>}
				// stickyHeaderIndices={[0]}
			/>
		</ScreenContainer>
	)
}
