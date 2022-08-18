import React from 'react'
import { Alert } from 'react-native';

import { Container } from './styles';

import { theme } from '../../common/theme';
import { InsertProfilePictureScreenProps } from '../../routes/Stack/screenProps';
import { DefaultHeaderContainer } from '../../components/DefaultHeaderContainer';
import { FormContainer } from '../../components/FormContainer';
import { InstructionCard } from '../../components/InstructionCard';
import { PrimaryButton } from '../../components/PrimaryButton';

function InsertProfilePicture({ navigation, route }: InsertProfilePictureScreenProps) {

	const openCustomCamera = () => {
		const userData = {
			...route.params,
		}

		navigation.navigate('CustomCamera', userData)
	}

	const navigateToHome = () => {
		Alert.alert('Aoba!', 'Tô indo pro home hein?!')
	}


	return (
		<Container >
			<DefaultHeaderContainer
				relativeHeight={'55%'}
				centralized
				backgroundColor={theme.green2}
			>
				<InstructionCard
					message={'que tal uma foto de perfil?'}
					highlightedWords={['foto', 'de', 'perfil?']}
				/>
			</DefaultHeaderContainer>
			<FormContainer backgroundColor={theme.white2}>
				<PrimaryButton
					color={theme.green3}
					iconName={'image'}
					iconColor={theme.white3}
					label='claro, vou adicionar'
					labelColor={theme.white3}
					highlightedWords={['vou', 'adicionar']}
					onPress={openCustomCamera}
				/>
				<PrimaryButton
					color={theme.red3}
					iconName={'arrow-right'}
					iconColor={theme.white3}
					label='nem quero, valew'
					labelColor={theme.white3}
					highlightedWords={['nem', 'quero,']}
					onPress={navigateToHome}
				/>
			</FormContainer>
		</Container>
	);
}

export { InsertProfilePicture }