import React, { useContext, useEffect } from 'react'

import { EditContext } from '../../../contexts/EditContext'
import { AuthContext } from '../../../contexts/AuthContext'
import { StateContext } from '../../../contexts/StateContext'
import { SubscriptionContext } from '../../../contexts/SubscriptionContext'

import { EditSocialImpactPostReviewScreenProps } from '../../../routes/Stack/SocialImpactStack/stackScreenProps'
import { EventRepeatType, PostCollection, SocialImpactCategories, SocialImpactCollection, SocialImpactCollectionRemote } from '../../../services/firebase/types'
import { SocialImpactStackParamList } from '../../../routes/Stack/SocialImpactStack/types'

import { socialImpactCategories } from '../../../utils/postsCategories/socialImpactCategories'
import { arrayIsEmpty, formatDate, formatHour, showMessageWithHighlight } from '../../../common/auxiliaryFunctions'

import ClockWhiteIcon from '../../../assets/icons/clock-white.svg'
import CalendarEmptyIcon from '../../../assets/icons/calendarEmpty-unfilled.svg'
import RecycleWhiteIcon from '../../../assets/icons/recycle-white.svg'

import { EditCard } from '../../../components/_cards/EditCard'
import { LocationViewCard } from '../../../components/_cards/LocationViewCard'
import { ExhibitionPlaceCard } from '../../../components/_cards/ExhibitionPlace'
import { SocialImpactTypeCard } from '../../../components/_cards/SocialImpactType'
import { EditPost } from '../../../components/EditPost'
import { VerticalSigh } from '../../../components/VerticalSigh'
import { DescriptionCard } from '../../../components/_cards/DescriptionCard'
import { DateTimeCard } from '../../../components/_cards/DateTimeCard'
import { PostRangeCard } from '../../../components/_cards/PostRangeCard'
import { theme } from '../../../common/theme'

