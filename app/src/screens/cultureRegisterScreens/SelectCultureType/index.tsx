import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { theme } from '@common/theme'

import { SelectCultureTypeScreenProps } from '@routes/Stack/cultureStack/stackScreenProps'
import { CultureType } from '@services/firebase/types'

import { CultureContext } from '@contexts/CultureContext'

import { DefaultHeaderContainer } from '@components/_containers/DefaultHeaderContainer'
import { FormContainer } from '@components/_containers/FormContainer'
import { BackButton } from '@components/_buttons/BackButton'
import { PrimaryButton } from '@components/_buttons/PrimaryButton'
import { InfoCard } from '@components/_cards/InfoCard'
import { ButtonsContainer, Container } from './styles'

function SelectCultureType({ navigation }: SelectCultureTypeScreenProps) {
	const { setCultureDataOnContext } = useContext(CultureContext)

	const saveCultureType = (cultureType: CultureType) => {
		setCultureDataOnContext({
			cultureType,
		})
		if (cultureType === 'artistProfile') {
			navigation.navigate('InsertCultureTitle')
		} else {
			navigation.navigate('InsertCultureTitle')
		}
	}

	return (
		<Container>
			<StatusBar
				backgroundColor={theme.white3}
				barStyle={'dark-content'}
			/>
			<DefaultHeaderContainer
				relativeHeight={'22%'}
				centralized
				backgroundColor={theme.white3}
			>
				<BackButton onPress={() => navigation.goBack()} />
				<InfoCard
					title={'cultura'}
					titleFontSize={26}
					description={'o que você quer fazer?'}
					highlightedWords={['cultura', 'o', 'que', 'fazer']}
					height={'100%'}
					color={theme.white3}
				/>
			</DefaultHeaderContainer>
			<FormContainer
				backgroundColor={theme.blue2}
				justifyContent={'flex-start'}
			>
				<ButtonsContainer>
					<PrimaryButton
						justifyContent={'flex-start'}
						color={theme.white3}
						relativeHeight={'27%'}
						labelColor={theme.black4}
						labelMarginLeft={'5%'}
						fontSize={18}
						textAlign={'left'}
						label={'perfil de artista'}
						highlightedWords={['perfil']}
						onPress={() => saveCultureType('artistProfile')}
					/>
					<PrimaryButton
						justifyContent={'flex-start'}
						color={theme.white3}
						relativeHeight={'27%'}
						labelColor={theme.black4}
						labelMarginLeft={'5%'}
						fontSize={18}
						textAlign={'left'}
						label={'anunciar um evento'}
						highlightedWords={['anunciar']}
						onPress={() => saveCultureType('eventPost')}
					/>
				</ButtonsContainer>
			</FormContainer>
		</Container>
	)
}

export { SelectCultureType }
