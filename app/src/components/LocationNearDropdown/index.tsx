import React, { useEffect, useState } from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import * as Location from 'expo-location'
import { Animated, FlatList, KeyboardAvoidingView } from 'react-native'

import uuid from 'react-uuid'
import { Container, ContainerInner, DropdownBody, DropdownHeader, DropdownHeaderContainer, Sigh, IconArea, SearchInput, MyLocationButtonContainer, BigSigh } from './styles'
import { screenHeight, screenWidth } from '../../common/screenDimensions'
import LoupIcon from '../../assets/icons/loup.svg'
import AngleUpIcon from '../../assets/icons/angleUp.svg'
import XIcon from '../../assets/icons/x-thin.svg'

import MapIcon from '../../assets/icons/map.svg'

import { DropdownItem } from '../DropdownItem'
import { SmallButton } from '../_buttons/SmallButton'
import { theme } from '../../common/theme'
import { PrimaryButton } from '../_buttons/PrimaryButton'
import { DefaultDropdownHeader } from '../DefaultDropdownHeader'
import { PostCollection } from '../../services/firebase/types'

interface LocationNearDropdownProps {
	recentLocations: PostCollection[]
	nearPosts: PostCollection[]
	findNearPosts: (text: string) => void
}

function LocationNearDropdown({ recentLocations, nearPosts, findNearPosts }: LocationNearDropdownProps) {
	const [locationSelected, setLocationSelected] = useState('Rua Adenilson barreira da silva porto velho')
	const [searchText, setSearchText] = useState('')
	const [dropdownIsVisible, setDropdownIsVisible] = useState(false)

	const animatedHeight = React.useRef(
		new Animated.Value(screenHeight * 0.1),
	).current

	useEffect(() => {
		if (dropdownIsVisible) {
			Animated.timing(animatedHeight, {
				toValue: screenHeight * 0.88,
				duration: 400,
				useNativeDriver: false,
			}).start()
		} else {
			Animated.timing(animatedHeight, {
				toValue: screenHeight * 0.1,
				duration: 400,
				useNativeDriver: false,
			}).start()
		}
	}, [dropdownIsVisible])

	return (
		<KeyboardAvoidingView>
			<Container style={{ height: animatedHeight }}>
				<ContainerInner>
					{
						dropdownIsVisible
							? (
								<DropdownHeaderContainer>
									<DropdownHeader>
										<IconArea onPress={() => setDropdownIsVisible(false)}>
											{
												searchText.length < 1
													? <LoupIcon width={RFValue(22)} height={RFValue(22)} />
													: (
														<SmallButton
															height={screenHeight * 0.04}
															relativeWidth={screenHeight * 0.04}
															svgScale={13}
															color={theme.white3}
															onPress={() => setSearchText('')}
															SvgIcon={XIcon}
														/>
													)
											}
										</IconArea>
										<SearchInput
											value={searchText}
											placeholder={'onde você tá?'}
											returnKeyType={'search'}
											onChangeText={(text: string) => setSearchText(text)}
											onSubmitEditing={() => findNearPosts(searchText)}
										/>
									</DropdownHeader>
								</DropdownHeaderContainer>
							)
							: (
								<DefaultDropdownHeader
									text={locationSelected}
									openDropDown={() => setDropdownIsVisible(true)}
									closeDropDown={() => setDropdownIsVisible(false)}
								/>
							)
					}
					<DropdownBody >
						<DropdownItem selected />
						<Sigh />
						<MyLocationButtonContainer>
							<PrimaryButton
								startsHidden={false}
								color={theme.green3}
								label={'usar minha localização'}
								highlightedWords={['minha', 'localização']}
								labelColor={theme.white3}
								fontSize={16}
								SecondSvgIcon={MapIcon}
								svgIconScale={['50%', '30%']}
								onPress={() => { }}
							/>
						</MyLocationButtonContainer>
						<Sigh />
						<FlatList
							data={searchText.length > 0 ? nearPosts : recentLocations}
							showsVerticalScrollIndicator={false}
							renderItem={() => <DropdownItem key={uuid()} />}
							ItemSeparatorComponent={() => <Sigh />}
							ListFooterComponent={() => <BigSigh />}
						/>
					</DropdownBody>
					{
						dropdownIsVisible && (
							<DefaultDropdownHeader
								text={locationSelected}
								absolute
								openDropDown={() => setDropdownIsVisible(true)}
								closeDropDown={() => setDropdownIsVisible(false)}
							/>
						)
					}
				</ContainerInner>
			</Container >
		</KeyboardAvoidingView>
	)
}

export { LocationNearDropdown }
