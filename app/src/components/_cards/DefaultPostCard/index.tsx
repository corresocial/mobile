import React from 'react'

import { Container } from './styles'

import { PostCard } from '../PostCard'

const mockedCorrePost = {
	title: 'Não encontramos nada perto de você.',
	description: 'Se conhecer alguém para essa categoria, é só falar com a gente.',
	owner: {
		userId: 'FxD8ExLZydeUieIW4xjvbJCFmFP2',
		name: 'corre.',
		profilePictureUrl: ['https://firebasestorage.googleapis.com/v0/b/corresocial-66840.appspot.com/o/public%2Flogo.png?alt=media&token=f824f945-980a-480a-9f7d-c96c908f8153']
	},
	createdAt: new Date()
}

interface DefaultPostCardProps {
	navigateToProfile: (userId: string) => void;
}

function DefaultPostCard({ navigateToProfile }: DefaultPostCardProps) {
	return (
		<Container>
			<PostCard
				post={mockedCorrePost}
				owner={mockedCorrePost.owner}
				navigateToProfile={navigateToProfile}
				onPress={() => { }}
			/>
		</Container>
	)
}

export { DefaultPostCard }
