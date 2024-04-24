import React, { useState } from 'react'
import { useTheme } from 'styled-components'

import { ExtraIdentificationRequest } from '@domain/petition/entity/types'

import { useEditContext } from '@contexts/EditContext'
import { usePetitionContext } from '@contexts/PetitionContext'

import { SelectIdentificationRequestScreenProps } from '@routes/Stack/PetitionStack/screenProps'

import CheckWhiteIcon from '@assets/icons/check-white.svg'
import DescriptionWhiteIcon from '@assets/icons/description-white.svg'
import DocumentPencilWhiteIcon from '@assets/icons/documentPencil-white.svg'
import PhoneDeviceWhiteIcon from '@assets/icons/phoneDevice-white.svg'

import { OptionButton } from '@components/_buttons/OptionButton'
import { PrimaryButton } from '@components/_buttons/PrimaryButton'
import { PostSelectButton } from '@components/_onboarding/PostSelectButton'

function SelectIdentificationRequest({ route, navigation }: SelectIdentificationRequestScreenProps) {
	const theme = useTheme()
	const { setPetitionDataOnContext } = usePetitionContext()
	const { addNewUnsavedFieldToEditContext } = useEditContext()

	const [selectedOptions, setSelectedOptions] = useState<ExtraIdentificationRequest[]>([])

	const selectIdentificationOption = (identification: ExtraIdentificationRequest) => {
		if (selectedOptions.includes(identification)) {
			setSelectedOptions(selectedOptions.filter((option) => option !== identification))
			return
		}

		setSelectedOptions([...selectedOptions, identification])
	}

	const saveIdentificationRequest = () => {
		if (route.params?.editMode) {
			addNewUnsavedFieldToEditContext({ extraIdentificationRequest: selectedOptions })
			navigation.goBack()
			return
		}

		setPetitionDataOnContext({ extraIdentificationRequest: selectedOptions })

		navigation.push('SelectPetitionMedia')
	}

	return (
		<PostSelectButton
			title={'além do nome e email, que outras informações você quer solicitar para assinar?'}
			highlightedWords={['nome', 'email,', 'informações', 'você', 'quer', 'solicitar', 'para', 'assinar?']}
			headerBackgroundColor={theme.purple2}
			backgroundColor={theme.white3}
			navigateBackwards={() => navigation.goBack()}
		>
			<OptionButton
				label={'o RG'}
				highlightedWords={['RG']}
				labelSize={15}
				relativeHeight={'18%'}
				SvgIcon={DocumentPencilWhiteIcon}
				svgIconScale={['50%', '50%']}
				leftSideColor={theme.white3}
				selectedSideColor={theme.purple3}
				leftSideWidth={'25%'}
				selected={selectedOptions.includes('rg')}
				onPress={() => selectIdentificationOption('rg')}
			/>
			<OptionButton
				label={'o CPF'}
				highlightedWords={['CPF']}
				labelSize={15}
				relativeHeight={'18%'}
				SvgIcon={DescriptionWhiteIcon}
				svgIconScale={['50%', '50%']}
				leftSideColor={theme.white3}
				selectedSideColor={theme.purple3}
				leftSideWidth={'25%'}
				selected={selectedOptions.includes('cpf')}
				onPress={() => selectIdentificationOption('cpf')}
			/>
			<OptionButton
				label={'o telefone'}
				highlightedWords={['telefone']}
				labelSize={15}
				relativeHeight={'18%'}
				SvgIcon={PhoneDeviceWhiteIcon}
				svgIconScale={['80%', '80%']}
				leftSideColor={theme.white3}
				selectedSideColor={theme.purple3}
				leftSideWidth={'25%'}
				selected={selectedOptions.includes('telefone')}
				onPress={() => selectIdentificationOption('telefone')}
			/>
			<PrimaryButton
				flexDirection={'row-reverse'}
				color={theme.green3}
				label={'continuar'}
				labelColor={theme.white3}
				SvgIcon={CheckWhiteIcon}
				onPress={saveIdentificationRequest}
			/>
		</PostSelectButton>
	)
}

export { SelectIdentificationRequest }
