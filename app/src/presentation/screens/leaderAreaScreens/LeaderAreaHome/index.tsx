import React, { useState } from 'react'
import { Alert, RefreshControl } from 'react-native'
import { useTheme } from 'styled-components'

import { PostEntity, PostEntityCommonFields, PostEntityOptional } from '@domain/post/entity/types'

import { useAuthContext } from '@contexts/AuthContext'
import { useLeaderAreaContext } from '@contexts/LeaderAreaContext'

import { LeaderAreaHomeScreenProps } from '@routes/Stack/LeaderAreaStack/screenProps'

import { HeaderButtonsContainer, HeaderSection, ListItemContainer, UnapprovedPostsList } from './styles'
import ClockArrowWhiteIcon from '@assets/icons/clockArrow-white.svg'
import DeniedWhiteIcon from '@assets/icons/denied-white.svg'
import FormHearthWhiteIcon from '@assets/icons/formHearth-white.svg'
import { relativeScreenDensity } from '@common/screenDimensions'

import { OptionButton } from '@components/_buttons/OptionButton'
import { PostCard } from '@components/_cards/PostCard'
import { SubtitleCard } from '@components/_cards/SubtitleCard'
import { ScreenContainer } from '@components/_containers/ScreenContainer'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'

export function LeaderAreaHome({ navigation } : LeaderAreaHomeScreenProps) {
	const theme = useTheme()

	const { userDataContext } = useAuthContext()
	const { unapprovedPosts, loadUnapprovedPosts } = useLeaderAreaContext()

	const [isLoading, setIsLoading] = useState(false)

	const loadUnapprovedRegisters = async () => {
		setIsLoading(true)
		await loadUnapprovedPosts(true)
		setIsLoading(false)
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

	const renderUnapprovedPosts = (item: PostEntityOptional) => {
		return (
			<ListItemContainer >
				<PostCard
					post={item}
					owner={item.owner as PostEntityCommonFields['owner']}
					isOwner={userDataContext.userId === (item.owner as any).userId}
					navigateToProfile={() => navigateToProfile(item as PostEntity)}
					onPress={() => navigateToUnapprovedPostView(item as PostEntity)}
				/>
			</ListItemContainer>
		)
	}

	return (
		<ScreenContainer topSafeAreaColor={theme.orange2} >
			<UnapprovedPostsList
				data={unapprovedPosts}
				renderItem={({ item }) => renderUnapprovedPosts(item as any)}
				onEndReached={() => loadUnapprovedPosts()}
				// onEndReachedThreshold={0.2}
				refreshControl={(
					<RefreshControl
						tintColor={theme.black4}
						colors={[theme.orange3, theme.pink3, theme.green3, theme.blue3]}
						refreshing={isLoading}
						onRefresh={loadUnapprovedRegisters}
					/>
				)}
				showsVerticalScrollIndicator={false}
				keyExtractor={(item) => (Date.now() * Math.random()).toString()} // REFACTOR Centralizar geração de keys de flatlists
				contentContainerStyle={{ paddingBottom: relativeScreenDensity(60) }}
				ListHeaderComponent={(
					<>
						<HeaderButtonsContainer>
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
							<HeaderSection>
								<OptionButton
									label={'0 problemas \nna região'}
									highlightedWords={['problemas', 'sua', 'região']}
									labelSize={11}
									relativeHeight={relativeScreenDensity(70)}
									leftSideWidth={'28%'}
									leftSideColor={theme.red3}
									SvgIcon={DeniedWhiteIcon}
									svgIconScale={['80%', '80%']}
									onPress={() => Alert.alert('Aviso', 'Esta funcionalidade será implementada em breve!')}
								/>
							</HeaderSection>
						</HeaderButtonsContainer>
						<SubtitleCard
							text={'aguardando aprovação'}
							highlightedText={['aguardando', 'aprovação']}
							SvgIcon={ClockArrowWhiteIcon}
							onPress={() => console.log('navigate')}
							seeMoreText
						/>
						<VerticalSpacing/>
					</>
				)}
				ItemSeparatorComponent={() => <VerticalSpacing/>}
				stickyHeaderIndices={[0]}
			/>

		</ScreenContainer>
	)
}
