import React from 'react'
import { ListRenderItem, RefreshControl } from 'react-native'

import { PetitionEntity } from '@domain/petition/entity/types'
import { PollEntity } from '@domain/poll/entity/types'
import { FeedPosts, PostEntity, PostEntityCommonFields, PostEntityOptional, PostRange } from '@domain/post/entity/types'

import { useAuthContext } from '@contexts/AuthContext'

import { PostRangeDivider } from './types'
import { IconName } from '@assets/icons/iconMap/types'

import { isRecentPost } from '@utils-ui/post/validation'

import { FeedFlatList, NoPostNotifierContainer } from './styles'
import { theme } from '@common/theme'

import { PetitionCard } from '@components/_cards/PetitionCard'
import { PollCard } from '@components/_cards/PollCard'
import { PostCard } from '@components/_cards/PostCard'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'
import { PostCardContainer } from '@components/FeedByRange/styles'
import { EmptyPostsNotifier } from '@newComponents/EmptyPostsNotifier'
import { InfoDivider } from '@newComponents/InfoDivider'

interface FeedByRangeFlatListProps {
	collapseExternalVacancies?: boolean
	backgroundColor?: string
	searchEnded?: boolean
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
	searchEnded,
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
	const { userDataContext } = useAuthContext()

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
			<PostCardContainer>
				<VerticalSpacing />
				<InfoDivider leftIcon={getDividerIconName(item.postRange)} title={item.dividerText} />
			</PostCardContainer>
		)
	}

	const posts = () => {
		return [
			{ dividerText: 'Posts perto de você', postRange: 'near' }, ...filteredFeedPosts.nearby,
			{ dividerText: 'Posts na sua cidade', postRange: 'city' }, ...filteredFeedPosts.city,
			{ dividerText: 'Posts no Brasil    ', postRange: 'country' }, ...filteredFeedPosts.country
		]
	}

	const renderPostItem = (element: any) => {
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
						navigateToProfile={() => navigateToProfile(item.owner.userId, item.owner.redirect)}
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
	}

	return (
		<FeedFlatList
			backgroundColor={backgroundColor}
			data={posts() as any}
			renderItem={renderPostItem as ListRenderItem<unknown>}
			showsVerticalScrollIndicator={false}
			refreshControl={onRefresh && (
				<RefreshControl
					tintColor={theme.colors.black[4]}
					colors={[theme.colors.orange[3], theme.colors.pink[3], theme.colors.green[3], theme.colors.blue[3]]}
					refreshing={feedIsUpdating}
					progressBackgroundColor={theme.white3}
					onRefresh={onRefresh}
				/>
			)}
			ListHeaderComponent={listHeaderComponent}
			ListEmptyComponent={(
				<NoPostNotifierContainer>
					<EmptyPostsNotifier text={'Parece que não temos nenhum post perto de você, nosso time já está sabendo e irá resolver!'} />
				</NoPostNotifierContainer>
			)}
			ListFooterComponent={
				<VerticalSpacing height={20} />
			}
		/>
	)
}

export { FeedByRangeFlatList }
