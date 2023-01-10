import React, { useContext, useState } from 'react'
import { StatusBar } from 'react-native'

import { getDownloadURL } from 'firebase/storage'
import { Container, ButtonsContainer } from './styles'
import { theme } from '../../../common/theme'

import { updateDocField } from '../../../services/firebase/common/updateDocField'
import { createPost } from '../../../services/firebase/post/createPost'
import { updatePostPrivateData } from '../../../services/firebase/post/updatePostPrivateData'
import { uploadImage } from '../../../services/firebase/common/uploadPicture'

import { SelectEventRepeatScreenProps } from '../../../routes/Stack/cultureStack/stackScreenProps'
import { EventRepeatType, PrivateAddress, CultureCollection, PostCollection } from '../../../services/firebase/types'
import { CultureData, LocalUserData } from '../../../contexts/types'

import { AuthContext } from '../../../contexts/AuthContext'
import { StateContext } from '../../../contexts/StateContext'
import { CultureContext } from '../../../contexts/CultureContext'
import { LoaderContext } from '../../../contexts/LoaderContext'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { FormContainer } from '../../../components/_containers/FormContainer'
import { BackButton } from '../../../components/_buttons/BackButton'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { InstructionCard } from '../../../components/_cards/InstructionCard'
import { ProgressBar } from '../../../components/ProgressBar'

