import React from 'react'
import { ListRenderItem, ActivityIndicator } from 'react-native'

import { UserUseCases } from '@domain/user/adapter/UserUseCases'
import { UserEntity, VerifiedLabelName } from '@domain/user/entity/types'

import { useUserRepository } from '@data/user/useUserRepository'

import { useAuthContext } from '@contexts/AuthContext'
import { useLoaderContext } from '@contexts/LoaderContext'

import { SearchProfileScreenProps } from '@routes/Stack/LeaderAreaStack/screenProps'
import { FlatListItem } from 'src/presentation/types'

import { Body, Header, InputContainer, ProfileList } from './styles'
import ProfileWhiteIcon from '@assets/icons/profile-white.svg'
import { relativeScreenDensity } from '@common/screenDimensions'

import { ProfileCard } from '@components/_cards/ProfileCard'
import { ScreenContainer } from '@components/_containers/ScreenContainer'
import { SearchInput } from '@components/_inputs/SearchInput'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'
import { DefaultPostViewHeader } from '@components/DefaultPostViewHeader'

const { remoteStorage } = useUserRepository()

const userUseCases = new UserUseCases()

export function SearchProfile({ route, navigation }: SearchProfileScreenProps) {
	const { userDataContext } = useAuthContext()
	const { setLoaderIsVisible } = useLoaderContext()

	const [searchText, setSearchText] = React.useState('')
	const [profileList, setProfileList] = React.useState<UserEntity[]>([])
	const [pageNumber, setPageNumber] = React.useState(0)
	const [numberOfHits, setNumberOfHits] = React.useState<number>(0)
	const [loadingMore, setLoadingMore] = React.useState(false)

	const searchProfile = async (page: number) => {
		try {
			pageNumber !== 0 ? setLoadingMore(true) : setLoaderIsVisible(true)
			const { profiles, totalHits } = await userUseCases.searchProfile(searchText, pageNumber)

			if (page === 0) {
				setProfileList([]) // Garantindo que a lista atualizei
				setProfileList(profiles)
			} else {
				setProfileList((prevProfiles) => [...prevProfiles, ...profiles])
			}
			setNumberOfHits(totalHits)
		} catch (error) {
			console.log(error)
		} finally {
			setLoaderIsVisible(false)
			setLoadingMore(false)
		}
	}

	const handleEndReached = () => {
		if (!loadingMore && profileList.length < numberOfHits) {
			setLoadingMore(true)
			setPageNumber((prevPage) => {
				const newPage = prevPage + 1
				searchProfile(newPage)
				return newPage
			})
		}
	}

	const openProfile = async (item: UserEntity) => {
		if (route.params?.verifiedLabel && route.params?.profileId) {
			const label = route.params?.verifiedLabel
			const { profileId } = route.params
			const coordinatorId = item.userId

			await verifyUserProfile(label, profileId, coordinatorId)
			navigation.goBack()
			return
		}

		navigation.navigate('ProfileLeaderArea', { userId: item.userId, stackLabel: 'LeaderArea' })
	}

	const verifyUserProfile = async (label: VerifiedLabelName, profileId: string, coordinatorId: string) => {
		if (profileId && userDataContext.userId) {
			const verifiedObject = {
				verified: {
					type: label,
					by: userDataContext.userId,
					at: new Date(),
					name: userDataContext.name || '',
					coordinatorId: coordinatorId
				}
			}

			await remoteStorage.updateUserData(profileId, verifiedObject)
		}
	}

	const renderProfileItem = ({ item }: FlatListItem<UserEntity>) => {
		return (
			<ProfileCard
				isOwner={userDataContext.userId === item.userId}
				userData={item}
				onPress={() => openProfile(item)}
			/>
		)
	}

	return (
		<ScreenContainer infinityBottom>
			<Header>
				<DefaultPostViewHeader
					text={'procurar perfil'}
					SvgIcon={ProfileWhiteIcon}
					smallIconArea
					ignorePlatform
					onBackPress={() => navigation.goBack()}
				/>
				<InputContainer>
					<SearchInput
						value={searchText}
						placeholder={'pesquisar'}
						returnKeyType={'search'}
						clearOnSubmit
						onChangeText={(text: string) => setSearchText(text)}
						onPressKeyboardSubmit={() => {
							setPageNumber(0)
							searchProfile(0)
						}}
					/>
				</InputContainer>
			</Header>
			<Body>
				<ProfileList
					data={profileList}
					renderItem={renderProfileItem as ListRenderItem<unknown>}
					onEndReached={handleEndReached}
					onEndReachedThreshold={0.5} // Ajuste para quando carregar mais resultados
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{ paddingHorizontal: relativeScreenDensity(10) }}
					ItemSeparatorComponent={() => <VerticalSpacing />}
					ListHeaderComponent={<VerticalSpacing />}
					ListFooterComponent={loadingMore ? <ActivityIndicator size={'large'} color={'black'} style={{ paddingVertical: 30 }} /> : <VerticalSpacing bottomNavigatorSpace />}
				/>
			</Body>
		</ScreenContainer>
	)
}
