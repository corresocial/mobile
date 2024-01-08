import React from 'react'
import { StatusBar } from 'react-native'

import { SelectPublicServiceScreenProps } from '@routes/Stack/HomeStack/stackScreenProps'

import PublicServicesWhiteIcon from '@assets/icons/publicServices-white.svg'
import { theme } from '@common/theme'

import { OptionButton } from '@components/_buttons/OptionButton'
import { FormContainer } from '@components/_containers/FormContainer'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'
import { DefaultPostViewHeader } from '@components/DefaultPostViewHeader'

import { Container, Header } from '../styles'

function SelectPublicService({ navigation }: SelectPublicServiceScreenProps) {
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
			<FormContainer backgroundColor={theme.pink2}>
				<OptionButton
					label={'benefício eventual emergencial'}
					highlightedWords={['benefício', 'emergencial']}
					labelSize={15}
					relativeHeight={'15%'}
					SvgIcon={PublicServicesWhiteIcon}
					svgIconScale={['60%', '60%']}
					leftSideColor={theme.pink3}
					leftSideWidth={'25%'}
					onPress={() => { }}
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
					onPress={() => { }}
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
					onPress={() => { }}
				/>
				<VerticalSpacing />
			</FormContainer>
		</Container>
	)
}

export { SelectPublicService }
