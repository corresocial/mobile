import 'react-native-gesture-handler'
import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'

import { SocialImpactStackParamList } from './types'

import { SocialImpactProvider } from '../../../contexts/SocialImpactContext'

import { SelectSocialImpactCategory } from '../../../screens/socialImpactRegisterScreens/SelectSocialImpactCategory'
import { SelectSocialImpactTags } from '../../../screens/socialImpactRegisterScreens/SelectSocialImpactTags'
import { InsertSocialImpactTitle } from '../../../screens/socialImpactRegisterScreens/InsertSocialImpactTitle'
import { InsertSocialImpactDescription } from '../../../screens/socialImpactRegisterScreens/InsertSocialImpactDescription'
import { InsertSocialImpactPicture } from '../../../screens/socialImpactRegisterScreens/InsertSocialImpactPicture'
import { SocialImpactPicturePreview } from '../../../screens/socialImpactRegisterScreens/SocialImpactPicturePreview'
import { SelectSocialImpactExhibitionRange } from '../../../screens/socialImpactRegisterScreens/SelectSocialImpactExhibitionRange'
import { InsertSocialImpactLocation } from '../../../screens/socialImpactRegisterScreens/InsertSocialImpactLocation'
import { SelectSocialImpactLocationView } from '../../../screens/socialImpactRegisterScreens/SelectSocialImpactLocationView'
import { SocialImpactLocationViewPreview } from '../../../screens/socialImpactRegisterScreens/SocialImpactLocationViewPreview'
import { SelectDaysOfWeek } from '../../../screens/socialImpactRegisterScreens/SelectDaysOfWeek'
import { InsertOpeningHour } from '../../../screens/socialImpactRegisterScreens/InsertOpeningHour'
import { InsertClosingHour } from '../../../screens/socialImpactRegisterScreens/InsertClosingHour'
import { SelectSocialImpactRepeat } from '../../../screens/socialImpactRegisterScreens/SelectSocialImpactRepeat'

const Stack = createStackNavigator<SocialImpactStackParamList>()

export function SocialImpactStack() {
	return (
		<SocialImpactProvider>
			<Stack.Navigator
				initialRouteName={'SelectSocialImpactCategory'}
				screenOptions={{
					headerShown: false,
					gestureEnabled: true,
					...TransitionPresets.SlideFromRightIOS,
				}}
			>
				<Stack.Screen name={'SelectSocialImpactCategory'} component={SelectSocialImpactCategory} />
				<Stack.Screen name={'SelectSocialImpactTags'} component={SelectSocialImpactTags} />
				<Stack.Screen name={'InsertSocialImpactTitle'} component={InsertSocialImpactTitle} />
				<Stack.Screen name={'InsertSocialImpactDescription'} component={InsertSocialImpactDescription} />
				<Stack.Screen name={'InsertSocialImpactPicture'} component={InsertSocialImpactPicture} />
				<Stack.Screen name={'SocialImpactPicturePreview'} component={SocialImpactPicturePreview} />
				<Stack.Screen name={'SelectSocialImpactExhibitionRange'} component={SelectSocialImpactExhibitionRange} />
				<Stack.Screen name={'InsertSocialImpactLocation'} component={InsertSocialImpactLocation} />
				<Stack.Screen name={'SelectSocialImpactLocationView'} component={SelectSocialImpactLocationView} />
				<Stack.Screen name={'SocialImpactLocationViewPreview'} component={SocialImpactLocationViewPreview} />
				<Stack.Screen name={'SelectDaysOfWeek'} component={SelectDaysOfWeek} />
				<Stack.Screen name={'InsertOpeningHour'} component={InsertOpeningHour} />
				<Stack.Screen name={'InsertClosingHour'} component={InsertClosingHour} />
				<Stack.Screen name={'SelectSocialImpactRepeat'} component={SelectSocialImpactRepeat} />
			</Stack.Navigator>
		</SocialImpactProvider>
	)
}
