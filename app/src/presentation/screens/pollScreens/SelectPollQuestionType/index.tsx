import React, { useContext } from 'react'
import { useTheme } from 'styled-components'

import { PollQuestion } from '@domain/poll/entity/types'

import { PollRegisterContext } from '@contexts/PollRegisterContext'

import { SelectPollQuestionTypeScreenProps } from '@routes/Stack/PollStack/screenProps'

import DescriptionWhiteIcon from '@assets/icons/description-white.svg'
import NumbersWhiteIcon from '@assets/icons/numbers-white.svg'
import SatisfactionEmoji5WhiteIcon from '@assets/icons/satisfactionEmoji-5-white.svg'
import VerifiedLabelWhiteIcon from '@assets/icons/verifiedLabel.svg'

import { OptionButton } from '@components/_buttons/OptionButton'
import { PostSelectButton } from '@components/_onboarding/PostSelectButton'

function SelectPollQuestionType({ navigation }: SelectPollQuestionTypeScreenProps) {
	const theme = useTheme()

	const { setRegisteredQuestionOnPollDataContext } = useContext(PollRegisterContext)

	const selectPollQuestionType = (questionType: PollQuestion['questionType']) => {
		console.log(questionType)
		setRegisteredQuestionOnPollDataContext(questionType)
		navigation.push('InsertPollQuestions')
	}

	return (
		<PostSelectButton
			title={'que tipo de resposta você quer?'}
			highlightedWords={['tipo', 'resposta']}
			headerBackgroundColor={theme.purple2}
			progress={[3, 3]}
			backgroundColor={theme.white3}
			navigateBackwards={() => navigation.goBack()}
		>
			<OptionButton
				label={'campo de resposta'}
				highlightedWords={['resposta']}
				labelSize={15}
				relativeHeight={'18%'}
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
				relativeHeight={'18%'}
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
				relativeHeight={'18%'}
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
				relativeHeight={'18%'}
				SvgIcon={SatisfactionEmoji5WhiteIcon}
				svgIconScale={['50%', '50%']}
				leftSideColor={theme.purple3}
				leftSideWidth={'25%'}
				onPress={() => selectPollQuestionType('satisfaction')}
			/>
		</PostSelectButton>
	)
}

export { SelectPollQuestionType }
