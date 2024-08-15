import React from 'react'
import { StatusBar } from 'react-native'

import { SmasService } from '@domain/smas/entity/types'

import { SelectPublicServiceScreenProps } from '@routes/Stack/PublicServicesStack/screenProps'

import { Container, Header } from './styles'
import PublicServicesWhiteIcon from '@assets/icons/publicServices-white.svg'
import { theme } from '@common/theme'

import { OptionButton } from '@components/_buttons/OptionButton'
import { FormContainer } from '@components/_containers/FormContainer'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'
import { DefaultPostViewHeader } from '@components/DefaultPostViewHeader'

function SelectPublicService({ navigation }: SelectPublicServiceScreenProps) {
	const navigateToSmasServices = (smasService: SmasService) => {
		navigation.navigate('InsertNIS', { smasService })
	}

	return (
		<Container>
			<StatusBar backgroundColor={theme.colors.white[3]} barStyle={'dark-content'} />
			<Header>
				<DefaultPostViewHeader
					text={'serviços \npúblicos'}
					SvgIcon={PublicServicesWhiteIcon}
					onBackPress={() => navigation.goBack()}
				/>
			</Header>
			<FormContainer backgroundColor={theme.colors.pink[2]} >
				<VerticalSpacing />
				<OptionButton
					label={'benefício eventual emergencial'}
					highlightedWords={['benefício', 'emergencial']}
					labelSize={15}
					relativeHeight={'15%'}
					SvgIcon={PublicServicesWhiteIcon}
					svgIconScale={['60%', '60%']}
					leftSideColor={theme.colors.pink[3]}
					leftSideWidth={'25%'}
					onPress={() => navigateToSmasServices('BEE')}
				/>
				<OptionButton
					label={'consultar \nBolsa Família'}
					highlightedWords={['\nBolsa', 'Família']}
					labelSize={15}
					relativeHeight={'15%'}
					SvgIcon={PublicServicesWhiteIcon}
					svgIconScale={['60%', '60%']}
					leftSideColor={theme.colors.pink[3]}
					leftSideWidth={'25%'}
					onPress={() => navigateToSmasServices('PBF')}
				/>
				<OptionButton
					label={'consultar \nCadÚnico'}
					highlightedWords={['\nCadÚnico']}
					labelSize={15}
					relativeHeight={'15%'}
					SvgIcon={PublicServicesWhiteIcon}
					svgIconScale={['60%', '60%']}
					leftSideColor={theme.colors.pink[3]}
					leftSideWidth={'25%'}
					onPress={() => navigateToSmasServices('CADUNICO')}
				/>
				<VerticalSpacing />
			</FormContainer>
		</Container>
	)
}

export { SelectPublicService }
