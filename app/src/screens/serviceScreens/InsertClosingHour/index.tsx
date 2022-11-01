import React, { useContext, useEffect, useRef, useState } from 'react'
import { Animated, Keyboard, StatusBar } from 'react-native'

import { Container, InputsContainer, TwoPoints } from './styles'
import { theme } from '../../../common/theme'
import { screenHeight, statusBarHeight } from '../../../common/screenDimensions'

import { filterLeavingOnlyNumbers } from '../../../common/auxiliaryFunctions'
import { removeAllKeyboardEventListeners } from '../../../common/listenerFunctions'
import { InsertClosingHourScreenProps } from '../../../routes/Stack/_stackScreenProps'
import { ServiceContext } from '../../../contexts/ServiceContext'
import { AuthContext } from '../../../contexts/AuthContext'
import uploadImage from '../../../services/Firebase/common/uploadPicture'
import { getDownloadURL } from 'firebase/storage'
import createPost from '../../../services/Firebase/post/createPost'
import updateDocField from '../../../services/Firebase/common/updateDocField'
import { UserCollection } from '../../../services/Firebase/types'
import { ServiceData } from '../../../contexts/types'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { FormContainer } from '../../../components/_containers/FormContainer'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { BackButton } from '../../../components/_buttons/BackButton'
import { InstructionCard } from '../../../components/InstructionCard'
import { LineInput } from '../../../components/LineInput'
import { ProgressBar } from '../../../components/ProgressBar'
import updateUser from '../../../services/Firebase/user/updateUser'
import updatePostPrivateData from '../../../services/Firebase/post/updatePostPrivateData'

