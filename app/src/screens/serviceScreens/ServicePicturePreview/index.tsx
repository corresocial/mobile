import React, {  useState } from 'react'

import { Container } from './styles';
import { screenWidth } from '../../../common/screenDimensions';
import { theme } from '../../../common/theme';
import CheckIcon from './../../../assets/icons/check.svg'

import { ServicePicturePreviewScreenProps } from '../../../routes/Stack/_stackScreenProps';

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer';
import { FormContainer } from '../../../components/_containers/FormContainer';
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton';
import { CustomCameraModal } from '../../../components/_modals/CustomCameraModal';
import { InstructionCard } from '../../../components/InstructionCard';
import { PhotoPortrait } from '../../../components/PhotoPortrait';
import { HorizontalListPictures } from '../../../components/HorizontalListPictures';

function ServicePicturePreview({ navigation, route }: ServicePicturePreviewScreenProps) {
	const [picturesPack, setPicturesPack] = useState<string[]>([])
	const [pictureIndexSelected, setPictureIndexSelected] = useState<number>(0)
	const [cameraOpened, setCameraOpened] = useState<boolean>(false)

	const setPictureUri = (uri: string) => {
		console.log(uri)
		console.log(picturesPack)
		const currentPictures = [...picturesPack]
		currentPictures.push(uri)
		setPicturesPack(currentPictures)
	}

	const deleteCurrentPicture= () => {
		console.log(picturesPack)
		const picturesAfterDelete = picturesPack.filter((_ ,index) => index !== pictureIndexSelected)
		console.log('before')
		console.log(picturesAfterDelete)
		setPicturesPack(picturesAfterDelete)
		setPictureIndexSelected(0)
	}

	const savePictures = () => {
		navigation.navigate('SelectServiceCategory')
	}

	return (
		<Container>
			<CustomCameraModal
				setPictureUri={setPictureUri}
				onClose={() => setCameraOpened(false)}
				cameraOpened={cameraOpened}
			/>
			<DefaultHeaderContainer
				relativeHeight={'80%'}
				flexDirection={'column'}
				centralized
				justifyContent={'flex-end'}
				backgroundColor={theme.purple2}
			>
				<PhotoPortrait
					pictureUri={picturesPack[pictureIndexSelected]}
					width={screenWidth * 0.85}
					height={screenWidth * 0.85}
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
					highlightedWords={['boas?']}
					flex={0}
				/>
			</DefaultHeaderContainer>
			<FormContainer backgroundColor={theme.white2}>
				<PrimaryButton
					flexDirection='row-reverse'
					color={theme.green3}
					label='sim, continuar'
					labelColor={theme.white3}
					fontSize={20}
					SvgIcon={CheckIcon}
					svgIconScale={['30%', '18%']}
					highlightedWords={['continuar']}
					onPress={savePictures}
				/>
			</FormContainer>
		</Container>
	);
}

export { ServicePicturePreview }