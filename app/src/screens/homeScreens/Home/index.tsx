import React, { useEffect, useState } from 'react'
import { BackHandler, FlatList, StatusBar } from 'react-native'
import * as Location from 'expo-location'

import { RFValue } from 'react-native-responsive-fontsize'
import { theme } from '../../../common/theme'
import HeartPinkIcon from '../../../assets/icons/heart-pink.svg'
import SalesCartIcon from '../../../assets/icons/salesCart-green.svg'
import SoundToolsIcon from '../../../assets/icons/soundTools-blue.svg'
import ToolBoxIcon from '../../../assets/icons/toolBox-purple.svg'
import SuitcaseIcon from '../../../assets/icons/suitcase-yellow.svg'
import AngleRightIcon from '../../../assets/icons/angleRight-shadow.svg'

import { PostCollection } from '../../../services/firebase/types'

import { LocationNearDropdown } from '../../../components/LocationNearDropdown'
import { HomeTabScreenProps } from '../../../routes/Stack/UserStack/stackScreenProps'
import { Container, DropdownContainer, FooterSigh, HorizontalPostTypes, RecentPostsContainer, RecentPostsHeader, Sigh, Title } from './styles'
import { SmallButton } from '../../../components/_buttons/SmallButton'
import { screenWidth } from '../../../common/screenDimensions'
import { showMessageWithHighlight } from '../../../common/auxiliaryFunctions'
import { RequestLocation } from '../../../components/RequestLocation'
import { PostCard } from '../../../components/_cards/PostCard'
import { searchPosts } from '../../../services/algolia/searchPost'

const data = ['avenina A', 'avenida B', 'avenida C', 'avenida D', 'avenida E', 'avenida F', 'avenida G', 'avenida H', 'avenida I']

const near = [
	{
		attendanceFrequency: 'someday',
		attendanceWeekDays: [
			'ter',
			'sab',
		],
		closingHour: {
			nanoseconds: 891000000,
			seconds: 1669984208,
		},
		createdAt: {
			nanoseconds: 13000000,
			seconds: 1669996577,
		},
		deliveryMethod: 'unavailable',
		locationView: 'approximate',
		openingHour: {
			nanoseconds: 933000000,
			seconds: 1669977053,
		},
		owner: {
			description: 'Olá! sou doutor e de assistente junior em treinament coisas que estão no meu coração e o que eu não sei se vou conseguir ir aí amanhã cedo e talvez eu vou aí buscar o jaleco e ver se tem alguma coisa pra faze',
			name: 'Wellington Souza Abreu',
			profilePictureUrl: [
				'https://firebasestorage.googleapis.com/v0/b/corresocial-66840.appspot.com/o/imagens%2Fusers%2FRMCJAuUhLjSmAu3kgjTzRjjZ2jB2.jpg?alt=media&token=bdad07e2-9969-44bb-8444-665eb87e98de',
			],
		},
		picturesUrl: [
			'https://firebasestorage.googleapis.com/v0/b/corresocial-66840.appspot.com/o/imagens%2Fservices%2Ff7Y8KPRDeGQSudLlfCxg1.jpg?alt=media&token=ae9b1266-a2a0-442b-845a-fefda213bbba',
			'https://firebasestorage.googleapis.com/v0/b/corresocial-66840.appspot.com/o/imagens%2Fservices%2Ff7Y8KPRDeGQSudLlfCxg.jpg?alt=media&token=64afd287-a219-402d-9c49-4b5e21ce99cc',
		],
		postId: 'f7Y8KPRDeGQSudLlfCxg',
		postType: 'service',
		saleValue: 326,
		tags: [
			'agrupecuaria',
		],
		title: 'teste de cadastro de serviço',
	}
]

