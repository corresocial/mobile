import React from 'react'

import { SvgProps } from 'react-native-svg'
import { theme } from '../../common/theme'

import { SmallButton } from '../_buttons/SmallButton'
import { relativeScreenWidth } from '../../common/screenDimensions'

interface CatalogPostTypeButtonsProps {
	buttonLabels: string[]
	buttonValues: string[]
	buttonIcons: React.FC<SvgProps>[]
}

function CatalogPostTypeButtons({ buttonLabels, buttonValues, buttonIcons }: CatalogPostTypeButtonsProps) {
	const renderButtons = () => {
		return buttonValues.map((buttonValue, i) => {
			return (
				<SmallButton
					relativeWidth={'25%'}
					height={relativeScreenWidth(15)}
					color={'white'}
					fontSize={9}
					onPress={() => console.log(buttonValue)}
					label={buttonLabels[i]}
					labelColor={theme.black4}
					SvgIcon={buttonIcons[i]}
					svgScale={['50%', '80%']}
					flexDirection={'column'}
				/>
			)
		})
	}

	return (
		<>
			{renderButtons()}
		</>
	)
}

export { CatalogPostTypeButtons }
