import React from 'react'
import { ScrollView, View } from 'react-native'

import { relativeScreenWidth } from '@common/screenDimensions'

import { SmallButton } from '@components/_buttons/SmallButton'
import { LocationViewCard } from '@components/_cards/LocationViewCard'
import { ScreenContainer } from '@components/_containers/ScreenContainer'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'
import { MapView } from '@newComponents/MapView'
import { PostInfo } from '@newComponents/PostInfo'

function Profile() {
	return (
		<ScreenContainer
			tone={'blue'}
			enableSectionPadding
			firstSection={(
				<SmallButton
					relativeWidth={300}
					onPress={() => { }}
					label={'New components'}
					labelColor={'black'}
				/>
			)}
			thirdSecton={(
				<View >
					<ScrollView
						contentContainerStyle={{ position: 'relative' }}
						showsVerticalScrollIndicator={false}
					>
						{/* <PostInfo
						type={'placeModality'}
						value={'presential'}
					/>
					<VerticalSpacing />
					<PostInfo
						type={'macroCategory'}
						value={'event'}
					/>
					<VerticalSpacing />
					<PostInfo
						type={'description'}
						value={'Descrição corre.social descrição descrita descrição descrita descrição descrita descrição descrita Descrição descrita Descrição descrita Descrição descrita Descrição descrita Descrição descrita Descrição descrita Descrição descrita Descrição descrita Descrição descrita '}
					/>
					<VerticalSpacing /> */}
						{/* <PostInfo
						type={'price'}
						value={{ saleValue: '100', exchangeValue: 'batata' }}
					/>
					<PostInfo
						type={'price'}
						value={{ saleValue: 'a combinar', exchangeValue: 'batata' }}
					/>
					<PostInfo
						type={'price'}
						value={{ exchangeValue: 'batata' }}
					/> */}
						{/* <PostInfo
						type={'price'}
						value={{ saleValue: '100' }}
					/>
					<PostInfo
						type={'price'}
						value={{ saleValue: '100' }}
					/>
					<PostInfo
						type={'dateTime'}
						value={{
							weekDaysfrequency: 'everyday',
							daysOfWeek: ['dom'],
							repetition: 'everyDay',
							startDate: new Date().setDate(22) as any,
							endDate: new Date().setDate(15) as any,
							startTime: new Date().setHours(5) as any,
							endTime: new Date().setHours(20 as any)
						}}
					/> */}
						{/* <VerticalSpacing />
					<PostInfo
						type={'macroCategory'}
						value={'event'}
					/>
					<VerticalSpacing />
					<PostInfo
						type={'link'}
						value={['corre.corresocial.com', 'link.link.com']}
					/> */}
						<MapView
							online={false}
							locationView={'public'}
							location={{
								city: 'Londrina',
								coordinates: { latitude: -23.3219834, longitude: -51.1673385 },
								country: 'Brasil',
								district: 'Centro',
								geohashNearby: [],
								number: '4554',
								postalCode: '76596-000',
								state: 'Paraná',
								street: 'Rua do corredor'
							}}
						/>
						<VerticalSpacing />
						<MapView
							online={false}
							locationView={'approximate'}
							location={{
								city: 'Londrina',
								coordinates: { latitude: -23.3219834, longitude: -51.1673385 },
								country: 'Brasil',
								district: 'Centro',
								geohashNearby: [],
								number: '4554',
								postalCode: '76596-000',
								state: 'Paraná',
								street: 'Rua do corredor'
							}}
						/>
						<VerticalSpacing />
						<MapView
							online={false}
							locationView={'private'}
							location={{
								city: 'Londrina',
								coordinates: { latitude: -23.3219834, longitude: -51.1673385 },
								country: 'Brasil',
								district: 'Centro',
								geohashNearby: [],
								number: '4554',
								postalCode: '76596-000',
								state: 'Paraná',
								street: 'Rua do corredor'
							}}
						/>
						<VerticalSpacing bottomNavigatorSpace />
					</ScrollView>
				</View>
			)}
		>
		</ScreenContainer>
	)
}

export { Profile }
