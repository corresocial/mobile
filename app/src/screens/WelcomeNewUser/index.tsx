import React from 'react'
import { Alert } from 'react-native';

import ShoppingBag from './../../assets/icons/shoppingBag.svg'
import SalesCart from './../../assets/icons/salesCart.svg'
import { Container } from './styles';
import { theme } from '../../common/theme';

import { DefaultHeaderContainer } from '../../components/DefaultHeaderContainer';
import { FormContainer } from '../../components/FormContainer';
import { InstructionCard } from '../../components/InstructionCard';
import { OptionButton } from '../../components/OptionButton';
import { WelcomeNewUserScreenProps } from '../../routes/Stack/screenProps';

function WelcomeNewUser({route, navigation}: WelcomeNewUserScreenProps) {

	const buy = () => {
		Alert.alert('Right!', 'Buy!')
	}

	const sell = () => {
		Alert.alert('Right!', 'Sell!')
	}
	
	const {userName} = route.params

	return (
		<Container >
			<DefaultHeaderContainer
				centralized
				backgroundColor={theme.white3}
				relativeHeight={'35%'}
			>
				<InstructionCard
					message={`olá, ${userName.split(' ')[0]} \n\nporque você \ntá no corre. ?`}
					highlightedWords={[userName.split(' ')[0], '\ntá', 'no', 'corre.']}
					fontSize={24}
					lineHeight={30}
				/>
			</DefaultHeaderContainer>
			<FormContainer backgroundColor={theme.orange2}>
				<OptionButton
					color={theme.white3}
					label={'comprar'}
					highlightedWords={['comprar']}
					onPress={buy}
					SvgIcon={ShoppingBag}
				/>
				<OptionButton
					color={theme.white3}
					label={'vender'}
					highlightedWords={['vender']}
					onPress={sell}
					SvgIcon={SalesCart}
				/>
			</FormContainer>
		</Container>
	);
}

export { WelcomeNewUser }