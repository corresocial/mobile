import React, { useContext, useState } from 'react'

import { Container, PicturePreviewContainer } from './styles';
import { screenHeight, screenWidth } from '../../../common/screenDimensions';
import { theme } from '../../../common/theme';
import CheckIcon from './../../../assets/icons/check.svg'

import { ServicePicturePreviewScreenProps } from '../../../routes/Stack/_stackScreenProps';
import { ServiceContext } from '../../../contexts/ServiceContext';

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer';
import { FormContainer } from '../../../components/_containers/FormContainer';
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton';
import { CustomCameraModal } from '../../../components/_modals/CustomCameraModal';
import { InstructionCard } from '../../../components/InstructionCard';
import { PhotoPortrait } from '../../../components/PhotoPortrait';
import { HorizontalListPictures } from '../../../components/HorizontalListPictures';
import { StatusBar } from 'react-native';

function ServicePicturePreview({ navigation, route }: ServicePicturePreviewScreenProps) {
	const { setServiceDataOnContext } = useContext(ServiceContext)

	const [picturesPack, setPicturesPack] = useState<string[]>([])
	const [pictureIndexSelected, setPictureIndexSelected] = useState<number>(0)
	const [cameraOpened, setCameraOpened] = useState<boolean>(true)

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
		setServiceDataOnContext({ picturesUrl: picturesPack })
		navigation.navigate('SelectServiceCategory')
	}

	return (
		<Container>
			<StatusBar backgroundColor={theme.purple2} barStyle={'dark-content'}/>
			<CustomCameraModal
				setPictureUri={setPictureUri}
				onClose={() => setCameraOpened(false)}
				cameraOpened={cameraOpened}
			/>
			<DefaultHeaderContainer
				relativeHeight={'85%'}
				backgroundColor={theme.purple2}
				withoutPadding={true}
			>
				<PicturePreviewContainer>
					<PhotoPortrait
						pictureUri={picturesPack[pictureIndexSelected]}
						width={screenWidth * 0.90}
						height={screenWidth * 0.89}
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
				</PicturePreviewContainer>
			</DefaultHeaderContainer>
			<FormContainer backgroundColor={theme.white2}>
				<PrimaryButton
					flexDirection='row-reverse'
					color={theme.green3}
					label='sim, continuar'
					labelColor={theme.white3}
					fontSize={18}
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