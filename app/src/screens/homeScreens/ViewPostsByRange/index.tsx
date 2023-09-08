import React, { useContext, useState } from 'react'
import { Platform } from 'react-native'

import { RFValue } from 'react-native-responsive-fontsize'

import { Body, Container, ContainerPadding, Header, InputContainer, SearchInput } from './styles'
import { theme } from '../../../common/theme'
import LoupIcon from '../../../assets/icons/loup-white.svg'

import { PostCollection, PostCollectionRemote } from '../../../services/firebase/types'
import { ViewPostsByRangeScreenProps } from '../../../routes/Stack/HomeStack/stackScreenProps'

import { LocationContext } from '../../../contexts/LocationContext'
import { AuthContext } from '../../../contexts/AuthContext'

import { DefaultPostViewHeader } from '../../../components/DefaultPostViewHeader'
import { PostCard } from '../../../components/_cards/PostCard'
import { FocusAwareStatusBar } from '../../../components/FocusAwareStatusBar'
import { FlatListPosts } from '../../../components/FlatListPosts'
import { VerticalSigh } from '../../../components/VerticalSigh'
import { SearchParams } from '../../../services/maps/types'
import { relativeScreenHeight } from '../../../common/screenDimensions'

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

	const goToPostView = (item: PostCollection) => {
		switch (item.postType) {
			case 'service': {
				navigation.navigate('ViewServicePostHome', { postData: { ...item } })
				break
			}
			case 'sale': {
				navigation.navigate('ViewSalePostHome', { postData: { ...item } })
				break
			}
			case 'vacancy': {
				navigation.navigate('ViewVacancyPostHome', { postData: { ...item } })
				break
			}
			case 'socialImpact': {
				navigation.navigate('ViewSocialImpactPostHome', { postData: { ...item } })
				break
			}
			case 'culture': {
				navigation.navigate('ViewCulturePostHome', { postData: { ...item } })
				break
			}
			default: return false
		}
	}

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
			case 'near': return 'perto de você'
			case 'city': return 'na cidade'
			case 'country': return 'no país'
			default: return 'posts recentes'
		}
	}

	const getRelativeBackgroundColor = () => {
		switch (postType) {
			case 'service': return theme.purple2
			case 'sale': return theme.green2
			case 'vacancy': return theme.yellow2
			case 'culture': return theme.blue2
			case 'socialImpact': return theme.pink2
			default: return theme.orange2
		}
	}

	const renderPostItem = (item: PostCollection) => (
		<ContainerPadding>
			<PostCard
				post={item}
				owner={item.owner}
				navigateToProfile={navigateToProfile}
				onPress={() => goToPostView(item)}
			/>
		</ContainerPadding>
	)

	return (
		<Container deviceIsIOS={Platform.OS === 'ios'}>
			<FocusAwareStatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<Header>
				<DefaultPostViewHeader
					text={getRelativeTitle()}
					highlightedWords={['você', 'cidade', 'país', 'recentes']}
					onBackPress={() => navigation.goBack()}
				/>
				<InputContainer>
					<LoupIcon width={RFValue(25)} height={RFValue(25)} />
					<SearchInput
						value={searchText}
						placeholder={'pesquisar'}
						returnKeyType={'search'}
						onChangeText={(text: string) => setSearchText(text)}
						onSubmitEditing={navigateToResultScreen}
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
										<VerticalSigh />
									)}
								// flatListIsLoading={flatListIsLoading}
								// onEndReached={refreshFlatlist}
								/>
							</>
						)
						: <></>
				}
				<VerticalSigh height={relativeScreenHeight(10)} />
				{/* {
					(!postsByRange || (postsByRange && !postsByRange.length)) && (
						<WithoutPostsMessage
						title={'opa!'}
						message={'parece que não temos nenhum post {perto de você}, nosso time já está sabendo e irá resolver!'}
						/>
						)
					} */}
			</Body>
		</Container>
	)
}

export { ViewPostsByRange }
