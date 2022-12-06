import React from 'react'
import { StatusBar } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

import { Container } from './styles'
import { theme } from '../../../common/theme'
import ToolBox from '../../../assets/icons/toolBox-purple.svg'
import SalesCart from '../../../assets/icons/salesCart-green.svg'
import Suitcase from '../../../assets/icons/suitcase-yellow.svg'
import Heart from '../../../assets/icons/heart-pink.svg'
import SoundTools from '../../../assets/icons/soundTools-blue.svg'

import { SelectPostTypeScreenProps } from '../../../routes/Stack/UserStack/stackScreenProps'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { FormContainer } from '../../../components/_containers/FormContainer'
import { OptionButton } from '../../../components/_buttons/OptionButton'
import { BackButton } from '../../../components/_buttons/BackButton'
import { InstructionCard } from '../../../components/_cards/InstructionCard'

function SelectPostType({ navigation }: SelectPostTypeScreenProps) {
	return (
		<Container>
			<StatusBar backgroundColor={theme.orange2} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				backgroundColor={theme.orange2}
				relativeHeight={'25%'}
				centralized
			>
				<BackButton onPress={() => navigation.goBack()} />
				<InstructionCard
					message={'o que você vai \nanunciar?'}
					highlightedWords={['\nanunciar']}
					borderLeftWidth={3}
					lineHeight={35}
					fontSize={22}
					fontSizeHighlighted={RFValue(32)}
				/>
			</DefaultHeaderContainer>
			<FormContainer
				backgroundColor={theme.white2}
			>
				<OptionButton
					color={theme.white3}
					label={'um serviço'}
					highlightedWords={['um', 'serviço']}
					labelColor={theme.black3}
					labelSize={18}
					SvgIcon={ToolBox}
					svgIconScale={['70%', '70%']}
					leftSideColor={theme.purple2}
					leftSideWidth={'30%'}
					onPress={() => navigation.navigate('ServiceStack')}
				/>
				<OptionButton
					color={theme.white3}
					label={'uma venda'}
					highlightedWords={['uma', 'venda']}
					labelColor={theme.black3}
					labelSize={18}
					SvgIcon={SalesCart}
					svgIconScale={['60%', '60%']}
					leftSideColor={theme.green2}
					leftSideWidth={'30%'}
					onPress={() => navigation.navigate('SaleStack')}
				/>
				<OptionButton
					color={theme.white3}
					label={'uma vaga'}
					highlightedWords={['uma', 'vaga']}
					labelColor={theme.black3}
					labelSize={18}
					SvgIcon={Suitcase}
					svgIconScale={['60%', '60%']}
					leftSideColor={theme.yellow2}
					leftSideWidth={'30%'}
					onPress={() => navigation.navigate('VacancyStack')}
				/>
				<OptionButton
					color={theme.white3}
					label={'iniciativa social'}
					highlightedWords={['iniciativa', 'social']}
					labelColor={theme.black3}
					labelSize={18}
					SvgIcon={Heart}
					svgIconScale={['60%', '60%']}
					leftSideColor={theme.pink2}
					leftSideWidth={'30%'}
					onPress={() => navigation.navigate('SocialImpactStack')}
				/>
				<OptionButton
					color={theme.white3}
					label={'cultura'}
					highlightedWords={['cultura']}
					labelColor={theme.black3}
					labelSize={18}
					SvgIcon={SoundTools}
					svgIconScale={['60%', '60%']}
					leftSideColor={theme.blue2}
					leftSideWidth={'30%'}
					onPress={() => navigation.navigate('CultureStack')}
				/>
			</FormContainer>
		</Container>
	)
}

export { SelectPostType }
