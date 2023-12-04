import 'react-native-gesture-handler'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import React from 'react'

import { SocialImpactStackParamList } from './types'

import { SocialImpactProvider } from '../../../../contexts/SocialImpactContext'
import { EditSocialImpactPost } from '../../../screens/editPostScreens/EditSocialImpactPost'
import { InsertSocialImpactDescription } from '../../../screens/socialImpactRegisterScreens/InsertSocialImpactDescription'
import { InsertSocialImpactEndDate } from '../../../screens/socialImpactRegisterScreens/InsertSocialImpactEndDate'
import { InsertSocialImpactEndHour } from '../../../screens/socialImpactRegisterScreens/InsertSocialImpactEndHour'
import { InsertSocialImpactLinks } from '../../../screens/socialImpactRegisterScreens/InsertSocialImpactLInks'
import { InsertSocialImpactLocation } from '../../../screens/socialImpactRegisterScreens/InsertSocialImpactLocation'
import { InsertSocialImpactStartDate } from '../../../screens/socialImpactRegisterScreens/InsertSocialImpactStartDate'
import { InsertSocialImpactStartHour } from '../../../screens/socialImpactRegisterScreens/InsertSocialImpactStartHour'
import { SelectSocialImpactCategory } from '../../../screens/socialImpactRegisterScreens/SelectSocialImpactCategory'
import { SelectSocialImpactDaysOfWeek } from '../../../screens/socialImpactRegisterScreens/SelectSocialImpactDaysOfWeek'
import { SelectSocialImpactExhibitionRange } from '../../../screens/socialImpactRegisterScreens/SelectSocialImpactExhibitionRange'
import { SelectSocialImpactLocationView } from '../../../screens/socialImpactRegisterScreens/SelectSocialImpactLocationView'
import { SelectSocialImpactTags } from '../../../screens/socialImpactRegisterScreens/SelectSocialImpactTags'
import { SocialImpactLocationViewPreview } from '../../../screens/socialImpactRegisterScreens/SocialImpactLocationViewPreview'
import { SocialImpactPicturePreview } from '../../../screens/socialImpactRegisterScreens/SocialImpactPicturePreview'
import { SelectSocialImpactRange } from '../../../screens/socialImpactRegisterScreens/SelectSocialImpactRange'
import { SelectSocialImpactRepeat } from '../../../screens/socialImpactRegisterScreens/SelectSocialImpactRepeat'
import { SelectSocialImpactFrequency } from '../../../screens/socialImpactRegisterScreens/SelectSocialImpactFrequency'
import { SelectSocialImpactType } from '../../../screens/socialImpactRegisterScreens/SelectSocialImpactType'
import { SelectSocialImpactPurpose } from '../../../screens/socialImpactRegisterScreens/SelectSocialImpactPurpose'

const Stack = createStackNavigator<SocialImpactStackParamList>()

export function SocialImpactStack() {
	return (
		<SocialImpactProvider>
			<Stack.Navigator
				initialRouteName={'SelectSocialImpactType'}
				screenOptions={{
					headerShown: false,
					gestureEnabled: true,
					...TransitionPresets.SlideFromRightIOS,
				}}
			>
				<Stack.Screen name={'SelectSocialImpactType'} component={SelectSocialImpactType} />
				<Stack.Screen name={'SelectSocialImpactPurpose'} component={SelectSocialImpactPurpose} />
				<Stack.Screen name={'SelectSocialImpactCategory'} component={SelectSocialImpactCategory} />
				<Stack.Screen name={'SelectSocialImpactTags'} component={SelectSocialImpactTags} />
				<Stack.Screen name={'InsertSocialImpactDescription'} component={InsertSocialImpactDescription} />
				<Stack.Screen name={'InsertSocialImpactLinks'} component={InsertSocialImpactLinks} />
				<Stack.Screen name={'SocialImpactPicturePreview'} component={SocialImpactPicturePreview} />
				<Stack.Screen name={'SelectSocialImpactRange'} component={SelectSocialImpactRange} />
				<Stack.Screen name={'InsertSocialImpactLocation'} component={InsertSocialImpactLocation} />
				<Stack.Screen name={'SelectSocialImpactLocationView'} component={SelectSocialImpactLocationView} />
				<Stack.Screen name={'SocialImpactLocationViewPreview'} component={SocialImpactLocationViewPreview} />
				<Stack.Screen name={'SelectSocialImpactExhibitionRange'} component={SelectSocialImpactExhibitionRange} />
				<Stack.Screen name={'SelectSocialImpactFrequency'} component={SelectSocialImpactFrequency} />
				<Stack.Screen name={'SelectSocialImpactDaysOfWeek'} component={SelectSocialImpactDaysOfWeek} />
				<Stack.Screen name={'SelectSocialImpactRepeat'} component={SelectSocialImpactRepeat} />
				<Stack.Screen name={'InsertSocialImpactStartDate'} component={InsertSocialImpactStartDate} />
				<Stack.Screen name={'InsertSocialImpactEndDate'} component={InsertSocialImpactEndDate} />
				<Stack.Screen name={'InsertSocialImpactStartHour'} component={InsertSocialImpactStartHour} />
				<Stack.Screen name={'InsertSocialImpactEndHour'} component={InsertSocialImpactEndHour} />
				<Stack.Screen name={'EditSocialImpactPostReview'} component={EditSocialImpactPost} />
			</Stack.Navigator>
		</SocialImpactProvider>
	)
}
