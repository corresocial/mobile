import { Keyboard, StatusBar } from 'react-native';
import React, { useContext, useEffect, useRef, useState } from 'react'

import { ButtonsContainer, Container } from './styles';
import { theme } from '../../../common/theme';
import { screenHeight } from '../../../common/screenDimensions';
import Uncheck from './../../../assets/icons/uncheck.svg'

import { InsertVacancyQuestionsScreenProps } from '../../../routes/Stack/vacancyStack/stackScreenProps';
import { removeAllKeyboardEventListeners } from '../../../common/listenerFunctions';
import { VacancyContext } from '../../../contexts/VacancyContext';

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer';
import { FormContainer } from '../../../components/_containers/FormContainer';
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton';
import { BackButton } from '../../../components/_buttons/BackButton';
import { InstructionCard } from '../../../components/_cards/InstructionCard';
import { LineInput } from '../../../components/LineInput';
import { ProgressBar } from '../../../components/ProgressBar';

function InsertVacancyQuestions({ navigation }: InsertVacancyQuestionsScreenProps) {

    const { setVacancyDataOnContext } = useContext(VacancyContext)

    const [vacancyQuestion, setVacancyQuestion] = useState<string>('')
    const [vacancyQuestions, setVacancyQuestions] = useState<string[]>([])
    const [vacancyQuestionIsValid, setVacancyQuestionIsValid] = useState<boolean>(false)
    const [keyboardOpened, setKeyboardOpened] = useState<boolean>(false)

    const inputRefs = {
        vacancyQuestionInput: useRef<React.MutableRefObject<any>>(null),
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
        const validation = validateVacancyQuestions(vacancyQuestion)
        setVacancyQuestionIsValid(validation)
    }, [vacancyQuestion, keyboardOpened])

    const validateVacancyQuestions = (text: string) => {
        const isValid = (text).trim().length >= 1
        if (isValid && !keyboardOpened) {
            return true
        }
        return false
    }

    const addNewQuestion = () => {
        setVacancyQuestions([...vacancyQuestions, vacancyQuestion])
        setVacancyQuestion('')
    }

    const saveVacancyQuestions = () => {
        setVacancyDataOnContext({ questions: vacancyQuestions })
        navigation.navigate('InsertCompanyDescription')
    }

    return (
        <Container >
            <StatusBar backgroundColor={theme.yellow2} barStyle={'dark-content'} />
            <DefaultHeaderContainer
                minHeight={screenHeight * 0.26}
                relativeHeight={'22%'}
                centralized
                backgroundColor={theme.yellow2}
            >
                <BackButton onPress={() => navigation.goBack()} />
                <InstructionCard
                    borderLeftWidth={3}
                    fontSize={18}
                    message={'quer adicionar pergunta(s) para os candidatos?'}
                    highlightedWords={['adicionar', 'pergunta(s)']}
                >
                    <ProgressBar
                        range={3}
                        value={1}
                    />
                </InstructionCard>
            </DefaultHeaderContainer>
            <FormContainer
                backgroundColor={theme.white2}
                justifyContent={'center'}
            >
                <LineInput
                    value={vacancyQuestion}
                    relativeWidth={'100%'}
                    textInputRef={inputRefs.vacancyQuestionInput}
                    defaultBackgroundColor={theme.white2}
                    defaultBorderBottomColor={theme.black4}
                    validBackgroundColor={theme.yellow1}
                    validBorderBottomColor={theme.yellow5}
                    invalidBackgroundColor={theme.red1}
                    invalidBorderBottomColor={theme.red5}
                    maxLength={100}
                    lastInput={true}
                    textAlign={'left'}
                    fontSize={16}
                    placeholder={'+ pergunta'}
                    keyboardType={'default'}
                    textIsValid={vacancyQuestionIsValid && !keyboardOpened}
                    onPressKeyboardSubmit={addNewQuestion}
                    validateText={(text: string) => validateVacancyQuestions(text)}
                    onChangeText={(text: string) => setVacancyQuestion(text)}
                />
                <ButtonsContainer>
                    {
                        !keyboardOpened &&
                        <PrimaryButton
                            flexDirection={'row-reverse'}
                            color={theme.red3}
                            label={'não precisa, continuar'}
                            highlightedWords={['não', 'precisa,']}
                            labelColor={theme.white3}
                            SvgIcon={Uncheck}
                            svgIconScale={['30%', '15%']}
                            onPress={saveVacancyQuestions}
                        />
                    }
                </ButtonsContainer>
            </FormContainer>
        </Container>
    );
}

export { InsertVacancyQuestions }