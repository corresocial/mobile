import React, { useContext, useEffect, useRef, useState } from 'react'
import { Animated, Keyboard, StatusBar } from 'react-native'

import { Container, InputsContainer, TwoPoints } from './styles'
import { theme } from '../../../common/theme'
import { screenHeight, statusBarHeight } from '../../../common/screenDimensions'

import { filterLeavingOnlyNumbers } from '../../../common/auxiliaryFunctions'
import { removeAllKeyboardEventListeners } from '../../../common/listenerFunctions'
import { uploadImage } from '../../../services/Firebase/common/uploadPicture'
import { getDownloadURL } from 'firebase/storage'
import { createPost } from '../../../services/Firebase/post/createPost'
import { updateDocField } from '../../../services/Firebase/common/updateDocField'
import { updatePostPrivateData } from '../../../services/Firebase/post/updatePostPrivateData'

import { LocalUserData, SaleData } from '../../../contexts/types'
import { InsertClosingHourScreenProps } from '../../../routes/Stack/SaleStack/stackScreenProps'
import { PostCollection, PrivateAddress, SaleCollection } from '../../../services/Firebase/types'

import { AuthContext } from '../../../contexts/AuthContext'
import { SaleContext } from '../../../contexts/SaleContext'
import { LoaderContext } from '../../../contexts/LoaderContext'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { FormContainer } from '../../../components/_containers/FormContainer'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { BackButton } from '../../../components/_buttons/BackButton'
import { InstructionCard } from '../../../components/_cards/InstructionCard'
import { LineInput } from '../../../components/LineInput'
import { ProgressBar } from '../../../components/ProgressBar'