function Home({ navigation, route }: HomeTabScreenProps) {
	const [recentLocations, setRecentLocations] = useState<PostCollection[]>(data as any)
	const [nearPosts, setNearPosts] = useState<PostCollection[]>(near as any)

	const [hasLocationPermission, setHasLocationPermission] = useState(false)

	useEffect(() => {
		BackHandler.addEventListener('hardwareBackPress', onPressBackHandler)
	})

	useEffect(() => {
		requestPermissions()
	}, [])

	const requestPermissions = async () => {
		const { status } = await Location.requestForegroundPermissionsAsync()
		setHasLocationPermission(true)
		if (status !== 'granted') {
			console.log('Permission to access location was denied')
			console.log(status)
		}
	}

	const onPressBackHandler = () => {
		if (navigation.isFocused()) {
			BackHandler.exitApp()
			return true
		}
		return false
	}

	const findNearPosts = async (searchText: string) => {
		console.log(searchText)
		const posts = await searchPosts(searchText, {})
		console.log(posts)
	}

	return (
		<Container>
			<StatusBar backgroundColor={theme.orange2} barStyle={'dark-content'} />
			<DropdownContainer>
				<LocationNearDropdown
					recentLocations={recentLocations}
					nearPosts={nearPosts}
					findNearPosts={findNearPosts}
				/>
			</DropdownContainer>
			<HorizontalPostTypes>
				<SmallButton
					relativeWidth={screenWidth * 0.13}
					color={'white'}
					fontSize={8}
					onPress={() => { }}
					label={'impacto'}
					SvgIcon={HeartPinkIcon}
					svgScale={35}
					height={screenWidth * 0.13}
					flexDirection={'column'}
				/>
				<SmallButton
					relativeWidth={screenWidth * 0.13}
					color={'white'}
					fontSize={8}
					onPress={() => { }}
					label={'impacto'}
					SvgIcon={SalesCartIcon}
					svgScale={30}
					height={screenWidth * 0.13}
					flexDirection={'column'}
				/>
				<SmallButton
					relativeWidth={screenWidth * 0.13}
					color={'white'}
					fontSize={8}
					onPress={() => { }}
					label={'impacto'}
					SvgIcon={SoundToolsIcon}
					svgScale={35}
					height={screenWidth * 0.13}
					flexDirection={'column'}
				/>
				<SmallButton
					relativeWidth={screenWidth * 0.13}
					color={'white'}
					fontSize={8}
					onPress={() => { }}
					label={'impacto'}
					SvgIcon={ToolBoxIcon}
					svgScale={35}
					height={screenWidth * 0.13}
					flexDirection={'column'}
				/>
				<SmallButton
					relativeWidth={screenWidth * 0.13}
					color={'white'}
					fontSize={8}
					onPress={() => { }}
					label={'impacto'}
					SvgIcon={SuitcaseIcon}
					svgScale={35}
					height={screenWidth * 0.13}
					flexDirection={'column'}
				/>
			</HorizontalPostTypes>
			<RecentPostsContainer>
				<RecentPostsHeader onPress={() => { }}>
					<Title>{showMessageWithHighlight('posts de recentes', ['recentes'])}</Title>
					<AngleRightIcon width={RFValue(20)} height={RFValue(20)} />
				</RecentPostsHeader>
				{
					(!recentLocations.length || !nearPosts.length) && (
						<RequestLocation getLocationPermissions={() => { }} />
					)
				}
				{
					nearPosts.length && (
						<FlatList
							data={nearPosts}
							renderItem={({ item }: any) => ( // TODO type
								<PostCard
									post={item}
									owner={item.owner}
									onPress={() => { }}
								/>
							)}
							showsVerticalScrollIndicator={false}
							contentContainerStyle={{ padding: RFValue(10) }}
							ItemSeparatorComponent={() => <Sigh />}
							ListHeaderComponentStyle={{ marginBottom: RFValue(15) }}
							ListFooterComponent={() => <FooterSigh />}
						/>
					)
				}
			</RecentPostsContainer>
		</Container >
	)
}

export { Home }
