import React, { useContext, useEffect, useRef, useState } from 'react'
import { Keyboard, StatusBar } from 'react-native';

import { Container, InputsContainer, TwoPoints } from './styles';
import { theme } from '../../../common/theme';

import { filterLeavingOnlyNumbers } from '../../../common/auxiliaryFunctions';
import { removeAllKeyboardEventListeners } from '../../../common/listenerFunctions';
import { InsertStartWorkDateScreenProps } from '../../../routes/Stack/VacancyStack/stackScreenProps';
import { VacancyContext } from '../../../contexts/VacancyContext';

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer';
import { FormContainer } from '../../../components/_containers/FormContainer';
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton';
import { InstructionCard } from '../../../components/_cards/InstructionCard';
import { LineInput } from '../../../components/LineInput';
import { screenHeight, statusBarHeight } from '../../../common/screenDimensions';
import { BackButton } from '../../../components/_buttons/BackButton';
import { ProgressBar } from '../../../components/ProgressBar';

function InsertStartWorkDate({ navigation }: InsertStartWorkDateScreenProps) {

    const { setVacancyDataOnContext } = useContext(VacancyContext)

    const [day, setDay] = useState<string>('')
    const [month, setMonth] = useState<string>('')
    const [year, setYear] = useState<string>('')

    const [dayIsValid, setDayIsValid] = useState<boolean>(false)
    const [monthIsValid, setMonthIsValid] = useState<boolean>(false)
    const [yearIsValid, setYearIsValid] = useState<boolean>(false)
    const [keyboardOpened, setKeyboardOpened] = useState<boolean>(false)

    const inputRefs = {
        dayInput: useRef<React.MutableRefObject<any>>(null),
        monthInput: useRef<React.MutableRefObject<any>>(null),
        yearInput: useRef<React.MutableRefObject<any>>(null)
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
        const dayValidation = validateDay(day)
        const monthValidation = validateMonth(month)
        const yearValidation = validateYear(year)
        setDayIsValid(dayValidation)
        setMonthIsValid(monthValidation)
        setYearIsValid(yearValidation)
    }, [day, month, year, keyboardOpened])

    const validateDay = (text: string) => {
        const isValid = text.length == 2 && parseInt(text) <= 31 && parseInt(text) > 0
        if (isValid) {
            return true
        }
        return false
    }

    const validateMonth = (text: string) => {
        const isValid = text.length == 2 && parseInt(text) <= 12 && parseInt(text) > 0
        if (isValid) {
            return true
        }
        return false
    }

    const validateYear = (text: string) => {
        const isValid = text.length == 4 && insertedYearIsBiggerThenCurrentYear(text)
        if (isValid) {
            return true
        }
        return false
    }

    const allFiedsIsValid = () => {
        return dayIsValid && monthIsValid && yearIsValid && insertedYearIsBiggerThenCurrentYear(year)
    }

    const insertedYearIsBiggerThenCurrentYear = (insertedYear: string) => {
        const insertedDate = new Date(Date.UTC(parseInt(insertedYear), parseInt(month) - 1, parseInt(day), 0, 0, 0, 0))
        const currentDate = new Date()
        return insertedDate.getTime() - (insertedDate.getTimezoneOffset() * 60) >= currentDate.getTime() - (currentDate.getTimezoneOffset() * 60) - 55002000
    }

    const saveOppeningHour = () => {
        setVacancyDataOnContext({
            startWorkDate: new Date(`${year}-${month}-${day}T00:00:00`)
        })
        // navigation.navigate('InsertStartWorkHour')
    }

    return (
        <Container >
            <StatusBar backgroundColor={theme.yellow2} barStyle={'dark-content'} />
            <DefaultHeaderContainer
                minHeight={(screenHeight + statusBarHeight) * 0.26}
                relativeHeight={'22%'}
                centralized
                backgroundColor={theme.yellow2}
            >
                <BackButton onPress={() => navigation.goBack()} />
                <InstructionCard
                    borderLeftWidth={3}
                    fontSize={18}
                    message={'quando começa?'}
                    highlightedWords={['quando']}
                >
                    <ProgressBar
                        range={3}
                        value={3}
                    />
                </InstructionCard>
            </DefaultHeaderContainer>
            <FormContainer backgroundColor={theme.white2}
                justifyContent={'center'}
            >
                <InputsContainer>
                    <LineInput
                        value={day}
                        relativeWidth={'30%'}
                        textInputRef={inputRefs.dayInput}
                        nextInputRef={inputRefs.monthInput}
                        defaultBackgroundColor={theme.white2}
                        defaultBorderBottomColor={theme.black4}
                        validBackgroundColor={theme.yellow1}
                        validBorderBottomColor={theme.yellow5}
                        invalidBackgroundColor={theme.red1}
                        invalidBorderBottomColor={theme.red5}
                        maxLength={2}
                        fontSize={26}
                        placeholder={'dia'}
                        keyboardType={'decimal-pad'}
                        filterText={filterLeavingOnlyNumbers}
                        textIsValid={allFiedsIsValid() && !keyboardOpened}
                        validateText={(text: string) => validateDay(text)}
                        onChangeText={(text: string) => setDay(text)}
                    />
                    <LineInput
                        value={month}
                        relativeWidth={'30%'}
                        previousInputRef={inputRefs.dayInput}
                        textInputRef={inputRefs.monthInput}
                        nextInputRef={inputRefs.yearInput}
                        defaultBackgroundColor={theme.white2}
                        defaultBorderBottomColor={theme.black4}
                        validBackgroundColor={theme.yellow1}
                        validBorderBottomColor={theme.yellow5}
                        invalidBackgroundColor={theme.red1}
                        invalidBorderBottomColor={theme.red5}
                        maxLength={2}
                        fontSize={26}
                        placeholder={'mês'}
                        keyboardType={'decimal-pad'}
                        filterText={filterLeavingOnlyNumbers}
                        textIsValid={allFiedsIsValid() && !keyboardOpened}
                        validateText={(text: string) => validateMonth(text)}
                        onChangeText={(text: string) => setMonth(text)}
                    />
                    <LineInput
                        value={year}
                        relativeWidth={'30%'}
                        previousInputRef={inputRefs.monthInput}
                        textInputRef={inputRefs.yearInput}
                        defaultBackgroundColor={theme.white2}
                        defaultBorderBottomColor={theme.black4}
                        validBackgroundColor={theme.yellow1}
                        validBorderBottomColor={theme.yellow5}
                        invalidBackgroundColor={theme.red1}
                        invalidBorderBottomColor={theme.red5}
                        maxLength={4}
                        fontSize={26}
                        placeholder={'ano'}
                        keyboardType={'decimal-pad'}
                        lastInput={true}
                        filterText={filterLeavingOnlyNumbers}
                        textIsValid={allFiedsIsValid() && !keyboardOpened}
                        validateText={(text: string) => validateYear(text)}
                        onChangeText={(text: string) => setYear(text)}
                    />
                </InputsContainer>
                <>
                    {
                        allFiedsIsValid() && !keyboardOpened &&
                        <PrimaryButton
                            color={theme.green3}
                            iconName={'arrow-right'}
                            iconColor={theme.white3}
                            label='continuar'
                            labelColor={theme.white3}
                            highlightedWords={['continuar']}
                            onPress={saveOppeningHour}
                        />
                    }
                </>
            </FormContainer>
        </Container>
    );
}

export { InsertStartWorkDate }