import React from 'react'
import { StatusBar } from 'react-native'

import { ButtonsContainer, Container } from './styles'
import { theme } from '../../../common/theme'

import { SelectCultureLocationViewScreenProps } from '../../../routes/Stack/CultureStack/stackScreenProps'
import { LocationViewType } from '../../../services/Firebase/types'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { FormContainer } from '../../../components/_containers/FormContainer'
import { BackButton } from '../../../components/_buttons/BackButton'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { InstructionCard } from '../../../components/_cards/InstructionCard'
import { ProgressBar } from '../../../components/ProgressBar'

function SelectCultureLocationView({ navigation }: SelectCultureLocationViewScreenProps) {

    const saveLocationViewType = (locationViewType: LocationViewType) => {
        // navigation.navigate('LocationViewPreview', { locationView: locationViewType })
    }

    return (
        <Container>
            <StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
            <DefaultHeaderContainer
                relativeHeight={'28%'}
                centralized
                backgroundColor={theme.white3}
            >
                <BackButton onPress={() => navigation.goBack()} />
                <InstructionCard
                    borderLeftWidth={3}
                    fontSize={18}
                    message={'como você prefere que outros usuários vejam sua localização ?'}
                    highlightedWords={['como', 'você', 'prefere', 'vejam', 'sua', 'localização']}
                >
                    <ProgressBar
                        range={3}
                        value={3}
                    />
                </InstructionCard>
            </DefaultHeaderContainer>
            <FormContainer
                backgroundColor={theme.blue2}
            >
                <ButtonsContainer>
                    <PrimaryButton
                        justifyContent={'flex-start'}
                        color={theme.white3}
                        relativeHeight={'18%'}
                        labelColor={theme.black4}
                        fontSize={18}
                        textAlign={'left'}
                        label={'localização privada'}
                        highlightedWords={[`privada`]}
                        onPress={() => saveLocationViewType('private')}
                    />
                    <PrimaryButton
                        justifyContent={'flex-start'}
                        color={theme.white3}
                        relativeHeight={'18%'}
                        labelColor={theme.black4}
                        fontSize={18}
                        textAlign={'left'}
                        label={'localização aproximada'}
                        highlightedWords={[`aproximada`]}
                        onPress={() => saveLocationViewType('approximate')}
                    />
                    <PrimaryButton
                        justifyContent={'flex-start'}
                        color={theme.white3}
                        relativeHeight={'18%'}
                        labelColor={theme.black4}
                        fontSize={18}
                        textAlign={'left'}
                        label={'localização pública'}
                        highlightedWords={[`pública`]}
                        onPress={() => saveLocationViewType('public')}
                    />
                </ButtonsContainer>
            </FormContainer>
        </Container>
    )
}

export { SelectCultureLocationView }