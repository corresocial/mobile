import React, { useContext } from 'react'
import { FlatList, StatusBar } from 'react-native'

import { Body, Container, Header, PostPadding } from './styles'
import { theme } from '../../../common/theme'

import { ViewCompletedPostsScreenProps } from '../../../routes/Stack/UserStack/stackScreenProps'

import { AuthContext } from '../../../contexts/AuthContext'

import { DefaultPostViewHeader } from '../../../components/DefaultPostViewHeader'
import { VerticalSpacing } from '../../../components/_space/VerticalSpacing'
import { PostCollection } from '../../../services/firebase/types'
import { relativeScreenHeight, relativeScreenWidth } from '../../../common/screenDimensions'
import { PostCard } from '../../../components/_cards/PostCard'
import { WithoutPostsMessage } from '../../../components/WithoutPostsMessage'

function ViewCompletedPosts({ route, navigation }: ViewCompletedPostsScreenProps) {
	const { userDataContext } = useContext(AuthContext)

	const goToPostView = (item: PostCollection | any) => { // TODO Type
		switch (item.postType) {
			case 'income': {
				switch (item.macroCategory) {
					case 'sale': return navigation.navigate('ViewSalePostUser', { postData: { ...item, owner: getUserDataOnly() } })
					case 'service': return navigation.navigate('ViewSalePostUser', { postData: { ...item, owner: getUserDataOnly() } })
					case 'vacancy': return navigation.navigate('ViewSalePostUser', { postData: { ...item, owner: getUserDataOnly() } })
					default: return false
				}
			}
			case 'socialImpact': {
				navigation.navigate('ViewSocialImpactPostUser', { postData: { ...item, owner: getUserDataOnly() } })
				break
			}
			case 'culture': {
				navigation.navigate('ViewCulturePostUser', { postData: { ...item, owner: getUserDataOnly() } })
				break
			}
			default:
				return false
		}
	}

	const getUserDataOnly = () => {
		return {
			userId: userDataContext.userId,
			name: userDataContext.name,
			profilePicture: userDataContext.profilePictureUrl
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
			<Body
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{
					paddingVertical: relativeScreenWidth(4),
				}}
			>
				<FlatList
					data={getCompletedPosts()}
					renderItem={({ item }: any) => ( // TODO type
						<PostPadding>
							<PostCard
								post={item}
								owner={getUserDataOnly()}
								onPress={() => goToPostView(item)}
							/>
						</PostPadding>
					)}
					showsVerticalScrollIndicator={false}
					ItemSeparatorComponent={() => <VerticalSpacing height={relativeScreenHeight(0.8)} />}
					contentContainerStyle={{ backgroundColor: theme.orange2 }}
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
