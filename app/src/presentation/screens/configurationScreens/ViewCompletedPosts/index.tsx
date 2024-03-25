import React, { useContext } from 'react'
import { FlatList, StatusBar } from 'react-native'

import { AuthContext } from '@contexts/AuthContext'

import { FlatListItem } from '@globalTypes/global/types'
import { navigateToPostView } from '@routes/auxMethods'
import { ViewCompletedPostsScreenProps } from '@routes/Stack/ProfileStack/screenProps'
import { PostCollection, PostCollectionCommonFields } from '@services/firebase/types'

import { Body, Container, Header, PostPadding } from './styles'
import { relativeScreenHeight } from '@common/screenDimensions'
import { theme } from '@common/theme'

import { PostCard } from '@components/_cards/PostCard'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'
import { DefaultPostViewHeader } from '@components/DefaultPostViewHeader'
import { WithoutPostsMessage } from '@components/WithoutPostsMessage'

function ViewCompletedPosts({ route, navigation }: ViewCompletedPostsScreenProps) {
	const { userDataContext } = useContext(AuthContext)

	const viewPostDetails = (post: PostCollection) => {
		const postData = { ...post, owner: getUserDataOnly() }
		navigateToPostView(postData as PostCollection, navigation, 'User')
	}

	const getUserDataOnly = () => {
		return {
			userId: userDataContext.userId,
			name: userDataContext.name,
			profilePictureUrl: userDataContext.profilePictureUrl
		}
	}

	const getCompletedPosts = () => {
		const userPosts = userDataContext.posts || []
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
					renderItem={({ item }: FlatListItem<PostCollection>) => (
						<PostPadding>
							<PostCard
								post={item}
								owner={getUserDataOnly() as PostCollectionCommonFields['owner']}
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
