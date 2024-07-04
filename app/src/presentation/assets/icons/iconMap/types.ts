import { FC } from "react";
import { SvgProps } from "react-native-svg";

export type IconVariation = 'default' | 'outlined' | 'white'
export type IconName = 'x' | 'check'

export type Icon = {
    default: FC<SvgProps>
    outlined?: FC<SvgProps>
    white?: FC<SvgProps>
}

export type IconMap = {
    [key in IconName]: Icon;
}

