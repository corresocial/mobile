import React, { useContext, useEffect } from 'react'

import { EditContext } from '../../../contexts/EditContext'
import { AuthContext } from '../../../contexts/AuthContext'
import { StateContext } from '../../../contexts/StateContext'
import { SubscriptionContext } from '../../../contexts/SubscriptionContext'

import { EditCulturePostReviewScreenProps } from '../../../routes/Stack/CultureStack/stackScreenProps'
import { CultureStackParamList } from '../../../routes/Stack/CultureStack/types'
import { CultureCategories, CultureCollection, CultureCollectionRemote, EventRepeatType, PostCollection } from '../../../services/firebase/types'

import { cultureCategories } from '../../../utils/postsCategories/cultureCategories'
import { arrayIsEmpty, formatDate, formatHour, showMessageWithHighlight } from '../../../common/auxiliaryFunctions'

import { theme } from '../../../common/theme'
import RecycleWhiteIcon from '../../../assets/icons/recycle-white.svg'
import ClockWhiteIcon from '../../../assets/icons/clock-white.svg'
import CalendarEmptyIcon from '../../../assets/icons/calendarEmpty-unfilled.svg'

import { EditCard } from '../../../components/_cards/EditCard'
import { LocationViewCard } from '../../../components/_cards/LocationViewCard'
import { VerticalSigh } from '../../../components/VerticalSigh'
import { DescriptionCard } from '../../../components/_cards/DescriptionCard'
import { PostRangeCard } from '../../../components/_cards/PostRangeCard'
import { DateTimeCard } from '../../../components/_cards/DateTimeCard'
import { SaleOrExchangeCard } from '../../../components/_cards/SaleOrExchangeCard'
import { PlaceModality } from '../../../components/_cards/PlaceModalityCard'
import { CultureTypeCard } from '../../../components/_cards/CultureTypeCard'
import { EditPost } from '../../../components/EditPost'

