import React, { JSXElementConstructor, ReactElement } from 'react'
import { FlatList, Platform, RefreshControl } from 'react-native'

import { RFValue } from 'react-native-responsive-fontsize'
import { PostCollection } from '../../services/firebase/types'

import { VerticalSigh } from '../VerticalSigh'
import { theme } from '../../common/theme'
import { relativeScreenHeight } from '../../common/screenDimensions'

interface FlatListPostsProps {
	data: PostCollection[]
	headerComponent?: JSXElementConstructor<any>
	flatListIsLoading?: boolean
	withoutFooter?: boolean
	renderItem: (post: PostCollection) => ReactElement<any, string | JSXElementConstructor<any>> | null
	onEndReached?: () => void
	onRefresh?: () => void

}

function FlatListPosts({
	data,
	headerComponent,
	flatListIsLoading,
	withoutFooter,
	renderItem,
	onEndReached,
	onRefresh
}: FlatListPostsProps) {
	const deviceIsIOS = Platform.OS === 'ios'

	return (
		<FlatList
			data={data}
			renderItem={({ item }) => renderItem(item)}
			showsVerticalScrollIndicator={false}
			ItemSeparatorComponent={() => <VerticalSigh />}
			ListHeaderComponent={headerComponent}
			ListHeaderComponentStyle={{ marginBottom: RFValue(0) }}
			ListFooterComponent={withoutFooter ? <></> : <VerticalSigh height={deviceIsIOS ? relativeScreenHeight(4) : relativeScreenHeight(1.5)} />}
			onEndReached={onEndReached}
			refreshControl={(
				<RefreshControl
					colors={[theme.orange3, theme.pink3, theme.green3, theme.blue3, theme.purple3, theme.yellow3, theme.red3]}
					refreshing={/* !!flatListIsLoading */ false}
					progressBackgroundColor={theme.white3}
					onRefresh={onRefresh && onRefresh}
				/>
			)}
		/>
	)
}

export { FlatListPosts }
