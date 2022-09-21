import React, { useContext, useEffect, useState } from 'react'
import { Alert } from 'react-native';

import ShoppingBag from './../../assets/icons/shoppingBag.svg'
import SalesCart from './../../assets/icons/salesCart.svg'
import { Container } from './styles';
import { theme } from '../../common/theme';

import { DefaultHeaderContainer } from '../../components/DefaultHeaderContainer';
import { FormContainer } from '../../components/FormContainer';
import { InstructionCard } from '../../components/InstructionCard';
import { OptionButton } from '../../components/OptionButton';
import { WelcomeNewUserScreenProps } from '../../routes/Stack/stackScreenProps';
import { AuthContext } from '../../contexts/AuthContext';
import { TourTypes } from '../../routes/Stack/TourStack/types';

function WelcomeNewUser({ route, navigation }: WelcomeNewUserScreenProps) {

	const { getDataFromSecureStore } = useContext(AuthContext)

	const [userName, setUserName] = useState('amigo')

	useEffect(() => {
		 getUserNameFromSecureStore()
	})

	const getUserNameFromSecureStore = async () => {
		const userJSON = await getDataFromSecureStore('corre.user', false)
		if (!userJSON) return
		const user = JSON.parse(userJSON)
		if(!user.userName.length) return
		return setUserName(user.userName)
	}

	const buy = () => {
		Alert.alert('Right!', 'Find!')
		getUserNameFromSecureStore()
	}

	const goToProfile = (firstAccess: boolean, tourType: TourTypes) => {
		return  navigation.navigate('Profile',{})
	}


	return (
		<Container >
			<DefaultHeaderContainer
				centralized
				backgroundColor={theme.orange2}
				relativeHeight={'30%'}
			>
				<InstructionCard
					message={`olá, ${ userName.split(' ')[0]} \nporque você \ntá no corre. ?`}
					highlightedWords={[userName.split(' ')[0], '\ntá', 'no', 'corre.']}
					fontSize={24}
					lineHeight={30}
				/>
			</DefaultHeaderContainer>
			<FormContainer backgroundColor={theme.white2}>
				<OptionButton
					color={theme.white3}
					label={'para encontrar'}
					description={'quero encontrar um serviço, item para compra e/ou troca ou uma vaga de emprego'}
					highlightedWords={['para', 'encontrar']}
					SvgIcon={ShoppingBag}
					onPress={buy}
				/>
				<OptionButton
					color={theme.white3}
					label={'para postar'}
					description={'quero postar vendas, serviços, vagas, iniciativas sociais ou cultura'}
					highlightedWords={['para', 'postar']}
					SvgIcon={SalesCart}
					onPress={() => goToProfile(true, 'post')}
				/>
			</FormContainer>
		</Container>
	);
}

export { WelcomeNewUser }