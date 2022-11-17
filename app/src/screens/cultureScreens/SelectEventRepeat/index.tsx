import React, { useContext, useState } from 'react'
import { StatusBar } from 'react-native'

import { Container, ButtonsContainer } from './styles'
import { theme } from '../../../common/theme'

import { SelectEventRepeatScreenProps } from '../../../routes/Stack/cultureStack/stackScreenProps'
import { EventRepeatType, PrivateAddress, CultureCollection, PostCollection } from './../../../services/Firebase/types'
import { CultureContext } from '../../../contexts/CultureContext'
import updateDocField from '../../../services/Firebase/common/updateDocField'
import createPost from '../../../services/Firebase/post/createPost'
import updatePostPrivateData from '../../../services/Firebase/post/updatePostPrivateData'
import uploadImage from '../../../services/Firebase/common/uploadPicture'
import { getDownloadURL } from 'firebase/storage'
import { CultureData, LocalUserData } from '../../../contexts/types'
import { AuthContext } from '../../../contexts/AuthContext'
import { LoaderContext } from '../../../contexts/LoaderContext'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { FormContainer } from '../../../components/_containers/FormContainer'
import { BackButton } from '../../../components/_buttons/BackButton'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { InstructionCard } from '../../../components/_cards/InstructionCard'
import { ProgressBar } from '../../../components/ProgressBar'

function SelectEventRepeat({ navigation }: SelectEventRepeatScreenProps) {

    const { cultureDataContext, setCultureDataOnContext } = useContext(CultureContext)
    const { getDataFromSecureStore, setDataOnSecureStore } = useContext(AuthContext)
    const { setLoaderIsVisible } = useContext(LoaderContext)

    const [hasServerSideError, setHasServerSideError] = useState(false)

    const getCompleteCultureDataFromContext = (eventRepeat: EventRepeatType) => {
        return {
            ...cultureDataContext,
            eventRepeat
        }
    }

    const extractCultureAddress = (cultureData: CultureData) => {
        return { ...cultureData.address } as PrivateAddress
    }

    const extractCultureDataPost = (cultureData: CultureData) => {
        const currentCultureData = { ...cultureData }
        delete currentCultureData.address

        return { ...currentCultureData as CultureCollection }
    }

    const extractCulturePictures = (cultureData: CultureData) => {
        return cultureData.picturesUrl as string[] || []
    }

    const getLocalUser = async () => {
        return JSON.parse(await getDataFromSecureStore('corre.user') || '{}')
    }

    const saveCulturePost = async (eventRepeat: EventRepeatType) => {
        setLoaderIsVisible(true)

        const completeCultureData = getCompleteCultureDataFromContext(eventRepeat)
        setCultureDataOnContext({ ...completeCultureData })

        const cultureAddress = extractCultureAddress(completeCultureData)
        const cultureDataPost = extractCultureDataPost(completeCultureData)
        const culturePictures = extractCulturePictures(completeCultureData)

        try {
            /* const localUser = await getLocalUser()
            if (!localUser.userId) throw 'Não foi possível identificar o usuário'

            const postId = await createPost(cultureDataPost, localUser, 'cultures', 'culture')
            if (!postId) throw 'Não foi possível identificar o post'

            if (!culturePictures.length) {
                await updateUserPost(
                    localUser,
                    postId,
                    cultureDataPost,
                    culturePictures
                )

                await updatePostPrivateData(
                    cultureAddress,
                    postId,
                    'cultures',
                    'address'
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

                                                await updateDocField( // Update pictureUrl
                                                    'cultures',
                                                    postId,
                                                    'picturesUrl',
                                                    { ...picturePostsUrls },
                                                )

                                                await updatePostPrivateData(
                                                    cultureAddress,
                                                    postId,
                                                    'cultures',
                                                    'address'
                                                )
                                            }
                                        },
                                    )
                            },
                        )
                    },
                )
            }) */

            throw 'sfdoi'
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
            postId: postId,
            postType: 'culture',
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
                console.log(localUser.posts)
                setDataOnSecureStore('corre.user', {
                    ...localUser,
                    tourPerformed: true,
                    posts: [
                        ...localUser.posts as PostCollection[],
                        {
                            ...cultureDataPost,
                            postId: postId,
                            picturesUrl: picturePostsUrls,
                        },
                    ],
                })
                console.log('Naviguei')
                setLoaderIsVisible(false)
                // navigation.navigate('HomeTab' as any, { tourCompleted: true, showShareModal: true })
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
                            ? ['repete?']
                            : ['ops,','parece', 'que', 'algo', 'deu', 'errado', 'do', 'nosso', 'lado!']

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
                        relativeHeight={'18%'}
                        labelColor={theme.black4}
                        fontSize={18}
                        textAlign={'left'}
                        label={'1 vez por semana'}
                        highlightedWords={['1', 'vez', 'por', 'semana']}
                        onPress={() => saveCulturePost('weekly')}
                    />
                    <PrimaryButton
                        justifyContent={'flex-start'}
                        color={theme.white3}
                        relativeHeight={'18%'}
                        labelColor={theme.black4}
                        fontSize={18}
                        textAlign={'left'}
                        label={'a cada 15 dias'}
                        highlightedWords={['a', 'cada', '15', 'dias']}
                        onPress={() => saveCulturePost('biweekly')}
                    />
                    <PrimaryButton
                        justifyContent={'flex-start'}
                        color={theme.white3}
                        relativeHeight={'18%'}
                        labelColor={theme.black4}
                        fontSize={18}
                        textAlign={'left'}
                        label={'1 vez no mês'}
                        highlightedWords={['1', 'vez', 'no', 'mês']}
                        onPress={() => saveCulturePost('monthly')}
                    />
                    <PrimaryButton
                        justifyContent={'flex-start'}
                        color={theme.white3}
                        relativeHeight={'18%'}
                        labelColor={theme.black4}
                        fontSize={18}
                        textAlign={'left'}
                        label={'não se repete'}
                        highlightedWords={['não', 'se', 'repete']}
                        onPress={() => saveCulturePost('unrepeatable')}
                    />
                </ButtonsContainer>
            </FormContainer>
        </Container>
    )
}

export { SelectEventRepeat }