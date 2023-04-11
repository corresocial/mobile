import React, { useRef } from 'react'
import { ScrollView } from 'react-native'
import uuid from 'react-uuid'

import { Sigh, TagsSelectedArea } from './styles'
import xThin from '../../assets/icons/x-thin.svg'
import { relativeScreenWidth } from '../../common/screenDimensions'

import { SelectButton } from '../_buttons/SelectButton'

interface SelectedTagsHorizontalListProps {
	selectedTags: string[]
	backgroundSelected: string
	onSelectTag: (tag: string) => void
}

function SelectedTagsHorizontalList({ selectedTags, backgroundSelected, onSelectTag }: SelectedTagsHorizontalListProps) {
	const tagsSelectedRef = useRef() as any

	const scrollToEnd = () => {
		tagsSelectedRef.current.scrollToEnd({
			animated: true
		})
	}

	const renderSelectedTags = () => selectedTags.map((tagName) => (
		<SelectButton
			key={uuid()}
			width={'auto'}
			height={'auto'}
			label={tagName}
			fontSize={12}
			boldLabel
			marginHorizontal={relativeScreenWidth(3)}
			backgroundSelected={backgroundSelected}
			selected
			onSelect={() => onSelectTag(tagName)}
			SvgIcon={xThin}
			svgIconScale={['20', '12']}
		/>
	))

	return (
		<TagsSelectedArea>
			<ScrollView
				ref={tagsSelectedRef}
				onContentSizeChange={scrollToEnd}
				horizontal
				showsHorizontalScrollIndicator={false}
				scrollsToTop
				contentContainerStyle={{ paddingLeft: relativeScreenWidth(2) }}
			>
				<Sigh />
				{renderSelectedTags()}
			</ScrollView>
		</TagsSelectedArea>
	)
}

export { SelectedTagsHorizontalList }
