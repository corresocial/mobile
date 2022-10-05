import React from 'react'

import { ButtonsContainer, Container } from './styles'
import { screenHeight, statusBarHeight } from '../../../common/screenDimensions'
import { theme } from '../../../common/theme'
import SalesCartO from './../../../assets/icons/salesCart-o.svg'

import { SelectLocationViewScreenProps } from '../../../routes/Stack/_stackScreenProps'
import { LocationViewType } from '../types'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { FormContainer } from '../../../components/_containers/FormContainer'
import { BackButton } from '../../../components/_buttons/BackButton'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { InstructionCard } from '../../../components/InstructionCard'
import { ProgressBar } from '../../../components/ProgressBar'

function SelectLocationView({ navigation }: SelectLocationViewScreenProps) {

    const saveTypeLocationView = (typeLocationView: LocationViewType) => {
        //save
        navigation.navigate('LocationViewPreview', {locationView: typeLocationView})
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
                        SecondSvgIcon={SalesCartO}
                        svgIconScale={['0%', '8%']}
                        label={'localização \nprivada'}
                        highlightedWords={[`\nprivada`]}
                        onPress={() => saveTypeLocationView('private')}
                    />
                    <PrimaryButton
                        justifyContent={'flex-start'}
                        color={theme.white3}
                        relativeHeight={'23%'}
                        labelColor={theme.black4}
                        fontSize={24}
                        textAlign={'left'}
                        SecondSvgIcon={SalesCartO}
                        svgIconScale={['0%', '8%']}
                        label={'localização \naproximada'}
                        highlightedWords={[`\naproximada`]}
                        onPress={() => saveTypeLocationView('approximate')}
                    />
                    <PrimaryButton

                        justifyContent={'flex-start'}
                        color={theme.white3}
                        relativeHeight={'23%'}
                        labelColor={theme.black4}
                        fontSize={24}
                        textAlign={'left'}
                        SecondSvgIcon={SalesCartO}
                        svgIconScale={['0%', '8%']}
                        label={'localização \npública'}
                        highlightedWords={[`\npública`]}
                        onPress={() => saveTypeLocationView('public')}
                    />
                </ButtonsContainer>
            </FormContainer>
        </Container>
    )
}

export { SelectLocationView }