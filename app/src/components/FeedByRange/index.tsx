import React from 'react'

import { FeedPosts, PostCollection, PostRange } from '../../services/firebase/types'

import { relativeScreenHeight } from '../../common/screenDimensions'
import { Container, PostCardContainer } from './styles'
import PinWhiteIcon from '../../assets/icons/pin-white.svg'
import CityWhiteIcon from '../../assets/icons/city-white.svg'
import CountryWhiteIcon from '../../assets/icons/brazil-white.svg'

import { WithoutPostsMessage } from '../WithoutPostsMessage'
import { VerticalSpacing } from '../_space/VerticalSpacing'
import { SubtitleCard } from '../_cards/SubtitleCard'
import { FlatListPosts } from '../FlatListPosts'
import { PostCard } from '../_cards/PostCard'

interface FeedByRangeProps {
	backgroundColor?: string
	filteredFeedPosts: FeedPosts
	flatListIsLoading?: boolean
	children?: React.ReactElement | React.ReactElement[]
	customRenderItem?: (post: PostCollection) => React.ReactElement
	viewPostsByRange: (postRange: PostRange) => void
	navigateToProfile: (userId: string) => void
	goToPostView: (post: PostCollection) => void
}

function FeedByRange({
	backgroundColor,
	filteredFeedPosts,
	flatListIsLoading,
	children,
	customRenderItem,
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

	const renderPostItem = (item: PostCollection) => {
		return (
			<PostCardContainer>
				<PostCard
					post={item}
					owner={item.owner}
					navigateToProfile={navigateToProfile}
					onPress={() => goToPostView(item)}
				/>
			</PostCardContainer>
		)
	}

	return (
		<Container style={{ backgroundColor }}>
			{children}
			{
				(filteredFeedPosts.nearby && filteredFeedPosts.nearby.length && (typeof (filteredFeedPosts.nearby.length === 1 && filteredFeedPosts.nearby[0]) !== 'string'))
					? (
						<>
							<FlatListPosts
								data={getFirstFiveItems(filteredFeedPosts.nearby)}
								headerComponent={() => (
									<>
										<SubtitleCard
											text={'posts por perto'}
											highlightedText={['perto']}
											seeMoreText
											SvgIcon={PinWhiteIcon}
											onPress={() => viewPostsByRange('near')}
										/>
										<VerticalSpacing />
									</>
								)}
								renderItem={customRenderItem || renderPostItem}
								flatListIsLoading={flatListIsLoading}
							/>
						</>
					)
					: <></>
			}
			{
				(filteredFeedPosts.city && filteredFeedPosts.city.length)
					? (
						<>
							<FlatListPosts
								data={getFirstFiveItems(filteredFeedPosts.city)}
								headerComponent={() => (
									<>
										<SubtitleCard
											text={'posts na cidade'}
											highlightedText={['cidade']}
											seeMoreText
											SvgIcon={CityWhiteIcon}
											onPress={() => viewPostsByRange('city')}
										/>
										<VerticalSpacing />
									</>
								)}
								renderItem={renderPostItem}
								flatListIsLoading={flatListIsLoading}
							/>
						</>
					)
					: <></>
			}
			{
				(filteredFeedPosts.country && filteredFeedPosts.country.length)
					? (
						<>
							<FlatListPosts
								data={getFirstFiveItems(filteredFeedPosts.country)}
								headerComponent={() => (
									<>
										<SubtitleCard
											text={'posts no país'}
											highlightedText={['país']}
											seeMoreText
											SvgIcon={CountryWhiteIcon}
											onPress={() => viewPostsByRange('country')}
										/>
										<VerticalSpacing />
									</>
								)}
								renderItem={renderPostItem}
								flatListIsLoading={flatListIsLoading}
							/>
						</>
					)
					: <></>
			}
			<VerticalSpacing height={relativeScreenHeight(10)} />
			{
				!hasAnyPost() && (
					<WithoutPostsMessage
						title={'opa!'}
						message={
							'parece que não temos nenhum post perto de você, nosso time já está sabendo e irá resolver!'
						}
					/>
				)
			}
		</Container>
	)
}

export { FeedByRange }
