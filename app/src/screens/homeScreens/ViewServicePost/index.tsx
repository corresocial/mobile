import React, { useEffect, useState } from 'react'
import { StatusBar, ScrollView, Alert } from 'react-native'

import { Body, Container, Header, LastSigh, OptionsArea, Sigh, UserAndValueContainer } from './styles'
import { theme } from '../../../common/theme'
import { screenHeight } from '../../../common/screenDimensions'
import ShareIcon from '../../../assets/icons/share.svg'
import ChatIcon from '../../../assets/icons/chat.svg'
import ThreeDotsIcon from '../../../assets/icons/threeDots.svg'

import { arrayIsEmpty, formatRelativeDate } from '../../../common/auxiliaryFunctions'

import { ViewServicePostScreenProps } from '../../../routes/Stack/UserStack/stackScreenProps'

import { DefaultPostViewHeader } from '../../../components/DefaultPostViewHeader'
import { ServiceCollectionRemote } from '../../../services/firebase/types'
import { SmallUserIdentification } from '../../../components/SmallUserIdentification'
import { SaleExchangeValue } from '../../../components/SaleExchangeValue'
import { SmallButton } from '../../../components/_buttons/SmallButton'
import { DescriptionCard } from '../../../components/_cards/DescriptionCard'
import { ImageCarousel } from '../../../components/ImageCarousel'
import { SaleOrExchangeCard } from '../../../components/_cards/SaleOrExchangeCard'
import { DateTimeCard } from '../../../components/_cards/DateTimeCard'
import { DeliveryMethodCard } from '../../../components/_cards/DeliveryMethodCard'
import { LocationViewCard } from '../../../components/_cards/LocationViewCard'
import { PostPopOver } from '../../../components/PostPopOver'

function ViewServicePost({ route, navigation }: ViewServicePostScreenProps) {
	const [postData, setPostData] = useState({} as ServiceCollectionRemote)
	const [profileOptionsIsOpen, setPostOptionsIsOpen] = useState(false)

	useEffect(() => {
		setPostDataFromRoute()
	}, [])

	const setPostDataFromRoute = async () => {
		const postDataFromRoute = { ...route.params.postData }
		setPostData(postDataFromRoute as any) // TODO any
		return true
	}

	const renderFormatedPostDateTime = () => {
		const formatedDate = formatRelativeDate(postData.createdAt)
		return formatedDate
	}

	const getProfilePictureUrl = () => {
		if (!postData || !postData.owner || !postData.owner.profilePictureUrl) return null
		if (arrayIsEmpty(postData.owner.profilePictureUrl)) return null
		return postData.owner.profilePictureUrl[0]
	}

	return (
		<Container>
			<StatusBar backgroundColor={profileOptionsIsOpen ? 'rgba(0,0,0,0.5)' : theme.white3} barStyle={'dark-content'} />
			<Header>
				<DefaultPostViewHeader
					onBackPress={() => navigation.goBack()}
					text={postData.title}
				/>
				<UserAndValueContainer>
					<SmallUserIdentification
						userName={postData.owner ? postData.owner.name : 'usuário do corre.'}
						postDate={renderFormatedPostDateTime()}
						userNameFontSize={14}
						pictureDimensions={45}
						profilePictureUrl={getProfilePictureUrl()}
						width={'60%'}
					/>
					<SaleExchangeValue
						saleValue={postData.saleValue}
						exchangeValue={postData.exchangeValue}
						breakRow
						smallFontSize={14}
						largeFontSize={25}
						exchanveFontSize={14}
					/>
				</UserAndValueContainer>
				<OptionsArea>
					<SmallButton
						color={theme.white3}
						fontSize={14}
						SvgIcon={ShareIcon}
						relativeWidth={screenHeight * 0.05}
						height={screenHeight * 0.05}
						onPress={() => { }}
					/>
					<SmallButton
						color={theme.green2}
						label={'contratar'}
						fontSize={14}
						SvgIcon={ChatIcon}
						relativeWidth={'63%'}
						height={screenHeight * 0.05}
						onPress={() => { }}
					/>
					<PostPopOver
						postTitle={postData.title || 'publicação no corre.'}
						postId={postData.postId}
						postType={postData.postType}
						popoverVisibility={profileOptionsIsOpen}
						closePopover={() => setPostOptionsIsOpen(false)}
						onPress={() => Alert.alert('go to complaint')}
					>
						<SmallButton
							color={theme.white3}
							SvgIcon={ThreeDotsIcon}
							relativeWidth={screenHeight * 0.05}
							height={screenHeight * 0.05}
							onPress={() => setPostOptionsIsOpen(true)}
						/>
					</PostPopOver>
				</OptionsArea>
			</Header>
			<Body>
				<ScrollView showsVerticalScrollIndicator={false} >
					<DescriptionCard
						title={'descrição do serviço'}
						text={'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centurie.'}
						textFontSize={14}
					/>
					<Sigh />
					{
						!arrayIsEmpty(postData.picturesUrl) && (
							<>
								<ImageCarousel
									picturesUrl={postData.picturesUrl && postData.picturesUrl}
								/>
								<Sigh />
							</>
						)
					}
					<SaleOrExchangeCard
						title={'venda ou troca'}
						saleValue={postData.saleValue}
						exchangeValue={postData.exchangeValue}
					/>
					<Sigh />
					<LocationViewCard
						title={'localização'}
						locationView={postData.locationView}
						postType={postData.postType}
						postId={route.params.postData.postId as string}
						textFontSize={16}
					/>
					<Sigh />
					<DateTimeCard
						title={'dias e horários'}
						weekDaysfrequency={postData.attendanceFrequency}
						daysOfWeek={postData.attendanceWeekDays}
						openingTime={postData.openingHour}
						closingTime={postData.closingHour}
						textFontSize={14}
					/>
					<Sigh />
					<DeliveryMethodCard
						title={'entrega'}
						deliveryMethod={postData.deliveryMethod}
						textFontSize={16}
					/>
					<LastSigh />
				</ScrollView>
			</Body>
		</Container>
	)
}

export { ViewServicePost }
