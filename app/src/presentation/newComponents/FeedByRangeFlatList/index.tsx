import { useNavigation } from '@react-navigation/native'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import { FlatList, RefreshControl } from 'react-native'

import { PetitionEntity } from '@domain/petition/entity/types'
import { PollEntity } from '@domain/poll/entity/types'
import { FeedPosts, PostEntity, PostEntityCommonFields, PostEntityOptional, PostRange } from '@domain/post/entity/types'

import { useAuthContext } from '@contexts/AuthContext'

import { PostRangeDivider } from './types'
import { IconName } from '@assets/icons/iconMap/types'

import { isRecentPost } from '@utils-ui/post/validation'

import { FlashListContainer, NoPostNotifierContainer } from './styles'
import { theme } from '@common/theme'

import { PetitionCard } from '@components/_cards/PetitionCard'
import { PollCard } from '@components/_cards/PollCard'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'
import { PostCardContainer } from '@components/FeedByRange/styles'
import { EmptyPostsNotifier } from '@newComponents/EmptyPostsNotifier'
import { InfoDivider } from '@newComponents/InfoDivider'
import { PostCard } from '@newComponents/PostCard'

interface FeedByRangeFlatListProps {
	collapseExternalVacancies?: boolean
	backgroundColor?: string
	filteredFeedPosts: FeedPosts
	feedIsUpdating?: boolean
	listHeaderComponent?: React.ReactElement<any>
	viewPostsByRange: (postRange: PostRange) => void
	navigateToProfile: (userId: string, redirect?: string) => void
	goToPostView: (post: PostEntityOptional) => void
	goToLeaderPostsView?: (post: PollEntity & PetitionEntity) => void
	onRefresh?: () => void
}

