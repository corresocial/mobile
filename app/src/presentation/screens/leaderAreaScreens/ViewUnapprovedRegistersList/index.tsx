import React, { useEffect, useState } from 'react'
import { ListRenderItem, RefreshControl } from 'react-native'
import { useTheme } from 'styled-components'

import { PostEntity, PostEntityCommonFields } from '@domain/post/entity/types'

import { useAuthContext } from '@contexts/AuthContext'
import { useLeaderAreaContext } from '@contexts/LeaderAreaContext'

import { ViewUnapprovedRegistersListScreenProps } from '@routes/Stack/LeaderAreaStack/screenProps'
import { FlatListItem } from 'src/presentation/types'

import { ListItemContainer, Container, Header, UnapprovedRegistersList } from './styles'
import ClockArrowWhiteIcon from '@assets/icons/clockArrow-white.svg'

import { PostCard } from '@components/_cards/PostCard'
import { ScreenContainer } from '@components/_containers/ScreenContainer'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'
import { DefaultPostViewHeader } from '@components/DefaultPostViewHeader'

export function ViewUnapprovedRegistersList({ navigation } : ViewUnapprovedRegistersListScreenProps) {
	const { userDataContext } = useAuthContext()
	const { unapprovedPosts, loadUnapprovedPosts } = useLeaderAreaContext()

	const theme = useTheme()

	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		loadUnapprovedPosts()
	}, [])

	const loadUnapprovedRegisters = async () => {
		setIsLoading(true)
		await loadUnapprovedPosts(true)
		setIsLoading(false)
	}

	const loadMoreRegisters = async () => {
		console.log('currentLoadedRegisters =>', unapprovedPosts && unapprovedPosts.length)
		return unapprovedPosts && unapprovedPosts.length ? loadUnapprovedPosts() : null
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

	const renderPost = ({ item }: FlatListItem<PostEntity>) => {
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
		<ScreenContainer topSafeAreaColor={theme.white3} bottomSafeAreaColor={theme.orange2}>
			<Container>
				<Header>
					<DefaultPostViewHeader
						ignorePlatform
						text={'aguardando aprovação'}
						highlightedWords={['aprovação']}
						SvgIcon={ClockArrowWhiteIcon}
						smallIconArea
						onBackPress={() => navigation.goBack()}
					/>
				</Header>

				<UnapprovedRegistersList
					data={unapprovedPosts}
					renderItem={renderPost as ListRenderItem<unknown>}
					onEndReached={loadMoreRegisters}
					refreshControl={(
						<RefreshControl
							tintColor={theme.white3}
							colors={[theme.orange3, theme.pink3, theme.green3, theme.blue3]}
							refreshing={isLoading}
							onRefresh={loadUnapprovedRegisters}
						/>
					)}
					showsVerticalScrollIndicator={false}
					ListHeaderComponent={() => <VerticalSpacing/>}
					ItemSeparatorComponent={() => <VerticalSpacing/>}
					ListFooterComponent={<VerticalSpacing bottomNavigatorSpace/>}
				/>
			</Container>
		</ScreenContainer>
	)
}
