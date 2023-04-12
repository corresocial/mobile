import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { ButtonsContainer, Container, Sigh } from './styles'
import { theme } from '../../../common/theme'
import HandOnMoneyWhiteIcon from '../../../assets/icons/handOnMoney-white.svg'
import ChatIcon from '../../../assets/icons/chatTabIconInactive.svg'

import { SelectSaleValueTypeScreenProps } from '../../../routes/Stack/ServiceStack/stackScreenProps'
import { SaleValueType } from '../../../services/firebase/types'

import { ServiceContext } from '../../../contexts/ServiceContext'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { FormContainer } from '../../../components/_containers/FormContainer'
import { BackButton } from '../../../components/_buttons/BackButton'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { InstructionCard } from '../../../components/_cards/InstructionCard'
import { ProgressBar } from '../../../components/ProgressBar'

function SelectSaleValueType({ route, navigation }: SelectSaleValueTypeScreenProps) {
	const { setServiceDataOnContext } = useContext(ServiceContext)

	const saveSaleValueType = (paymentType: SaleValueType) => {
		const { bothPaymentType } = route.params

		switch (paymentType) {
			case 'fixed': {
				navigation.navigate('InsertSaleValue', { bothPaymentType })
				break
			}
			case 'toMatch': {
				setServiceDataOnContext({ saleValue: 'a combinar' })

				if (bothPaymentType) {
					navigation.navigate('InsertExchangeValue')
					return
				}
				navigation.navigate('SelectLocationView')
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
					message={'tem preço fixo ou fica a combinar?'}
					highlightedWords={['preço', 'fixo', 'a', 'combinar']}
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
						justifyContent={'space-around'}
						color={theme.white3}
						relativeHeight={'21%'}
						labelColor={theme.black4}
						fontSize={20}
						label={'preço fixo'}
						highlightedWords={['fixo']}
						SecondSvgIcon={HandOnMoneyWhiteIcon}
						svgIconScale={['80%', '22%']}
						onPress={() => saveSaleValueType('fixed')}
					/>
					<Sigh />
					<PrimaryButton
						justifyContent={'space-around'}
						color={theme.white3}
						relativeHeight={'21%'}
						labelColor={theme.black4}
						fontSize={20}
						label={'a combinar'}
						highlightedWords={['combinar']}
						SecondSvgIcon={ChatIcon}
						svgIconScale={['35%', '18%']}
						onPress={() => saveSaleValueType('toMatch')}
					/>
				</ButtonsContainer>
			</FormContainer>
		</Container>
	)
}

export { SelectSaleValueType }
