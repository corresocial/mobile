import React, { useContext } from 'react'

import { StatusBar } from 'react-native'
import { Body, Container, Header, Sigh } from './styles'

import { AuthContext } from '../../../contexts/AuthContext'

import { EditServicePostScreenProps } from '../../../routes/Stack/UserStack/stackScreenProps'

import { DefaultPostViewHeader } from '../../../components/DefaultPostViewHeader'
import { EditCard } from '../../../components/_cards/EditCard'
import { arrayIsEmpty, formatHour } from '../../../common/auxiliaryFunctions'
import { theme } from '../../../common/theme'
import { CultureCollection, DaysOfWeek, PostCollection, SaleCollection, ServiceCollection, SocialImpactCollection, VacancyCollection } from '../../../services/firebase/types'
import { LocationViewCard } from '../../../components/_cards/LocationViewCard'

function EditServicePost({ route, navigation }: EditServicePostScreenProps) {
	const { userDataContext } = useContext(AuthContext)

	const { postData } = route.params

	/* const goToEditScreen = (screenName: keyof UserStackParamList) => {
		switch (screenName) {
			case 'EditUserName': {
				navigation.navigate('EditUserName', {
					userName: userDataContext.name || '',
					userId: userDataContext.userId || ''
				})
				break
			}
			case 'EditUserDescription': {
				navigation.navigate('EditUserDescription', {
					userDescription: userDataContext.description || '',
					userId: userDataContext.userId || ''
				})
				break
			}
			case 'EditUserPicture': {
				navigation.navigate(screenName, {
					profilePictureUrl: getProfilePictureUrl(),
					userId: userDataContext.userId || ''
				})
				break
			}
			default: return false
		}
	} */

	const extractTypedPost = () => {
		switch (postData.postType) {
			case 'service': return postData as ServiceCollection
			case 'sale': return postData as SaleCollection
			case 'vacancy': return postData as VacancyCollection
			case 'socialImpact': return postData as SocialImpactCollection
			case 'culture': return postData as CultureCollection
			default: return postData as PostCollection
		}
	}

	const getProfilePictureUrl = () => {
		if (!userDataContext || !userDataContext.profilePictureUrl) return ''
		if (arrayIsEmpty(userDataContext.profilePictureUrl)) return ''
		return userDataContext.profilePictureUrl[0]
	}

	const getRelativeTitle = () => {
		switch (postData.postType) {
			case 'service': return 'do serviço'
			case 'sale': return 'da venda'
			case 'vacancy': return 'da vaga'
			case 'socialImpact': return 'da iniciativa'
			case 'culture': {
				const { cultureType } = postData as any
				return cultureType === 'artistProfile' ? 'do artista' : 'do evento'
			}
			default: return 'do post'
		}
	}

	const formatDaysOfWeek = () => {
		const allDaysOfWeek = ['seg', 'ter', 'qua', 'qui', 'sex', 'sab', 'dom'] as DaysOfWeek[]
		const ordenedDaysOfWeek = allDaysOfWeek.filter((weekDay: DaysOfWeek) => postData.attendanceWeekDays?.includes(weekDay))
		return ordenedDaysOfWeek.toString().split(',').join(', ')
	}

	const renderDeliveryMethod = () => {
		switch (postData.deliveryMethod) {
			case 'unavailable': return 'não entrega'
			case 'near': return 'entrega perto'
			case 'city': return 'entrega na cidade'
			case 'country': return 'entrega no país inteiro'
			default: return '---'
		}
	}

	return (
		<Container>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<Header>
				<DefaultPostViewHeader
					onBackPress={() => navigation.goBack()}
					text={'editar seu post'}
					highlightedWords={['editar']}
				/>
			</Header>
			<Body>
				<EditCard
					title={'título do post'}
					highlightedWords={['título']}
					value={postData.title}
					onEdit={() => { }}
				/>
				<Sigh />
				<EditCard
					title={'fotos do post'}
					highlightedWords={['fotos']}
					profilePicturesUrl={/* getProfilePictureUrl() */['https://firebasestorage.googleapis.com/v0/b/corresocial-66840.appspot.com/o/imagens%2FsocialImpacts%2FXG19KwN6UfeDHL4nGBU4.jpg?alt=media&token=b48925e5-c184-43fe-ada1-1b17a0213c9b']}
					carousel
					onEdit={() => { }}
				/>
				<Sigh />
				<EditCard
					title={`descrição ${getRelativeTitle()}`}
					highlightedWords={['descrição']}
					value={postData.description || '---'}
					onEdit={() => { }}
				/>
				<Sigh />
				<EditCard
					title={'valor de venda'}
					highlightedWords={['venda']}
					value={postData.saleValue || '---'}
					onEdit={() => { }}
				/>
				<Sigh />
				<EditCard
					title={'valor de troca'}
					highlightedWords={['troca']}
					value={postData.exchangeValue || '---'}
					onEdit={() => { }}
				/>
				<Sigh />
				<LocationViewCard
					title={'localização'}
					locationView={postData.locationView}
					postType={postData.postType}
					postId={route.params.postData.postId as string}
					textFontSize={16}
					editable
					onEdit={() => { }}
				/>
				<Sigh />
				<EditCard
					title={'dias da semana'}
					highlightedWords={['semana']}
					value={formatDaysOfWeek() || '---'}
					onEdit={() => { }}
				/>
				<Sigh />
				<EditCard
					title={'horário de início'}
					highlightedWords={['início']}
					value={formatHour(postData.openingHour as Date) || '---'}
					onEdit={() => { }}
				/>
				<Sigh />
				<EditCard
					title={'horário de fim'}
					highlightedWords={['fim']}
					value={formatHour(postData.closingHour as Date) || '---'}
					onEdit={() => { }}
				/>
				<Sigh />
				<EditCard
					title={'entrega'}
					highlightedWords={['entrega']}
					value={renderDeliveryMethod() || '---'}
					onEdit={() => { }}
				/>
				<Sigh />
				<Sigh />
			</Body>
		</Container>
	)
}

export { EditServicePost }
