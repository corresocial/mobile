import { ImageManipulator, SaveFormat } from 'expo-image-manipulator'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { ActivityIndicator, Alert, LayoutChangeEvent, Modal, StatusBar } from 'react-native'
import { CropZoom, CropZoomRefType } from 'react-native-zoom-toolkit'

import {
	CenteredContent,
	Container,
	CropArea,
	CropFrame,
	CropImage,
	CropOverlay,
	ErrorText,
	Footer,
	Header,
	HeaderText,
	LoaderOverlay,
	SafeAreaContainer
} from './styles'
import CheckIcon from '@assets/icons/check-white.svg'
import CloseIcon from '@assets/icons/x-white.svg'
import { relativeScreenWidth } from '@common/screenDimensions'
import { theme } from '@common/theme'

import { SmallButton } from '@components/_buttons/SmallButton'

import { buildCropActions, CropAction, CropSize, fitSizeToAspectRatio, getCropMaxScale } from './cropGeometry'

const CROP_AREA_MARGIN = relativeScreenWidth(5)

interface ImageCropperResult {
	uri: string
	width: number
	height: number
}

interface ImageCropperModalProps {
	imageUri: string
	aspectRatio?: number
	minimumCropDimensions?: CropSize
	onCancel: () => void
	onComplete: (result: ImageCropperResult) => void
}

async function getImageResolution(imageUri: string): Promise<CropSize> {
	const context = ImageManipulator.manipulate(imageUri)
	try {
		const image = await context.renderAsync()
		const { width, height } = image
		image.release()

		if (!width || !height) throw new Error(`Não foi possível obter as dimensões da imagem: ${imageUri}`)
		return { width, height }
	} finally {
		context.release()
	}
}

async function renderCroppedImage(imageUri: string, actions: CropAction[]): Promise<ImageCropperResult> {
	const context = ImageManipulator.manipulate(imageUri)
	try {
		actions.forEach((action) => {
			if ('resize' in action) context.resize(action.resize)
			else context.crop(action.crop)
		})

		const image = await context.renderAsync()
		try {
			const { uri, width, height } = await image.saveAsync({ format: SaveFormat.JPEG, compress: 1 })
			return { uri, width, height }
		} finally {
			image.release()
		}
	} finally {
		context.release()
	}
}

function ImageCropperModal({
	imageUri,
	aspectRatio = 1,
	minimumCropDimensions,
	onCancel,
	onComplete
}: ImageCropperModalProps) {
	const [imageResolution, setImageResolution] = useState<CropSize | null>(null)
	const [cropAreaSize, setCropAreaSize] = useState<CropSize | null>(null)
	const [hasLoadingError, setHasLoadingError] = useState<boolean>(false)
	const [isCropping, setIsCropping] = useState<boolean>(false)

	const cropZoomRef = useRef<CropZoomRefType>(null)

	useEffect(() => {
		let canceled = false
		setImageResolution(null)
		setHasLoadingError(false)

		getImageResolution(imageUri)
			.then((resolution) => {
				if (!canceled) setImageResolution(resolution)
			})
			.catch((error) => {
				console.log(error)
				if (!canceled) setHasLoadingError(true)
			})

		return () => {
			canceled = true
		}
	}, [imageUri])

	// Memorizado para não reiniciar as animações internas do CropZoom a cada renderização
	const cropSize = useMemo(() => {
		if (!cropAreaSize) return null

		const size = fitSizeToAspectRatio({
			width: cropAreaSize.width - CROP_AREA_MARGIN * 2,
			height: cropAreaSize.height - CROP_AREA_MARGIN * 2
		}, aspectRatio)

		return size.width > 0 && size.height > 0 ? size : null
	}, [cropAreaSize, aspectRatio])

	const cropAreaLayoutHandler = (event: LayoutChangeEvent) => {
		const { width, height } = event.nativeEvent.layout
		setCropAreaSize({ width, height })
	}

	const cancelHandler = () => {
		if (isCropping) return
		onCancel()
	}

	const confirmCropHandler = async () => {
		if (!cropZoomRef.current || !imageResolution || isCropping) return

		try {
			setIsCropping(true)
			const cropContext = cropZoomRef.current.crop()
			const actions = buildCropActions(cropContext, imageResolution, { aspectRatio, minimumCropDimensions })
			const croppedImage = await renderCroppedImage(imageUri, actions)
			onComplete(croppedImage)
		} catch (error) {
			console.log(error)
			Alert.alert('Ops!', 'Não foi possível recortar a imagem, tente novamente.')
		} finally {
			setIsCropping(false)
		}
	}

	const renderCropContent = () => {
		if (hasLoadingError) {
			return (
				<CenteredContent>
					<ErrorText>{'não foi possível carregar a imagem, tente novamente'}</ErrorText>
				</CenteredContent>
			)
		}

		if (!imageResolution || !cropAreaSize || !cropSize) {
			return (
				<CenteredContent>
					<ActivityIndicator size={'large'} color={theme.colors.white[3]} />
				</CenteredContent>
			)
		}

		return (
			<CropZoom
				ref={cropZoomRef}
				cropSize={cropSize}
				resolution={imageResolution}
				maxScale={getCropMaxScale(cropSize, imageResolution, minimumCropDimensions)}
				OverlayComponent={() => (
					<CropOverlay areaSize={cropAreaSize} cropSize={cropSize}>
						<CropFrame />
					</CropOverlay>
				)}
			>
				<CropImage source={{ uri: imageUri }} contentFit={'cover'} />
			</CropZoom>
		)
	}

	return (
		<Modal visible animationType={'fade'} onRequestClose={cancelHandler}>
			<StatusBar backgroundColor={theme.colors.black[4]} barStyle={'light-content'} />
			<Container>
				<SafeAreaContainer>
					<Header>
						<HeaderText>{'arraste e dê zoom para ajustar a foto'}</HeaderText>
					</Header>
					<CropArea onLayout={cropAreaLayoutHandler}>
						{renderCropContent()}
					</CropArea>
					<Footer>
						<SmallButton
							color={theme.colors.red[3]}
							SvgIcon={CloseIcon}
							relativeWidth={relativeScreenWidth(20)}
							height={relativeScreenWidth(20)}
							onPress={cancelHandler}
						/>
						{
							imageResolution && !hasLoadingError && ( // só confirma com a imagem carregada
								<SmallButton
									color={theme.colors.green[3]}
									labelColor={theme.colors.white[3]}
									SvgIcon={CheckIcon}
									relativeWidth={relativeScreenWidth(35)}
									height={relativeScreenWidth(20)}
									onPress={confirmCropHandler}
								/>
							)
						}
					</Footer>
				</SafeAreaContainer>
				{
					isCropping && (
						<LoaderOverlay>
							<ActivityIndicator size={'large'} color={theme.colors.white[3]} />
						</LoaderOverlay>
					)
				}
			</Container>
		</Modal>
	)
}

export { ImageCropperModal }
export type { ImageCropperModalProps, ImageCropperResult }
