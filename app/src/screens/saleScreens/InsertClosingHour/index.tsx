import React, { useContext, useEffect, useRef, useState } from 'react'
import { Animated, Keyboard, StatusBar } from 'react-native'

import { Container, InputsContainer, TwoPoints } from './styles'
import { theme } from '../../../common/theme'
import { screenHeight, statusBarHeight } from '../../../common/screenDimensions'

import { filterLeavingOnlyNumbers } from '../../../common/auxiliaryFunctions'
import { removeAllKeyboardEventListeners } from '../../../common/listenerFunctions'
import { InsertClosingHourScreenProps } from '../../../routes/Stack/_stackScreenProps'
import { SaleContext } from '../../../contexts/SaleContext'
import { AuthContext } from '../../../contexts/AuthContext'
import uploadImage from '../../../services/Firebase/common/uploadPicture'
import { getDownloadURL } from 'firebase/storage'
import createPost from '../../../services/Firebase/post/createPost'
import updateDocField from '../../../services/Firebase/common/updateDocField'
import { UserCollection } from '../../../services/Firebase/types'
import { SaleData } from '../../../contexts/types'

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

    const { setSaleDataOnContext, saleData } = useContext(SaleContext)
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
        const openingHour = new Date(saleData.openingHour as Date)
        const closingHour = new Date(Date.UTC(2022, 1, 1, parseInt(!!hoursValidation ? hoursValidation : hours), parseInt(!!minutesValidation ? minutesValidation : '59'), 0, 0))
        return openingHour < closingHour
    }

    const getCompleteSaleDataFromContext = () => {
        return {
            ...saleData,
            closingHour: new Date(Date.UTC(2022, 1, 1, parseInt(hours), parseInt(minutes), 0, 0))
        }
    }

    const extractServiceAddress = (saleData: SaleData) => {
        return { ...saleData.address }
    }

    const extractUserData = (saleData: SaleData) => {
        return { description: saleData.profileDescription }
    }

    const extractSaleDataPost = (saleData: SaleData) => {
        const currentSaleData = { ...saleData }
        delete currentSaleData.address
        delete currentSaleData.profileDescription

        return { ...currentSaleData }
    }

    const extractServicePictures = (saleData: SaleData) => {
        return saleData.picturesUrl as string[] || []
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

    const saveSalePost = async () => {
        
    }

    const updateUserPost = async (
        localUser: UserCollection,
        postId: string,
        serviceDataPost: SaleData,
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
                        // ...localUser.posts as any,
                        /* {  
                            ...serviceDataPost,
                            postId: postId,
                            postType: 'service',
                        }, */
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
            outputRange: [theme.green2, theme.red2],
        })
    }

    return (
        <Container >
            <StatusBar backgroundColor={someInvalidFieldSubimitted() ? theme.red2 : theme.green2} barStyle={'dark-content'} />
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
                            : 'que horas você \npara de vender?'
                    }
                    highlightedWords={
                        someInvalidFieldSubimitted()
                            ? ['do', 'nosso', 'lado,']
                            : ['que', 'horas', 'vender?']
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
                        validBackgroundColor={theme.green1}
                        validBorderBottomColor={theme.green5}
                        invalidBackgroundColor={theme.red1}
                        invalidBorderBottomColor={theme.red5}
                        maxLength={2}
                        fontSize={26}
                        invalidTextAfterSubmit={invalidHourAfterSubmit}
                        placeholder={'17'}
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
                        validBackgroundColor={theme.green1}
                        validBorderBottomColor={theme.green5}
                        invalidBackgroundColor={theme.red1}
                        invalidBorderBottomColor={theme.red5}
                        maxLength={2}
                        fontSize={26}
                        invalidTextAfterSubmit={invalidMinutesAfterSubmit}
                        placeholder={'00'}
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
                            color={someInvalidFieldSubimitted() ? theme.red3 : theme.green3}
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