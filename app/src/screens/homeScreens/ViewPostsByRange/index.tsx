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

	const goToPostView = (post: PostCollection | any) => { // TODO Type
		switch (post.postType) {
			case 'income': {
				switch (post[`${post.postType}Type`]) {
					case 'sale': return navigation.navigate('ViewSalePostHome', { postData: { ...post } })
					case 'service': return navigation.navigate('ViewServicePostHome', { postData: { ...post } })
					case 'vacancy': return navigation.navigate('ViewVacancyPostHome', { postData: { ...post } })
					default: return false
				}
			}

			case 'service': return navigation.navigate('ViewServicePostHome', { postData: { ...post } })
			case 'sale': return navigation.navigate('ViewSalePostHome', { postData: { ...post } })
			case 'vacancy': return navigation.navigate('ViewVacancyPostHome', { postData: { ...post } })
			case 'socialImpact': return navigation.navigate('ViewSocialImpactPostHome', { postData: { ...post } })
			case 'culture': return navigation.navigate('ViewCulturePostHome', { postData: { ...post } })
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
			case 'near': return 'posts por perto'
			case 'city': return 'posts na cidade'
			case 'country': return 'posts no país'
			default: return 'posts recentes'
		}
	}

	const getRelativeBackgroundColor = () => {
		switch (postType) {
			case 'income': return theme.green2
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
								/>
							</>
						)
						: <></>
				}
				<VerticalSigh height={relativeScreenHeight(10)} />
			</Body>
		</Container>
	)
}

export { ViewPostsByRange }
