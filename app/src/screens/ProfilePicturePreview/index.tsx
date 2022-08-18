import React, { useEffect } from 'react'
import { Alert } from 'react-native';

import { Container } from './styles';

import { theme } from '../../common/theme';
import { ProfilePicturePreviewScreenProps } from '../../routes/Stack/screenProps';
import { DefaultHeaderContainer } from '../../components/DefaultHeaderContainer';
import { FormContainer } from '../../components/FormContainer';
import { InstructionCard } from '../../components/InstructionCard';
import { PrimaryButton } from '../../components/PrimaryButton';
import { PhotoPortrait } from '../../components/PhotoPortrait';

import { StackActions, NavigationActions } from 'react-navigation';

function ProfilePicturePreview({ navigation, route }: ProfilePicturePreviewScreenProps) {

	const navigateToNextScreen = () => {
		// User params
		navigation.navigate('NextScreen')
	}

	const backToCustomCamera = () => {
		// navigation.goBack()
		navigation.navigate('InsertProfilePicture', {userPhone: 'any',userName: 'any'})
	}

	return (
		<Container >
			<DefaultHeaderContainer
				relativeHeight={'65%'}
				centralized
				justifyContent={'flex-end'}
				backgroundColor={theme.green2}
			>
				<PhotoPortrait pictureUri={route.params.profilePictureUri} />
				<InstructionCard
					message={'ficou boa ?'}
					highlightedWords={['boa']}
				/>
			</DefaultHeaderContainer>
			<FormContainer backgroundColor={theme.white2}>
				<PrimaryButton
					color={theme.green3}
					iconName={'arrow-right'}
					iconColor={theme.white3}
					label='tá ótima, continuar'
					labelColor={theme.white3}
					highlightedWords={['continuar']}
					onPress={navigateToNextScreen}
				/>
				<PrimaryButton
					color={theme.yellow3}
					iconName={'images'}
					iconColor={theme.black4}
					label='nem, escolher outra'
					labelColor={theme.black4}
					highlightedWords={['escolher', 'outra']}
					onPress={backToCustomCamera}
				/>
			</FormContainer>
		</Container>
	);
}

export { ProfilePicturePreview }