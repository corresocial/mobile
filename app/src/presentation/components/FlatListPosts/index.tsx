import React, { JSXElementConstructor, ReactElement } from 'react'
import { FlatList } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

import { PostEntity, PostEntityOptional } from '@domain/post/entity/types'

import { VerticalSpacing } from '@components/_space/VerticalSpacing'

interface FlatListPostsProps {
	data: PostEntityOptional[]
	headerComponent?: JSXElementConstructor<any>
	stickyHeaderComponent?: JSXElementConstructor<any>
	flatListIsLoading?: boolean
	withoutFooter?: boolean
	renderItem: (post: PostEntityOptional) => ReactElement<any, string | JSXElementConstructor<any>> | null
	onEndReached?: () => void
	onRefresh?: () => void
}

function FlatListPosts({
	data,
	headerComponent,
	stickyHeaderComponent,
	flatListIsLoading,
	withoutFooter,
	renderItem,
	onEndReached,
	onRefresh
}: FlatListPostsProps) {
	const filteredExternalEvents = data.filter((post: any) => !post.externalPostId)

	return (
		<FlatList
			data={[0, ...filteredExternalEvents]}
			renderItem={({ item }) => renderItem(item as PostEntity)}
			showsVerticalScrollIndicator={false}
			CellRendererComponent={({ item }) => {
				if (item === 0) {
					return (stickyHeaderComponent as any)()
				}
				return (
					<>
						<VerticalSpacing />
						{renderItem(item as PostEntity)}
					</>
				)
			}}
			ListHeaderComponent={headerComponent}
			ListHeaderComponentStyle={{ marginBottom: RFValue(0) }}
			ListFooterComponent={withoutFooter ? <></> : <VerticalSpacing bottomNavigatorSpace />}
			onEndReached={onEndReached}
			// refreshControl={(
			// 	<RefreshControl
			// 		colors={[theme.orange3, theme.pink3, theme.green3, theme.blue3]}
			// 		refreshing={/* !!flatListIsLoading */ false}
			// 		progressBackgroundColor={theme.white3}
			// 		onRefresh={onRefresh && onRefresh}
			// 	/>
			// )}
			stickyHeaderIndices={[1]}
		/>
	)
}

export { FlatListPosts }
