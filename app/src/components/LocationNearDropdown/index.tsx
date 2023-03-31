import React, { useEffect, useState } from 'react'
import { Animated, FlatList, Platform } from 'react-native'
import uuid from 'react-uuid'
import { RFValue } from 'react-native-responsive-fontsize'

import { theme } from '@common/theme'
import {
	relativeScreenHeight,
	statusBarHeight,
} from '@common/screenDimensions'
import LoupIcon from '@assets/icons/loup.svg'
import XIcon from '@assets/icons/x-thin.svg'
import MapIcon from '@assets/icons/map.svg'

import { setRecentAddressOnStorage } from '@services/maps/recentAddresses'

import {
	AddressSearchResult,
	LatLong,
	SelectedAddressRender,
} from '@services/maps/types'
import {
	Container,
	ContainerInner,
	DropdownBody,
	DropdownHeader,
	DropdownHeaderContainer,
	Sigh,
	IconArea,
	SearchInput,
	MyLocationButtonContainer,
	BigSigh,
} from './styles'

import { DropdownItem } from '../DropdownItem'
import { SmallButton } from '../_buttons/SmallButton'
import { PrimaryButton } from '../_buttons/PrimaryButton'
import { DefaultDropdownHeader } from '../DefaultDropdownHeader'

interface LocationNearDropdownProps {
	selectedAddress: SelectedAddressRender;
	recentAddresses: AddressSearchResult[];
	addressSuggestions: AddressSearchResult[];
	saveRecentAddresses: (address: AddressSearchResult) => void;
	clearAddressSuggestions: () => void;
	selectAddress: (address: SelectedAddressRender) => void;
	findAddressSuggestions: (text: string) => void;
	findNearPosts: (
		text: string,
		currentPosition: boolean,
		searchOptions?: LatLong
	) => void;
}

function LocationNearDropdown({
	selectedAddress,
	recentAddresses,
	addressSuggestions,
	selectAddress,
	saveRecentAddresses,
	clearAddressSuggestions,
	findNearPosts,
	findAddressSuggestions,
}: LocationNearDropdownProps) {
	const [searchText, setSearchText] = useState('')
	const [dropdownIsVisible, setDropdownIsVisible] = useState(false)

	const getFormattedAddress = (address: AddressSearchResult) => {
		const greaterThanThree = address.formattedAddress.split(',').length > 3
		if (Object.keys(address).length < 1) {
			return {
				addressHighlighted: '',
				addressThin: '',
			}
		}
		return {
			addressHighlighted: `${address.formattedAddress
				.split(',')[0]
				.trim()}${
				greaterThanThree
					? `, ${address.formattedAddress.split(',')[1].trim()}`
					: ''
			}`,
			addressThin: `${
				greaterThanThree
					? address.formattedAddress.split(',')[2].trim()
					: address.formattedAddress.split(',')[1].trim()
			}${
				greaterThanThree
					? ` - ${address.formattedAddress.split(',')[3].trim()}`
					: ''
			}`,
		}
	}

	const findNearPostsByAddress = async (address: AddressSearchResult) => {
		setDropdownIsVisible(false)
		if (!address.recent) {
			await setRecentAddressOnStorage(address)
			saveRecentAddresses(address)
		}

		const greaterThanThree = address.formattedAddress.split(',').length > 3
		selectAddress({
			addressHighlighted: `${address.formattedAddress
				.split(',')[0]
				.trim()}${
				greaterThanThree
					? `, ${address.formattedAddress.split(',')[1].trim()}`
					: ''
			}`,
			addressThin: `${
				greaterThanThree
					? address.formattedAddress.split(',')[2].trim()
					: address.formattedAddress.split(',')[1].trim()
			}${
				greaterThanThree
					? ` - ${address.formattedAddress.split(',')[3].trim()}`
					: ''
			}`,
		})
		findNearPosts('', false, {
			lat: address.lat,
			lon: address.lon,
		})
	}

	const toggleDropdownVisibility = () => {
		setDropdownIsVisible(!dropdownIsVisible)
	}

	const animatedHeight = React.useRef(
		new Animated.Value(relativeScreenHeight(10))
	).current

	useEffect(() => {
		if (dropdownIsVisible) {
			Animated.timing(animatedHeight, {
				toValue:
					relativeScreenHeight(91)
					- statusBarHeight
					- (Platform.OS === 'ios' ? 70 : 0), // Default ios paddingBottom
				duration: 400,
				useNativeDriver: false,
			}).start()
		} else {
			Animated.timing(animatedHeight, {
				toValue: relativeScreenHeight(10),
				duration: 400,
				useNativeDriver: false,
			}).start()
		}
	}, [dropdownIsVisible])

	return (
		<Container style={{ height: animatedHeight }}>
			<ContainerInner>
				{dropdownIsVisible ? (
					<DropdownHeaderContainer>
						<DropdownHeader>
							<IconArea>
								{searchText.length < 1 ? (
									<LoupIcon
										width={RFValue(22)}
										height={RFValue(22)}
									/>
								) : (
									<SmallButton
										height={relativeScreenHeight(4.5)}
										relativeWidth={relativeScreenHeight(
											4.5
										)}
										color={theme.white3}
										onPress={() => {
											clearAddressSuggestions()
											setSearchText('')
										}}
										SvgIcon={XIcon}
									/>
								)}
							</IconArea>
							<SearchInput
								value={searchText}
								placeholder={'onde você tá?'}
								returnKeyType={'search'}
								onChangeText={(text: string) => {
									setSearchText(text)
									clearAddressSuggestions()
								}}
								onSubmitEditing={() => {
									findAddressSuggestions(searchText)
								}}
							/>
						</DropdownHeader>
					</DropdownHeaderContainer>
				) : (
					<DefaultDropdownHeader
						text={
							selectedAddress.addressHighlighted
							|| 'não encontramos sua localização'
						}
						toggleDropdownVisibility={toggleDropdownVisibility}
					/>
				)}
				<DropdownBody>
					{selectedAddress.addressHighlighted.length > 0 && (
						<DropdownItem selected dropdownData={selectedAddress} />
					)}
					<Sigh />
					{searchText.length < 1 && (
						<MyLocationButtonContainer>
							<PrimaryButton
								keyboardHideButton={false}
								color={theme.green3}
								label={'usar minha localização'}
								highlightedWords={['minha', 'localização']}
								labelColor={theme.white3}
								fontSize={16}
								SecondSvgIcon={MapIcon}
								svgIconScale={['50%', '30%']}
								onPress={() => {
									setDropdownIsVisible(false)
									findNearPosts('', true)
								}}
							/>
						</MyLocationButtonContainer>
					)}
					<Sigh />
					<FlatList
						data={
							searchText.length < 1
								? recentAddresses
								: addressSuggestions
						}
						showsVerticalScrollIndicator={false} // Item
						renderItem={({ item }) => (
							<DropdownItem
								key={uuid()}
								dropdownData={getFormattedAddress(item)}
								findNearPosts={() => findNearPostsByAddress(item)}
								recent={item.recent}
							/>
						)}
						ItemSeparatorComponent={() => <Sigh />}
						ListFooterComponent={() => <BigSigh />}
					/>
				</DropdownBody>
				{dropdownIsVisible && (
					<DefaultDropdownHeader
						text={
							selectedAddress.addressHighlighted
							|| 'não encontramos sua localização'
						}
						absolute
						toggleDropdownVisibility={toggleDropdownVisibility}
					/>
				)}
			</ContainerInner>
		</Container>
	)
}

export { LocationNearDropdown }