function EditSocialImpactPost({ route, navigation }: EditSocialImpactPostReviewScreenProps) {
	const { setEditDataOnContext, editDataContext, clearUnsavedEditContext } = useContext(EditContext)
	const { userDataContext, setUserDataOnContext, setDataOnSecureStore } = useContext(AuthContext)
	const { setStateDataOnContext } = useContext(StateContext)
	const { setSubscriptionDataOnContext } = useContext(SubscriptionContext)

	const { postData, unsavedPost } = route.params
	const owner = {
		userId: userDataContext.userId,
		name: userDataContext.name,
		profilePictureUrl: userDataContext.profilePictureUrl
	}

	useEffect(() => {
		clearUnsavedEditContext()
	}, [])

	const getPostField = (fieldName: keyof SocialImpactCollection, allowNull?: boolean) => {
		if (allowNull && editDataContext.unsaved[fieldName] === '' && postData[fieldName]) return ''
		return editDataContext.unsaved[fieldName] || postData[fieldName]
	}

	const getPicturesUrl = () => {
		const picturesUrl = getPostField('picturesUrl')
		if (arrayIsEmpty(picturesUrl)) return []
		return picturesUrl
	}

	const formatCategoryAndTags = () => {
		const category: SocialImpactCategories = getPostField('category')
		const tags = getPostField('tags')

		return `	●  ${socialImpactCategories[category].label}\n	●  ${tags.map((tag: string) => ` #${tag}`)}`
	}

	const renderSocialImpactRepeat = () => {
		const repeat = getPostField('repeat', true) as EventRepeatType
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

	const navigateToPostView = (socialImpactPostData: PostCollection) => {
		navigation.navigate('ViewSocialImpactPost' as any, { postData: socialImpactPostData })
	}

	const navigateToEditScreen = (screenName: keyof SocialImpactStackParamList, initialValue: keyof SocialImpactCollectionRemote) => {
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

		navigation.navigate('SocialImpactStack', {
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
				postType: 'socialImpact',
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
			initialPostData={{ ...postData, postType: 'socialImpact' }}
			owner={owner}
			backgroundColor={theme.pink2}
			unsavedPost={unsavedPost}
			navigateBackwards={navigateBackwards}
			navigateToPostView={navigateToPostView}
			navigateToSubscriptionContext={navigateToSubscriptionContext}
			showShareModal={showShareModal}
			getPostField={getPostField}
			userContext={userContext}
			editContext={editContext}
		>
			<SocialImpactTypeCard
				title={'tipo de impacto'}
				socialImpactType={getPostField('socialImpactType')}
				onEdit={() => navigateToEditScreen('SelectSocialImpactType', 'socialImpactType')}
			/>
			<VerticalSigh />
			<EditCard
				title={'tags do post'}
				highlightedWords={['tags']}
				value={formatCategoryAndTags()}
				onEdit={() => navigateToEditScreen('SelectSocialImpactCategory', 'tags')}
			/>
			<VerticalSigh />
			<EditCard
				title={'título do post'}
				highlightedWords={['título']}
				value={getPostField('title')}
				onEdit={() => navigateToEditScreen('InsertSocialImpactTitle', 'title')}
			/>
			<VerticalSigh />
			<DescriptionCard
				text={getPostField('description')}
				onEdit={() => navigateToEditScreen('InsertSocialImpactDescription', 'description')}
			/>
			<VerticalSigh />
			<EditCard
				title={'fotos do post'}
				highlightedWords={['fotos']}
				profilePicturesUrl={getPicturesUrl()}
				indicatorColor={theme.pink1}
				carousel
				onEdit={() => navigateToEditScreen('SocialImpactPicturePreview', 'picturesUrl')}
			/>
			<VerticalSigh />
			<PostRangeCard
				postRange={getPostField('range')}
				onEdit={() => navigateToEditScreen('SelectSocialImpactRange', 'range')}
			/>
			<VerticalSigh />
			<LocationViewCard
				title={'localização'}
				locationView={getPostField('locationView')}
				textFontSize={16}
				location={getPostField('location')}
				onEdit={() => navigateToEditScreen('SelectSocialImpactLocationView', 'location')}
			/>
			<VerticalSigh />
			<ExhibitionPlaceCard
				exhibitionPlace={getPostField('exhibitionPlace')}
				onEdit={() => navigateToEditScreen('SelectSocialImpactExhibitionRange', 'exhibitionPlace')}
			/>
			<VerticalSigh />
			<DateTimeCard
				title={'dias da semana'}
				highlightedWords={['dias']}
				weekDaysfrequency={getPostField('exhibitionFrequency')}
				daysOfWeek={getPostField('daysOfWeek', true)}
				onEdit={() => navigateToEditScreen('SelectSocialImpactFrequency', 'daysOfWeek')}
			/>
			<VerticalSigh />
			<EditCard
				title={'repetição'}
				highlightedWords={['repetição']}
				SecondSvgIcon={RecycleWhiteIcon}
				value={renderSocialImpactRepeat() || '---'}
				onEdit={() => navigateToEditScreen('SelectSocialImpactRepeat', 'repeat')}
			/>
			<VerticalSigh />
			<EditCard
				title={'que dia começa'}
				highlightedWords={['começa']}
				SecondSvgIcon={CalendarEmptyIcon}
				value={formatDate(getPostField('startDate', true)) || '---'}
				valueBold
				onEdit={() => navigateToEditScreen('InsertSocialImpactStartDate', 'startDate')}
			/>
			<VerticalSigh />
			<EditCard
				title={'que horas começa'}
				highlightedWords={['começa']}
				SecondSvgIcon={ClockWhiteIcon}
				value={formatHour(getPostField('startHour', true)) || '---'}
				valueBold
				onEdit={() => navigateToEditScreen('InsertSocialImpactStartHour', 'startHour')}
			/>
			<VerticalSigh />
			<EditCard
				title={'que dia termina'}
				highlightedWords={['termina']}
				SecondSvgIcon={CalendarEmptyIcon}
				value={formatDate(getPostField('endDate', true)) || '---'}
				valueBold
				onEdit={() => navigateToEditScreen('InsertSocialImpactEndDate', 'endDate')}
			/>
			<VerticalSigh />
			<EditCard
				title={'que horas termina'}
				highlightedWords={['termina']}
				SecondSvgIcon={ClockWhiteIcon}
				value={formatHour(getPostField('endHour', true)) || '---'}
				valueBold
				onEdit={() => navigateToEditScreen('InsertSocialImpactEndHour', 'endHour')}
			/>
		</EditPost>
	)
}

export { EditSocialImpactPost }
