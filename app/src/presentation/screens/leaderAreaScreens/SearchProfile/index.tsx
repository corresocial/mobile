import React from 'react'
import { ListRenderItem, ActivityIndicator } from 'react-native'

import { UserUseCases } from '@domain/user/adapter/UserUseCases'
import { UserEntity, VerifiedLabelName } from '@domain/user/entity/types'

import { useAlertContext } from '@contexts/AlertContext'
import { useAuthContext } from '@contexts/AuthContext'
import { useLoaderContext } from '@contexts/LoaderContext'

import { navigateToProfileView } from '@routes/auxMethods'
import { SearchProfileScreenProps } from '@routes/Stack/LeaderAreaStack/screenProps'
import { FlatListItem } from 'src/presentation/types'

import { Body, Header, InputContainer, ProfileList, TextInstruction } from './styles'
import ProfileWhiteIcon from '@assets/icons/profile-white.svg'
import { showMessageWithHighlight } from '@common/auxiliaryFunctions'
import { relativeScreenDensity } from '@common/screenDimensions'

import { ProfileCard } from '@components/_cards/ProfileCard'
import { ScreenContainer } from '@components/_containers/ScreenContainer'
import { SearchInput } from '@components/_inputs/SearchInput'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'
import { DefaultPostViewHeader } from '@components/DefaultPostViewHeader'

const userUseCases = new UserUseCases()

export function SearchProfile({ route, navigation }: SearchProfileScreenProps) {
	const { userDataContext } = useAuthContext()
	const { setLoaderIsVisible } = useLoaderContext()
	const { showDefaultAlertModal } = useAlertContext()

	const [searchText, setSearchText] = React.useState('')
	const [profileList, setProfileList] = React.useState<UserEntity[]>([])
	const [pageNumber, setPageNumber] = React.useState(0)
	const [numberOfHits, setNumberOfHits] = React.useState<number>(0)
	const [loadingMore, setLoadingMore] = React.useState(false)

	const isSearchSelect = (route.params?.verifiedLabel && route.params?.profileId)

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
		if (isSearchSelect) {
			const label = route.params?.verifiedLabel
			const { profileId } = route.params
			const coordinatorId = item.userId

			await verifyUserProfile(label, profileId, coordinatorId)
			return
		}

		navigateToProfileView(navigation, item.userId, 'LeaderArea')
	}

	const verifyUserProfile = async (label: VerifiedLabelName, profileId: string, coordinatorId: string) => {
		try {
			setLoaderIsVisible(true)
			await userUseCases.setVerificationBadge(userDataContext, label, profileId, coordinatorId)
			navigation.goBack()
		} catch (error: any) {
			console.log(error)
			showDefaultAlertModal({
				title: 'Ops!',
				text: error.message || 'Houve um erro ao atribuir selo à este usuário!',
				type: 'warn'
			})
		} finally {
			setLoaderIsVisible(false)
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
				{isSearchSelect && (
					<>
						<VerticalSpacing />
						<VerticalSpacing />
						<TextInstruction>{showMessageWithHighlight('Selecione um perfil para ser o coordenador desse aplicador de questionário', ['coordenador', 'aplicador', 'de', 'questionário'])}</TextInstruction>
					</>
				)}
				<InputContainer>
					<SearchInput
						value={searchText}
						placeholder={'pesquisar'}
						returnKeyType={'search'}
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
