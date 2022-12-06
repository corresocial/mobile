import React, { useEffect, useState } from 'react'
import { StatusBar, ScrollView, Alert } from 'react-native'

import {
	Body,
	Container,
	Header,
	LastSigh,
	OptionsArea,
	Sigh,
	UserAndValueContainer,
	VacancyDetails,
	VacancyDetailsItem
} from './styles'
import { theme } from '../../../common/theme'
import { screenHeight } from '../../../common/screenDimensions'
import ShareIcon from '../../../assets/icons/share.svg'
import ChatIcon from '../../../assets/icons/chat.svg'
import ThreeDotsIcon from '../../../assets/icons/threeDots.svg'

import { arrayIsEmpty, formatRelativeDate, showMessageWithHighlight } from '../../../common/auxiliaryFunctions'

import { ViewVacancyPostScreenProps } from '../../../routes/Stack/UserStack/stackScreenProps'

import { DefaultPostViewHeader } from '../../../components/DefaultPostViewHeader'
import { VacancyCollectionRemote } from '../../../services/firebase/types'
import { SmallUserIdentification } from '../../../components/SmallUserIdentification'
import { SmallButton } from '../../../components/_buttons/SmallButton'
import { DescriptionCard } from '../../../components/_cards/DescriptionCard'
import { DateTimeCard } from '../../../components/_cards/DateTimeCard'
import { LocationViewCard } from '../../../components/_cards/LocationViewCard'
import { PostPopOver } from '../../../components/PostPopOver'

function ViewVacancyPost({ route, navigation }: ViewVacancyPostScreenProps) {
	const [postData, setPostData] = useState({} as VacancyCollectionRemote)
	const [profileOptionsIsOpen, setPostOptionsIsOpen] = useState(false)

	useEffect(() => {
		setPostDataFromRoute()
	}, [])

	const setPostDataFromRoute = async () => {
		const postDataFromRoute = { ...route.params.postData }
		setPostData(postDataFromRoute as any)
		return true
	}

	const getVacancyDetails = () => {
		const vacancyType = getRelativeVacancyType()
		const workplace = getRelativeWorkPlace()

		return (
			<VacancyDetails>
				<VacancyDetailsItem>
					{showMessageWithHighlight(`●  vaga ${vacancyType}`, [vacancyType])}
				</VacancyDetailsItem>
				<VacancyDetailsItem>
					{showMessageWithHighlight(`●  vaga ${workplace}`, [workplace])}
				</VacancyDetailsItem>
			</VacancyDetails>
		)
	}

	const getRelativeVacancyType = () => {
		switch (postData.vacancyType) {
			case 'beak': return 'bico'
			case 'temporary': return 'temporária'
			case 'professional': return 'profissional'
			default: return '---'
		}
	}

	const getRelativeWorkPlace = () => {
		switch (postData.workplace) {
			case 'homeoffice': return 'home-office'
			case 'presential': return 'presencial'
			case 'hybrid': return 'híbrida'
			default: return '---'
		}
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
						profilePictureUrl={getProfilePictureUrl()}
						pictureDimensions={45}
						width={'60%'}
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
						label={'me candidatar'}
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
						title={'descrição da vaga'}
						text={postData.description}
						textFontSize={14}
					>
						{getVacancyDetails()}
					</DescriptionCard>
					<Sigh />
					<DateTimeCard
						title={'dias e horários'}
						weekDaysfrequency={'someday'}
						daysOfWeek={postData.workWeekdays}
						openingTime={postData.startWorkHour}
						closingTime={postData.endWorkHour}
						startDate={postData.startWorkDate}
						endDate={postData.endWorkDate}
						textFontSize={14}
					/>
					{
						postData.workplace !== 'homeoffice' && (
							<>
								<Sigh />
								<LocationViewCard
									title={'local de trabalho'}
									locationView={'public'}
									postType={postData.postType}
									postId={route.params.postData.postId as string}
									textFontSize={16}
								/>
							</>
						)
					}
					<Sigh />
					<DescriptionCard
						title={'sobre a empresa'}
						text={postData.companyDescription}
						textFontSize={14}
						company
					/>
					<LastSigh />
				</ScrollView>
			</Body>
		</Container>
	)
}

export { ViewVacancyPost }
