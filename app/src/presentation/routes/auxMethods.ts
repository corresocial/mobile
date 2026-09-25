import { NavigationProp, ParamListBase } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Linking } from 'react-native'

import { PetitionEntity } from '@domain/petition/entity/types'
import { PollEntity } from '@domain/poll/entity/types'
import { PostEntityOptional } from '@domain/post/entity/types'

import { PetitionStackParamList } from './Stack/PetitionStack/types'
import { PollStackParamList } from './Stack/PollStack/types'
import { HomeTabParamList } from './Tabs/HomeTab/types'
import { StackLabelProps } from './types'

type HomeTabStackName = Exclude<keyof HomeTabParamList, 'Post'>

const profileScreenStacks: { [profileScreenName: string]: HomeTabStackName } = {
	Profile: 'ProfileStack',
	ProfileHome: 'HomeStack',
	ProfileChat: 'ChatStack',
	ProfileLeaderArea: 'LeaderAreaStack'
}

// O React Navigation 7 não encaminha mais navigate() pelo nome para telas de navegadores irmãos ou filhos,
// então o caminho é explicitado a partir do AuthRegisterStack, o que funciona tanto em telas quanto em contextos
const navigateToHomeTabStack = (navigation: NavigationProp<ParamListBase>, stackName: HomeTabStackName, stackParams: object) => {
	navigation.navigate('UserStack', {
		screen: 'HomeTab',
		pop: true, // Volta para a HomeTab existente (removendo as telas acima dela) em vez de empilhar outra
		params: {
			screen: stackName,
			merge: stackName === 'HomeStack', // Preserva o scrollToTop salvo nos parâmetros da aba HomeStack
			params: stackParams
		}
	})
}

const navigateToHomeTabScreen = (navigation: NavigationProp<ParamListBase>, stackName: HomeTabStackName, screen: string, params?: object, pop?: boolean) => {
	if (navigation.getState()?.routeNames.includes(screen)) {
		return navigation.navigate(screen, params, { pop })
	}
	navigateToHomeTabStack(navigation, stackName, { screen, params, pop, initial: false })
}

const navigateToPostView = (postData: PostEntityOptional, navigation: NativeStackNavigationProp<any>, stackLabel?: StackLabelProps | '') => {
	return navigation.push(`PostView${stackLabel || ''}`, { postData })
}

const navigateToProfileView = (navigation: NativeStackNavigationProp<any>, userId?: string, stackLabel?: StackLabelProps | '', redirect?: string) => {
	if (redirect) return Linking.openURL(redirect)
	const profileScreenName = `Profile${stackLabel || ''}`
	// Com o getId das telas de perfil, pop volta para o perfil já aberto do mesmo usuário (como no v6) e empilha um novo para outro usuário
	navigateToHomeTabScreen(navigation, profileScreenStacks[profileScreenName], profileScreenName, { userId, stackLabel }, true)
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
	}
}

const getItemType = (item: PostEntityOptional & PollEntity & PetitionEntity) => {
	if (item.postId) return 'post'
	if (item.pollId) return 'poll'
	if (item.petitionId) return 'petition'
	return ''
}

export { navigateToPostView, navigateToProfileView, navigateToLeaderPostsView, navigateToHomeTabStack, navigateToHomeTabScreen }
