import { ReactNode } from 'react'

import { SocialImpactEntity, SocialImpactEntityOptional } from '@domain/post/entity/types'

export interface SocialImpactProviderProps {
	children: ReactNode
}

export type SocialImpactContextType = {
	isSecondPost: boolean,
	socialImpactDataContext: SocialImpactEntity
	setSocialImpactDataOnContext: (data: SocialImpactEntityOptional) => void
	getAditionalDataFromLastPost: () => void
}
