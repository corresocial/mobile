import React, { useEffect, useState } from 'react'
import { StatusBar, ScrollView } from 'react-native'

import { Body, Container, Header, OptionsArea, Sigh, UserAndValueContainer } from './styles'
import { theme } from '../../../common/theme'
import { screenHeight } from '../../../common/screenDimensions'
import ShareIcon from '../../../assets/icons/share.svg'
import ChatIcon from '../../../assets/icons/chat.svg'
import ThreeDotsIcon from '../../../assets/icons/threeDots.svg'

import { getPostById } from '../../../services/firebase/post/getPostById'
import { formatRelativeDate } from '../../../common/auxiliaryFunctions'

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

function ViewServicePost({ route, navigation }: ViewServicePostScreenProps) {
	const [postData, setPostData] = useState({} as ServiceCollectionRemote)

	useEffect(() => {
		const successGettingPostData = async () => {
			await getPostData()
		}
		successGettingPostData()
	}, [])

	const getPostData = async () => {
		const postDataFromDb = await getPostById(route.params.postId, 'services')
		setPostData(postDataFromDb as any)
		return true
	}

	const renderFormatedPostDateTime = () => {
		if (!postData.createdAt) return '---'
		const { seconds } = postData.createdAt as any
		const formatedDate = formatRelativeDate((seconds * 1000))
		return formatedDate
	}

	console.log(postData)

	return (
		<Container>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
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
					<SmallButton
						color={theme.white3}
						SvgIcon={ThreeDotsIcon}
						relativeWidth={screenHeight * 0.05}
						height={screenHeight * 0.05}
						onPress={() => { }}
					/>
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
						postData.picturesUrl && postData.picturesUrl.length && (
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
						postId={route.params.postId}
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
					<Sigh />
				</ScrollView>
			</Body>
		</Container>
	)
}

export { ViewServicePost }
