import "react-native-gesture-handler";
import React from "react";
import {
	createStackNavigator,
	TransitionPresets,
} from "@react-navigation/stack";

import { SaleProvider } from "@contexts/SaleContext";

import { SelectSaleCategory } from "@screens/saleRegisterScreens/SelectSaleCategory";
import { SelectSaleTags } from "@screens/saleRegisterScreens/SelectSaleTags";
import { InsertSaleTitle } from "@screens/saleRegisterScreens/InsertSaleTitle";
import { InsertItemDescription } from "@screens/saleRegisterScreens/InsertItemDescription";
import { InsertSalePicture } from "@screens/saleRegisterScreens/InsertSalePicture";
import { SalePicturePreview } from "@screens/saleRegisterScreens/SalePicturePreview";
import { SelectPaymentType } from "@screens/saleRegisterScreens/SelectPaymentType";
import { InsertSaleValue } from "@screens/saleRegisterScreens/InsertSaleValue";
import { InsertExchangeValue } from "@screens/saleRegisterScreens/InsertExchangeValue";
import { InsertSaleLocation } from "@screens/saleRegisterScreens/InsertSaleLocation";
import { SelectLocationView } from "@screens/saleRegisterScreens/SelectLocationView";
import { LocationViewPreview } from "@screens/saleRegisterScreens/LocationViewPreview";
import { SelectDeliveryMethod } from "@screens/saleRegisterScreens/SelectDeliveryMethod";
import { SelectSaleFrequency } from "@screens/saleRegisterScreens/SelectSaleFrequency";
import { SelectDaysOfWeek } from "@screens/saleRegisterScreens/SelectDaysOfWeek";
import { InsertOpeningHour } from "@screens/saleRegisterScreens/InsertOpeningHour";
import { InsertClosingHour } from "@screens/saleRegisterScreens/InsertClosingHour";
import { SaleStackParamList } from "./types";

const Stack = createStackNavigator<SaleStackParamList>();

export function SaleStack() {
	return (
		<SaleProvider>
			<Stack.Navigator
				initialRouteName={"SelectSaleCategory"}
				screenOptions={{
					headerShown: false,
					gestureEnabled: true,
					...TransitionPresets.SlideFromRightIOS,
				}}
			>
				<Stack.Screen
					name={"SelectSaleCategory"}
					component={SelectSaleCategory}
				/>
				<Stack.Screen
					name={"SelectSaleTags"}
					component={SelectSaleTags}
				/>
				<Stack.Screen
					name={"InsertSaleTitle"}
					component={InsertSaleTitle}
				/>
				<Stack.Screen
					name={"InsertItemDescription"}
					component={InsertItemDescription}
				/>
				<Stack.Screen
					name={"InsertSalePicture"}
					component={InsertSalePicture}
				/>
				<Stack.Screen
					name={"SalePicturePreview"}
					component={SalePicturePreview}
				/>
				<Stack.Screen
					name={"SelectPaymentType"}
					component={SelectPaymentType}
				/>
				<Stack.Screen
					name={"InsertSaleValue"}
					component={InsertSaleValue}
				/>
				<Stack.Screen
					name={"InsertExchangeValue"}
					component={InsertExchangeValue}
				/>
				<Stack.Screen
					name={"SelectLocationView"}
					component={SelectLocationView}
				/>
				<Stack.Screen
					name={"InsertSaleLocation"}
					component={InsertSaleLocation}
				/>
				<Stack.Screen
					name={"LocationViewPreview"}
					component={LocationViewPreview}
				/>
				<Stack.Screen
					name={"SelectDeliveryMethod"}
					component={SelectDeliveryMethod}
				/>
				<Stack.Screen
					name={"SelectSaleFrequency"}
					component={SelectSaleFrequency}
				/>
				<Stack.Screen
					name={"SelectDaysOfWeek"}
					component={SelectDaysOfWeek}
				/>
				<Stack.Screen
					name={"InsertOpeningHour"}
					component={InsertOpeningHour}
				/>
				<Stack.Screen
					name={"InsertClosingHour"}
					component={InsertClosingHour}
				/>
			</Stack.Navigator>
		</SaleProvider>
	);
}
