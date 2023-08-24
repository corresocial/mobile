import React, { useState } from 'react'

import { Container, HorizontalListPicturesContainer, PicturePreviewContainer, TopArea } from './styles'
import { relativeScreenHeight, relativeScreenWidth } from '../../../common/screenDimensions'
import { theme } from '../../../common/theme'
import CheckIcon from '../../../assets/icons/check-white.svg'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { FormContainer } from '../../../components/_containers/FormContainer'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { CustomCameraModal } from '../../../components/_modals/CustomCameraModal'
import { InstructionCard } from '../../../components/_cards/InstructionCard'
import { PhotoPortrait } from '../../../components/PhotoPortrait'
import { HorizontalListPictures } from '../../../components/HorizontalListPictures'
import { BackButton } from '../../../components/_buttons/BackButton'
import { VerticalSigh } from '../../VerticalSigh'

interface PostPicturePreviewProps {
	backgroundColor: string
	initialValue?: string[]
	editMode?: boolean
	navigateBackwards: () => void
	savePictures: (picturesUri: string[]) => void
}

function PostPicturePreview({
	backgroundColor,
	initialValue,
	editMode,
	navigateBackwards,
	savePictures
}: PostPicturePreviewProps) {
	const [picturesPack, setPicturesPack] = useState<string[]>(initialValue || [])
	const [pictureIndexSelected, setPictureIndexSelected] = useState<number>(0)
	const [cameraOpened, setCameraOpened] = useState<boolean>(!editMode || !initialValue)

	const setPictureUri = (uri: string) => {
		const currentPictures = [...picturesPack]
		currentPictures.push(uri)
		setPictureIndexSelected(picturesPack.length)
		setPicturesPack(currentPictures)
	}

	const deleteCurrentPicture = () => {
		const picturesAfterDelete = picturesPack.filter((_, index) => index !== pictureIndexSelected)
		setPictureIndexSelected(picturesPack.length - 2)
		setPicturesPack(picturesAfterDelete)
	}

	return (
		<Container>
			<CustomCameraModal
				setPictureUri={setPictureUri}
				onClose={() => setCameraOpened(false)}
				cameraOpened={cameraOpened}
			/>
			<DefaultHeaderContainer
				relativeHeight={relativeScreenHeight(80)}
				backgroundColor={backgroundColor}
				withoutPadding
				flexDirection={'column'}
				justifyContent={'space-between'}
			>
				<TopArea>
					<BackButton onPress={navigateBackwards} />
					<InstructionCard
						fontSize={18}
						message={'e aí. gostou?'}
						highlightedWords={['gostou']}
					/>
				</TopArea>
				<PicturePreviewContainer>
					<PhotoPortrait
						resizeMode={'cover'}
						pictureUri={picturesPack[pictureIndexSelected]}
						width={relativeScreenWidth(90)}
						height={relativeScreenWidth(89)}
						deleteCurrentPicture={deleteCurrentPicture}
					/>
					<VerticalSigh height={relativeScreenWidth(7)} />
				</PicturePreviewContainer>
				<HorizontalListPicturesContainer>
					<HorizontalListPictures
						picturesUri={picturesPack}
						pictureUriSelected={pictureIndexSelected}
						openCamera={() => setCameraOpened(true)}
						onSelectPicture={setPictureIndexSelected}
					/>
				</HorizontalListPicturesContainer>
			</DefaultHeaderContainer>
			<FormContainer backgroundColor={theme.white2}>
				<PrimaryButton
					flexDirection={'row-reverse'}
					color={theme.green3}
					label={'sim, continuar'}
					labelColor={theme.white3}
					SvgIcon={CheckIcon}
					highlightedWords={['continuar']}
					onPress={() => savePictures(picturesPack)}
				/>
			</FormContainer>
		</Container>
	)
}

export { PostPicturePreview }
