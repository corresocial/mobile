import React, { useContext, useEffect, useState } from 'react'
import { FlatList, RefreshControl, StatusBar } from 'react-native'

import { useQueryClient } from '@tanstack/react-query'

import { PostEntityOptional, PostEntityCommonFields, PostEntity } from '@domain/post/entity/types'
import { usePostDomain } from '@domain/post/usePostDomain'

import { useCacheRepository } from '@data/application/cache/useCacheRepository'
import { usePostRepository } from '@data/post/usePostRepository'

import { AuthContext } from '@contexts/AuthContext'
import { useLoaderContext } from '@contexts/LoaderContext'

import { navigateToPostView } from '@routes/auxMethods'
import { ViewCompletedPostsScreenProps } from '@routes/Stack/ProfileStack/screenProps'
import { FlatListItem } from 'src/presentation/types'

import { UiUtils } from '@utils-ui/common/UiUtils'

import { Body, Container, Header, PostPadding } from './styles'
import { theme } from '@common/theme'

import { PostCard } from '@components/_cards/PostCard'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'
import { DefaultPostViewHeader } from '@components/DefaultPostViewHeader'
import { WithoutPostsMessage } from '@components/WithoutPostsMessage'

const { executeCachedRequest } = useCacheRepository()

const { getPostsByOwner } = usePostDomain()

const { getNewDate } = UiUtils()

function ViewCompletedPosts({ route, navigation }: ViewCompletedPostsScreenProps) {
	const { userDataContext } = useContext(AuthContext)
	const { setLoaderIsVisible } = useLoaderContext()

	const [completedPosts, setCompletedPosts] = useState<PostEntity[]>([] as PostEntity[])
	const [postsListIsOver, setPostListIsOver] = useState(false)
	const [isRefresing, setIsRefresing] = useState(false)

	const queryClient = useQueryClient()

	useEffect(() => {
		loadCompletedPosts()
	}, [])

	const loadCompletedPosts = async () => {
		const posts = await loadRemoteUserPosts(true)
		posts && posts.length && setCompletedPosts([...posts])
	}

	const loadMorePosts = async () => {
		console.log('currentLoadedPosts =>', completedPosts && completedPosts.length)
		if (completedPosts && completedPosts.length) {
			const posts = await loadRemoteUserPosts()
			posts && posts.length && setCompletedPosts([...posts])
		}
	}

	const loadRemoteUserPosts = async (refresh?: boolean) => {
		try {
			if (postsListIsOver && !refresh) return

			refresh ? setLoaderIsVisible(true) : setIsRefresing(true)

			const lastPost = !refresh ? completedPosts[completedPosts.length - 1] : undefined

			const queryKey = ['user.posts.completed', userDataContext.userId, lastPost]
			let posts = await executeCachedRequest(
				queryClient,
				queryKey,
				async () => getPostsByOwner(usePostRepository, userDataContext.userId, 2, lastPost, true),
				refresh
			)
			posts = posts.map((p: PostEntity) => ({ ...p, createdAt: getNewDate(p.createdAt) }))

			if (!posts || (posts && !posts.length)) return setPostListIsOver(true)

			if (refresh) {
				queryClient.removeQueries({ queryKey: ['user.posts.completed', userDataContext.userId] })
				setPostListIsOver(false)
				return [...posts]
			}
			return [...completedPosts, ...posts]
		} catch (error) {
			console.log(error)
		} finally {
			refresh ? setLoaderIsVisible(false) : setIsRefresing(false)
		}
	}

	const renderPost = ({ item }: FlatListItem<PostEntity>) => {
		return (
			<PostPadding>
				<PostCard
					post={item}
					owner={getOwnerDataOnly() as PostEntityCommonFields['owner']}
					isOwner={userDataContext.userId === (item.owner as any).userId}
					onPress={() => viewPostDetails(item)}
				/>
			</PostPadding>
		)
	}

	const viewPostDetails = (post: PostEntityOptional) => {
		const postData = { ...post, owner: getOwnerDataOnly() }
		navigateToPostView(postData as PostEntityOptional, navigation)
	}

	const getOwnerDataOnly = () => {
		return {
			userId: userDataContext.userId,
			name: userDataContext.name,
			profilePictureUrl: userDataContext.profilePictureUrl
		}
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
					data={completedPosts}
					renderItem={(item) => renderPost(item)}
					onEndReached={loadMorePosts}
					refreshControl={(
						<RefreshControl
							tintColor={theme.black4}
							colors={[theme.orange3, theme.pink3, theme.green3, theme.blue3]}
							refreshing={isRefresing}
							onRefresh={loadCompletedPosts}
						/>
					)}
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{ backgroundColor: theme.orange2 }}
					ItemSeparatorComponent={() => <VerticalSpacing height={0.8} />}
					ListHeaderComponent={<VerticalSpacing />}
					ListFooterComponent={() => (
						completedPosts.length === 0
							? (
								<WithoutPostsMessage
									title={'ops!'}
									message={'parece que você ainda não tem nenhum post marcado como concluído'}
									highlightedWords={['marcado', 'como', 'concluído']}
								/>
							)
							: <VerticalSpacing bottomNavigatorSpace />
					)}
				/>
			</Body>
		</Container >
	)
}

export { ViewCompletedPosts }
