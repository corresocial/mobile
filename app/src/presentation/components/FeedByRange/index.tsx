import { useNavigation } from '@react-navigation/native'
import React from 'react'

import { PetitionEntity } from '@domain/petition/entity/types'
import { PollEntity } from '@domain/poll/entity/types'
import { FeedPosts, PostEntity, PostEntityCommonFields, PostEntityOptional, PostRange } from '@domain/post/entity/types'

import { useAuthContext } from '@contexts/AuthContext'

import { isRecentPost } from '@utils-ui/post/validation'

import { Container, PostCardContainer } from './styles'
import CountryWhiteIcon from '@assets/icons/brazil-white.svg'
import CityWhiteIcon from '@assets/icons/city-white.svg'
import PinWhiteIcon from '@assets/icons/pin-white.svg'

import { PetitionCard } from '@components/_cards/PetitionCard'
import { PollCard } from '@components/_cards/PollCard'
import { PostCard } from '@components/_cards/PostCard'
import { SubtitleCard } from '@components/_cards/SubtitleCard'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'

import { WithoutPostsMessage } from '../WithoutPostsMessage'

interface FeedByRangeProps {
	collapseExternalVacancies?: boolean
	backgroundColor?: string
	searchEnded?: boolean
	filteredFeedPosts: FeedPosts
	children?: React.ReactElement | React.ReactElement[]
	viewPostsByRange: (postRange: PostRange) => void
	navigateToProfile: (userId: string, redirect?: string) => void
	goToPostView: (post: PostEntityOptional) => void
	goToLeaderPostsView?: (post: PollEntity & PetitionEntity) => void
}

