import React from 'react'

import { defaultUserProfilePicture } from '@utils/defaultUserProfilePicture'

import { Body, Description, ImageContainer, ImageDescription, ProfilePictureContainer } from './styles'
import HandOnCorreWhiteIcon from '@assets/icons/handOnCorre.svg'
import UserNetworkImage from '@assets/imgs/userNetwork.png'
import { showMessageWithHighlight } from '@common/auxiliaryFunctions'
import { relativeScreenHeight, relativeScreenWidth } from '@common/screenDimensions'

import { VerticalSpacing } from '@components/_space/VerticalSpacing'

import { PhotoPortrait } from '../../PhotoPortrait'
import { CustomModal } from '../CustomModal'

interface SubscriptionPresentationModalProps {
	visibility: boolean
	withoutNegativeOption?: boolean
	profilePictureUri?: string
	closeModal: () => void
	onPressButton: () => void
}

function SubscriptionPresentationModal({
	visibility,
	withoutNegativeOption,
	profilePictureUri,
	closeModal,
	onPressButton
}: SubscriptionPresentationModalProps) {
	return (
		<CustomModal
			visibility={visibility}
			title={'por que \nassinar o corre.'}
			titleHighlightedWords={['\nassinar', 'o', 'corre']}
			TitleIcon={HandOnCorreWhiteIcon}
			closeModal={closeModal}
			affirmativeButton={{
				label: withoutNegativeOption ? 'ok, entendi' : 'gostei! \nvou assinar',
				onPress: onPressButton
			}}
			negativeButton={
				!withoutNegativeOption
					? {
						label: 'agora não',
						onPress: closeModal
					}
					: undefined
			}
		>
			<Body>
				<ImageDescription>
					<ImageContainer>
						<ProfilePictureContainer
							source={UserNetworkImage}
							imageStyle={{ resizeMode: 'contain' }}
						>
							<PhotoPortrait
								pictureUri={profilePictureUri || defaultUserProfilePicture}
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
				<VerticalSpacing height={relativeScreenHeight(4)} />
				<Description fullWidth>
					{showMessageWithHighlight(
						'ao mesmo tempo, todo nosso lucro vai para iniciativas sociais nas favelas brasileiras!',
						['todo', 'nosso', 'vai', 'lucro', 'para', 'iniciativas', 'sociais', 'nas', 'favelas', 'brasileiras!']
					)}
				</Description>
				<VerticalSpacing height={relativeScreenHeight(3)} />
			</Body>
		</CustomModal>
	)
}

export { SubscriptionPresentationModal }
