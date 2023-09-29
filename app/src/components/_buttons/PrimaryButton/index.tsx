import React, { useEffect, useRef, useState } from 'react'
import { Keyboard, TextStyle, ViewStyle } from 'react-native'
import { SvgProps } from 'react-native-svg'
import { RFValue } from 'react-native-responsive-fontsize'

import {
	ButtonLabel,
	TouchableContainer,
	ContainerSurface,
	ContainerBottom
} from './styles'

import { showMessageWithHighlight } from '../../../common/auxiliaryFunctions'
import { relativeScreenWidth } from '../../../common/screenDimensions'
import { Timer } from '../../Timer'
import { theme } from '../../../common/theme'

interface PrimaryButtonProps {
	relativeWidth?: string
	relativeHeight?: string | number
	disabled?: boolean
	minHeight?: number
	color: string
	label?: string
	labelColor?: string
	labelMarginLeft?: number | string
	iconName?: string
	timer?: boolean
	SvgIcon?: React.FC<SvgProps>
	SecondSvgIcon?: React.FC<SvgProps>
	svgIconScale?: [height: string, width: string]
	fontSize?: number
	textAlign?: TextStyle['textAlign']
	keyboardHideButton?: boolean
	startsHidden?: boolean
	highlightedWords?: string[]
	justifyContent?: ViewStyle['justifyContent']
	flexDirection?: ViewStyle['flexDirection']
	onPress: (() => void) | undefined
}

function PrimaryButton({
	relativeWidth,
	relativeHeight,
	minHeight = 65,
	disabled,
	color,
	labelColor,
	label,
	labelMarginLeft,
	highlightedWords,
	iconName,
	fontSize = 18,
	textAlign = 'center',
	timer,
	SvgIcon,
	SecondSvgIcon,
	svgIconScale = ['40%', '25%'],
	keyboardHideButton = true,
	startsHidden = false,
	justifyContent,
	flexDirection,
	onPress
}: PrimaryButtonProps) {
	const [buttonPressed, setButtomPressed] = useState<boolean>(disabled || false)
	const [buttonDisabled, setButtonDisabled] = useState<boolean>(disabled || false)
	const [timerReset, setTimerReset] = useState<boolean>(disabled || false)
	const [buttonVisibility, setButtonVisibility] = useState<boolean>(true)

	const buttonRef = useRef<any>()

	useEffect(() => {
		if (startsHidden && keyboardHideButton) {
			setButtonVisibility(false)
		}
		if (!keyboardHideButton) return
		const unsubscribeShow = Keyboard.addListener('keyboardDidShow', () => hideButton())
		const unsubscribeHide = Keyboard.addListener('keyboardDidHide', () => showButton())

		return () => {
			unsubscribeShow.remove()
			unsubscribeHide.remove()
		}
	}, [])

	const resetTimer = () => {
		setTimerReset((previous) => !previous)
	}

	const hideButton = async () => {
		if (!buttonRef.current) return
		buttonRef.current.fadeOutDown(400).then((endState: any) => endState.finished && setButtonVisibility(false))
	}

	const showButton = () => {
		if (!buttonRef.current) return
		setButtonVisibility(true)
		buttonRef.current.fadeInUp(400)
	}

	function pressingButton() {
		if (buttonDisabled) return
		setButtomPressed(true)
	}

	function notPressingButton() {
		if (buttonDisabled) return
		setButtomPressed(false)
	}

	function releaseButton() {
		if (buttonDisabled) return
		if (timer) {
			resetTimer()
			setButtonDisabled(true)
			setButtomPressed(true)
		}

		setButtomPressed(false)
		onPress && onPress()
	}

	return (
		<TouchableContainer
			onPressIn={pressingButton}
			onPressOut={notPressingButton}
			onPress={releaseButton}
		>
			<ContainerBottom
				ref={buttonRef}
				style={{
					display: buttonVisibility ? 'flex' : 'none',
					opacity: buttonVisibility ? 1 : 0,
					width: relativeWidth || '100%',
					height: relativeHeight || RFValue(65),
					minHeight: RFValue(minHeight),
					justifyContent
				}}
			>
				<ContainerSurface
					style={{
						backgroundColor: buttonDisabled ? theme.white3 : color,
						flexDirection: flexDirection || 'row',
						justifyContent: justifyContent || 'center',
						minHeight: RFValue(minHeight),
						marginLeft: buttonPressed ? RFValue(7) : 0
					}}
				>
					{
						!!SecondSvgIcon && <SecondSvgIcon height={svgIconScale?.[0]} width={svgIconScale?.[1]} />
					}
					{!!label
						&& (
							<ButtonLabel style={{
								color: labelColor,
								fontSize: RFValue(fontSize),
								textAlign,
								marginLeft: labelMarginLeft || 0,
								marginRight: iconName ? relativeScreenWidth(3) : 0
							}}
							>
								{showMessageWithHighlight(label, highlightedWords || label.split(' '))}
							</ButtonLabel>
						)}
					{
						!!SvgIcon && <SvgIcon height={svgIconScale?.[0]} width={svgIconScale?.[1]} />
					}
					{
						!!timer && (
							!!buttonDisabled && (
								<Timer
									initialTimeInMinutes={0.05}
									counterTextOnly
									resetTimer={timerReset}
									onTimeIsOver={() => {
										setButtonDisabled(false)
										setButtomPressed(false)
									}}
								/>
							)
						)
					}
				</ContainerSurface>
			</ContainerBottom>
		</TouchableContainer>
	)
}

export { PrimaryButton }
