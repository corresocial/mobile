import React from 'react'

import { SvgProps } from 'react-native-svg'
import uuid from 'react-uuid'
import { theme } from '@common/theme'

import { SmallButton } from '@components/_buttons/SmallButton'
import { relativeScreenWidth } from '@common/screenDimensions'
import { MacroCategoriesType } from '@utils/postMacroCategories/types'

interface CatalogPostTypeButtonsProps {
	buttonLabels: string[]
	buttonValues: string[]
	buttonIcons: React.FC<SvgProps>[]
	onPress: (macroCategory: MacroCategoriesType) => void
}

function CatalogPostTypeButtons({ buttonLabels, buttonValues, buttonIcons, onPress }: CatalogPostTypeButtonsProps) {
	const renderButtons = () => {
		return buttonValues.map((buttonValue, i) => {
			return (
				<SmallButton
					key={uuid()}
					relativeWidth={'25%'}
					height={relativeScreenWidth(15)}
					color={'white'}
					fontSize={9}
					onPress={() => onPress(buttonValue as MacroCategoriesType)}
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
