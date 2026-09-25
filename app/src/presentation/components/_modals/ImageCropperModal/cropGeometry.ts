// NOTE: Módulo puro (sem imports de React Native) para ser testável com ts-jest em ambiente node

export type CropSize = {
	width: number
	height: number
}

export type CropRect = {
	originX: number
	originY: number
	width: number
	height: number
}

// Subconjunto estrutural do CropContextResult do react-native-zoom-toolkit
export type CropContextInput = {
	crop: CropRect
	resize?: CropSize
}

export type CropAction = { resize: CropSize } | { crop: CropRect }

export interface CropConstraints {
	aspectRatio?: number
	minimumCropDimensions?: CropSize
}

const DEFAULT_ASPECT_RATIO = 1

function isPositiveNumber(value: number | undefined): value is number {
	return typeof value === 'number' && Number.isFinite(value) && value > 0
}

function clamp(value: number, min: number, max: number) {
	return Math.min(Math.max(value, min), max)
}

function getValidAspectRatio(aspectRatio?: number) {
	return isPositiveNumber(aspectRatio) ? aspectRatio : DEFAULT_ASPECT_RATIO
}

function fitSizeToAspectRatio(container: CropSize, aspectRatio?: number): CropSize {
	const ratio = getValidAspectRatio(aspectRatio)
	const containerWidth = isPositiveNumber(container.width) ? container.width : 0
	const containerHeight = isPositiveNumber(container.height) ? container.height : 0

	const width = Math.min(containerWidth, containerHeight * ratio)
	return { width, height: width / ratio }
}

// O CropZoom renderiza a imagem cobrindo a área de recorte na escala 1 (ver getCropRotatedSize do zoom-toolkit)
// Limita o zoom para que o recorte nunca tenha menos pixels da imagem original do que a própria área de recorte (padrão do zoom-toolkit) nem do que o mínimo informado
function getCropMaxScale(cropSize: CropSize, resolution: CropSize, minimumCropDimensions?: CropSize) {
	if (![cropSize.width, cropSize.height, resolution.width, resolution.height].every(isPositiveNumber)) return 1

	const coverScale = Math.max(cropSize.width / resolution.width, cropSize.height / resolution.height)
	const minimumWidth = isPositiveNumber(minimumCropDimensions?.width) ? minimumCropDimensions.width : 1
	const minimumHeight = isPositiveNumber(minimumCropDimensions?.height) ? minimumCropDimensions.height : 1

	const maxScale = Math.min(1, cropSize.width / minimumWidth, cropSize.height / minimumHeight) / coverScale
	return Math.max(1, maxScale)
}

function normalizeCropRect(rect: CropRect, imageSize: CropSize, constraints: CropConstraints = {}): CropRect {
	const imageWidth = Math.max(1, Math.floor(isPositiveNumber(imageSize.width) ? imageSize.width : 1))
	const imageHeight = Math.max(1, Math.floor(isPositiveNumber(imageSize.height) ? imageSize.height : 1))
	const ratio = getValidAspectRatio(constraints.aspectRatio)
	const { minimumCropDimensions } = constraints

	let { width, height } = fitSizeToAspectRatio({ width: rect.width, height: rect.height }, ratio)

	const minimumWidth = Math.max(
		1,
		isPositiveNumber(minimumCropDimensions?.width) ? minimumCropDimensions.width : 0,
		isPositiveNumber(minimumCropDimensions?.height) ? minimumCropDimensions.height * ratio : 0
	)
	if (width < minimumWidth) {
		width = minimumWidth
		height = width / ratio
	}

	const maxSize = fitSizeToAspectRatio({ width: imageWidth, height: imageHeight }, ratio)
	if (width > maxSize.width) {
		width = maxSize.width
		height = maxSize.height
	}

	width = clamp(Math.round(width), 1, imageWidth)
	height = clamp(Math.round(height), 1, imageHeight)

	const centerX = Number.isFinite(rect.originX + rect.width / 2) ? rect.originX + rect.width / 2 : imageWidth / 2
	const centerY = Number.isFinite(rect.originY + rect.height / 2) ? rect.originY + rect.height / 2 : imageHeight / 2

	return {
		originX: clamp(Math.round(centerX - width / 2), 0, imageWidth - width),
		originY: clamp(Math.round(centerY - height / 2), 0, imageHeight - height),
		width,
		height
	}
}

function buildCropActions(cropContext: CropContextInput, imageSize: CropSize, constraints: CropConstraints = {}): CropAction[] {
	const actions: CropAction[] = []
	let referenceSize = imageSize

	if (cropContext.resize && isPositiveNumber(cropContext.resize.width) && isPositiveNumber(cropContext.resize.height)) {
		referenceSize = {
			width: Math.round(cropContext.resize.width),
			height: Math.round(cropContext.resize.height)
		}
		actions.push({ resize: referenceSize })
	}

	actions.push({ crop: normalizeCropRect(cropContext.crop, referenceSize, constraints) })
	return actions
}

export { fitSizeToAspectRatio, getCropMaxScale, normalizeCropRect, buildCropActions }
