import React from 'react'

import { PostInputText } from '@components/_onboarding/PostInputText'

function InsertNIS() {
	return (
		<PostInputText
			backgroundColor={'red'}
			navigateBackwards={() => { }}
			saveTextData={() => { }}
			validationColor={'green'}
		/>
	)
}

export { InsertNIS }
