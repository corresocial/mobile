import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'

import { theme } from '@common/theme'

import VacancyIcon from '@assets/icons/vacancy.svg'
import SocialImpactIcon from '@assets/icons/socialImpact.svg'
import ServiceIcon from '@assets/icons/service.svg'
import SaleIcon from '@assets/icons/sale.svg'
import CultureIcon from '@assets/icons/culture.svg'

import { SelectPostTypeScreenProps } from '@routes/Stack/UserStack/stackScreenProps'

import { DefaultHeaderContainer } from '@components/_containers/DefaultHeaderContainer'
import { FormContainer } from '@components/_containers/FormContainer'
import { OptionButton } from '@components/_buttons/OptionButton'
import { BackButton } from '@components/_buttons/BackButton'
import { InstructionCard } from '@components/_cards/InstructionCard'
import { FocusAwareStatusBar } from '@components/FocusAwareStatusBar'
import { Container } from './styles'

function SelectPostType({ navigation }: SelectPostTypeScreenProps) {
	return (
		<Container>
			<FocusAwareStatusBar
				backgroundColor={theme.orange2}
				barStyle={'dark-content'}
			/>
			<DefaultHeaderContainer
				backgroundColor={theme.orange2}
				relativeHeight={'28%'}
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
			<FormContainer backgroundColor={theme.white2}>
				<OptionButton
					color={theme.white3}
					label={'um serviço'}
					highlightedWords={['um', 'serviço']}
					labelColor={theme.black3}
					labelSize={18}
					relativeHeight={'18%'}
					SvgIcon={ServiceIcon}
					svgIconScale={['60%', '60%']}
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
					relativeHeight={'18%'}
					SvgIcon={SaleIcon}
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
					relativeHeight={'18%'}
					SvgIcon={VacancyIcon}
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
					relativeHeight={'18%'}
					SvgIcon={SocialImpactIcon}
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
					relativeHeight={'18%'}
					SvgIcon={CultureIcon}
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
