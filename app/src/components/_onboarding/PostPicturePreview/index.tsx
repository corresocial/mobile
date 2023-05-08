import React, { useState } from 'react'

import { Container, PicturePreviewContainer, TopArea } from './styles'
import { relativeScreenWidth } from '../../../common/screenDimensions'
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
				relativeHeight={'85%'}
				backgroundColor={backgroundColor}
				withoutPadding
				flexDirection={'column'}
				justifyContent={'space-between'}
			>
				<TopArea>
					<BackButton onPress={navigateBackwards} />
					<InstructionCard
						message={picturesPack.length > 1 ? 'ficaram boas?' : 'ficou boa?'}
						highlightedWords={['boas', 'boa']}
					/>
				</TopArea>
				<PicturePreviewContainer>
					<PhotoPortrait
						pictureUri={picturesPack[pictureIndexSelected]}
						width={relativeScreenWidth(90)}
						height={relativeScreenWidth(89)}
						deleteCurrentPicture={deleteCurrentPicture}
					/>
					<HorizontalListPictures
						picturesUri={picturesPack}
						pictureUriSelected={pictureIndexSelected}
						openCamera={() => setCameraOpened(true)}
						onSelectPicture={setPictureIndexSelected}
					/>
				</PicturePreviewContainer>
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
