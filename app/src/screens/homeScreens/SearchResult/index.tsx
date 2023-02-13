import React, { useContext, useEffect, useState } from 'react'
import { KeyboardAvoidingView, FlatList } from 'react-native'

import { RFValue } from 'react-native-responsive-fontsize'
import { Body, Container, FilterButtons, Header, InputContainer, LastSigh, SearchInput, VerticalSigh } from './styles'
import { theme } from '../../../common/theme'
import LoupIcon from '../../../assets/icons/loup.svg'
import ChatIcon from '../../../assets/icons/chat.svg'
import PaperListIcon from '../../../assets/icons/paperList.svg'

import { PostCollection, PostCollectionRemote, PostType } from '../../../services/firebase/types'
import { SearchResultScreenProps } from '../../../routes/Stack/HomeStack/stackScreenProps'

import { LocationContext } from '../../../contexts/LocationContext'
import { LoaderContext } from '../../../contexts/LoaderContext'

import { DefaultPostViewHeader } from '../../../components/DefaultPostViewHeader'
import { PostCard } from '../../../components/_cards/PostCard'
import { searchPosts } from '../../../services/algolia/searchPost'
import { SelectButton } from '../../../components/_buttons/SelectButton'
import { WithoutPostsMessage } from '../../../components/WithoutPostsMessage'
import { FocusAwareStatusBar } from '../../../components/FocusAwareStatusBar'

function SearchResult({ route, navigation }: SearchResultScreenProps) {
	const { locationDataContext } = useContext(LocationContext)
	const { setLoaderIsVisible } = useContext(LoaderContext)

	const [searchText, setSearchText] = useState('')
	const [resultPosts, setResultPosts] = useState<PostCollectionRemote[]>([])
	const [resultProfiles] = useState<any[]>([]) // setResultProfiles
	const [postResultsIsVisible, setPostResultsIsVisible] = useState(true)
	const [profileResultsIsVisible, setProfileResultsIsVisible] = useState(false)

	useEffect(() => {
		searchPostByText()
		console.log(locationDataContext.currentCategory)
	}, [])

	const searchPostByText = async () => {
		const searchParamsFromRoute = { ...route.params.searchParams }

		const algoliaSearchText = searchText || searchParamsFromRoute.searchText

		console.log(`SEARCH TEXT: ${algoliaSearchText}`)

		setLoaderIsVisible(true)
		await searchPosts(algoliaSearchText, searchParamsFromRoute)
			.then((posts) => {
				setResultPosts(posts)
				if (!searchText) setSearchText(route.params.searchParams.searchText)
				setLoaderIsVisible(false)
			})
			.catch((err) => {
				console.log(err)
				setLoaderIsVisible(false)
			})
	}

	const getRelativePath = () => {
		if (route.params.searchParams.tag) return route.params.searchParams.tag
		if (route.params.searchParams.category) return route.params.categoryLabel
		return getRelativeTitle(locationDataContext.searchParams.postType)
	}

	const getRelativeTitle = (postType: PostType) => {
		switch (postType) {
			case 'service': return 'serviços' as PostType
			case 'sale': return 'comércio' as PostType
			case 'vacancy': return 'vagas' as PostType
			case 'culture': return 'culturas' as PostType
			case 'socialImpact': return 'impacto social' as PostType
			default: return 'posts'
		}
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

	const getOneToneMoreLight = () => {
		switch (locationDataContext.searchParams.postType) {
			case 'service': return theme.purple1
			case 'sale': return theme.green1
			case 'vacancy': return theme.yellow1
			case 'socialImpact': return theme.pink1
			case 'culture': return theme.blue1
			default: return 'white'
		}
	}

	const currentCategoryColorLight = getOneToneMoreLight()

	return (
		<Container>
			<FocusAwareStatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<Header>
				<DefaultPostViewHeader
					text={getRelativePath()}
					// SvgIcon={getCategoryIcon()}
					showResults
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
						onSubmitEditing={searchPostByText}
					/>
				</InputContainer>
			</Header>
			<KeyboardAvoidingView style={{ flex: 1 }}>
				<Body style={{ backgroundColor: locationDataContext.currentCategory.backgroundColor }}>
					<FilterButtons>
						<SelectButton
							backgroundColor={theme.white3}
							backgroundSelected={currentCategoryColorLight}
							label={'posts'}
							boldLabel
							noDisplacement
							height={'100%'}
							width={'42%'}
							selected={postResultsIsVisible}
							SvgIcon={ChatIcon}
							onSelect={() => {
								setPostResultsIsVisible(true)
								setProfileResultsIsVisible(false)
							}}
						/>
						<SelectButton
							backgroundColor={theme.white3}
							backgroundSelected={currentCategoryColorLight}
							label={'perfis'}
							boldLabel
							noDisplacement
							height={'100%'}
							width={'42%'}
							selected={profileResultsIsVisible}
							SvgIcon={PaperListIcon}
							onSelect={() => {
								setProfileResultsIsVisible(true)
								setPostResultsIsVisible(false)
							}}
						/>
					</FilterButtons>
					{
						postResultsIsVisible && (
							!resultPosts.length
								? (
									<WithoutPostsMessage
										title={'poxa!'}
										message={'parece que não temos nenhum post nessa categoria, nosso time já está sabendo e irá resolver!'}
									/>
								)
								: (
									<FlatList
										data={resultPosts}
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
						)
					}
					{
						profileResultsIsVisible && (
							!resultProfiles.length
								? (
									<WithoutPostsMessage
										title={'poxa!'}
										message={'parece que não temos nenhum usuário com esse nome no corre.'}
									/>
								)
								: (
									<WithoutPostsMessage
										title={'Aeee!'}
										message={'Agora tem, mas não aparece!'}
									/>
								)
						)
					}
				</Body>
			</KeyboardAvoidingView>
		</Container>
	)
}

export { SearchResult }
