import React, { useEffect, useState } from 'react'
import { ListRenderItem, RefreshControl, StatusBar } from 'react-native'
import { useTheme } from 'styled-components'

import { PostEntity, PostEntityCommonFields } from '@domain/post/entity/types'
import { CompleteUser } from '@domain/user/entity/types'

import { useAuthContext } from '@contexts/AuthContext'
import { useLeaderAreaContext } from '@contexts/LeaderAreaContext'

import { LeaderAreaHomeScreenProps } from '@routes/Stack/LeaderAreaStack/screenProps'
import { FlatListItem } from 'src/presentation/types'

import { Container, HeaderButtonsContainer, HeaderSection, ListItemContainer, Row, UnapprovedPostsList } from './styles'
import ClockArrowWhiteIcon from '@assets/icons/clockArrow-white.svg'
import FormHearthWhiteIcon from '@assets/icons/formHearth-white.svg'
import LogoCorreWhiteIcon from '@assets/icons/logoBuilding.svg'
import ProfileWhiteIcon from '@assets/icons/profile-white.svg'
import { relativeScreenDensity } from '@common/screenDimensions'

import { OptionButton } from '@components/_buttons/OptionButton'
import { PostCard } from '@components/_cards/PostCard'
import { ProfileCard } from '@components/_cards/ProfileCard'
import { SubtitleCard } from '@components/_cards/SubtitleCard'
import { ScreenContainer } from '@components/_containers/ScreenContainer'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'

export function LeaderAreaHome({ navigation }: LeaderAreaHomeScreenProps) {
	const theme = useTheme()

	const { userDataContext } = useAuthContext()
	const { unapprovedProfiles, unapprovedPosts, loadUnapprovedProfiles, loadUnapprovedPosts } = useLeaderAreaContext()

	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		loadUnapprovedPosts()
		loadUnapprovedProfiles()
	}, [])

	const loadUnapprovedRegisters = async () => {
		setIsLoading(true)
		await loadUnapprovedPosts(true)
		await loadUnapprovedProfiles(true)
		setIsLoading(false)
	}

	const currentUserHasPermissionToAccessApprovement = () => (
		userDataContext.verified
		&& (
			userDataContext.verified.admin
			|| userDataContext.verified.type === 'leader'
		)
	)

	const currentUserHasPermissionToAccessPollsAndPetitions = () => (
		userDataContext.verified
		&& (
			!userDataContext.verified.admin
			|| userDataContext.verified.type === 'leader'
			|| userDataContext.verified.type === 'government'
		)
	)

	const loadMoreRegisters = async () => {
		// console.log('currentLoadedRegisters =>', unapprovedPosts && unapprovedPosts.length)
		return unapprovedPosts && unapprovedPosts.length ? loadUnapprovedPosts() : null
	}

	const navigateToUnapprovedUserView = (profileData: CompleteUser) => {
		navigation.navigate('ViewUnapprovedProfile', { profileData })
	}

	const navigateToUnapprovedPostView = (postData: PostEntity) => {
		navigation.navigate('ViewUnapprovedPost', { postData })
	}

	const navigateToProfile = (postData: PostEntity) => {
		const ownerId = postData.owner.userId
		if (userDataContext.userId === ownerId) {
			return navigation.navigate('Profile' as any)
		}
		navigation.navigate('ProfileLeaderArea', { userId: ownerId, stackLabel: 'LeaderArea' })
	}

	const renderUnapprovedPosts = ({ item }: FlatListItem<PostEntity & CompleteUser>) => {
		if (item.userId) {
			return (
				<ListItemContainer key={item.userId}>
					<ProfileCard
						userData={item as CompleteUser}
						isOwner
						onPress={() => navigateToUnapprovedUserView(item as CompleteUser)}
					/>
				</ListItemContainer>
			)
		}

		return (
			<ListItemContainer key={item.postId}>
				<PostCard
					post={{ ...item, createdAt: item.updatedAt }}
					owner={item.owner as PostEntityCommonFields['owner']}
					isOwner
					navigateToProfile={() => navigateToProfile(item as PostEntity)}
					onPress={() => navigateToUnapprovedPostView(item as PostEntity)}
				/>
			</ListItemContainer>
		)
	}

	return (
		<ScreenContainer topSafeAreaColor={theme.orange2}>
			<Container>
				<StatusBar backgroundColor={theme.orange2} barStyle={'dark-content'} />
				<HeaderButtonsContainer>
					<Row>
						{
							currentUserHasPermissionToAccessPollsAndPetitions() && (
								<HeaderSection>
									<OptionButton
										label={'enquetes \ne abaixo \nassinados'}
										highlightedWords={['enquetes', 'abaixo', '\nassinados']}
										labelSize={11}
										relativeHeight={relativeScreenDensity(70)}
										leftSideWidth={'28%'}
										leftSideColor={theme.purple3}
										SvgIcon={FormHearthWhiteIcon}
										svgIconScale={['80%', '120%']}
										onPress={() => navigation.navigate('PollPetitionArea')}
									/>
								</HeaderSection>
							)
						}
						<HeaderSection>
							<OptionButton
								label={'pesquisar perfil'}
								highlightedWords={['pesquisar']}
								labelSize={11}
								relativeHeight={relativeScreenDensity(70)}
								leftSideWidth={'28%'}
								leftSideColor={theme.orange3}
								SvgIcon={ProfileWhiteIcon}
								svgIconScale={['80%', '80%']}
								onPress={() => navigation.navigate('SearchProfile')}
							/>
						</HeaderSection>
					</Row>
					<OptionButton
						label={'cadastro cidadão'}
						highlightedWords={['cadastro', 'cidadão']}
						labelSize={13}
						relativeHeight={relativeScreenDensity(70)}
						leftSideWidth={'28%'}
						leftSideColor={theme.orange3}
						SvgIcon={LogoCorreWhiteIcon}
						svgIconScale={['60%', '60%']}
						onPress={() => navigation.navigate('CitizenRegistrationArea')}
					/>

				</HeaderButtonsContainer>
				{
					currentUserHasPermissionToAccessApprovement() ? (
						<UnapprovedPostsList
							data={[...unapprovedProfiles, ...unapprovedPosts]}
							// data={unapprovedPosts}
							renderItem={renderUnapprovedPosts as ListRenderItem<unknown>}
							onEndReached={loadMoreRegisters}
							refreshControl={(
								<RefreshControl
									tintColor={theme.black4}
									colors={[theme.orange3, theme.pink3, theme.green3, theme.blue3]}
									refreshing={isLoading}
									onRefresh={loadUnapprovedRegisters}
								/>
							)}
							showsVerticalScrollIndicator={false}
							ListHeaderComponent={(
								<>
									<SubtitleCard
										text={'aguardando aprovação'}
										highlightedText={['aguardando', 'aprovação']}
										SvgIcon={ClockArrowWhiteIcon}
										onPress={() => navigation.navigate('ViewUnapprovedRegistersList')}
										seeMoreText
									/>
									<VerticalSpacing />
								</>
							)}
							ItemSeparatorComponent={() => <VerticalSpacing />}
							ListFooterComponent={<VerticalSpacing bottomNavigatorSpace />}
						/>
					) : <></>
				}
			</Container>
		</ScreenContainer>
	)
}
