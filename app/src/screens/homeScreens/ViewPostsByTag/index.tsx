import React, { useContext, useEffect, useState } from 'react'
import { KeyboardAvoidingView, FlatList } from 'react-native'

import { RFValue } from 'react-native-responsive-fontsize'
import { Body, Container, Header, InputContainer, LastSigh, SearchInput, VerticalSigh } from './styles'
import { theme } from '../../../common/theme'
import LoupIcon from '../../../assets/icons/loup.svg'

import { PostCollection } from '../../../services/firebase/types'
import { ViewPostsByTagScreenProps } from '../../../routes/Stack/HomeStack/stackScreenProps'

import { LocationContext } from '../../../contexts/LocationContext'

import { DefaultPostViewHeader } from '../../../components/DefaultPostViewHeader'
import { SubtitleCard } from '../../../components/_cards/SubtitleCard'
import { PostCard } from '../../../components/_cards/PostCard'
import { WithoutPostsMessage } from '../../../components/WithoutPostsMessage'
import { FocusAwareStatusBar } from '../../../components/FocusAwareStatusBar'

function ViewPostsByTag({ route, navigation }: ViewPostsByTagScreenProps) {
	const { locationDataContext } = useContext(LocationContext)

	const [searchText, setSearchText] = useState('')
	const [recentPosts, setRecentPosts] = useState<PostCollection[]>([])

	useEffect(() => {
		getRecentPosts()
	}, [])

	const {
		backgroundColor,
		categoryIcon,
		categoryName,
	} = locationDataContext.currentCategory

	const getRecentPosts = async () => {
		const filteredPosts = locationDataContext.nearbyPosts.filter((post) => post.category === categoryName && arrayContains(post.tags, route.params.currentTagSelected))
		setRecentPosts(filteredPosts)
	}

	const arrayContains = (array: string[], element: string) => {
		return array.includes(element)
	}

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

	const navigateToResultScreen = () => {
		const customSearchParams = {
			...locationDataContext.searchParams,
			searchText,
			category: locationDataContext.currentCategory.categoryName,
			tag: route.params.currentTagSelected
		}
		navigation.navigate('SearchResult', { searchParams: customSearchParams, categoryLabel: locationDataContext.currentCategory.categoryTitle, })
	}

	return (
		<Container>
			<FocusAwareStatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<Header>
				<DefaultPostViewHeader
					text={route.params.currentTagSelected}
					svgUri={categoryIcon}
					path
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
			<KeyboardAvoidingView style={{ flex: 1 }}>
				<Body style={{ backgroundColor }}>
					<SubtitleCard
						text={'posts de recentes'}
						highlightedText={['recentes']}
						onPress={() => { }}
					/>
					{
						!recentPosts.length
							? (
								<WithoutPostsMessage
									title={'poxa!'}
									message={'parece que não temos nenhum post nessa categoria, nosso time já está sabendo e irá resolver!'}
								/>
							)
							: (
								<FlatList
									data={recentPosts}
									renderItem={({ item }) => (
										<PostCard
											post={item}
											owner={item.owner}
											onPress={() => goToPostView(item)}
										/>
									)}
									showsVerticalScrollIndicator={false}
									contentContainerStyle={{ padding: RFValue(10) }}
									ItemSeparatorComponent={() => <VerticalSigh />}
									ListHeaderComponentStyle={{ marginBottom: RFValue(15) }}
									ListFooterComponent={<LastSigh />}
								/>
							)
					}
				</Body>
			</KeyboardAvoidingView>
		</Container>
	)
}

export { ViewPostsByTag }
