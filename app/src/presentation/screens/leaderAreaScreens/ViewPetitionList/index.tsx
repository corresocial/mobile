import React, { useEffect, useState } from 'react'
import { ListRenderItem, RefreshControl } from 'react-native'
import { useTheme } from 'styled-components'

import { useQueryClient } from '@tanstack/react-query'

import { PetitionEntity } from '@domain/petition/entity/types'
import { usePetitionDomain } from '@domain/petition/usePetitionDomain'

import { useCacheRepository } from '@data/application/cache/useCacheRepository'
import { usePetitionRepository } from '@data/petition/usePetitionRepository'

import { useAuthContext } from '@contexts/AuthContext'

import { ViewPetitionListScreenProps } from '@routes/Stack/LeaderAreaStack/screenProps'
import { FlatListItem } from 'src/presentation/types'

import { CardContainer, Container, Header, PetitionList } from './styles'
import DescriptionWhiteIcon from '@assets/icons/description-white.svg'
import { relativeScreenDensity, relativeScreenHeight } from '@common/screenDimensions'

import { PetitionCard } from '@components/_cards/PetitionCard'
import { ScreenContainer } from '@components/_containers/ScreenContainer'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'
import { DefaultPostViewHeader } from '@components/DefaultPostViewHeader'

const { getPetitionsByOwner } = usePetitionDomain()

const { executeCachedRequest } = useCacheRepository()

export function ViewPetitionList({ navigation } : ViewPetitionListScreenProps) {
	const { userDataContext } = useAuthContext()

	const theme = useTheme()
	const queryClient = useQueryClient()

	const [petitions, setPetitions] = useState<PetitionEntity[]>([])
	const [isLoading, setIsLoading] = useState(false)
	const [listIsOver, setListIsOver] = useState(false)

	useEffect(() => {
		loadPetitions()
	}, [])

	const loadPetitions = async (refresh?: boolean) => {
		try {
			if (listIsOver && !refresh) return

			refresh && setIsLoading(true)
			const lastPetition = !refresh && (petitions && petitions.length) ? petitions[petitions.length - 1] : undefined

			const queryKey = ['petitions', userDataContext.userId, lastPetition?.petitionId]
			const userPetitions = await executeCachedRequest(
				queryClient,
				queryKey,
				() => getPetitionsByOwner(usePetitionRepository, userDataContext.userId, 3, lastPetition),
				refresh
			)

			console.log(userPetitions.length)

			if (!userPetitions.length) {
				refresh && setIsLoading(false)
				setListIsOver(true)
				return
			}

			if (refresh) {
				queryClient.removeQueries({ queryKey: ['petitions', userDataContext.userId] })
				setPetitions([...userPetitions])
				setListIsOver(false)
			} else {
				setPetitions([...petitions, ...userPetitions])
			}

			refresh && setIsLoading(false)
		} catch (error) {
			console.log(error)
			refresh && setIsLoading(false)
		}
	}

	const loadMorePetitions = async () => {
		return petitions.length ? loadPetitions() : null
	}

	const navigateToViewPetition = (data: PetitionEntity) => {
		navigation.navigate('PetitionStack' as any, {
			screen: 'ViewPetition',
			params: { petitionData: data }
		})
	}

	const renderPetition = ({ item }: FlatListItem<PetitionEntity>) => {
		return (
			<CardContainer>
				<PetitionCard
					petitionData={item}
					owner={item.owner}
					isOwner={userDataContext.userId === item.owner.userId}
					onPress={() => navigateToViewPetition(item)}
				/>
			</CardContainer>
		)
	}

	return (
		<ScreenContainer topSafeAreaColor={theme.white3} bottomSafeAreaColor={theme.purple2}>
			<Container>
				<Header>
					<DefaultPostViewHeader
						ignorePlatform
						text={'abaixo assinados'}
						highlightedWords={['abaixo assinados']}
						SvgIcon={DescriptionWhiteIcon}
						smallIconArea
						onBackPress={() => navigation.goBack()}
					/>
				</Header>

				<PetitionList
					data={petitions}
					renderItem={renderPetition as ListRenderItem<unknown>}
					onEndReached={loadMorePetitions}
					onEndReachedThreshold={0.2}
					refreshControl={(
						<RefreshControl
							refreshing={isLoading}
							onRefresh={() => loadPetitions(true)}
							colors={[theme.white3]}
							size={relativeScreenDensity(20)}
						/>
					)}
					ListHeaderComponent={() => <VerticalSpacing/>}
					ItemSeparatorComponent={() => <VerticalSpacing/>}
					ListFooterComponent={() => <VerticalSpacing height={relativeScreenHeight(10)}/>}
				/>
			</Container>
		</ScreenContainer>
	)
}
