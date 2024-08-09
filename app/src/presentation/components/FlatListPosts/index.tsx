import React, { JSXElementConstructor, ReactElement } from 'react'
import { FlatList } from 'react-native'

import { PostEntity, PostEntityOptional } from '@domain/post/entity/types'

import { relativeScreenDensity } from '@common/screenDimensions'

import { VerticalSpacing } from '@components/_space/VerticalSpacing'

interface FlatListPostsProps {
	data: PostEntityOptional[]
	headerComponent?: JSXElementConstructor<any>
	withoutFooter?: boolean
	renderItem: (post: PostEntityOptional) => ReactElement<any, string | JSXElementConstructor<any>> | null
	onEndReached?: () => void
}

function FlatListPosts({
	data,
	headerComponent,
	withoutFooter,
	renderItem,
	onEndReached,
}: FlatListPostsProps) {
	return (
		<FlatList
			data={[...data]}
			renderItem={({ item }) => renderItem(item as PostEntity)}
			showsVerticalScrollIndicator={false}
			ItemSeparatorComponent={() => <VerticalSpacing />}
			ListHeaderComponent={headerComponent}
			ListHeaderComponentStyle={{ marginBottom: relativeScreenDensity(0) }}
			ListFooterComponent={withoutFooter ? <></> : <VerticalSpacing bottomNavigatorSpace />}
			onEndReached={onEndReached}
		// refreshControl={(
		// 	<RefreshControl
		// 		colors={[theme.colors.orange[3], theme.colors.pink[3], theme.colors.green[3], theme.colors.blue[3]]}
		// 		refreshing={/* !!flatListIsLoading */ false}
		// 		progressBackgroundColor={theme.colors.white[3]}
		// 		onRefresh={onRefresh && onRefresh}
		// 	/>
		// )}
		/>
	)
}

export { FlatListPosts }
