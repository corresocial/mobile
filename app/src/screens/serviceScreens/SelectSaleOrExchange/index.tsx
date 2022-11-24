import React from 'react'
import { StatusBar } from 'react-native'

import { ButtonsContainer, Container } from './styles'
import { theme } from '../../../common/theme'
import SalesCartO from '../../../assets/icons/salesCart-o.svg'
import Exchange from '../../../assets/icons/exchange.svg'

import { SelectSaleOrExchangeScreenProps } from '../../../routes/Stack/ServiceStack/stackScreenProps'
import { PaymentType } from '../../../services/firebase/types'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { FormContainer } from '../../../components/_containers/FormContainer'
import { BackButton } from '../../../components/_buttons/BackButton'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { InstructionCard } from '../../../components/_cards/InstructionCard'
import { ProgressBar } from '../../../components/ProgressBar'

function SelectSaleOrExchange({ navigation }: SelectSaleOrExchangeScreenProps) {
	const savePaymentType = (paymentType: PaymentType) => {
		switch (paymentType) {
			case 'sale': {
				navigation.navigate('InsertSaleValue', {
				})
				break
			}
			case 'exchange': {
				navigation.navigate('InsertExchangeValue')
				break
			}
			case 'both': {
				navigation.navigate('InsertSaleValue', {
					bothPaymentType: true
				})
				break
			}
			default: return false
		}
	}

	return (
		<Container>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				relativeHeight={'22%'}
				centralized
				backgroundColor={theme.white3}
			>
				<BackButton onPress={() => navigation.goBack()} />
				<InstructionCard
					borderLeftWidth={3}
					fontSize={18}
					message={'você vende, aceita troca ou os dois ?'}
					highlightedWords={['vende,', 'aceita', 'troca', 'os', 'dois']}
				>
					<ProgressBar
						range={5}
						value={3}
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
						fontSize={20}
						label={'somente venda'}
						highlightedWords={['venda']}
						SvgIcon={SalesCartO}
						svgIconScale={['35%', '18%']}
						onPress={() => savePaymentType('sale')}
					/>
					<PrimaryButton
						flexDirection={'row-reverse'}
						justifyContent={'space-around'}
						color={theme.white3}
						relativeHeight={'21%'}
						labelColor={theme.black4}
						fontSize={20}
						label={'somente troca'}
						highlightedWords={['troca']}
						SvgIcon={Exchange}
						svgIconScale={['35%', '18%']}
						onPress={() => savePaymentType('exchange')}
					/>
					<PrimaryButton
						justifyContent={'space-around'}
						color={theme.white3}
						relativeHeight={'21%'}
						labelColor={theme.black4}
						fontSize={20}
						label={'venda \nou troca'}
						highlightedWords={['venda', 'troca']}
						SvgIcon={Exchange}
						SecondSvgIcon={SalesCartO}
						svgIconScale={['35%', '18%']}
						onPress={() => savePaymentType('both')}
					/>
				</ButtonsContainer>
			</FormContainer>
		</Container>
	)
}

export { SelectSaleOrExchange }
