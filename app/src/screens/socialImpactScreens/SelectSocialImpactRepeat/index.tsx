import React, { useContext, useState } from 'react'
import { StatusBar } from 'react-native'

import { Container, ButtonsContainer } from './styles'
import { theme } from '../../../common/theme'

import { SelectSocialImpactRepeatScreenProps } from '../../../routes/Stack/socialImpactStack/stackScreenProps'
import { EventRepeatType, PrivateAddress, SocialImpactCollection, PostCollection } from './../../../services/Firebase/types'
import { SocialImpactContext } from '../../../contexts/SocialImpactContext'
import updateDocField from '../../../services/Firebase/common/updateDocField'
import createPost from '../../../services/Firebase/post/createPost'
import updatePostPrivateData from '../../../services/Firebase/post/updatePostPrivateData'
import uploadImage from '../../../services/Firebase/common/uploadPicture'
import { getDownloadURL } from 'firebase/storage'
import { SocialImpactData, LocalUserData } from '../../../contexts/types'
import { AuthContext } from '../../../contexts/AuthContext'
import { LoaderContext } from '../../../contexts/LoaderContext'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { FormContainer } from '../../../components/_containers/FormContainer'
import { BackButton } from '../../../components/_buttons/BackButton'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { InstructionCard } from '../../../components/_cards/InstructionCard'
import { ProgressBar } from '../../../components/ProgressBar'

function SelectSocialImpactRepeat({ navigation }: SelectSocialImpactRepeatScreenProps) {

    const { socialImpactDataContext, setSocialImpactDataOnContext } = useContext(SocialImpactContext)
    const { getDataFromSecureStore, setDataOnSecureStore } = useContext(AuthContext)
    const { setLoaderIsVisible } = useContext(LoaderContext)

    const [hasServerSideError, setHasServerSideError] = useState(false)

    const getCompleteSocialImpactDataFromContext = (socialImpactRepeat: EventRepeatType) => {
        return {
            ...socialImpactDataContext,
            socialImpactRepeat
        }
    }

    const extractSocialImpactAddress = (socialImpactData: SocialImpactData) => {
        return { ...socialImpactData.address } as PrivateAddress
    }

    const extractSocialImpactDataPost = (socialImpactData: SocialImpactData) => {
        const currentSocialImpactData = { ...socialImpactData }
        delete currentSocialImpactData.address

        return { ...currentSocialImpactData } as SocialImpactCollection
    }

    const extractSocialImpactPictures = (socialImpactData: SocialImpactData) => {
        return socialImpactData.picturesUrl as string[] || []
    }

    const getLocalUser = async () => {
        console.log(JSON.parse(await getDataFromSecureStore('corre.user') || '{}'))
        return JSON.parse(await getDataFromSecureStore('corre.user') || '{}')
    }

    const saveSocialImpactPost = async (socialImpactRepeat: EventRepeatType) => {
        setLoaderIsVisible(true)
        setHasServerSideError(false)

        const completeSocialImpactData = getCompleteSocialImpactDataFromContext(socialImpactRepeat)
        setSocialImpactDataOnContext({ ...completeSocialImpactData })

        const socialImpactAddress = extractSocialImpactAddress(completeSocialImpactData)
        const socialImpactDataPost = extractSocialImpactDataPost(completeSocialImpactData)
        const socialImpactPictures = extractSocialImpactPictures(completeSocialImpactData)

        try {
            const localUser = await getLocalUser()
            if (!localUser.userId) throw 'Não foi possível identificar o usuário'

            const postId = await createPost(socialImpactDataPost, localUser, 'socialImpacts', 'socialImpact')
            if (!postId) throw 'Não foi possível identificar o post'

            if (!socialImpactPictures.length) {
                await updateUserPost(
                    localUser,
                    postId,
                    socialImpactDataPost,
                    socialImpactPictures
                )

                await updatePostPrivateData(
                    socialImpactAddress,
                    postId,
                    'socialImpacts',
                    'address'
                )

                return
            }

            const picturePostsUrls: string[] = []
            socialImpactPictures.forEach(async (socialImpactPicture, index) => {
                uploadImage(socialImpactPicture, 'socialImpacts', postId, index).then(
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
                                            if (picturePostsUrls.length === socialImpactPictures.length) {
                                                await updateUserPost(
                                                    localUser,
                                                    postId,
                                                    socialImpactDataPost,
                                                    picturePostsUrls
                                                )

                                                await updateDocField( // Update pictureUrl
                                                    'socialImpacts',
                                                    postId,
                                                    'picturesUrl',
                                                    { ...picturePostsUrls },
                                                )

                                                await updatePostPrivateData(
                                                    socialImpactAddress,
                                                    postId,
                                                    'socialImpacts',
                                                    'address'
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
            setLoaderIsVisible(false)
            setHasServerSideError(true)
        }
    }

    const updateUserPost = async (
        localUser: LocalUserData,
        postId: string,
        socialImpactDataPost: SocialImpactData,
        picturePostsUrls: string[],
    ) => {
        const postData = {
            ...socialImpactDataPost,
            postId: postId,
            postType: 'socialImpact',
            picturesUrl: picturePostsUrls,
        }

        await updateDocField(
            'users',
            localUser.userId as string,
            'posts',
            postData,
            true,
        )
            .then(() => {
                setDataOnSecureStore('corre.user', {
                    ...localUser,
                    tourPerformed: true,
                    posts: [
                        localUser.posts ? [...localUser.posts] as PostCollection[] : [],
                        {
                            ...socialImpactDataPost,
                            postId: postId,
                            picturesUrl: picturePostsUrls,
                        },
                    ],
                })
                console.log('Naviguei')
                setLoaderIsVisible(false)
                navigation.navigate('HomeTab' as any, { tourCompleted: true, showShareModal: true })
            })
            .catch(err => {
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
                            ? 'esse iniciativa se repete?'
                            : 'ops, parece que algo deu errado do nosso lado! \n\npor favor tente novamente em alguns instantes'
                    }
                    highlightedWords={
                        !hasServerSideError
                            ? ['repete?']
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
                backgroundColor={hasServerSideError ? theme.red2 : theme.pink2}
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
                        onPress={() => saveSocialImpactPost('weekly')}
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
                        onPress={() => saveSocialImpactPost('everyDay')}
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
                        onPress={() => saveSocialImpactPost('biweekly')}
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
                        onPress={() => saveSocialImpactPost('monthly')}
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
                        onPress={() => saveSocialImpactPost('unrepeatable')}
                    />
                </ButtonsContainer>
            </FormContainer>
        </Container>
    )
}

export { SelectSocialImpactRepeat }