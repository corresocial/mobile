import React from 'react'
import { StatusBar } from 'react-native'

import { SMASService } from '@domain/entities/smas/types'

import { SelectPublicServiceScreenProps } from '@routes/Stack/PublicServicesStack/stackScreenProps'

import { Container, Header } from './styles'
import PublicServicesWhiteIcon from '@assets/icons/publicServices-white.svg'
import { theme } from '@common/theme'

import { OptionButton } from '@components/_buttons/OptionButton'
import { FormContainer } from '@components/_containers/FormContainer'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'
import { DefaultPostViewHeader } from '@components/DefaultPostViewHeader'

function SelectPublicService({ navigation }: SelectPublicServiceScreenProps) {
	const navigateToSMASServices = (smasService: SMASService) => {
		navigation.navigate('InsertNIS', { smasService })
	}

	return (
		<Container>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<Header>
				<DefaultPostViewHeader
					text={'serviços \npúblicos'}
					SvgIcon={PublicServicesWhiteIcon}
					onBackPress={() => navigation.goBack()}
				/>
			</Header>
			<FormContainer backgroundColor={theme.pink2} >
				<VerticalSpacing />
				<OptionButton
					label={'benefício eventual emergencial'}
					highlightedWords={['benefício', 'emergencial']}
					labelSize={15}
					relativeHeight={'15%'}
					SvgIcon={PublicServicesWhiteIcon}
					svgIconScale={['60%', '60%']}
					leftSideColor={theme.pink3}
					leftSideWidth={'25%'}
					onPress={() => navigateToSMASServices('beneficioEmergencial')}
				/>
				<OptionButton
					label={'consultar \nBolsa Família'}
					highlightedWords={['\nBolsa', 'Família']}
					labelSize={15}
					relativeHeight={'15%'}
					SvgIcon={PublicServicesWhiteIcon}
					svgIconScale={['60%', '60%']}
					leftSideColor={theme.pink3}
					leftSideWidth={'25%'}
					onPress={() => navigateToSMASServices('bolsaFamilia')}
				/>
				<OptionButton
					label={'consultar \nCadÚnico'}
					highlightedWords={['\nCadÚnico']}
					labelSize={15}
					relativeHeight={'15%'}
					SvgIcon={PublicServicesWhiteIcon}
					svgIconScale={['60%', '60%']}
					leftSideColor={theme.pink3}
					leftSideWidth={'25%'}
					onPress={() => navigateToSMASServices('cadUnico')}
				/>
				<VerticalSpacing />
			</FormContainer>
		</Container>
	)
}

export { SelectPublicService }
