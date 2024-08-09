import { useNavigation } from '@react-navigation/native'
import React, { useContext, useState } from 'react'
import { Platform } from 'react-native'

import { PetitionEntity } from '@domain/petition/entity/types'
import { PollEntity } from '@domain/poll/entity/types'
import { PostEntityOptional, PostEntityCommonFields, PostEntity, } from '@domain/post/entity/types'

import { AuthContext } from '@contexts/AuthContext'
import { LocationContext } from '@contexts/LocationContext'

import { navigateToLeaderPostsView, navigateToPostView, navigateToProfileView } from '@routes/auxMethods'
import { ViewPostsByRangeScreenProps } from '@routes/Stack/HomeStack/screenProps'
import { FeedSearchParams } from '@services/cloudFunctions/types/types'

import { isRecentPost } from '@utils-ui/post/validation'

import { Body, Container, ContainerPadding, Header, InputContainer } from './styles'
import { theme } from '@common/theme'

import { PetitionCard } from '@components/_cards/PetitionCard'
import { PollCard } from '@components/_cards/PollCard'
import { PostCard } from '@components/_cards/PostCard'
import { ScreenContainer } from '@components/_containers/ScreenContainer'
import { SearchInput } from '@components/_inputs/SearchInput'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'
import { DefaultPostViewHeader } from '@components/DefaultPostViewHeader'
import { FlatListPosts } from '@components/FlatListPosts'
import { FocusAwareStatusBar } from '@components/FocusAwareStatusBar'

function ViewPostsByRange({ route, navigation }: ViewPostsByRangeScreenProps) {
	const { userDataContext } = useContext(AuthContext)
	const { locationDataContext } = useContext(LocationContext)

	const [searchText, setSearchText] = useState('')

	const { navigate } = useNavigation<any>()

	const { postRange, postType, searchByRange, collapseExternalVacancies = true } = route.params

	const getFilteredPostsBySearch = () => {
		const paramsPosts = route.params.postsByRange
		const posts = collapseExternalVacancies ? (route.params.postsByRange as any[]).filter((item) => (!item.externalPostId || (item.externalPostId && isRecentPost(item.startDate)))) : paramsPosts// TODO TYpe

		if (searchText) {
			return paramsPosts.filter((post) => !!post.description.match(new RegExp(`${searchText}`, 'i'))?.length || !!({ ...post, title: (post as any).title || '' } as any).title.match(new RegExp(`${searchText}`, 'i'))?.length)
		}

		const vacancyPost = paramsPosts.find((item) => item.macroCategory === 'vacancy' && item.externalPostId)
		if (collapseExternalVacancies && vacancyPost && vacancyPost.macroCategory) {
			posts.unshift({ ...vacancyPost, action: () => navigate('PostCategories', { postType: 'income', macroCategory: 'vacancy' }), description: 'Veja vagas de emprego aqui em Londrina, novas vagas todos os dias' } as any)
			return posts
		}

		return posts
	}

	const postsByRange = getFilteredPostsBySearch()

	const navigateToProfile = (userId: string, redirect?: string) => {
		console.log(redirect)
		if (userDataContext.userId === userId) {
			return navigateToProfileView(navigation, '', '', redirect)
		}
		navigateToProfileView(navigation, userId, 'Home', redirect)
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
			case 'income': return theme.colors.green[2]
			case 'culture': return theme.colors.blue[2]
			case 'socialImpact': return theme.colors.pink[2]
			default: return theme.colors.orange[2]
		}
	}

	const viewPostDetails = (postData: PostEntityOptional) => {
		navigateToPostView(postData, navigation, 'Home')
	}

	const viewLeaderPostsDetails = (leaderPostData: PollEntity & PetitionEntity) => {
		navigateToLeaderPostsView(leaderPostData, navigation, 'Home')
	}

	const getItemType = (item: PostEntity & PollEntity & PetitionEntity) => {
		if (item.postId) return 'post'
		if (item.pollId) return 'poll'
		if (item.petitionId) return 'petition'
		return ''
	}

	const renderPostItem = (item: PostEntity & PollEntity & PetitionEntity, i: number) => {
		const itemType = getItemType(item)
		if ((item as any).action) {
			return (
				<ContainerPadding key={item.postId}>
					<PostCard
						post={item}
						owner={item.owner as PostEntityCommonFields['owner']}
						isOwner={false}
						onPress={() => (item as any).action && (item as any).action()}
						navigateToProfile={() => navigateToProfile(item.owner.userId, item.owner.redirect)}
					/>
					<VerticalSpacing />
				</ContainerPadding>
			)
		}

		switch (itemType) {
			case 'post': return (
				<ContainerPadding key={item.postId}>
					<PostCard
						post={item}
						owner={item.owner as PostEntityCommonFields['owner']}
						isOwner={userDataContext.userId === item.owner.userId}
						navigateToProfile={() => navigateToProfile(item.owner.userId, item.owner.redirect)}
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
		<ScreenContainer infinityBottom>
			<Container >
				<FocusAwareStatusBar backgroundColor={theme.colors.white[3]} barStyle={'dark-content'} />
				<Header>
					<DefaultPostViewHeader
						ignorePlatform
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
						(postsByRange && postsByRange.length) ? (
							<FlatListPosts
								data={postsByRange || []}
								renderItem={renderPostItem as any}
								headerComponent={() => (
									<VerticalSpacing />
								)}
							/>
						) : <></>
					}
				</Body>
			</Container>
		</ScreenContainer>
	)
}

export { ViewPostsByRange }