function InsertClosingHour({ navigation }: InsertClosingHourScreenProps) {

    const { getDataFromSecureStore, setDataOnSecureStore } = useContext(AuthContext)
    const { setSaleDataOnContext, saleDataContext } = useContext(SaleContext)
    const { setLoaderIsVisible } = useContext(LoaderContext)

    const [hours, setHours] = useState<string>('')
    const [minutes, setMinutes] = useState<string>('')
    const [hoursIsValid, setHoursIsValid] = useState<boolean>(false)
    const [minutesIsValid, setMinutesIsValid] = useState<boolean>(false)
    const [keyboardOpened, setKeyboardOpened] = useState<boolean>(false)

    const [invalidTimeAfterSubmit, setInvalidTimeAfterSubmit] = useState<boolean>(false)
    const [hasServerSideError, setHasServerSideError] = useState<boolean>(false)

    const inputRefs = {
        hoursInput: useRef<React.MutableRefObject<any>>(null),
        minutesInput: useRef<React.MutableRefObject<any>>(null)
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            removeAllKeyboardEventListeners()
            Keyboard.addListener('keyboardDidShow', () => setKeyboardOpened(true))
            Keyboard.addListener('keyboardDidHide', () => setKeyboardOpened(false))
        })
        return unsubscribe
    }, [navigation])

    useEffect(() => {
        const hoursValidation = validateHours(hours)
        const minutesValidation = validateMinutes(minutes)
        setHoursIsValid(hoursValidation)
        setMinutesIsValid(minutesValidation)
    }, [hours, minutes, keyboardOpened])

    const validateHours = (text: string) => {
        const isValid = text.length == 2 && parseInt(text) < 24
        if (isValid) {
            return true
        } else {
            return false
        }
    }

    const validateMinutes = (text: string) => {
        const isValid = text.length == 2 && parseInt(text) <= 59
        if (isValid) {
            return true
        }
        return false
    }

    const closingTimeIsAfterOpening = () => {
        const openingHour = new Date(saleDataContext.openingHour as Date)
        const closingHour = new Date(Date.UTC(0, 0, 0, parseInt(hours), parseInt(minutes), 0, 0))
        return openingHour.getTime() < closingHour.getTime()
    }

    const getCompleteSaleDataFromContext = () => {
        return {
            ...saleDataContext,
            closingHour: new Date(Date.UTC(2022, 1, 1, parseInt(hours), parseInt(minutes), 0, 0))
        }
    }

    const extractSaleAddress = (saleData: SaleData) => {
        return { ...saleData.address } as PrivateAddress
    }

    const extractSaleDataPost = (saleData: SaleData) => {
        const currentSaleData = { ...saleData }
        delete currentSaleData.address

        return { ...currentSaleData as SaleCollection }
    }

    const extractSalePictures = (saleData: SaleData) => {
        return saleData.picturesUrl as string[] || []
    }

    const getLocalUser = async () => {
        return JSON.parse(await getDataFromSecureStore('corre.user') || '{}')
    }

    const saveSalePost = async () => {
        if (!closingTimeIsAfterOpening()) {
            setInvalidTimeAfterSubmit(true)
            return
        }
        setLoaderIsVisible(true)

        const completeSaleData = getCompleteSaleDataFromContext()
        setSaleDataOnContext({ ...completeSaleData })

        const saleAddress = extractSaleAddress(completeSaleData)
        const saleDataPost = extractSaleDataPost(completeSaleData)
        const salePictures = extractSalePictures(completeSaleData)

        try {
            const localUser = await getLocalUser()
            if (!localUser.userId) throw 'Não foi possível identificar o usuário'

            const postId = await createPost(saleDataPost, localUser, 'sales', 'sale')
            if (!postId) throw 'Não foi possível identificar o post'

            if (!salePictures.length) {
                await updateUserPost(
                    localUser,
                    postId,
                    saleDataPost,
                    salePictures
                )

                await updatePostPrivateData(
                    saleAddress,
                    postId,
                    'sales',
                    'address'
                )

                return
            }

            const picturePostsUrls: string[] = []
            salePictures.forEach(async (salePicture, index) => {
                uploadImage(salePicture, 'sales', postId, index).then(
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
                                            if (picturePostsUrls.length === salePictures.length) {
                                                await updateUserPost(
                                                    localUser,
                                                    postId,
                                                    saleDataPost,
                                                    picturePostsUrls
                                                )

                                                await updateDocField(
                                                    'sales',
                                                    postId,
                                                    'picturesUrl',
                                                    { ...picturePostsUrls },
                                                )

                                                await updatePostPrivateData(
                                                    saleAddress,
                                                    postId,
                                                    'sales',
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
            setInvalidTimeAfterSubmit(true)
            setHasServerSideError(true)
            setLoaderIsVisible(false)
        }
    }

    const updateUserPost = async (
        localUser: LocalUserData,
        postId: string,
        saleDataPost: SaleData,
        picturePostsUrls: string[],
    ) => {
        const postData = {
            ...saleDataPost,
            postId: postId,
            postType: 'sale',
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
                            ...saleDataPost,
                            postId: postId,
                            picturesUrl: picturePostsUrls,
                        },
                    ],
                })
                console.log('Naviguei')
                setLoaderIsVisible(false)
                navigation.navigate('HomeTab' as any, { tourCompleted: true, showShareModal: true })
            })
            .catch((err: any) => {
                console.log(err)
                setLoaderIsVisible(false)
                setHasServerSideError(true)
            })
    }

    const getHeaderMessage = () => {
        if (hasServerSideError) {
            return 'Opa! parece que algo deu algo errado do nosso lado, tente novamente em alguns instantantes'
        }
        return invalidTimeAfterSubmit
            ? 'O horário de início informado é superior ao horário de encerramento'
            : 'que horas você \npara de vender?'
    }

    const getHighlightedHeaderMessage = () => {
        if (hasServerSideError) {
            return ['do', 'nosso', 'lado,']
        }
        return invalidTimeAfterSubmit
            ? ['horário', 'de', 'início', 'encerramento']
            : ['que', 'horas', 'vender?']
    }

    const headerBackgroundAnimatedValue = useRef(new Animated.Value(0))
    const animateDefaultHeaderBackgound = () => {
        const existsError = invalidTimeAfterSubmit

        Animated.timing(headerBackgroundAnimatedValue.current, {
            toValue: existsError ? 1 : 0,
            duration: 300,
            useNativeDriver: false,
        }).start()

        return headerBackgroundAnimatedValue.current.interpolate({
            inputRange: [0, 1],
            outputRange: [theme.green2, theme.red2],
        })
    }

    return (
        <Container >
            <StatusBar backgroundColor={invalidTimeAfterSubmit ? theme.red2 : theme.green2} barStyle={'dark-content'} />
            <DefaultHeaderContainer
                minHeight={(screenHeight + statusBarHeight) * 0.27}
                relativeHeight={'22%'}
                centralized
                backgroundColor={animateDefaultHeaderBackgound()}
            >
                <BackButton onPress={() => navigation.goBack()} />
                <InstructionCard
                    borderLeftWidth={3}
                    fontSize={18}
                    message={getHeaderMessage()}
                    highlightedWords={getHighlightedHeaderMessage()}
                >
                    <ProgressBar
                        range={5}
                        value={5}
                    />
                </InstructionCard>
            </DefaultHeaderContainer>
            <FormContainer backgroundColor={theme.white2}
                justifyContent={'center'}
            >
                <InputsContainer>
                    <LineInput
                        value={hours}
                        relativeWidth={'40%'}
                        textInputRef={inputRefs.hoursInput}
                        nextInputRef={inputRefs.minutesInput}
                        defaultBackgroundColor={theme.white2}
                        defaultBorderBottomColor={theme.black4}
                        validBackgroundColor={theme.green1}
                        validBorderBottomColor={theme.green5}
                        invalidBackgroundColor={theme.red1}
                        invalidBorderBottomColor={theme.red5}
                        maxLength={2}
                        fontSize={22}
                        invalidTextAfterSubmit={invalidTimeAfterSubmit}
                        placeholder={'horas'}
                        keyboardType={'decimal-pad'}
                        filterText={filterLeavingOnlyNumbers}
                        validateText={(text: string) => validateHours(text)}
                        onChangeText={(text: string) => {
                            setHours(text)
                            invalidTimeAfterSubmit && setInvalidTimeAfterSubmit(false)
                            hasServerSideError && setHasServerSideError(false)
                        }}
                    />
                    <TwoPoints>:</TwoPoints>
                    <LineInput
                        value={minutes}
                        relativeWidth={'40%'}
                        textInputRef={inputRefs.minutesInput}
                        previousInputRef={inputRefs.hoursInput}
                        defaultBackgroundColor={theme.white2}
                        defaultBorderBottomColor={theme.black4}
                        validBackgroundColor={theme.green1}
                        validBorderBottomColor={theme.green5}
                        invalidBackgroundColor={theme.red1}
                        invalidBorderBottomColor={theme.red5}
                        maxLength={2}
                        fontSize={22}
                        invalidTextAfterSubmit={invalidTimeAfterSubmit}
                        placeholder={'minutos'}
                        keyboardType={'decimal-pad'}
                        lastInput={true}
                        filterText={filterLeavingOnlyNumbers}
                        validateText={(text: string) => validateMinutes(text)}
                        onChangeText={(text: string) => {
                            setMinutes(text)
                            invalidTimeAfterSubmit && setInvalidTimeAfterSubmit(false)
                            hasServerSideError && setHasServerSideError(false)
                        }}
                    />
                </InputsContainer>
                <>
                    {
                        hoursIsValid && minutesIsValid && !keyboardOpened &&
                        <PrimaryButton
                            color={invalidTimeAfterSubmit ? theme.red3 : theme.green3}
                            iconName={'arrow-right'}
                            iconColor={theme.white3}
                            label='continuar'
                            labelColor={theme.white3}
                            highlightedWords={['continuar']}
                            onPress={saveSalePost}
                        />
                    }</>
            </FormContainer>
        </Container>
    )
}

export { InsertClosingHour }