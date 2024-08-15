import React from 'react'
import { Modal } from 'react-native'

import { PollQuestion } from '@domain/poll/entity/types'

import { Container, ContentInner, Header, Title, TouchCloseArea } from './styles'
import ChecksWhiteIcon from '@assets/icons/checks-white.svg'
import DescriptionWhiteIcon from '@assets/icons/description-white.svg'
import NumbersWhiteIcon from '@assets/icons/numbers-white.svg'
import SatisfactionEmoji5WhiteIcon from '@assets/icons/satisfactionEmoji-5-white.svg'
import VerifiedLabelWhiteIcon from '@assets/icons/verifiedLabel.svg'
import { theme } from '@common/theme'

import { OptionButton } from '@components/_buttons/OptionButton'

import { FocusAwareStatusBar } from '../../FocusAwareStatusBar'

interface SelectQuestionTypeModalProps {
	visibility: boolean
	onSelect: (type: PollQuestion['questionType']) => void
	closeModal: () => void
}

function SelectQuestionTypeModal({ visibility, onSelect, closeModal }: SelectQuestionTypeModalProps) {
	return (
		<Modal
			transparent
			visible={visibility}
			animationType={'fade'}
			onRequestClose={closeModal}
		>
			<FocusAwareStatusBar backgroundColor={theme.transparence.orange()} barStyle={'dark-content'} />
			<Container>
				<TouchCloseArea onPress={closeModal}></TouchCloseArea>
				<ContentInner>
					<Header>
						<Title>{'que tipo de resposta você quer para essa questão?'}</Title>
					</Header>
					<OptionButton
						label={'campo de resposta'}
						highlightedWords={['resposta']}
						labelSize={15}
						SvgIcon={DescriptionWhiteIcon}
						svgIconScale={['50%', '50%']}
						leftSideColor={theme.colors.purple[3]}
						leftSideWidth={'25%'}
						onPress={() => onSelect('textual')}
					/>
					<OptionButton
						label={'valor numérico'}
						highlightedWords={['numérico']}
						labelSize={15}
						SvgIcon={NumbersWhiteIcon}
						svgIconScale={['50%', '50%']}
						leftSideColor={theme.colors.purple[3]}
						leftSideWidth={'25%'}
						onPress={() => onSelect('numerical')}
					/>
					<OptionButton
						label={'sim / não'}
						highlightedWords={['sim', 'não']}
						labelSize={15}
						SvgIcon={VerifiedLabelWhiteIcon}
						svgIconScale={['50%', '50%']}
						leftSideColor={theme.colors.purple[3]}
						leftSideWidth={'25%'}
						onPress={() => onSelect('binary')}
					/>
					<OptionButton
						label={'nível de felicidade'}
						highlightedWords={['felicidade']}
						labelSize={15}
						SvgIcon={SatisfactionEmoji5WhiteIcon}
						svgIconScale={['50%', '50%']}
						leftSideColor={theme.colors.purple[3]}
						leftSideWidth={'25%'}
						onPress={() => onSelect('satisfaction')}
					/>
					<OptionButton
						label={'múltipla escolha'}
						highlightedWords={['múltipla']}
						labelSize={15}
						SvgIcon={ChecksWhiteIcon}
						svgIconScale={['60%', '60%']}
						leftSideColor={theme.colors.purple[3]}
						leftSideWidth={'25%'}
						onPress={() => onSelect('select')}
					/>
				</ContentInner>
				<TouchCloseArea onPress={closeModal} ></TouchCloseArea>
			</Container>
		</Modal >
	)
}

export { SelectQuestionTypeModal }
