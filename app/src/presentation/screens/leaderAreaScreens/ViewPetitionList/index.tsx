import React, { useEffect, useState } from 'react'
import { ListRenderItem, RefreshControl } from 'react-native'
import { useTheme } from 'styled-components'

import { useUtils } from '@newutils/useUtils'
import { useQueryClient } from '@tanstack/react-query'

import { PetitionEntity } from '@domain/petition/entity/types'
import { usePetitionDomain } from '@domain/petition/usePetitionDomain'

import { useCacheRepository } from '@data/application/cache/useCacheRepository'
import { usePetitionRepository } from '@data/petition/usePetitionRepository'

import { useAuthContext } from '@contexts/AuthContext'

import { ViewPetitionListScreenProps } from '@routes/Stack/LeaderAreaStack/screenProps'
import { FlatListItem } from 'src/presentation/types'

import { UiUtils } from '@utils-ui/common/UiUtils'

import { CardContainer, Container, Header, PetitionList } from './styles'
import FormHearthWhiteIcon from '@assets/icons/formHearth-white.svg'

import { PetitionCard } from '@components/_cards/PetitionCard'
import { ScreenContainer } from '@components/_containers/ScreenContainer'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'
import { DefaultPostViewHeader } from '@components/DefaultPostViewHeader'

const { getPetitionsByOwner } = usePetitionDomain()

const { executeCachedRequest } = useCacheRepository()

const { getNewDate } = UiUtils()

const { getLastItem } = useUtils()

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

			const lastPetition = !refresh && (petitions && petitions.length) ? getLastItem(petitions) : undefined

			const queryKey = ['user.petitions', userDataContext.userId, lastPetition?.petitionId]
			let userPetitions: PetitionEntity[] = await executeCachedRequest(
				queryClient,
				queryKey,
				() => getPetitionsByOwner(usePetitionRepository, userDataContext.userId, 10, lastPetition),
				refresh
			)
			userPetitions = userPetitions.map((p: PetitionEntity) => ({ ...p, createdAt: getNewDate(p.createdAt) }))

			if (!userPetitions || (userPetitions && !userPetitions.length)
				|| (lastPetition && userPetitions && userPetitions.length && (lastPetition.petitionId === getLastItem(userPetitions)?.petitionId))) {
				refresh && setIsLoading(false)
				return setListIsOver(true)
			}

			if (refresh) {
				queryClient.removeQueries({ queryKey: ['user.petitions', userDataContext.userId] })
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
		<ScreenContainer topSafeAreaColor={theme.white3} infinityBottom>
			<Container>
				<Header>
					<DefaultPostViewHeader
						ignorePlatform
						text={'abaixo assinados'}
						highlightedWords={['abaixo', 'assinados']}
						SvgIcon={FormHearthWhiteIcon}
						smallIconArea
						onBackPress={() => navigation.goBack()}
					/>
				</Header>

				<PetitionList
					data={petitions}
					renderItem={renderPetition as ListRenderItem<unknown>}
					onEndReached={loadMorePetitions}
					showsVerticalScrollIndicator={false}
					refreshControl={(
						<RefreshControl
							tintColor={theme.black4}
							colors={[theme.orange3, theme.pink3, theme.green3, theme.blue3]}
							refreshing={isLoading}
							onRefresh={() => loadPetitions(true)}
						/>
					)}
					ListHeaderComponent={() => <VerticalSpacing/>}
					ItemSeparatorComponent={() => <VerticalSpacing/>}
					ListFooterComponent={() => <VerticalSpacing bottomNavigatorSpace/>}
				/>
			</Container>
		</ScreenContainer>
	)
}
