import React from 'react'

import { SmallButton } from '@components/_buttons/SmallButton'
import { ScreenContainer } from '@components/_containers/ScreenContainer'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'
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
					label={'Section 01'}
					labelColor={'black'}
				/>
			)}
			thirdSecton={(
				<>
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
				</>
			)}
		>
		</ScreenContainer>
	)
}

export { Profile }
