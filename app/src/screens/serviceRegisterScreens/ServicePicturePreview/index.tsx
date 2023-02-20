import React, { useContext, useState } from 'react'
import { StatusBar } from 'react-native'

import { Container, PicturePreviewContainer } from './styles'
import { relativeScreenWidth } from '../../../common/screenDimensions'
import { theme } from '../../../common/theme'
import CheckIcon from '../../../assets/icons/check.svg'

import { ServicePicturePreviewScreenProps } from '../../../routes/Stack/ServiceStack/stackScreenProps'

import { ServiceContext } from '../../../contexts/ServiceContext'
import { EditContext } from '../../../contexts/EditContext'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { FormContainer } from '../../../components/_containers/FormContainer'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { CustomCameraModal } from '../../../components/_modals/CustomCameraModal'
import { InstructionCard } from '../../../components/_cards/InstructionCard'
import { PhotoPortrait } from '../../../components/PhotoPortrait'
import { HorizontalListPictures } from '../../../components/HorizontalListPictures'

function ServicePicturePreview({ route, navigation }: ServicePicturePreviewScreenProps) {
	const { setServiceDataOnContext } = useContext(ServiceContext)
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const [picturesPack, setPicturesPack] = useState<string[]>(route.params?.initialValue || [])
	const [pictureIndexSelected, setPictureIndexSelected] = useState<number>(0)
	const [cameraOpened, setCameraOpened] = useState<boolean>(!route.params?.editMode || !route.params?.initialValue.length)

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

	const savePictures = () => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ picturesUrl: picturesPack })
			navigation.goBack()
			return
		}

		setServiceDataOnContext({
			picturesUrl: picturesPack
		})
		navigation.navigate('SelectServiceCategory')
	}

	const editModeIsTrue = () => route.params && route.params.editMode

	return (
		<Container>
			<StatusBar backgroundColor={theme.purple2} barStyle={'dark-content'} />
			<CustomCameraModal
				setPictureUri={setPictureUri}
				onClose={() => setCameraOpened(false)}
				cameraOpened={cameraOpened}
			/>
			<DefaultHeaderContainer
				relativeHeight={'85%'}
				backgroundColor={theme.purple2}
				withoutPadding
			>
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
					<InstructionCard
						message={'ficaram boas?'}
						highlightedWords={['boas']}
						flex={0}
					/>
				</PicturePreviewContainer>
			</DefaultHeaderContainer>
			<FormContainer backgroundColor={theme.white2}>
				<PrimaryButton
					flexDirection={'row-reverse'}
					color={theme.green3}
					label={'sim, continuar'}
					labelColor={theme.white3}
					fontSize={18}
					SvgIcon={CheckIcon}
					svgIconScale={['30%', '18%']}
					highlightedWords={['continuar']}
					onPress={savePictures}
				/>
			</FormContainer>
		</Container>
	)
}

export { ServicePicturePreview }
