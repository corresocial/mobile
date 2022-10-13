import React, { useContext, useRef, useState } from 'react'
import { StatusBar } from 'react-native';

import { Container, InputsContainer, TwoPoints } from './styles';
import { theme } from '../../../common/theme';

import { filterLeavingOnlyNumbers } from '../../../common/auxiliaryFunctions';
import { InsertOpeningHourScreenProps } from '../../../routes/Stack/_stackScreenProps';
import { ServiceContext } from '../../../contexts/ServiceContext';

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer';
import { FormContainer } from '../../../components/_containers/FormContainer';
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton';
import { InstructionCard } from '../../../components/InstructionCard';
import { LineInput } from '../../../components/LineInput';
import { screenHeight, statusBarHeight } from '../../../common/screenDimensions';
import { BackButton } from '../../../components/_buttons/BackButton';
import { ProgressBar } from '../../../components/ProgressBar';

function InsertOpeningHour({ navigation }: InsertOpeningHourScreenProps) {

    const { setServiceDataOnContext } = useContext(ServiceContext)

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
        setServiceDataOnContext({
            openingHour: new Date(Date.UTC(2022, 1, 1, parseInt(hours), parseInt(minutes), 0, 0))
        })
        navigation.navigate('InsertClosingHour')
    }

    return (
        <Container >
            <StatusBar backgroundColor={theme.purple2} barStyle={'dark-content'} />
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
                    message={'que horas sua loja abre?'}
                    highlightedWords={['que', 'horas', 'abre?']}
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

export { InsertOpeningHour }