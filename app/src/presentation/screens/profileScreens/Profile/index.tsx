import React from 'react'

import { BackButton } from '@components/_buttons/BackButton'
import { SmallButton } from '@components/_buttons/SmallButton'
import { ScreenContainer } from '@components/_containers/ScreenContainer'

function Profile() {
	return (
		<ScreenContainer
			tone={'orange'}
			enableSectionPadding
			firstSection={(
				<SmallButton
					relativeWidth={300}
					onPress={() => { }}
					label={'Section 01'}
					labelColor={'black'}
				/>
			)}
			secondSection={(
				<SmallButton
					relativeWidth={300}
					onPress={() => { }}
					label={'Section 02'}
					labelColor={'black'}
				/>
			)}
			thirdSecton={(
				<SmallButton
					relativeWidth={300}
					onPress={() => { }}
					label={'Section 03'}
					labelColor={'black'}
				/>
			)}
		>
			<BackButton onPress={() => { }} />
		</ScreenContainer>
	)
}

export { Profile }
