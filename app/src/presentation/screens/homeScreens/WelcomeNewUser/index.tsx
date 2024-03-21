import React, { useContext, useEffect, useState } from 'react'
import { BackHandler, StatusBar } from 'react-native'

import { useUserRepository } from '@data/user/useUserRepository'

import { AuthContext } from '@contexts/AuthContext'
import { StateContext } from '@contexts/StateContext'

import { WelcomeNewUserScreenProps } from '@routes/Stack/UserStack/stackScreenProps'
import { Id } from '@services/firebase/types'

import { Container, ContainerButtons } from './styles'
import LoupWhiteIcon from '@assets/icons/loup-white.svg'
import SalesCartWhiteIcon from '@assets/icons/salesCart-white.svg'
import { theme } from '@common/theme'

import { OptionButton } from '@components/_buttons/OptionButton'
import { InstructionCard } from '@components/_cards/InstructionCard'
import { DefaultHeaderContainer } from '@components/_containers/DefaultHeaderContainer'
import { FormContainer } from '@components/_containers/FormContainer'

const { remoteStorage } = useUserRepository()

function WelcomeNewUser({ route, navigation }: WelcomeNewUserScreenProps) {
	const { userDataContext, setUserDataOnContext } = useContext(AuthContext)
	const { setStateDataOnContext } = useContext(StateContext)

	const [userName, setUserName] = useState('amigo')

	useEffect(() => {
		BackHandler.addEventListener('hardwareBackPress', onPressBackHandler)
	})

	const onPressBackHandler = () => {
		if (navigation.isFocused()) {
			BackHandler.exitApp()
			return true
		}
		return false
	}

	useEffect(() => {
		getUserNameFromLocal()
	}, [])

	const getUserNameFromLocal = async () => {
		if (!userDataContext.userId) {
			navigation.navigate('InsertCellNumber' as any) // TODO Type
		}
		setUserName(userDataContext.name || 'amigo')
	}

	const goToHome = () => {
		setStateDataOnContext({ showTourModal: false })
		setUserTourPerformed()
		navigation.navigate('HomeTab', { showsInFirstTab: true })
	}

	const setUserTourPerformed = async () => {
		console.log(userDataContext.userId)
		await remoteStorage.updateUserData(userDataContext.userId as Id, { tourPerformed: true })
		setUserDataOnContext({ tourPerformed: true })
	}

	const goToProfile = () => {
		setStateDataOnContext({ showTourModal: false })
		navigation.navigate('HomeTab')
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
					message={`olá, ${userName.split(' ')[0]} ! \npor que você tá no corre.?`}
					highlightedWords={[`${userName.split(' ')[0]}`, '\ntá', 'corre.']}
					fontSize={16}
				/>
			</DefaultHeaderContainer>
			<ContainerButtons>
				<FormContainer backgroundColor={theme.white2} >
					<OptionButton
						label={'procurando'}
						highlightedWords={['procurando']}
						shortDescription={'quero encontrar um serviço, item para compra e/ou troca, vagas e cultura.'}
						relativeHeight={'30%'}
						leftSideWidth={'25%'}
						leftSideColor={theme.orange3}
						SvgIcon={LoupWhiteIcon}
						svgIconScale={['40%', '50%']}
						onPress={goToHome}
					/>
					<OptionButton
						label={'postando'}
						highlightedWords={['postando']}
						shortDescription={'quero fazer vendas, anunciar meus serviços, vagas, iniciativas sociais ou arte.'}
						relativeHeight={'30%'}
						leftSideWidth={'25%'}
						leftSideColor={theme.orange3}
						svgIconScale={['40%', '50%']}
						SvgIcon={SalesCartWhiteIcon}
						onPress={goToProfile}
					/>
				</FormContainer>
			</ContainerButtons>
		</Container>
	)
}

export { WelcomeNewUser }
