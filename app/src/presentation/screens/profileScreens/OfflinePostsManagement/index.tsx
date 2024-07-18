/* eslint-disable no-restricted-syntax */
import React, { useContext, useEffect, useState } from 'react'
import { StatusBar } from 'react-native'

import { sendEvent } from '@newutils/methods/analyticsEvents'

import { PostEntityOptional, PostEntity, PostEntityCommonFields } from '@domain/post/entity/types'
import { usePostDomain } from '@domain/post/usePostDomain'

import { usePostRepository } from '@data/post/usePostRepository'

import { AuthContext } from '@contexts/AuthContext'

import { OfflinePostsManagementScreenProps } from '@routes/Stack/UserStack/screenProps'

import { useCloudFunctionService } from '@services/cloudFunctions/useCloudFunctionService'
import { getNetworkStatus } from '@utils/deviceNetwork'

import { Body, Container, Header, SaveButtonContainer } from './styles'
import AngleRightWhiteIcon from '@assets/icons/angleRight-white.svg'
import HandOnMoneyWhiteIcon from '@assets/icons/handOnMoney-white.svg'
import { relativeScreenHeight } from '@common/screenDimensions'
import { theme } from '@common/theme'

import { PrimaryButton } from '@components/_buttons/PrimaryButton'
import { PostCard } from '@components/_cards/PostCard'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'
import { DefaultPostViewHeader } from '@components/DefaultPostViewHeader'
import { FlatListPosts } from '@components/FlatListPosts'
import { Loader } from '@components/Loader'

const { savePost } = usePostDomain()

const { localStorage: localPostsStorage } = usePostRepository()

function OfflinePostsManagement({ navigation }: OfflinePostsManagementScreenProps) {
	const { userDataContext, addUserPost } = useContext(AuthContext)

	const [isLoading, setIsLoading] = useState(false)
	const [offlinePosts, setOfflinePosts] = useState<PostEntityOptional[]>([])

	const [hasError, setHasError] = useState(false)

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => loadOfflinePosts())
		return unsubscribe
	}, [navigation])

	const loadOfflinePosts = async () => {
		const storedOfflinePosts = await localPostsStorage.getOfflinePosts()
		console.log(storedOfflinePosts)

		if (!storedOfflinePosts || !storedOfflinePosts.length) {
			navigation.goBack()
		}

		setOfflinePosts(storedOfflinePosts)
	}

	const checkNetworkStatus = async () => {
		const networkStatus = await getNetworkStatus()
		return !!networkStatus.isConnected && !!networkStatus.isInternetReachable
	}

	const navigateToSubscriptionContext = () => {
		navigation.navigate('SelectSubscriptionPlan', { postRange: getMajorOfflinePostRange() })
	}

	const saveOfflinePost = async () => {
		const hasValidConnection = await checkNetworkStatus()
		if (!hasValidConnection) return

		try {
			for await (const post of offlinePosts as PostEntity[]) {
				await savePostData(post)
			}
			navigation.goBack()
		} catch (err) {
			setHasError(true)
		}
	}

	const savePostData = async (postData: PostEntity) => {
		setHasError(false)
		setIsLoading(true)

		try {
			const { newPost } = await savePost(
				usePostRepository,
				useCloudFunctionService,
				userDataContext.subscription?.subscriptionRange,
				postData,
				postData,
				postData.unapprovedData?.picturesUrl || []
			)

			localPostsStorage.deleteOfflinePostByDescription(postData.unapprovedData?.description || '')

			addUserPost(newPost)
			sendEvent('user_posted', { postType: newPost.postType })

			setIsLoading(false)
		} catch (err) {
			console.log(err)
			setIsLoading(false)
			setHasError(true)
		}
	}

	const allOfflinePostsOnRange = () => {
		const posts = offlinePosts.map((post: PostEntityOptional) => {
			if (post.range === 'city' && userDataContext.subscription?.subscriptionRange === 'near') return false
			if (post.range === 'country' && userDataContext.subscription?.subscriptionRange === 'near') return false
			if (post.range === 'country' && userDataContext.subscription?.subscriptionRange === 'city') return false
			return true
		})

		return posts.every((item) => item === true)
	}

	const getMajorOfflinePostRange = () => {
		const postsRange = offlinePosts.map((post: PostEntityOptional) => post.range)

		if (postsRange.includes('country')) return 'country'
		if (postsRange.includes('city')) return 'city'
		return 'near'
	}

	const renderPostItem = (item: PostEntity) => {
		if (!item) return <></>
		return (
			<PostCard
				post={{ ...item, createdAt: new Date() }}
				owner={item.owner as PostEntityCommonFields['owner']}
				isOwner={userDataContext.userId === item.owner?.userId}
				onPress={() => naigateToReviewPost({ ...item, ...item.unapprovedData } as PostEntity)}
			/>
		)
	}

	const getActionButtonLabel = () => {
		if (hasError) return 'tentar novamente'
		return allOfflinePostsOnRange() ? 'publicar todos os posts' : 'ir para pagamento'
	}

	const getActionButtonLabelHighlighted = () => {
		if (hasError) return ['novamente']
		return allOfflinePostsOnRange() ? ['publicar'] : ['pagamento']
	}

	const naigateToReviewPost = (post: PostEntityOptional) => {
		switch (post.postType as any) { // REFACTOR Remover any e Verificar funcionamento
			case 'service': return navigation.navigate('EditServicePost' as any, { postData: { ...post } as any, unsavedPost: true, offlinePost: true }) // TODO Type
			case 'sale': return navigation.navigate('EditSalePost' as any, { postData: { ...post } as any, unsavedPost: true, offlinePost: true })
			case 'vacancy': return navigation.navigate('EditVacancyPost' as any, { postData: { ...post } as any, unsavedPost: true, offlinePost: true })
			case 'culture': return navigation.navigate('EditCulturePost' as any, { postData: { ...post } as any, unsavedPost: true, offlinePost: true })
			case 'socialImpact': return navigation.navigate('EditSocialImpactPost' as any, { postData: { ...post } as any, unsavedPost: true, offlinePost: true })
			default: return null
		}
	}

	return (
		<Container>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<Header>
				<DefaultPostViewHeader
					onBackPress={() => navigation.goBack()}
					text={hasError ? 'opa! algo deu errado' : 'posts não enviados'}
					highlightedWords={hasError ? ['opa!'] : ['não', 'enviados']}
				/>
				{
					isLoading
						? <Loader />
						: (
							<SaveButtonContainer>
								<PrimaryButton
									color={theme.green3}
									label={getActionButtonLabel()}
									highlightedWords={getActionButtonLabelHighlighted()}
									labelColor={theme.white3}
									fontSize={16}
									SecondSvgIcon={allOfflinePostsOnRange() ? AngleRightWhiteIcon : HandOnMoneyWhiteIcon}
									svgIconScale={['40%', '20%']}
									minHeight={relativeScreenHeight(6)}
									relativeHeight={relativeScreenHeight(8)}
									onPress={allOfflinePostsOnRange() ? saveOfflinePost : navigateToSubscriptionContext} // TODO Type
								/>
							</SaveButtonContainer>
						)
				}

			</Header>
			<Body backgroundColor={hasError ? theme.red2 : theme.orange2}>
				{
					<FlatListPosts
						data={offlinePosts}
						renderItem={renderPostItem as any}
						headerComponent={() => <VerticalSpacing />}
					/>
				}
			</Body>
		</Container >
	)
}

export { OfflinePostsManagement }
