import React, { useEffect, useState } from 'react'
import { ListRenderItem, RefreshControl } from 'react-native'
import { useTheme } from 'styled-components'

import { useQueryClient } from '@tanstack/react-query'

import { PollEntity } from '@domain/poll/entity/types'
import { usePollDomain } from '@domain/poll/usePollDomain'

import { useCacheRepository } from '@data/application/cache/useCacheRepository'
import { usePollRepository } from '@data/poll/usePollRepository'

import { useAuthContext } from '@contexts/AuthContext'

import { ViewPollListScreenProps } from '@routes/Stack/LeaderAreaStack/screenProps'
import { FlatListItem } from 'src/presentation/types'

import { UiUtils } from '@utils-ui/common/UiUtils'

import { CardContainer, Container, Header, PollList } from './styles'
import DescriptionWhiteIcon from '@assets/icons/description-white.svg'

import { PollCard } from '@components/_cards/PollCard'
import { ScreenContainer } from '@components/_containers/ScreenContainer'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'
import { DefaultPostViewHeader } from '@components/DefaultPostViewHeader'

const { getPollsByOwner } = usePollDomain()

const { executeCachedRequest } = useCacheRepository()

const { getNewDate } = UiUtils()

export function ViewPollList({ navigation } : ViewPollListScreenProps) {
	const { userDataContext } = useAuthContext()

	const theme = useTheme()
	const queryClient = useQueryClient()

	const [polls, setPolls] = useState<PollEntity[]>([])
	const [isLoading, setIsLoading] = useState(false)
	const [listIsOver, setListIsOver] = useState(false)

	useEffect(() => {
		loadPolls()
	}, [])

	const loadPolls = async (refresh?: boolean) => {
		try {
			if (listIsOver && !refresh) return

			refresh && setIsLoading(true)

			const lastPoll = !refresh && (polls && polls.length) ? polls[polls.length - 1] : undefined

			const queryKey = ['user.polls', userDataContext.userId, lastPoll]
			let userPolls = await executeCachedRequest(
				queryClient,
				queryKey,
				() => getPollsByOwner(usePollRepository, userDataContext.userId, 5, lastPoll),
				refresh
			)
			userPolls = userPolls.map((p: PollEntity) => ({ ...p, createdAt: getNewDate(p.createdAt) }))

			if (!userPolls.length) {
				refresh && setIsLoading(false)
				setListIsOver(true)
				return
			}

			if (refresh) {
				queryClient.removeQueries({ queryKey: ['user.polls', userDataContext.userId] })
				setPolls([...userPolls])
				setListIsOver(false)
			} else {
				setPolls([...polls, ...userPolls])
			}

			refresh && setIsLoading(false)
		} catch (error) {
			console.log(error)
			refresh && setIsLoading(false)
		}
	}

	const loadMorePolls = async () => {
		return polls.length ? loadPolls() : null
	}

	const navigateToViewPoll = (data: PollEntity) => {
		navigation.navigate('PollStack' as any, {
			screen: 'ViewPoll',
			params: { pollData: data }
		})
	}

	const renderPoll = ({ item }: FlatListItem<PollEntity>) => {
		return (
			<CardContainer>
				<PollCard
					pollData={item}
					owner={item.owner}
					isOwner={userDataContext.userId === item.owner.userId}
					onPress={() => navigateToViewPoll(item)}
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
						text={'enquetes'}
						highlightedWords={['enquetes']}
						SvgIcon={DescriptionWhiteIcon}
						smallIconArea
						onBackPress={() => navigation.goBack()}
					/>
				</Header>

				<PollList
					data={polls}
					renderItem={renderPoll as ListRenderItem<unknown>}
					onEndReached={loadMorePolls}
					showsVerticalScrollIndicator={false}
					refreshControl={(
						<RefreshControl
							tintColor={theme.black4}
							colors={[theme.orange3, theme.pink3, theme.green3, theme.blue3]}
							refreshing={isLoading}
							onRefresh={() => loadPolls(true)}
						/>
					)}
					ListHeaderComponent={() => <VerticalSpacing/>}
					ItemSeparatorComponent={() => <VerticalSpacing/>}
					ListFooterComponent={<VerticalSpacing bottomNavigatorSpace/>}
				/>
			</Container>
		</ScreenContainer>
	)
}