function FeedByRangeFlatList({
	backgroundColor,
	filteredFeedPosts,
	collapseExternalVacancies = true,
	feedIsUpdating = false,
	listHeaderComponent = (<></>),
	viewPostsByRange,
	navigateToProfile,
	goToPostView,
	goToLeaderPostsView,
	onRefresh
}: FeedByRangeFlatListProps) {
	const [firstVisibleItem, setFirstVisibleItems] = useState<PostEntity & PollEntity & PetitionEntity & PostRangeDivider>()
	const [videosMuted, setVideosMuted] = useState<boolean>(true)

	const { userDataContext } = useAuthContext()
	const { navigate } = useNavigation<any>()

	const viewabilityConfig = useRef({
		itemVisiblePercentThreshold: 100
	}).current

	const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
		if (viewableItems.length > 0 && viewableItems[0].item) {
			setFirstVisibleItems(viewableItems[0].item)
		}
	}).current

	const hasNearbyPosts = () => {
		return (filteredFeedPosts.nearby.filter((item: any) => (!item.externalPostId || (item.externalPostId && isRecentPost(item.startDate)))) && filteredFeedPosts.nearby.filter((item: any) => (!item.externalPostId || (item.externalPostId && isRecentPost(item.startDate)))).length)
	}

	const hasCityPosts = () => {
		return (filteredFeedPosts.city.filter((item: any) => (!item.externalPostId || (item.externalPostId && isRecentPost(item.startDate)))) && filteredFeedPosts.city.filter((item: any) => (!item.externalPostId || (item.externalPostId && isRecentPost(item.startDate)))).length)
	}

	const hasCountryPosts = () => {
		return (filteredFeedPosts.country.filter((item: any) => (!item.externalPostId || (item.externalPostId && isRecentPost(item.startDate)))) && filteredFeedPosts.country.filter((item: any) => (!item.externalPostId || (item.externalPostId && isRecentPost(item.startDate)))).length)
	}

	const getItemType = (item: PostEntity & PollEntity & PetitionEntity & PostRangeDivider) => {
		if (item.postId) return 'post'
		if (item.pollId) return 'poll'
		if (item.petitionId) return 'petition'
		if (item.dividerText) return 'divider'
		return ''
	}

	const getDividerIconName = (range: PostRange): IconName => {
		switch (range) {
			case 'near': return 'pin'
			case 'city': return 'city'
			case 'country': return 'countryBrazil'
		}
	}

	const renderDivider = (item: PostRangeDivider): React.ReactElement<any> => {
		switch (item.postRange) {
			case 'near': if (!hasNearbyPosts()) { return <></> } break
			case 'city': if (!hasCityPosts()) { return <></> } break
			case 'country': if (!hasCountryPosts()) { return <></> } break
		}
		return (
			<PostCardContainer key={item.postRange}>
				<VerticalSpacing />
				<InfoDivider leftIcon={getDividerIconName(item.postRange)} title={item.dividerText} />
			</PostCardContainer>
		)
	}

	const audioToggle = () => {
		setVideosMuted(!videosMuted)
	}

	const posts = useMemo(() => {
		const formattedPosts = [
			{ dividerText: 'Posts perto de você', postRange: 'near' }, ...filteredFeedPosts.nearby,
			{ dividerText: 'Posts na sua cidade', postRange: 'city' }, ...filteredFeedPosts.city,
			{ dividerText: 'Posts no Brasil    ', postRange: 'country' }, ...filteredFeedPosts.country
		]

		const filteredItems = collapseExternalVacancies
			? formattedPosts.filter((item) => (
				'externalPostId' in item ? !item.externalPostId || (item.externalPostId && isRecentPost(item.createdAt!)) : true
			))
			: formattedPosts

		const vacancyPost = formattedPosts.find((item) => 'macroCategory' in item && item.macroCategory === 'vacancy')
		if (collapseExternalVacancies && vacancyPost) {
			filteredItems.splice(1, 0, { ...vacancyPost, action: () => navigate('PostCategories', { postType: 'income', macroCategory: 'vacancy' }), description: 'Veja vagas de emprego aqui em Londrina, novas vagas todos os dias' } as any)
		}

		return filteredItems
	}, [firstVisibleItem, videosMuted, filteredFeedPosts, collapseExternalVacancies])

	const renderPostItem = useCallback((element: any) => {
		const { item } = element
		const itemType = getItemType(item)

		if ((item as any).action) {
			return (
				<PostCardContainer key={item.postId}>
					<VerticalSpacing />
					<PostCard
						post={item}
						owner={item.owner as PostEntityCommonFields['owner']}
						isOwner={false}
						onPress={() => (item as any).action && (item as any).action()}
						navigateToProfile={() => navigateToProfile(item.owner.userId, item.owner.redirect)}
					/>
				</PostCardContainer>
			)
		}

		switch (itemType) {
			case 'post': return (
				<PostCardContainer key={item.postId}>
					<VerticalSpacing />
					<PostCard
						post={item as any}
						owner={item.owner as PostEntityCommonFields['owner']}
						isOwner={userDataContext.userId === item.owner.userId}
						isVisible={firstVisibleItem?.postId === item.postId}
						videoMuted={videosMuted}
						navigateToProfile={() => navigateToProfile(item.owner.userId, item.owner.redirect)}
						onAudioButtonPressed={audioToggle}
						onPress={() => goToPostView(item)}
					/>
				</PostCardContainer>
			)

			case 'poll': return (
				<PostCardContainer key={item.pollId}>
					<VerticalSpacing />
					<PollCard
						pollData={item}
						owner={item.owner as PostEntityCommonFields['owner']}
						isOwner={userDataContext.userId === item.owner.userId}
						navigateToProfile={navigateToProfile}
						onPress={() => goToLeaderPostsView && goToLeaderPostsView(item)}
					/>
				</PostCardContainer>
			)

			case 'petition': return (
				<PostCardContainer key={item.petitionId}>
					<VerticalSpacing />
					<PetitionCard
						petitionData={item}
						owner={item.owner as PostEntityCommonFields['owner']}
						isOwner={userDataContext.userId === item.owner.userId}
						navigateToProfile={navigateToProfile}
						onPress={() => goToLeaderPostsView && goToLeaderPostsView(item)}
					/>
				</PostCardContainer>
			)

			case 'divider': return renderDivider(item)
			default: return <></>
		}
	}, [posts, firstVisibleItem, videosMuted, filteredFeedPosts, collapseExternalVacancies])

	console.log('RELOAD', posts.length)

	return (
		<FlashListContainer>
			<FlatList
				data={posts}
				renderItem={renderPostItem as any}
				contentContainerStyle={{ backgroundColor: backgroundColor }}
				// estimatedItemSize={111}
				showsVerticalScrollIndicator={false}
				refreshControl={onRefresh && (
					<RefreshControl
						tintColor={theme.colors.black[4]}
						colors={[theme.colors.orange[3], theme.colors.pink[3], theme.colors.green[3], theme.colors.blue[3]]}
						refreshing={feedIsUpdating}
						progressBackgroundColor={theme.colors.white[3]}
						onRefresh={onRefresh}
					/>
				)}
				onViewableItemsChanged={onViewableItemsChanged}
				viewabilityConfig={viewabilityConfig}
				ListHeaderComponent={listHeaderComponent}
				ListEmptyComponent={(
					<NoPostNotifierContainer>
						<EmptyPostsNotifier text={'Parece que não temos nenhum post perto de você, nosso time já está sabendo e irá resolver!'} />
					</NoPostNotifierContainer>
				)}
				ListFooterComponent={<VerticalSpacing bottomNavigatorSpace />}
			/>
		</FlashListContainer>
	)
}

export { FeedByRangeFlatList }
