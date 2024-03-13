import React from 'react'
import uuid from 'react-uuid'

import { FeedPosts, PostCollection, PostRange } from '@services/firebase/types'

import { Container, PostCardContainer } from './styles'
import CountryWhiteIcon from '@assets/icons/brazil-white.svg'
import CityWhiteIcon from '@assets/icons/city-white.svg'
import PinWhiteIcon from '@assets/icons/pin-white.svg'
import { relativeScreenHeight } from '@common/screenDimensions'

import { PostCard } from '@components/_cards/PostCard'
import { SubtitleCard } from '@components/_cards/SubtitleCard'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'

import { WithoutPostsMessage } from '../WithoutPostsMessage'

interface FeedByRangeProps {
	searchEnded?: boolean
	backgroundColor?: string
	searchEnded?: boolean
	filteredFeedPosts: FeedPosts
	children?: React.ReactElement | React.ReactElement[]
	viewPostsByRange: (postRange: PostRange) => void
	navigateToProfile: (userId: string) => void
	goToPostView: (post: PostCollection) => void
}

function FeedByRange({
	searchEnded,
	backgroundColor,
	searchEnded,
	filteredFeedPosts,
	children,
	viewPostsByRange,
	navigateToProfile,
	goToPostView
}: FeedByRangeProps) {
	const getFirstFiveItems = (items: any[]) => {
		if (!items) return []
		if (items.length >= 5) return items.slice(0, 5)
		return items
	}

	const hasAnyPost = () => {
		return (filteredFeedPosts.nearby.length > 0 || filteredFeedPosts.city.length > 0 || filteredFeedPosts.country.length > 0)
	}

	const hasNearbyPosts = () => {
		return (filteredFeedPosts.nearby && filteredFeedPosts.nearby.length && (typeof (filteredFeedPosts.nearby.length === 1 && filteredFeedPosts.nearby[0]) !== 'string'))
	}

	const hasCityPosts = () => {
		return (filteredFeedPosts.city && filteredFeedPosts.city.length)
	}

	const hasCountryPosts = () => {
		return (filteredFeedPosts.country && filteredFeedPosts.country.length)
	}

	const renderPosts = (range: keyof FeedPosts) => {
		const firstFivePosts = getFirstFiveItems(filteredFeedPosts[range])
		return firstFivePosts.map((post) => {
			return post.owner && renderPostItem(post)
		})
	}

	const renderPostItem = (item: PostCollection) => {
		return (
			<PostCardContainer key={uuid()}>
				<PostCard
					post={item}
					owner={item.owner}
					navigateToProfile={navigateToProfile}
					onPress={() => goToPostView(item)}
				/>
				<VerticalSpacing />
			</PostCardContainer>
		)
	}

	return (
		<Container backgroundColor={backgroundColor}>
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
			<VerticalSpacing height={relativeScreenHeight(10)} />
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
