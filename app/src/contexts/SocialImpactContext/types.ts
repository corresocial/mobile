import { ReactNode } from 'react'

import { SocialImpactCollection } from '@services/firebase/types'

export interface SocialImpactProviderProps {
	children: ReactNode
}

export type SocialImpactPostData = SocialImpactCollection

export type SocialImpactContextType = {
	isSecondPost: boolean,
	socialImpactDataContext: SocialImpactPostData | {}
	setSocialImpactDataOnContext: (data: SocialImpactPostData) => void
	getAditionalDataFromLastPost: () => void
}
