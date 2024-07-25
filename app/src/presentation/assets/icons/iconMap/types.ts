import { FC } from "react";
import { SvgProps } from "react-native-svg";

export type IconVariation = 'default' | 'outlined' | 'white'
export type IconName = 'x' | 'check' | 'description' | 'cash' | 'clip' | 'colorPalet' | 'clock' |
	'calendarEveryday' | 'books' | 'pin' | 'handOnPerson' | 'computerAndPhone' | 'exchange' | 'chat' |
	'mapPoint' | 'arrowRight' | 'arrowLeft' | 'staringEyes' | 'threeDots' | 'share' | 'usedLabel' | 'gift' |
	'salesCart' | 'briefcase' | 'toolbox' | 'heartAndPerson' | 'paperInfo' | 'handOnHeart' | 'personWalking' |
	'city' | 'countryBrazil'

export type Icon = {
	default: FC<SvgProps>
	outlined?: FC<SvgProps>
	white?: FC<SvgProps>
}

export type IconMap = {
	[key in IconName]: Icon;
}

