import React from 'react'

import { ButtonsContainer, Container } from './styles'
import { screenHeight, statusBarHeight } from '../../../common/screenDimensions'
import { theme } from '../../../common/theme'
import SalesCartO from './../../../assets/icons/salesCart-o.svg'
import Exchange from './../../../assets/icons/exchange.svg'

import { SelectSaleOrExchangeScreenProps } from '../../../routes/Stack/_stackScreenProps'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { FormContainer } from '../../../components/_containers/FormContainer'
import { BackButton } from '../../../components/_buttons/BackButton'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { InstructionCard } from '../../../components/InstructionCard'
import { ProgressBar } from '../../../components/ProgressBar'

function SelectSaleOrExchange({ navigation }: SelectSaleOrExchangeScreenProps) {

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
                    message={'você vende, aceita troca ou os dois ?'}
                    highlightedWords={['vende,', 'aceita', 'troca', 'os','dois']}
                >
                    <ProgressBar
                        range={4}
                        value={2}
                    />
                </InstructionCard>
            </DefaultHeaderContainer>
            <FormContainer
                backgroundColor={theme.purple2}
            >
                <ButtonsContainer>
                    <PrimaryButton
                        flexDirection={'row-reverse'}
                        justifyContent={'space-around'}
                        color={theme.white3}
                        relativeHeight={'21%'}
                        labelColor={theme.black4}
                        fontSize={24}
                        label={'somente venda'}
                        highlightedWords={['venda']}
                        SvgIcon={SalesCartO}
                        svgIconScale={['35%', '18%']}
                        onPress={() => {}}
                    />
                    <PrimaryButton
                        flexDirection={'row-reverse'}
                         justifyContent={'space-around'}
                        color={theme.white3}
                        relativeHeight={'21%'}
                        labelColor={theme.black4}
                        fontSize={24}
                        label={'somente troca'}
                        highlightedWords={['troca']}
                        SvgIcon={Exchange}
                        svgIconScale={['35%', '18%']}
                        onPress={() => {}}
                    />
                    <PrimaryButton
                        justifyContent={'space-around'}
                        color={theme.white3}
                        relativeHeight={'21%'}
                        labelColor={theme.black4}
                        fontSize={24}
                        label={'venda \nou troca'}
                        highlightedWords={['venda', 'troca']}
                        SvgIcon={Exchange}
                        SecondSvgIcon={SalesCartO}
                        svgIconScale={['35%', '18%']}
                        onPress={() => {}}
                    />
                </ButtonsContainer>
            </FormContainer>
        </Container>
    )
}

export { SelectSaleOrExchange }