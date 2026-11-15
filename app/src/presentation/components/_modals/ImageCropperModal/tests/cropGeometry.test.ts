import { buildCropActions, fitSizeToAspectRatio, getCropMaxScale, normalizeCropRect } from '../cropGeometry'

describe('ImageCropperModal cropGeometry.ts', () => {
	describe('fitSizeToAspectRatio', () => {
		test('Deve retornar o maior quadrado que cabe em um container retangular', () => {
			expect(fitSizeToAspectRatio({ width: 390, height: 600 }, 1)).toEqual({ width: 390, height: 390 })
			expect(fitSizeToAspectRatio({ width: 600, height: 390 }, 1)).toEqual({ width: 390, height: 390 })
		})

		test('Deve respeitar proporções diferentes de 1', () => {
			expect(fitSizeToAspectRatio({ width: 400, height: 400 }, 2)).toEqual({ width: 400, height: 200 })
			expect(fitSizeToAspectRatio({ width: 400, height: 400 }, 0.5)).toEqual({ width: 200, height: 400 })
		})

		test('Deve usar proporção 1 quando a proporção for inválida', () => {
			expect(fitSizeToAspectRatio({ width: 300, height: 200 }, 0)).toEqual({ width: 200, height: 200 })
			expect(fitSizeToAspectRatio({ width: 300, height: 200 }, NaN)).toEqual({ width: 200, height: 200 })
		})
	})

	describe('getCropMaxScale', () => {
		test('Deve limitar o zoom a um pixel da imagem por ponto da área de recorte', () => {
			// Imagem 4000x3000 cobrindo recorte 400x400 => escala de cobertura 400 / 3000
			const maxScale = getCropMaxScale({ width: 400, height: 400 }, { width: 4000, height: 3000 }, { width: 50, height: 50 })
			expect(maxScale).toBeCloseTo(7.5)
		})

		test('Deve limitar o zoom pelo tamanho mínimo quando ele for maior que a área de recorte', () => {
			const maxScale = getCropMaxScale({ width: 400, height: 400 }, { width: 4000, height: 3000 }, { width: 1000, height: 1000 })
			expect(maxScale).toBeCloseTo(3)

			// Na escala máxima o recorte visível tem exatamente o tamanho mínimo em pixels da imagem original
			const coverScale = 400 / 3000
			expect(400 / (coverScale * maxScale)).toBeCloseTo(1000)
		})

		test('Deve retornar 1 quando a imagem for menor que a área de recorte', () => {
			expect(getCropMaxScale({ width: 400, height: 400 }, { width: 300, height: 300 }, { width: 50, height: 50 })).toBe(1)
		})

		test('Deve retornar 1 quando as dimensões forem inválidas', () => {
			expect(getCropMaxScale({ width: 0, height: 400 }, { width: 4000, height: 3000 })).toBe(1)
			expect(getCropMaxScale({ width: 400, height: 400 }, { width: NaN, height: 3000 })).toBe(1)
		})
	})

	describe('normalizeCropRect', () => {
		const imageSize = { width: 4000, height: 3000 }
		const constraints = { aspectRatio: 1, minimumCropDimensions: { width: 50, height: 50 } }

		test('Deve arredondar um recorte válido para pixels inteiros', () => {
			const rect = normalizeCropRect({ originX: 500.3, originY: 250.6, width: 1200.2, height: 1200.2 }, imageSize, constraints)
			expect(rect).toEqual({ originX: 500, originY: 251, width: 1200, height: 1200 })
		})

		test('Deve forçar a proporção mantendo o centro do recorte', () => {
			const rect = normalizeCropRect({ originX: 1000, originY: 1000, width: 1001, height: 999 }, imageSize, constraints)
			expect(rect.width).toBe(rect.height)
			expect(rect).toEqual({ originX: 1001, originY: 1000, width: 999, height: 999 })
		})

		test('Deve manter o recorte dentro dos limites da imagem', () => {
			const rect = normalizeCropRect({ originX: 3500, originY: -20, width: 1000, height: 1000 }, imageSize, constraints)
			expect(rect).toEqual({ originX: 3000, originY: 0, width: 1000, height: 1000 })
			expect(rect.originX + rect.width).toBeLessThanOrEqual(imageSize.width)
			expect(rect.originY + rect.height).toBeLessThanOrEqual(imageSize.height)
		})

		test('Deve reduzir recortes maiores que a imagem', () => {
			const rect = normalizeCropRect({ originX: -100, originY: -100, width: 5000, height: 5000 }, imageSize, constraints)
			expect(rect).toEqual({ originX: 900, originY: 0, width: 3000, height: 3000 })
		})

		test('Deve aumentar recortes menores que o tamanho mínimo a partir do centro', () => {
			const rect = normalizeCropRect({ originX: 100, originY: 100, width: 20, height: 20 }, imageSize, constraints)
			expect(rect).toEqual({ originX: 85, originY: 85, width: 50, height: 50 })
		})

		test('Deve respeitar o tamanho mínimo junto com a proporção', () => {
			const rect = normalizeCropRect(
				{ originX: 0, originY: 0, width: 10, height: 5 },
				imageSize,
				{ aspectRatio: 2, minimumCropDimensions: { width: 50, height: 50 } }
			)
			expect(rect).toEqual({ originX: 0, originY: 0, width: 100, height: 50 })
		})

		test('Deve limitar ao tamanho da imagem quando a imagem for menor que o mínimo', () => {
			const rect = normalizeCropRect({ originX: 0, originY: 0, width: 10, height: 10 }, { width: 40, height: 30 }, constraints)
			expect(rect).toEqual({ originX: 0, originY: 0, width: 30, height: 30 })
		})

		test('Deve gerar um recorte válido quando os valores recebidos não forem numéricos', () => {
			const rect = normalizeCropRect({ originX: NaN, originY: NaN, width: NaN, height: NaN }, imageSize, constraints)
			expect(rect).toEqual({ originX: 1975, originY: 1475, width: 50, height: 50 })
		})
	})

	describe('buildCropActions', () => {
		test('Deve gerar apenas a ação de recorte quando não houver redimensionamento', () => {
			const actions = buildCropActions(
				{ crop: { originX: 10.2, originY: 20.7, width: 300.4, height: 300.4 } },
				{ width: 1000, height: 800 },
				{ aspectRatio: 1, minimumCropDimensions: { width: 50, height: 50 } }
			)
			expect(actions).toEqual([{ crop: { originX: 10, originY: 21, width: 300, height: 300 } }])
		})

		test('Deve redimensionar antes de recortar e limitar o recorte ao tamanho redimensionado', () => {
			const actions = buildCropActions(
				{
					crop: { originX: 180.5, originY: 20, width: 200, height: 200 },
					resize: { width: 400.4, height: 320.2 }
				},
				{ width: 1000, height: 800 },
				{ aspectRatio: 1 }
			)
			expect(actions).toEqual([
				{ resize: { width: 400, height: 320 } },
				{ crop: { originX: 181, originY: 20, width: 200, height: 200 } }
			])
		})

		test('Deve ignorar redimensionamentos inválidos', () => {
			const actions = buildCropActions(
				{ crop: { originX: 0, originY: 0, width: 100, height: 100 }, resize: { width: 0, height: 0 } },
				{ width: 1000, height: 800 }
			)
			expect(actions).toEqual([{ crop: { originX: 0, originY: 0, width: 100, height: 100 } }])
		})
	})
})
