import { Alert, Animated } from 'react-native';
import React, { useContext, useRef, useState } from 'react'
import { Text } from 'react-native';

import { Container, InputsContainer, TwoPoints } from './styles';
import { theme } from '../../../common/theme';

import Firebase from '../../../services/Firebase/Firebase';
const firebaseConfig = Firebase ? Firebase.options : undefined;
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { AuthContext } from '../../../contexts/AuthContext';
import { filterLeavingOnlyNumbers } from '../../../common/auxiliaryFunctions';
import { InsertClosingHourScreenProps } from '../../../routes/Stack/_stackScreenProps';

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer';
import { FormContainer } from '../../../components/_containers/FormContainer';
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton';
import { InstructionCard } from '../../../components/InstructionCard';
import { LineInput } from '../../../components/LineInput';
import { screenHeight, statusBarHeight } from '../../../common/screenDimensions';
import { BackButton } from '../../../components/_buttons/BackButton';
import { ProgressBar } from '../../../components/ProgressBar';
import { UserStackParamList } from '../../../routes/Stack/UserStack/types';

function InsertClosingHour({ navigation }: InsertClosingHourScreenProps) {


    const [hours, setHours] = useState<string>('')
    const [minutes, setMinutes] = useState<string>('')
    const [invalidHourAfterSubmit, setInvalidHourAfterSubmit] = useState<boolean>(false)
    const [invalidMinutesAfterSubmit, setInvalidMinutesAfterSubmit] = useState<boolean>(false)

    const inputRefs = {
        hoursInput: useRef<React.MutableRefObject<any>>(null),
        minutesInput: useRef<React.MutableRefObject<any>>(null)
    }

    const validateHours = (text: string) => {
        const isValid = text.length == 2 && parseInt(text) < 24
        if (isValid) {
            setInvalidHourAfterSubmit(false)
            return true
        }
        return false
    }

    const validateMinutes = (text: string) => {
        const isValid = text.length == 2 && parseInt(text) < 60
        if (isValid) {
            setInvalidMinutesAfterSubmit(false)
            return true
        }
        return false
    }

    const saveOppeningHour = () => {
        //save
        navigation.navigate('HomeTab' as any, {TourCompleted: true}) // TODO type
    }

    return (
        <Container >
            <DefaultHeaderContainer
                minHeight={(screenHeight + statusBarHeight) * 0.26}
                relativeHeight={'22%'}
                centralized
                backgroundColor={theme.purple2}
            >
                <BackButton onPress={() => navigation.goBack()} />
                <InstructionCard
                    borderLeftWidth={3}
                    fontSize={18}
                    message={'que horas sua loja fecha?'}
                    highlightedWords={['que', 'horas', 'fecha?']}
                >
                    <ProgressBar
                        range={4}
                        value={4}
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
                        placeholder={'horas'}
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
                        placeholder={'minutos'}
                        keyboardType={'decimal-pad'}
                        lastInput={true}
                        filterText={filterLeavingOnlyNumbers}
                        validateText={(text: string) => validateMinutes(text)}
                        onChangeText={(text: string) => setMinutes(text)}
                    />
                </InputsContainer>
                <PrimaryButton
                    color={theme.purple3}
                    iconName={'arrow-right'}
                    iconColor={theme.white3}
                    label='continuar'
                    labelColor={theme.white3}
                    highlightedWords={['continuar']}
                    startsHidden
                    onPress={saveOppeningHour}
                />
            </FormContainer>
        </Container>
    );
}

export { InsertClosingHour }