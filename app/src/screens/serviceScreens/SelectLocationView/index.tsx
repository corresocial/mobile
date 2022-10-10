import React, { useContext } from 'react'

import { ButtonsContainer, Container } from './styles'
import { screenHeight, statusBarHeight } from '../../../common/screenDimensions'
import { theme } from '../../../common/theme'
import SalesCartO from './../../../assets/icons/salesCart-o.svg'

import { SelectLocationViewScreenProps } from '../../../routes/Stack/_stackScreenProps'
import { LocationViewType } from '../types'
import { ServiceContext } from '../../../contexts/ServiceContext'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { FormContainer } from '../../../components/_containers/FormContainer'
import { BackButton } from '../../../components/_buttons/BackButton'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { InstructionCard } from '../../../components/InstructionCard'
import { ProgressBar } from '../../../components/ProgressBar'

function SelectLocationView({ navigation }: SelectLocationViewScreenProps) {

    const { setServiceDataOnContext } = useContext(ServiceContext)

    const saveLocationViewType = (locationViewType: LocationViewType) => {
        setServiceDataOnContext({ locationViewType })
        navigation.navigate('LocationViewPreview', { locationView: locationViewType })
    }

    return (
        <Container>
            <DefaultHeaderContainer
                minHeight={(screenHeight + statusBarHeight) * 0.26}
                relativeHeight={'22%'}
                centralized
                backgroundColor={theme.white3}
            >
                <BackButton onPress={() => navigation.goBack()} />
                <InstructionCard
                    borderLeftWidth={3}
                    fontSize={18}
                    message={'como você prefere que outros usuários vejam sua localização ?'}
                    highlightedWords={['como,', 'você', 'prefere', 'vejam', 'sua', 'localização']}
                >
                    <ProgressBar
                        range={4}
                        value={3}
                    />
                </InstructionCard>
            </DefaultHeaderContainer>
            <FormContainer
                backgroundColor={theme.purple2}
            >
                <ButtonsContainer>
                    <PrimaryButton
                        justifyContent={'flex-start'}
                        color={theme.white3}
                        relativeHeight={'23%'}
                        labelColor={theme.black4}
                        fontSize={24}
                        textAlign={'left'}
                        labelMarginLeft={30}
                        label={'localização \nprivada'}
                        highlightedWords={[`\nprivada`]}
                        onPress={() => saveLocationViewType('private')}
                    />
                    <PrimaryButton
                        justifyContent={'flex-start'}
                        color={theme.white3}
                        relativeHeight={'23%'}
                        labelColor={theme.black4}
                        fontSize={24}
                        textAlign={'left'}
                        labelMarginLeft={30}
                        label={'localização \naproximada'}
                        highlightedWords={[`\naproximada`]}
                        onPress={() => saveLocationViewType('approximate')}
                    />
                    <PrimaryButton

                        justifyContent={'flex-start'}
                        color={theme.white3}
                        relativeHeight={'23%'}
                        labelColor={theme.black4}
                        fontSize={24}
                        textAlign={'left'}
                        labelMarginLeft={30}
                        label={'localização \npública'}
                        highlightedWords={[`\npública`]}
                        onPress={() => saveLocationViewType('public')}
                    />
                </ButtonsContainer>
            </FormContainer>
        </Container>
    )
}

export { SelectLocationView }