function EditCulturePost({ route, navigation }: EditCulturePostReviewScreenProps) {
	const { setEditDataOnContext, editDataContext, clearUnsavedEditContext } = useContext(EditContext)
	const { userDataContext, setUserDataOnContext, setDataOnSecureStore } = useContext(AuthContext)
	const { setStateDataOnContext } = useContext(StateContext)
	const { setSubscriptionDataOnContext } = useContext(SubscriptionContext)

	const owner = {
		userId: userDataContext.userId,
		name: userDataContext.name,
		profilePictureUrl: userDataContext.profilePictureUrl
	}

	const { postData, unsavedPost } = route.params

	useEffect(() => {
		clearUnsavedEditContext()
	}, [])

	const getPostField = (fieldName: keyof CultureCollection, allowNull?: boolean) => {
		if (allowNull && editDataContext.unsaved[fieldName] === '' && postData[fieldName]) return ''
		return editDataContext.unsaved[fieldName] || postData[fieldName]
	}

	const getPicturesUrl = () => {
		const picturesUrl = getPostField('picturesUrl')
		if (arrayIsEmpty(picturesUrl)) return []
		return picturesUrl
	}

	const formatCategoryAndTags = () => {
		const category: CultureCategories = getPostField('category')
		const tags = getPostField('tags')

		return `	●  ${cultureCategories[category].label}\n	●  ${tags.map((tag: string) => ` #${tag}`)}`
	}

	const renderCultureRepeat = () => {
		const repeat = getPostField('repeat') as EventRepeatType
		switch (repeat) {
			case 'unrepeatable': return showMessageWithHighlight('não se repete', ['não'])
			case 'everyDay': return showMessageWithHighlight('todos os dias', ['todos'])
			case 'weekly': return showMessageWithHighlight('uma vez por semana', ['1', 'semana'])
			case 'biweekly': return showMessageWithHighlight('a cada 15 dias', ['15'])
			case 'monthly': return showMessageWithHighlight('1 vez no mês', ['1', 'mês'])
			default: return '---'
		}
	}

	const showShareModal = (visibility: boolean, postTitle?: string) => {
		setStateDataOnContext({
			showShareModal: visibility,
			lastPostTitle: postTitle
		})
	}

	const navigateBackwards = () => {
		navigation.goBack()
	}

	const navigateToPostView = (culturePostData: PostCollection) => {
		navigation.navigate('ViewCulturePost' as any, { postData: culturePostData })
	}

	const navigateToEditScreen = (screenName: keyof CultureStackParamList, initialValue: keyof CultureCollectionRemote, especificField?: string) => {
		let value = getPostField(initialValue)

		if (initialValue === 'picturesUrl') {
			value = getPicturesUrl()
		}

		if (initialValue === 'location') {
			value = {
				coordinates: value.coordinates,
				postRange: getPostField('range')
			}
		}

		navigation.navigate('CultureStack', {
			screen: screenName,
			params: {
				editMode: true,
				initialValue: value
			}
		})
	}

	const navigateToSubscriptionContext = () => {
		setSubscriptionDataOnContext({
			currentPost: {
				...postData,
				...editDataContext.unsaved,
				postType: 'culture',
				createdAt: new Date(),
				owner: {
					userId: userDataContext.userId,
					name: userDataContext.name,
					profilePictureUrl: userDataContext.profilePictureUrl
				}
			}
		})
		navigation.navigate('SelectSubscriptionPlan', { postRange: getPostField('range'), postReview: true })
	}

	const userContext = {
		userDataContext,
		setUserDataOnContext,
		setDataOnSecureStore
	}

	const editContext = {
		editDataContext,
		setEditDataOnContext,
		clearUnsavedEditContext
	}

	return (
		<EditPost
			initialPostData={{ ...postData, postType: 'culture' }}
			owner={owner}
			backgroundColor={theme.blue2}
			unsavedPost={unsavedPost}
			navigateBackwards={navigateBackwards}
			navigateToPostView={navigateToPostView}
			navigateToSubscriptionContext={navigateToSubscriptionContext}
			showShareModal={showShareModal}
			getPostField={getPostField}
			userContext={userContext}
			editContext={editContext}
		>
			<CultureTypeCard
				title={'tipo de cultura'}
				cultureType={getPostField('cultureType')}
				onEdit={() => navigateToEditScreen('SelectCultureType', 'cultureType')}
			/>
			<VerticalSigh />
			<EditCard
				title={'tags do post'}
				highlightedWords={['tags']}
				value={formatCategoryAndTags()}
				onEdit={() => navigateToEditScreen('SelectCultureCategory', 'tags')}
			/>
			<VerticalSigh />
			<PlaceModality
				title={'como participar'}
				hightligtedWords={['participar']}
				placeModality={getPostField('eventPlaceModality')}
				onEdit={() => navigateToEditScreen('SelectEventPlaceModality', 'eventPlaceModality')}
			/>
			<VerticalSigh />
			<EditCard
				title={'título do post'}
				highlightedWords={['título']}
				value={getPostField('title')}
				onEdit={() => navigateToEditScreen('InsertCultureTitle', 'title')}
			/>
			<VerticalSigh />
			<DescriptionCard
				text={getPostField('description')}
				onEdit={() => navigateToEditScreen('InsertCultureDescription', 'description')}
			/>
			<VerticalSigh />
			<EditCard
				title={'fotos do post'}
				highlightedWords={['fotos']}
				profilePicturesUrl={getPicturesUrl()}
				carousel
				onEdit={() => navigateToEditScreen('CulturePicturePreview', 'picturesUrl')}
			/>
			<VerticalSigh />
			<PostRangeCard
				postRange={getPostField('range')}
				onEdit={() => navigateToEditScreen('SelectCultureRange', 'range')}
			/>
			<VerticalSigh />
			<LocationViewCard
				title={'localização'}
				locationView={getPostField('locationView')}
				textFontSize={16}
				location={getPostField('location')}
				onEdit={() => navigateToEditScreen('SelectCultureLocationView', 'location')}
			/>
			<VerticalSigh />
			<SaleOrExchangeCard
				title={'custo de entrada'}
				hightligtedWords={['custo', 'entrada']}
				saleValue={getPostField('entryValue', true) || '---'}
				onEdit={() => navigateToEditScreen('InsertEntryValue', 'entryValue')}
				isCulturePost
			/>
			<VerticalSigh />
			<DateTimeCard
				title={'dias da semana'}
				highlightedWords={['dias']}
				weekDaysfrequency={getPostField('exhibitionFrequency')}
				daysOfWeek={getPostField('daysOfWeek', true)}
				onEdit={() => navigateToEditScreen('SelectCultureFrequency', 'daysOfWeek')}
			/>
			<VerticalSigh />
			<EditCard
				title={'repetição'}
				highlightedWords={['repetição']}
				SecondSvgIcon={RecycleWhiteIcon}
				value={renderCultureRepeat() || '---'}
				onEdit={() => navigateToEditScreen('SelectEventRepeat', 'repeat')}
			/>
			<VerticalSigh />
			<EditCard
				title={'que dia começa'}
				highlightedWords={['começa']}
				SecondSvgIcon={CalendarEmptyIcon}
				value={formatDate(getPostField('startDate', true)) || '---'}
				valueBold
				onEdit={() => navigateToEditScreen('InsertCultureStartDate', 'startDate')}
			/>
			<VerticalSigh />
			<EditCard
				title={'que horas começa'}
				highlightedWords={['começa']}
				SecondSvgIcon={ClockWhiteIcon}
				value={formatHour(getPostField('startHour', true)) || '---'}
				valueBold
				onEdit={() => navigateToEditScreen('InsertCultureStartHour', 'startHour')}
			/>
			<VerticalSigh />
			<EditCard
				title={'que dia termina'}
				highlightedWords={['termina']}
				SecondSvgIcon={CalendarEmptyIcon}
				value={formatDate(getPostField('endDate', true)) || '---'}
				valueBold
				onEdit={() => navigateToEditScreen('InsertCultureEndDate', 'endDate')}
			/>
			<VerticalSigh />
			<EditCard
				title={'que horas termina'}
				highlightedWords={['termina']}
				SecondSvgIcon={ClockWhiteIcon}
				value={formatHour(getPostField('endHour', true)) || '---'}
				valueBold
				onEdit={() => navigateToEditScreen('InsertCultureEndHour', 'endHour')}
			/>
		</EditPost >
	)
}

export { EditCulturePost }
