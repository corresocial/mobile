import React, { useEffect, useState } from 'react'
import { Animated, FlatList, Platform } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import uuid from 'react-uuid'

import { useLocationRepository } from '@data/application/location/useLocationRepository'

import { AddressSearchResult, LatLong, SelectedAddressRender } from '@services/googleMaps/types/types'

import {
	Container,
	ContainerInner,
	DropdownBody,
	DropdownHeader,
	DropdownHeaderContainer,
	MyLocationButtonContainer,
} from './styles'
import MapIcon from '@assets/icons/mapPoint-white.svg'
import { relativeScreenHeight, statusBarHeight } from '@common/screenDimensions'
import { theme } from '@common/theme'

import { PrimaryButton } from '@components/_buttons/PrimaryButton'
import { SearchInput } from '@components/_inputs/SearchInput'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'

import { DefaultDropdownHeader } from '../DefaultDropdownHeader'
import { DropdownItem } from '../DropdownItem'

const { localStorage } = useLocationRepository()

interface LocationNearDropdownProps {
	selectedAddress: SelectedAddressRender
	recentAddresses: AddressSearchResult[]
	addressSuggestions: AddressSearchResult[]
	saveRecentAddresses: (address: AddressSearchResult) => void
	clearAddressSuggestions: () => void
	selectAddress: (address: SelectedAddressRender) => void
	findAddressSuggestions: (text: string) => void
	findNearPosts: (
		searchText: string,
		currentPosition?: boolean,
		alternativeCoordinates?: LatLong,
		refresh?: boolean,
		firstLoad?: boolean
	) => void
}

function LocationNearDropdown({
	selectedAddress,
	recentAddresses,
	addressSuggestions,
	selectAddress,
	saveRecentAddresses,
	clearAddressSuggestions,
	findNearPosts,
	findAddressSuggestions
}: LocationNearDropdownProps) {
	const [searchText, setSearchText] = useState('')
	const [dropdownIsVisible, setDropdownIsVisible] = useState(false)

	const getFormattedAddress = (address: AddressSearchResult) => {
		const greaterThanThree = address.formattedAddress.split(',').length > 3
		if (!Object.keys(address).length) {
			return {
				addressHighlighted: '',
				addressThin: '',
			}
		}

		return {
			addressHighlighted: `${address.formattedAddress.split(',')[0].trim()}${greaterThanThree ? `, ${address.formattedAddress.split(',')[1].trim()}` : ''}`,
			addressThin: `${greaterThanThree ? address.formattedAddress.split(',')[2].trim() : address.formattedAddress.split(',')[1].trim()}${greaterThanThree ? ` - ${address.formattedAddress.split(',')[3].trim()}` : ''}`,
		}
	}

	const findNearPostsByAddress = async (address: AddressSearchResult) => {
		setDropdownIsVisible(false)
		if (!address.recent) {
			await localStorage.saveAddressData(address)
			saveRecentAddresses(address)
		}

		const greaterThanThree = address.formattedAddress.split(',').length > 3
		selectAddress({
			addressHighlighted: `${address.formattedAddress.split(',')[0].trim()}${greaterThanThree ? `, ${address.formattedAddress.split(',')[1].trim()}` : ''}`,
			addressThin: `${greaterThanThree ? address.formattedAddress.split(',')[2].trim() : address.formattedAddress.split(',')[1].trim()}${greaterThanThree ? ` - ${address.formattedAddress.split(',')[3].trim()}` : ''}`,
		})
		findNearPosts(
			'',
			false,
			{
				lat: address.lat,
				lon: address.lon
			}
		)
	}

	const toggleDropdownVisibility = () => {
		setDropdownIsVisible(!dropdownIsVisible)
	}

	const animatedHeight = React.useRef(
		new Animated.Value(relativeScreenHeight(10)),
	).current

	useEffect(() => {
		if (dropdownIsVisible) {
			Animated.timing(animatedHeight, {
				toValue: relativeScreenHeight(91) - statusBarHeight - (Platform.OS === 'ios' ? 70 : 0), // Default ios paddingBottom
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
			<ContainerInner >
				{
					dropdownIsVisible
						? (
							<DropdownHeaderContainer>
								<DropdownHeader>
									<SearchInput
										value={searchText}
										placeholder={'onde você tá?'}
										returnKeyType={'search'}
										onChangeText={(text: string) => {
											setSearchText(text)
											clearAddressSuggestions()
										}}
										onPressKeyboardSubmit={() => {
											findAddressSuggestions(searchText)
										}}
									/>
								</DropdownHeader>
							</DropdownHeaderContainer>
						)
						: (
							<DefaultDropdownHeader
								text={selectedAddress.addressHighlighted || 'não encontramos sua localização'}
								toggleDropdownVisibility={toggleDropdownVisibility}
							/>
						)
				}
				<DropdownBody >
					{
						selectedAddress.addressHighlighted.length > 0 && (
							<DropdownItem
								selected
								dropdownData={selectedAddress}
							/>
						)
					}
					<VerticalSpacing height={RFValue(5)} />
					{
						!searchText.length && (
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
						)
					}
					<VerticalSpacing height={RFValue(5)} />
					<FlatList
						data={!searchText.length ? recentAddresses : addressSuggestions}
						showsVerticalScrollIndicator={false} // Item
						renderItem={({ item }) => (
							<DropdownItem
								key={uuid()}
								dropdownData={getFormattedAddress(item)}
								findNearPosts={() => findNearPostsByAddress(item)}
								recent={item.recent}
							/>
						)}
						ItemSeparatorComponent={() => <VerticalSpacing height={RFValue(5)} />}
						ListFooterComponent={() => <VerticalSpacing height={relativeScreenHeight(20)} />}
					/>
				</DropdownBody>
				{
					dropdownIsVisible && (
						<DefaultDropdownHeader
							text={selectedAddress.addressHighlighted || 'não encontramos sua localização'}
							absolute
							toggleDropdownVisibility={toggleDropdownVisibility}
						/>
					)
				}
			</ContainerInner>
		</Container >
	)
}

export { LocationNearDropdown }
