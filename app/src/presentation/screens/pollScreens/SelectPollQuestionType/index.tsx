import React, { useContext } from 'react'
import uuid from 'react-uuid'
import { useTheme } from 'styled-components'

import { PollQuestion } from '@domain/poll/entity/types'

import { EditContext } from '@contexts/EditContext'
import { usePollRegisterContext } from '@contexts/PollRegisterContext'

import { SelectPollQuestionTypeScreenProps } from '@routes/Stack/PollStack/screenProps'

import DescriptionWhiteIcon from '@assets/icons/description-white.svg'
import NumbersWhiteIcon from '@assets/icons/numbers-white.svg'
import QuestionMarkWhiteIcon from '@assets/icons/questionMark-white.svg'
import SatisfactionEmoji5WhiteIcon from '@assets/icons/satisfactionEmoji-5-white.svg'
import VerifiedLabelWhiteIcon from '@assets/icons/verifiedLabel.svg'

import { OptionButton } from '@components/_buttons/OptionButton'
import { PostSelectButton } from '@components/_onboarding/PostSelectButton'

function SelectPollQuestionType({ route, navigation }: SelectPollQuestionTypeScreenProps) {
	const theme = useTheme()

	const { setRegisteredQuestionOnPollDataContext } = usePollRegisterContext()
	const { editDataContext, addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const selectPollQuestionType = (questionType: PollQuestion['questionType']) => {
		if (questionType === 'select') {
			return navigation.push('InsertPollSelectOptions', { ...route.params, selectOptions: [], editMode: !!route.params?.editMode })
		}

		if (route.params?.editMode) {
			addNewUnsavedFieldToEditContext({
				questions: [...(editDataContext.unsaved.questions || []), {
					questionId: uuid(),
					questionType,
					question: route.params.questionText,
				} as PollQuestion]
			})
		} else {
			setRegisteredQuestionOnPollDataContext(questionType)
		}

		navigation.push('InsertPollQuestions', { editMode: !!route.params?.editMode, initialValue: null })
	}

	return (
		<PostSelectButton
			title={'que tipo de resposta você quer?'}
			highlightedWords={['tipo', 'resposta']}
			headerBackgroundColor={theme.purple2}
			progress={[3, 4]}
			backgroundColor={theme.white3}
			navigateBackwards={() => navigation.goBack()}
		>
			<OptionButton
				label={'campo de resposta'}
				highlightedWords={['resposta']}
				labelSize={15}
				relativeHeight={'17%'}
				SvgIcon={DescriptionWhiteIcon}
				svgIconScale={['50%', '50%']}
				leftSideColor={theme.purple3}
				leftSideWidth={'25%'}
				onPress={() => selectPollQuestionType('textual')}
			/>
			<OptionButton
				label={'valor numérico'}
				highlightedWords={['numérico']}
				labelSize={15}
				relativeHeight={'17%'}
				SvgIcon={NumbersWhiteIcon}
				svgIconScale={['50%', '50%']}
				leftSideColor={theme.purple3}
				leftSideWidth={'25%'}
				onPress={() => selectPollQuestionType('numerical')}
			/>
			<OptionButton
				label={'sim / não'}
				highlightedWords={['sim', 'não']}
				labelSize={15}
				relativeHeight={'17%'}
				SvgIcon={VerifiedLabelWhiteIcon}
				svgIconScale={['50%', '50%']}
				leftSideColor={theme.purple3}
				leftSideWidth={'25%'}
				onPress={() => selectPollQuestionType('binary')}
			/>
			<OptionButton
				label={'nível de felicidade'}
				highlightedWords={['felicidade']}
				labelSize={15}
				relativeHeight={'17%'}
				SvgIcon={SatisfactionEmoji5WhiteIcon}
				svgIconScale={['50%', '50%']}
				leftSideColor={theme.purple3}
				leftSideWidth={'25%'}
				onPress={() => selectPollQuestionType('satisfaction')}
			/>
			<OptionButton
				label={'múltipla escolha'}
				highlightedWords={['múltipla']}
				labelSize={15}
				relativeHeight={'17%'}
				SvgIcon={QuestionMarkWhiteIcon}
				svgIconScale={['50%', '50%']}
				leftSideColor={theme.purple3}
				leftSideWidth={'25%'}
				onPress={() => selectPollQuestionType('select')}
			/>
		</PostSelectButton>
	)
}

export { SelectPollQuestionType }