function FeedByRange({
	searchEnded,
	backgroundColor,
	filteredFeedPosts,
	children,
	collapseExternalVacancies = true,
	viewPostsByRange,
	navigateToProfile,
	goToPostView,
	goToLeaderPostsView
}: FeedByRangeProps) {
	const { userDataContext } = useAuthContext()
	const { navigate } = useNavigation<any>()

	const getFirstFiveItems = (items: any[]) => {
		if (!items) return []
		const filteredItems = collapseExternalVacancies ? items.filter((item) => (!item.externalPostId || (item.externalPostId && isRecentPost(item.startDate)))) : items

		const vacancyPost = items.find((item) => item.macroCategory === 'vacancy' && item.owner.userId === 'jobSecretaryId')
		if (collapseExternalVacancies && vacancyPost && vacancyPost.macroCategory) {
			filteredItems.unshift({ ...vacancyPost, action: () => navigate('PostCategories', { postType: 'income', macroCategory: 'vacancy' }), description: 'Veja vagas de emprego aqui em Londrina, novas vagas todos os dias' })
		}

		if (filteredItems.length >= 5) return filteredItems.slice(0, 5)
		return items.filter((item) => (!item.externalPostId || (item.externalPostId && isRecentPost(item.startDate))))
	}

	const hasAnyPost = () => {
		return (filteredFeedPosts.nearby.filter((item: any) => (!item.externalPostId || (item.externalPostId && isRecentPost(item.startDate)))).length > 0 || filteredFeedPosts.city.filter((item: any) => (!item.externalPostId || (item.externalPostId && isRecentPost(item.startDate)))).length > 0 || filteredFeedPosts.country.filter((item: any) => (!item.externalPostId || (item.externalPostId && isRecentPost(item.startDate)))).length > 0)
	}

	const hasNearbyPosts = () => {
		return (filteredFeedPosts.nearby.filter((item: any) => (!item.externalPostId || (item.externalPostId && isRecentPost(item.startDate)))) && filteredFeedPosts.nearby.filter((item: any) => (!item.externalPostId || (item.externalPostId && isRecentPost(item.startDate)))).length)
	}

	const hasCityPosts = () => {
		return (filteredFeedPosts.city.filter((item: any) => (!item.externalPostId || (item.externalPostId && isRecentPost(item.startDate)))) && filteredFeedPosts.city.filter((item: any) => (!item.externalPostId || (item.externalPostId && isRecentPost(item.startDate)))).length)
	}

	const hasCountryPosts = () => {
		return (filteredFeedPosts.country.filter((item: any) => (!item.externalPostId || (item.externalPostId && isRecentPost(item.startDate)))) && filteredFeedPosts.country.filter((item: any) => (!item.externalPostId || (item.externalPostId && isRecentPost(item.startDate)))).length)
	}

	const renderPosts = (range: keyof FeedPosts) => {
		const firstFivePosts = getFirstFiveItems(filteredFeedPosts[range])
		return firstFivePosts.map((post) => {
			if (post.action) return renderPostItem(post)
			return post.owner && renderPostItem(post)
		})
	}

	const getItemType = (item: PostEntity & PollEntity & PetitionEntity) => {
		if (item.postId) return 'post'
		if (item.pollId) return 'poll'
		if (item.petitionId) return 'petition'
		return ''
	}

	const renderPostItem = (item: PostEntity & PollEntity & PetitionEntity) => {
		const itemType = getItemType(item)

		if ((item as any).action) {
			return (
				<PostCardContainer key={item.postId}>
					<PostCard
						post={item}
						owner={item.owner as PostEntityCommonFields['owner']}
						isOwner={false}
						onPress={() => (item as any).action && (item as any).action()}
						navigateToProfile={() => navigateToProfile(item.owner.userId, item.owner.redirect)}
					/>
					<VerticalSpacing />
				</PostCardContainer>
			)
		}

		switch (itemType) {
			case 'post': return (
				<PostCardContainer key={item.postId}>
					<PostCard
						post={item as any}
						owner={item.owner as PostEntityCommonFields['owner']}
						isOwner={userDataContext.userId === item.owner.userId}
						navigateToProfile={() => navigateToProfile(item.owner.userId, item.owner.redirect)}
						onPress={() => goToPostView(item)}
					/>
					<VerticalSpacing />
				</PostCardContainer>
			)

			case 'poll': return (
				<PostCardContainer key={item.pollId}>
					<PollCard
						pollData={item}
						owner={item.owner as PostEntityCommonFields['owner']}
						isOwner={userDataContext.userId === item.owner.userId}
						navigateToProfile={navigateToProfile}
						onPress={() => goToLeaderPostsView && goToLeaderPostsView(item)}
					/>
					<VerticalSpacing />
				</PostCardContainer>
			)

			case 'petition': return (
				<PostCardContainer key={item.petitionId}>
					<PetitionCard
						petitionData={item}
						owner={item.owner as PostEntityCommonFields['owner']}
						isOwner={userDataContext.userId === item.owner.userId}
						navigateToProfile={navigateToProfile}
						onPress={() => goToLeaderPostsView && goToLeaderPostsView(item)}
					/>
					<VerticalSpacing />
				</PostCardContainer>
			)
			default: return <></>
		}
	}

	return (
		<Container backgroundColor={backgroundColor} showsVerticalScrollIndicator={false}>
			{children}
			{
				hasNearbyPosts()
					? (
						<>
							<SubtitleCard
								text={'posts por perto'}
								highlightedText={['perto']}
								seeMoreText
								SvgIcon={PinWhiteIcon}
								onPress={() => viewPostsByRange('near')}
							/>
							<VerticalSpacing />
							{renderPosts('nearby')}
						</>
					)
					: <></>
			}
			{
				hasCityPosts()
					? (
						<>
							<SubtitleCard
								text={'posts na cidade'}
								highlightedText={['cidade']}
								seeMoreText
								SvgIcon={CityWhiteIcon}
								onPress={() => viewPostsByRange('city')}
							/>
							<VerticalSpacing />
							{renderPosts('city')}
						</>
					)
					: <></>
			}
			{
				hasCountryPosts()
					? (
						<>
							<SubtitleCard
								text={'posts no país'}
								highlightedText={['país']}
								seeMoreText
								SvgIcon={CountryWhiteIcon}
								onPress={() => viewPostsByRange('country')}
							/>
							<VerticalSpacing />
							{renderPosts('country')}
						</>
					) : <></>
			}
			<VerticalSpacing height={10} />
			{
				!hasAnyPost() && searchEnded && (
					<WithoutPostsMessage
						title={'opa!'}
						message={'parece que não temos nenhum post perto de você, nosso time já está sabendo e irá resolver!'}
					/>
				)
			}
		</Container>
	)
}

export { FeedByRange }
