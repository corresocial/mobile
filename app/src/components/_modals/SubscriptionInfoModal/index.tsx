import React from 'react'

import { CustomModal } from '../CustomModal'

import { Body, Description, ImageContainer, ImageDescription, ProfilePictureContainer } from './styles'
import HandOnCorreWhiteIcon from '../../../assets/icons/handOnCorre.svg'
import UserNetworkImage from '../../../assets/imgs/userNetwork.png'
import { showMessageWithHighlight } from '../../../common/auxiliaryFunctions'
import { VerticalSigh } from '../../VerticalSigh'
import { relativeScreenHeight, relativeScreenWidth } from '../../../common/screenDimensions'
import { PhotoPortrait } from '../../PhotoPortrait'

interface SubscriptionInfoModalProps {
	visibility: boolean
	profilePictureUri?: string
	closeModal: () => void
	onPressButton: () => void
}

function SubscriptionInfoModal({
	visibility,
	profilePictureUri,
	closeModal,
	onPressButton
}: SubscriptionInfoModalProps) {
	return (
		<CustomModal
			visibility={visibility}
			title={'por que \nassinar o corre.'}
			titleHighlightedWords={['\nassinar', 'o', 'corre']}
			TitleIcon={HandOnCorreWhiteIcon}
			closeModal={closeModal}
			affirmativeButton={{
				label: 'gostei! \nvou assinar',
				onPress: onPressButton
			}}
			negativeButton={{
				label: 'agora não',
				onPress: closeModal
			}}
		>
			<Body>
				<ImageDescription>
					<ImageContainer>
						<ProfilePictureContainer
							source={UserNetworkImage}
							imageStyle={{ resizeMode: 'contain' }}
						>
							<PhotoPortrait
								pictureUri={'data:image/jpeg;base64,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'}
								height={relativeScreenWidth(11)}
								width={relativeScreenWidth(13)}
								resizeMode={'cover'}
								borderWidth={3}
								circle
							/>
						</ProfilePictureContainer>
					</ImageContainer>
					<Description>
						{showMessageWithHighlight(
							'aqui você paga pelo alcance dos seus posts. de acordo com seu plano e localização, mais pessoas podem te encontrar!',
							['você', 'paga', 'pelo', 'alcance', 'dos', 'seus', 'posts', 'mais', 'pessoas', 'podem', 'te', 'encontrar!']
						)}
					</Description>
				</ImageDescription>
				<VerticalSigh height={relativeScreenHeight(4)} />
				<Description fullWidth>
					{showMessageWithHighlight(
						'ao mesmo tempo, todo nosso lucro vai para iniciativas sociais nas favelas brasileiras!',
						['todo', 'nosso', 'vai', 'lucro', 'para', 'iniciativas', 'sociais', 'nas', 'favelas', 'brasileiras!']
					)}
				</Description>
				<VerticalSigh height={relativeScreenHeight(3)} />
			</Body>
		</CustomModal>
	)
}

export { SubscriptionInfoModal }
