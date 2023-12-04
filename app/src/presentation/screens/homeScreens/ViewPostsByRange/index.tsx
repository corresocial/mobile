import React, { useContext, useState } from 'react'
import { Platform } from 'react-native'

import { navigateToPostView } from '../../../routes/auxMethods'

import { Body, Container, ContainerPadding, Header, InputContainer } from './styles'
import { theme } from '../../../common/theme'

import { PostCollection, PostCollectionRemote } from '../../../../services/firebase/types'
import { ViewPostsByRangeScreenProps } from '../../../routes/Stack/HomeStack/stackScreenProps'

import { LocationContext } from '../../../../contexts/LocationContext'
import { AuthContext } from '../../../../contexts/AuthContext'

import { DefaultPostViewHeader } from '../../../components/DefaultPostViewHeader'
import { PostCard } from '../../../components/_cards/PostCard'
import { FocusAwareStatusBar } from '../../../components/FocusAwareStatusBar'
import { FlatListPosts } from '../../../components/FlatListPosts'
import { VerticalSpacing } from '../../../components/_space/VerticalSpacing'
import { SearchParams } from '../../../../services/maps/types'
import { relativeScreenHeight } from '../../../common/screenDimensions'
import { SearchInput } from '../../../components/_inputs/SearchInput'

function ViewPostsByRange({ route, navigation }: ViewPostsByRangeScreenProps) {
	const { userDataContext } = useContext(AuthContext)
	const { locationDataContext } = useContext(LocationContext)

	const [searchText, setSearchText] = useState('')

	const { postRange, postType, searchByRange } = route.params

	const getFilteredPostsBySearch = () => {
		const { postsByRange } = route.params

		if (searchText) {
			return postsByRange.filter((post: PostCollectionRemote) => !!post.description.match(new RegExp(`${searchText}`, 'i'))?.length)
		}
		return postsByRange
	}

	const postsByRange = getFilteredPostsBySearch()

	const navigateToProfile = (userId: string) => {
		if (userDataContext.userId === userId) {
			navigation.navigate('Profile' as any)// TODO Type
			return
		}
		navigation.navigate('ProfileHome', { userId, stackLabel: '' })
	}

	const navigateToResultScreen = () => {
		const customSearchParams = searchByRange
			? {
				range: postRange,
				geohashes: locationDataContext.searchParams.geohashes,
				city: locationDataContext.searchParams.city,
				country: locationDataContext.searchParams.country,
				searchText,
				category: '',
			}
			: {
				...locationDataContext.searchParams,
				searchText,
				category: locationDataContext.currentCategory.categoryName,
			}

		const categoryLabel = searchByRange ? getRelativeTitle() : locationDataContext.currentCategory.categoryTitle

		navigation.navigate('SearchResult', { searchParams: customSearchParams as SearchParams, categoryLabel, searchByRange })
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

	const viewPostDetails = (postData: PostCollection) => {
		navigateToPostView(postData, navigation, 'Home')
	}

	const renderPostItem = (item: PostCollection) => (
		<ContainerPadding>
			<PostCard
				post={item}
				owner={item.owner}
				navigateToProfile={navigateToProfile}
				onPress={() => viewPostDetails(item)}
			/>
		</ContainerPadding>
	)

	return (
		<Container deviceIsIOS={Platform.OS === 'ios'}>
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
									renderItem={renderPostItem}
									headerComponent={() => (
										<VerticalSpacing />
									)}
								/>
							</>
						)
						: <></>
				}
				<VerticalSpacing height={relativeScreenHeight(10)} />
			</Body>
		</Container>
	)
}

export { ViewPostsByRange }
