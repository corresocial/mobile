import React from 'react'

import { theme } from '../../common/theme'
import { Container } from './styles'
import ToolBox from './../../assets/icons/toolBox-purple.svg'
import SalesCart from './../../assets/icons/salesCart-green.svg'
import Suitcase from './../../assets/icons/suitcase-yellow.svg'
import Heart from './../../assets/icons/heart-red.svg'
import SoundTools from './../../assets/icons/soundTools-blue.svg'


import { DefaultHeaderContainer } from '../../components/DefaultHeaderContainer'
import { InstructionCard } from '../../components/InstructionCard'
import { FormContainer } from '../../components/FormContainer'
import { OptionButton } from '../../components/OptionButton'
import { BackButton } from '../../components/BackButton'
import { SelectPostTypeScreenProps } from '../../routes/Stack/stackScreenProps'

function SelectPostType({ route, navigation }: SelectPostTypeScreenProps) {
    return (
        <Container>
            <DefaultHeaderContainer
                backgroundColor={theme.white3}
                relativeHeight={'25%'}
                centralized
            >
                <BackButton onPress={() => navigation.goBack()} />
                <InstructionCard
                    message={'o que você vai \nanunciar?'}
                    highlightedWords={['\nanunciar?']}
                    borderLeftWidth={3}
                    lineHeight={35}
                    fontSize={22}
                    fontSizeHighlighted={32}
                />
            </DefaultHeaderContainer>
            <FormContainer
                backgroundColor={theme.orange2}
            >
                <OptionButton
                    color={theme.white3}
                    label={'um serviço'}
                    highlightedWords={['um', 'serviço']}
                    labelColor={theme.black3}
                    SvgIcon={ToolBox}
                    leftSideColor={theme.purple2}
                    onPress={() => navigation.navigate('InsertProfileDescription')}
                />
                <OptionButton
                    color={theme.white3}
                    label={'uma venda'}
                    highlightedWords={['uma', 'venda']}
                    labelColor={theme.black3}
                    SvgIcon={SalesCart}
                    leftSideColor={theme.green2}
                    onPress={() => { }}
                />
                <OptionButton
                    color={theme.white3}
                    label={'uma vaga'}
                    highlightedWords={['uma', 'vaga']}
                    labelColor={theme.black3}
                    SvgIcon={Suitcase}
                    leftSideColor={theme.yellow2}
                    onPress={() => { }}
                />
                <OptionButton
                    color={theme.white3}
                    label={'iniciativa social'}
                    highlightedWords={['iniciativa', 'social']}
                    labelColor={theme.black3}
                    SvgIcon={Heart}
                    leftSideColor={theme.red2}
                    onPress={() => { }}
                />
                <OptionButton
                    color={theme.white3}
                    label={'cultura'}
                    highlightedWords={['cultura']}
                    labelColor={theme.black3}
                    SvgIcon={SoundTools}
                    leftSideColor={theme.blue2}
                    onPress={() => { }}
                />
            </FormContainer>
        </Container>
    )
}

export { SelectPostType }