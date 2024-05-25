import React, { useContext } from 'react'
import { FlatList, StatusBar } from 'react-native'

import { PostEntityOptional, PostEntityCommonFields } from '@domain/post/entity/types'

import { AuthContext } from '@contexts/AuthContext'

import { navigateToPostView } from '@routes/auxMethods'
import { ViewCompletedPostsScreenProps } from '@routes/Stack/ProfileStack/screenProps'
import { FlatListItem } from 'src/presentation/types'

import { Body, Container, Header, PostPadding } from './styles'
import { relativeScreenHeight } from '@common/screenDimensions'
import { theme } from '@common/theme'

import { PostCard } from '@components/_cards/PostCard'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'
import { DefaultPostViewHeader } from '@components/DefaultPostViewHeader'
import { WithoutPostsMessage } from '@components/WithoutPostsMessage'

function ViewCompletedPosts({ route, navigation }: ViewCompletedPostsScreenProps) {
	const { userDataContext, userPostsContext } = useContext(AuthContext)

	const viewPostDetails = (post: PostEntityOptional) => {
		const postData = { ...post, owner: getUserDataOnly() }
		navigateToPostView(postData as PostEntityOptional, navigation)
	}

	const getUserDataOnly = () => {
		return {
			userId: userDataContext.userId,
			name: userDataContext.name,
			profilePictureUrl: userDataContext.profilePictureUrl
		}
	}

	const getCompletedPosts = () => {
		const userPosts = userPostsContext || []
		return userPosts.filter((post) => post.completed)
	}

	return (
		<Container>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<Header>
				<DefaultPostViewHeader
					onBackPress={() => navigation.goBack()}
					text={'corres concluídos'}
				/>
			</Header>
			<Body>
				<FlatList
					data={getCompletedPosts()}
					renderItem={({ item }: FlatListItem<PostEntityOptional>) => (
						<PostPadding>
							<PostCard
								post={item}
								owner={getUserDataOnly() as PostEntityCommonFields['owner']}
								isOwner={userDataContext.userId === (item.owner as any).userId}
								onPress={() => viewPostDetails(item)}
							/>
						</PostPadding>
					)}
					showsVerticalScrollIndicator={false}
					ItemSeparatorComponent={() => <VerticalSpacing height={relativeScreenHeight(0.8)} />}
					contentContainerStyle={{ backgroundColor: theme.orange2 }}
					ListHeaderComponent={<VerticalSpacing />}
					ListFooterComponent={() => (
						getCompletedPosts().length === 0
							? (
								<WithoutPostsMessage
									title={'ops!'}
									message={'parece que você ainda não tem nenhum post marcado como concluído'}
									highlightedWords={['marcado', 'como', 'concluído']}
								/>
							)
							: <VerticalSpacing height={relativeScreenHeight(11)} />
					)}
				/>
			</Body>
		</Container >
	)
}

export { ViewCompletedPosts }