function SelectEventRepeat({ navigation }: SelectEventRepeatScreenProps) {
	const { setUserDataOnContext, userDataContext, setDataOnSecureStore } = useContext(AuthContext)
	const { setStateDataOnContext } = useContext(StateContext)
	const { cultureDataContext, setCultureDataOnContext } = useContext(CultureContext)
	const { setLoaderIsVisible } = useContext(LoaderContext)

	const [hasServerSideError, setHasServerSideError] = useState(false)

	const getCompleteCultureDataFromContext = (eventRepeat: EventRepeatType) => ({
		...cultureDataContext,
		eventRepeat
	})

	const extractCultureAddress = (cultureData: CultureData) => ({
		...cultureData.address
	} as PrivateAddress)

	const extractCultureDataPost = (cultureData: CultureData) => {
		const currentCultureData = {
			...cultureData
		}
		delete currentCultureData.address

		return {
			...currentCultureData as CultureCollection
		}
	}

	const extractCulturePictures = (cultureData: CultureData) => cultureData.picturesUrl as string[] || []

	const getLocalUser = () => userDataContext

	const showShareModal = (visibility: boolean, postTitle?: string) => {
		setStateDataOnContext({
			showShareModal: visibility,
			lastPostTitle: postTitle
		})
	}

	const saveEventRepeat = async (eventRepeat: EventRepeatType) => {
		setLoaderIsVisible(true)
		setHasServerSideError(false)

		const completeCultureData = getCompleteCultureDataFromContext(eventRepeat)
		setCultureDataOnContext({
			...completeCultureData
		})

		const cultureAddress = extractCultureAddress(completeCultureData)
		const cultureDataPost = extractCultureDataPost(completeCultureData)
		const culturePictures = extractCulturePictures(completeCultureData)

		try {
			const localUser = { ...getLocalUser() }
			if (!localUser.userId) throw new Error('Não foi possível identificar o usuário')

			const postId = await createPost(cultureDataPost, localUser, 'cultures', 'culture')
			if (!postId) throw new Error('Não foi possível identificar o post')

			if (!culturePictures.length) {
				await updateUserPost(
					localUser,
					postId,
					cultureDataPost,
					culturePictures
				)

				await updatePostPrivateData(
					{
						...cultureAddress,
						postType: 'culture',
						locationView: cultureDataPost.locationView
					},
					postId,
					'cultures',
					`address${postId}`
				)

				return
			}

			const picturePostsUrls: string[] = []
			culturePictures.forEach(async (culturePicture, index) => {
				uploadImage(culturePicture, 'cultures', postId, index).then(
					({ uploadTask, blob }: any) => {
						uploadTask.on(
							'state_change',
							() => { },
							(err: any) => {
								throw err
							},
							() => {
								getDownloadURL(uploadTask.snapshot.ref)
									.then(
										async (downloadURL) => {
											blob.close()
											picturePostsUrls.push(downloadURL)
											if (picturePostsUrls.length === culturePictures.length) {
												await updateUserPost(
													localUser,
													postId,
													cultureDataPost,
													picturePostsUrls
												)

												await updateDocField(
													'cultures',
													postId,
													'picturesUrl',
													picturePostsUrls,
												)

												await updatePostPrivateData(
													{
														...cultureAddress,
														postType: 'culture',
														locationView: cultureDataPost.locationView
													},
													postId,
													'cultures',
													`address${postId}`
												)
											}
										},
									)
							},
						)
					},
				)
			})
		} catch (err) {
			console.log(err)
			setHasServerSideError(true)
			setLoaderIsVisible(false)
		}
	}

	const updateUserPost = async (
		localUser: LocalUserData,
		postId: string,
		cultureDataPost: CultureData,
		picturePostsUrls: string[],
	) => {
		const postData = {
			...cultureDataPost,
			postId,
			postType: 'culture',
			picturesUrl: picturePostsUrls,
			createdAt: new Date()
		}

		await updateDocField(
			'users',
			localUser.userId as string,
			'posts',
			postData,
			true,
		)
			.then(() => {
				const localUserPosts = localUser.posts ? [...localUser.posts] as PostCollection[] : []
				setUserDataOnContext({
					...localUser,
					tourPerformed: true,
					posts: [
						...localUserPosts,
						{
							...postData,
							owner: {
								userId: localUser.userId,
								name: localUser.name,
								profilePictureUrl: localUser.profilePictureUrl
							}
						} as CultureCollection
					],
				})
				setDataOnSecureStore('corre.user', {
					...localUser,
					tourPerformed: true,
					posts: [
						...localUserPosts,
						{
							...postData,
							owner: {
								userId: localUser.userId,
								name: localUser.name,
								profilePictureUrl: localUser.profilePictureUrl
							}
						},
					],
				})
				setLoaderIsVisible(false)
				showShareModal(true, postData.title)
				navigation.navigate('HomeTab' as any)
			})
			.catch((err: any) => {
				console.log(err)
				setLoaderIsVisible(false)
				setHasServerSideError(true)
			})
	}

	return (
		<Container>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				relativeHeight={!hasServerSideError ? '27%' : '32%'}
				centralized
				backgroundColor={theme.white3}
			>
				<BackButton onPress={() => navigation.goBack()} />
				<InstructionCard
					borderLeftWidth={3}
					fontSize={18}
					message={
						!hasServerSideError
							? 'esse role se repete?'
							: 'ops, parece que algo deu errado do nosso lado! \n\npor favor tente novamente em alguns instantes'
					}
					highlightedWords={
						!hasServerSideError
							? ['repete']
							: ['ops,', 'parece', 'que', 'algo', 'deu', 'errado', 'do', 'nosso', 'lado!']
					}
				>
					<ProgressBar
						range={5}
						value={5}
					/>
				</InstructionCard>
			</DefaultHeaderContainer>
			<FormContainer
				backgroundColor={hasServerSideError ? theme.red2 : theme.blue2}
			>
				<ButtonsContainer>
					<PrimaryButton
						justifyContent={'flex-start'}
						color={theme.white3}
						relativeHeight={'16%'}
						labelColor={theme.black4}
						fontSize={18}
						textAlign={'left'}
						label={'1 vez por semana'}
						highlightedWords={['1', 'vez', 'por', 'semana']}
						onPress={() => saveEventRepeat('weekly')}
					/>
					<PrimaryButton
						justifyContent={'flex-start'}
						color={theme.white3}
						relativeHeight={'16%'}
						labelColor={theme.black4}
						fontSize={18}
						textAlign={'left'}
						label={'todos os dias'}
						highlightedWords={['todos', 'os', 'dias']}
						onPress={() => saveEventRepeat('everyDay')}
					/>
					<PrimaryButton
						justifyContent={'flex-start'}
						color={theme.white3}
						relativeHeight={'16%'}
						labelColor={theme.black4}
						fontSize={18}
						textAlign={'left'}
						label={'a cada 15 dias'}
						highlightedWords={['a', 'cada', '15', 'dias']}
						onPress={() => saveEventRepeat('biweekly')}
					/>
					<PrimaryButton
						justifyContent={'flex-start'}
						color={theme.white3}
						relativeHeight={'16%'}
						labelColor={theme.black4}
						fontSize={18}
						textAlign={'left'}
						label={'1 vez no mês'}
						highlightedWords={['1', 'vez', 'no', 'mês']}
						onPress={() => saveEventRepeat('monthly')}
					/>
					<PrimaryButton
						justifyContent={'flex-start'}
						color={theme.white3}
						relativeHeight={'16%'}
						labelColor={theme.black4}
						fontSize={18}
						textAlign={'left'}
						label={'não se repete'}
						highlightedWords={['não', 'se', 'repete']}
						onPress={() => saveEventRepeat('unrepeatable')}
					/>
				</ButtonsContainer>
			</FormContainer>
		</Container>
	)
}

export { SelectEventRepeat }
