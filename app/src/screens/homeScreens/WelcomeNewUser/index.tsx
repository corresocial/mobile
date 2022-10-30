import React, { useContext, useEffect, useState } from 'react'
import { Alert, StatusBar } from 'react-native';

import { Container, ContainerButtons } from './styles';
import { theme } from '../../../common/theme';
import ShoppingBag from './../../../assets/icons/shoppingBag.svg'
import SalesCart from './../../../assets/icons/salesCart.svg'

import { WelcomeNewUserScreenProps } from '../../../routes/Stack/_stackScreenProps';
import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer';
import { FormContainer } from '../../../components/_containers/FormContainer';
import { InstructionCard } from '../../../components/InstructionCard';
import { OptionButton } from '../../../components/_buttons/OptionButton';
import { AuthContext } from '../../../contexts/AuthContext';

function WelcomeNewUser({ route, navigation }: WelcomeNewUserScreenProps) {

	const { getDataFromSecureStore } = useContext(AuthContext)

	const [userName, setUserName] = useState('amigo')

	useEffect(() => {
		getUserNameFromSecureStore()
	}, [])

	const getUserNameFromSecureStore = async () => {
		const userJSON = await getDataFromSecureStore('corre.user')
		if (!userJSON) return false
		const userObject = await JSON.parse(userJSON)
		console.log(userObject)
		setUserName(userObject.name || 'amigo')
	}

	const buy = () => {
		Alert.alert('Right!', 'Find!')
	}

	const goToProfile = () => {
		return navigation.navigate('HomeTab' as any) 
	}

	return (
		<Container >
			<StatusBar backgroundColor={theme.orange2} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				centralized
				backgroundColor={theme.orange2}
				relativeHeight={'30%'}
			>
				<InstructionCard
					message={`olá, ${userName.split(' ')[0]} \npor que você \ntá no corre. ?`}
					highlightedWords={[userName.split(' ')[0], '\ntá', 'no', 'corre.']}
					fontSize={24}
					lineHeight={30}
				/>
			</DefaultHeaderContainer>
			<ContainerButtons>
				<FormContainer backgroundColor={theme.white2} >
					<OptionButton
						color={theme.white3}
						label={'para encontrar'}
						labelAlign={'left'}
						description={'quero encontrar um serviço, item para compra e/ou troca ou uma vaga de emprego'}
						highlightedWords={['para', 'encontrar']}
						SvgIcon={ShoppingBag}
						svgIconScale={['60%', '60%']}
						leftSideWidth={'30%'}
						onPress={buy}
					/>
					<OptionButton
						color={theme.white3}
						label={'para postar'}
						labelAlign={'left'}
						description={'quero postar vendas, serviços, vagas, iniciativas sociais ou cultura'}
						highlightedWords={['para', 'postar']}
						SvgIcon={SalesCart}
						svgIconScale={['60%', '60%']}
						leftSideWidth={'30%'}
						onPress={goToProfile}
					/>
				</FormContainer>
			</ContainerButtons>
		</Container>
	);
}

export { WelcomeNewUser }