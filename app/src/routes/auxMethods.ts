import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { PostCollection } from '../services/firebase/types'
import { StackLabelProps } from './types'

const navigateToPostView = (postData: PostCollection, navigation: NativeStackNavigationProp<any>, stackLabel?: StackLabelProps | '') => { // TODO Type
	switch (postData.postType) {
		case 'income': {
			if (postData.macroCategory === 'vacancy') return navigation.navigate(`ViewVacancyPost${stackLabel || ''}`, { postData })
			return navigation.navigate(`ViewIncomePost${stackLabel || ''}`, { postData })
		}
		case 'socialImpact': return navigation.navigate(`ViewSocialImpactPost${stackLabel || ''}`, { postData })
		case 'culture': return navigation.navigate(`ViewCulturePost${stackLabel || ''}`, { postData })
	}
}

export { navigateToPostView }
