import React, { JSXElementConstructor, ReactElement } from 'react'
import { FlatList, RefreshControl } from 'react-native'

import { RFValue } from 'react-native-responsive-fontsize'
import { PostCollection } from '@services/firebase/types'

import { VerticalSpacing } from '../_space/VerticalSpacing'
import { theme } from '@common/theme'

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
	return (
		<FlatList
			data={data}
			renderItem={({ item }) => renderItem(item)}
			showsVerticalScrollIndicator={false}
			ItemSeparatorComponent={() => <VerticalSpacing />}
			ListHeaderComponent={headerComponent}
			ListHeaderComponentStyle={{ marginBottom: RFValue(0) }}
			ListFooterComponent={withoutFooter ? <></> : <VerticalSpacing />}
			onEndReached={onEndReached}
			refreshControl={(
				<RefreshControl
					colors={[theme.orange3, theme.pink3, theme.green3, theme.blue3]}
					refreshing={/* !!flatListIsLoading */ false}
					progressBackgroundColor={theme.white3}
					onRefresh={onRefresh && onRefresh}
				/>
			)}
		/>
	)
}

export { FlatListPosts }
