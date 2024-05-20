import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { PetitionEntity } from '@domain/petition/entity/types'
import { PollEntity } from '@domain/poll/entity/types'
import { PostEntityOptional } from '@domain/post/entity/types'

import { PetitionStackParamList } from './Stack/PetitionStack/types'
import { PollStackParamList } from './Stack/PollStack/types'
import { StackLabelProps } from './types'

const navigateToPostView = (postData: PostEntityOptional, navigation: NativeStackNavigationProp<any>, stackLabel?: StackLabelProps | '') => { // TODO Type
	switch (postData.postType) {
		case 'income': {
			if (postData.macroCategory === 'vacancy') return navigation.navigate(`ViewVacancyPost${stackLabel || ''}`, { postData })
			return navigation.navigate(`ViewIncomePost${stackLabel || ''}`, { postData })
		}
		case 'socialImpact': return navigation.navigate(`ViewSocialImpactPost${stackLabel || ''}`, { postData })
		case 'culture': return navigation.navigate(`ViewCulturePost${stackLabel || ''}`, { postData })
	}
}

const navigateToLeaderPostsView = (leaderPostData: PollEntity & PetitionEntity, navigation: NativeStackNavigationProp<any>, stackLabel?: StackLabelProps | '') => { // TODO Type
	const leaderPostType = getItemType(leaderPostData)

	switch (leaderPostType) {
		case 'poll': return navigation.navigate('PollStack' as any, {
			screen: 'ViewPoll',
			params: { pollId: leaderPostData.pollId } as PollStackParamList['ViewPoll']
		})
		case 'petition': return navigation.navigate('PetitionStack' as any, {
			screen: 'ViewPetition',
			params: { petitionId: leaderPostData.petitionId } as PetitionStackParamList['ViewPetition']
		})
		// case 'poll': return navigation.navigate(`ViewPoll${stackLabel || ''}`, { pollId: leaderPostData.pollId } as HomeStackParamList['ViewPollHome'])
	}
}

const getItemType = (item: PostEntityOptional & PollEntity & PetitionEntity) => {
	if (item.postId) return 'post'
	if (item.pollId) return 'poll'
	if (item.petitionId) return 'petition'
	return ''
}

export { navigateToPostView, navigateToLeaderPostsView }