function InsertClosingHour({ navigation }: InsertClosingHourScreenProps) {

    const { setServiceDataOnContext, serviceData } = useContext(ServiceContext)
    const { getDataFromSecureStore, setDataOnSecureStore } = useContext(AuthContext)

    const [hours, setHours] = useState<string>('')
    const [minutes, setMinutes] = useState<string>('')
    const [hoursIsValid, setHoursIsValid] = useState<boolean>(false)
    const [minutesIsValid, setMinutesIsValid] = useState<boolean>(false)
    const [keyboardOpened, setKeyboardOpened] = useState<boolean>(false)

    const [invalidHourAfterSubmit, setInvalidHourAfterSubmit] = useState<boolean>(false)
    const [invalidMinutesAfterSubmit, setInvalidMinutesAfterSubmit] = useState<boolean>(false)

    const inputRefs = {
        hoursInput: useRef<React.MutableRefObject<any>>(null),
        minutesInput: useRef<React.MutableRefObject<any>>(null)
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            removeAllKeyboardEventListeners()
            Keyboard.addListener('keyboardDidShow', () => setKeyboardOpened(true))
            Keyboard.addListener('keyboardDidHide', () => setKeyboardOpened(false))
        });
        return unsubscribe;
    }, [navigation])

    useEffect(() => {
        const hoursValidation = validateHours(hours)
        const minutesValidation = validateMinutes(minutes)
        setHoursIsValid(hoursValidation)
        setMinutesIsValid(minutesValidation)
    }, [hours, minutes, keyboardOpened])

    const validateHours = (text: string) => {
        const isValid = text.length == 2 && parseInt(text) < 24
        if (isValid && closingTimeIsAfterOpening(text)) {
            setInvalidHourAfterSubmit(false)
            return true
        } else {
            return false
        }
    }

    const validateMinutes = (text: string) => {
        const isValid = text.length == 2 && parseInt(text) <= 59
        if (isValid && closingTimeIsAfterOpening('', text)) {
            setInvalidMinutesAfterSubmit(false)
            return true
        }
        return false
    }

    const someInvalidFieldSubimitted = () => {
        return invalidHourAfterSubmit && invalidHourAfterSubmit
    }

    const closingTimeIsAfterOpening = (hoursValidation?: string, minutesValidation?: string) => {
        const openingHour = new Date(serviceData.openingHour as Date)
        const closingHour = new Date(Date.UTC(2022, 1, 1, parseInt(!!hoursValidation ? hoursValidation : hours), parseInt(!!minutesValidation ? minutesValidation : '59'), 0, 0))
        return openingHour < closingHour
    }

    const getCompleteServiceDataFromContext = () => {
        return {
            ...serviceData,
            closingHour: new Date(Date.UTC(2022, 1, 1, parseInt(hours), parseInt(minutes), 0, 0))
        }
    }

    const extractServiceAddress = (serviceData: ServiceData) => {
        return { ...serviceData.address }
    }

    const extractUserData = (serviceData: ServiceData) => {
        return { description: serviceData.profileDescription }
    }

    const extractServiceDataPost = (serviceData: ServiceData) => {
        const currentServiceData = { ...serviceData }
        delete currentServiceData.address
        delete currentServiceData.profileDescription

        return { ...currentServiceData }
    }

    const extractServicePictures = (serviceData: ServiceData) => {
        return serviceData.picturesUrl as string[] || []
    }

    const getLocalUser = async () => {
        return JSON.parse(await getDataFromSecureStore('corre.user') || '{}')
    }

    const updateUserData = async (userId: string, userData: UserCollection) => {
        await updateUser(userId, {
            ...userData,
            tourPerformed: true
        })
    }

    const saveServicePost = async () => {
        const completeServiceData = getCompleteServiceDataFromContext()
        setServiceDataOnContext({ ...completeServiceData })

        const serviceAddress = extractServiceAddress(completeServiceData)
        const userData = extractUserData(completeServiceData)
        const serviceDataPost = extractServiceDataPost(completeServiceData)
        const servicePictures = extractServicePictures(completeServiceData)

        try {
            const localUser = await getLocalUser()
            if (!localUser.userId) throw 'Não foi possível identificar o usuário'

            const postId = await createPost(serviceDataPost, localUser, 'services')
            if (!postId) throw 'Não foi possível identificar o post'

            if (!servicePictures.length) {
                await updateUserPost(
                    localUser,
                    postId,
                    serviceDataPost,
                    servicePictures
                )

                await updatePostPrivateData(
                    serviceAddress,
                    postId,
                    'services',
                    'address'
                )

                await updateUserData(localUser.userId, userData)
                return
            }

            const picturePostsUrls: string[] = []
            servicePictures.forEach(async (servicePicture, index) => {
                uploadImage(servicePicture, 'services', postId, index).then(
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
                                            if (picturePostsUrls.length === servicePictures.length) {
                                                await updateUserPost(
                                                    localUser,
                                                    postId,
                                                    serviceDataPost,
                                                    picturePostsUrls
                                                )

                                                await updateDocField( // Update pictureUrl
                                                    'services',
                                                    postId,
                                                    'picturesUrl',
                                                    { ...picturePostsUrls },
                                                )

                                                await updatePostPrivateData(
                                                    serviceAddress,
                                                    postId,
                                                    'services',
                                                    'address'
                                                )

                                                await updateUserData(localUser.userId, userData)
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
            setInvalidHourAfterSubmit(true)
            setInvalidMinutesAfterSubmit(true)
        }
    }

    const updateUserPost = async (
        localUser: UserCollection,
        postId: string,
        serviceDataPost: ServiceData,
        picturePostsUrls: string[],
    ) => {
        const postData = {
            ...serviceDataPost,
            postId: postId,
            postType: 'service',
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
                        ...localUser.posts as any, // TODO type
                        {  
                            ...serviceDataPost,
                            postId: postId,
                            postType: 'service',
                            picturesUrl: picturePostsUrls
                        },
                    ],
                })
                console.log('Naviguei')
                navigation.navigate('HomeTab' as any, { tourCompleted: true, showShareModal: true })
            })
    }

    const headerBackgroundAnimatedValue = useRef(new Animated.Value(0))
    const animateDefaultHeaderBackgound = () => {
        const existsError = someInvalidFieldSubimitted()

        Animated.timing(headerBackgroundAnimatedValue.current, {
            toValue: existsError ? 1 : 0,
            duration: 300,
            useNativeDriver: false,
        }).start()

        return headerBackgroundAnimatedValue.current.interpolate({
            inputRange: [0, 1],
            outputRange: [theme.purple2, theme.red2],
        })
    }

    return (
        <Container >
            <StatusBar backgroundColor={someInvalidFieldSubimitted() ? theme.red2 : theme.purple2} barStyle={'dark-content'} />
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
                    message={
                        someInvalidFieldSubimitted()
                            ? 'Opa! parece que algo deu algo errado do nosso lado, tente novamente em alguns instantantes'
                            : 'que horas sua loja fecha?'
                    }
                    highlightedWords={
                        someInvalidFieldSubimitted()
                            ? ['do', 'nosso', 'lado,']
                            : ['que', 'horas', 'fecha?']
                    }
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
                        validBackgroundColor={theme.purple1}
                        validBorderBottomColor={theme.purple5}
                        invalidBackgroundColor={theme.red1}
                        invalidBorderBottomColor={theme.red5}
                        maxLength={2}
                        fontSize={26}
                        invalidTextAfterSubmit={invalidHourAfterSubmit}
                        placeholder={'14'}
                        keyboardType={'decimal-pad'}
                        filterText={filterLeavingOnlyNumbers}
                        validateText={(text: string) => validateHours(text)}
                        onChangeText={(text: string) => setHours(text)}
                    />
                    <TwoPoints>:</TwoPoints>
                    <LineInput
                        value={minutes}
                        relativeWidth={'40%'}
                        textInputRef={inputRefs.minutesInput}
                        previousInputRef={inputRefs.hoursInput}
                        defaultBackgroundColor={theme.white2}
                        defaultBorderBottomColor={theme.black4}
                        validBackgroundColor={theme.purple1}
                        validBorderBottomColor={theme.purple5}
                        invalidBackgroundColor={theme.red1}
                        invalidBorderBottomColor={theme.red5}
                        maxLength={2}
                        fontSize={26}
                        invalidTextAfterSubmit={invalidMinutesAfterSubmit}
                        placeholder={'30'}
                        keyboardType={'decimal-pad'}
                        lastInput={true}
                        filterText={filterLeavingOnlyNumbers}
                        validateText={(text: string) => validateMinutes(text)}
                        onChangeText={(text: string) => setMinutes(text)}
                    />
                </InputsContainer>
                <>
                    {
                        hoursIsValid && minutesIsValid && !keyboardOpened &&
                        <PrimaryButton
                            color={someInvalidFieldSubimitted() ? theme.red3 : theme.purple3}
                            iconName={'arrow-right'}
                            iconColor={theme.white3}
                            label='continuar'
                            labelColor={theme.white3}
                            highlightedWords={['continuar']}
                            onPress={saveServicePost}
                        />
                    }</>
            </FormContainer>
        </Container>
    )
}

export { InsertClosingHour }