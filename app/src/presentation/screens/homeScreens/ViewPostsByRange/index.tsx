import React, { useContext, useState } from 'react'
import { Platform } from 'react-native'

import { PetitionEntity } from '@domain/petition/entity/types'
import { PollEntity } from '@domain/poll/entity/types'
import { PostEntityOptional, PostEntityCommonFields, PostEntity } from '@domain/post/entity/types'

import { AuthContext } from '@contexts/AuthContext'
import { LocationContext } from '@contexts/LocationContext'

import { navigateToLeaderPostsView, navigateToPostView } from '@routes/auxMethods'
import { ViewPostsByRangeScreenProps } from '@routes/Stack/HomeStack/screenProps'
import { FeedSearchParams } from '@services/cloudFunctions/types/types'

import { Body, Container, ContainerPadding, Header, InputContainer } from './styles'
import { theme } from '@common/theme'

import { PetitionCard } from '@components/_cards/PetitionCard'
import { PollCard } from '@components/_cards/PollCard'
import { PostCard } from '@components/_cards/PostCard'
import { SearchInput } from '@components/_inputs/SearchInput'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'
import { DefaultPostViewHeader } from '@components/DefaultPostViewHeader'
import { FlatListPosts } from '@components/FlatListPosts'
import { FocusAwareStatusBar } from '@components/FocusAwareStatusBar'

function ViewPostsByRange({ route, navigation }: ViewPostsByRangeScreenProps) {
	const { userDataContext } = useContext(AuthContext)
	const { locationDataContext } = useContext(LocationContext)

	const [searchText, setSearchText] = useState('')

	const { postRange, postType, searchByRange } = route.params

	const getFilteredPostsBySearch = () => {
		const posts = route.params.postsByRange as PostEntity[] & PollEntity[] & PetitionEntity[]

		if (searchText) {
			return posts.filter((post) => !!post.description.match(new RegExp(`${searchText}`, 'i'))?.length || !!({ ...post, title: (post as any).title || '' } as any).title.match(new RegExp(`${searchText}`, 'i'))?.length)
		}
		return posts
	}

	const postsByRange = getFilteredPostsBySearch()

	const navigateToProfile = (userId: string) => {
		if (userDataContext.userId === userId) {
			navigation.navigate('Profile' as any)
			return
		}
		navigation.navigate('ProfileHome', { userId, stackLabel: '' })
	}

	const navigateToResultScreen = () => {
		const customSearchParams = searchByRange
			? {
				range: postRange,
				geohashes: locationDataContext.searchParams?.geohashes,
				city: locationDataContext.searchParams?.city,
				country: locationDataContext.searchParams?.country,
				searchText,
				category: '',
			}
			: {
				...locationDataContext.searchParams,
				searchText,
				category: locationDataContext.currentCategory?.categoryName,
			}

		const categoryLabel = searchByRange ? getRelativeTitle() : locationDataContext.currentCategory?.categoryTitle

		navigation.navigate('SearchResult', { searchParams: customSearchParams as FeedSearchParams, categoryLabel, searchByRange })
	}

	const getRelativeTitle = () => {
		switch (postRange) {
			case 'near': return 'posts por perto'
			case 'city': return 'posts na cidade'
			case 'country': return 'posts no país'
			default: return 'posts recentes'
		}
	}

	const getRelativeBackgroundColor = () => {
		switch (postType) {
			case 'income': return theme.green2
			case 'culture': return theme.blue2
			case 'socialImpact': return theme.pink2
			default: return theme.orange2
		}
	}

	const viewPostDetails = (postData: PostEntityOptional) => {
		navigateToPostView(postData, navigation, 'Home')
	}

	const viewLeaderPostsDetails = (leaderPostData: PollEntity & PetitionEntity) => {
		navigateToLeaderPostsView(leaderPostData, navigation, 'Home')
	}

	const getItemType = (item: PostEntityOptional & PollEntity & PetitionEntity) => {
		if (item.postId) return 'post'
		if (item.pollId) return 'poll'
		if (item.petitionId) return 'petition'
		return ''
	}

	const renderPostItem = (item: PostEntityOptional & PollEntity & PetitionEntity) => {
		const itemType = getItemType(item)

		switch (itemType) {
			case 'post': return (
				<ContainerPadding key={item.postId}>
					<PostCard
						post={item}
						owner={item.owner as PostEntityCommonFields['owner']}
						isOwner={userDataContext.userId === item.owner.userId}
						navigateToProfile={navigateToProfile}
						onPress={() => viewPostDetails(item)}
					/>
				</ContainerPadding>
			)

			case 'poll': return (
				<ContainerPadding key={item.pollId}>
					<PollCard
						pollData={item}
						owner={item.owner as PostEntityCommonFields['owner']}
						isOwner={userDataContext.userId === item.owner.userId}
						navigateToProfile={navigateToProfile}
						onPress={() => viewLeaderPostsDetails && viewLeaderPostsDetails(item)}
					/>
				</ContainerPadding>
			)
			case 'petition': return (
				<ContainerPadding key={item.petitionId}>
					<PetitionCard
						petitionData={item}
						owner={item.owner as PostEntityCommonFields['owner']}
						isOwner={userDataContext.userId === item.owner.userId}
						navigateToProfile={navigateToProfile}
						onPress={() => viewLeaderPostsDetails && viewLeaderPostsDetails(item)}
					/>
				</ContainerPadding>
			)
			default: return <></>
		}
	}

	return (
		<Container >
			<FocusAwareStatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<Header>
				<DefaultPostViewHeader
					text={getRelativeTitle()}
					highlightedWords={['perto', 'cidade', 'país', 'recentes']}
					onBackPress={() => navigation.goBack()}
				/>
				<InputContainer>
					<SearchInput
						value={searchText}
						placeholder={'pesquisar'}
						returnKeyType={'search'}
						onChangeText={(text: string) => setSearchText(text)}
						onPressKeyboardSubmit={navigateToResultScreen}
					/>
				</InputContainer>
			</Header>
			<Body
				style={{ backgroundColor: getRelativeBackgroundColor() }}
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			>
				{
					(postsByRange && postsByRange.length)
						? (
							<>
								<FlatListPosts
									data={postsByRange}
									renderItem={renderPostItem as any} // TODO Type
									headerComponent={() => <VerticalSpacing />}
								/>
							</>
						)
						: <></>
				}
			</Body>
		</Container>
	)
}

export { ViewPostsByRange }
