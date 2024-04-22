/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/sort-comp */
/* eslint-disable react/no-unused-class-component-methods */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/state-in-constructor */
/* eslint-disable react/static-property-placement */
import { CodedError } from 'expo-modules-core'
import * as React from 'react'
import { StyleSheet, Modal, ActivityIndicator } from 'react-native'

import { CancelButton, CancelContainer, Container, ContainerModal, Content, Header, LoaderContainer, Title } from './styles'

import { CustomRecaptcha } from './CustomRecaptcha'

interface FirebaseAuthApplicationVerifier {
	readonly type: string;
	verify(): Promise<string>;
}

interface Props
	extends Omit<React.ComponentProps<typeof CustomRecaptcha>, 'onVerify' | 'invisible' | 'verify' | 'onVerify' | 'onLoad' | 'onError' | 'onFullChallenge'> {
	title?: string;
	cancelLabel?: string;
	attemptInvisibleVerification?: boolean;
}

interface State {
	visible: boolean;
	visibleLoaded: boolean;
	invisibleLoaded: boolean;
	invisibleVerify: boolean;
	invisibleKey: number;
	resolve?: (token: string) => void;
	reject?: (error: Error) => void;
}

class CustomRecaptchaModal
	extends React.Component<Props, State>
	implements FirebaseAuthApplicationVerifier {
	static defaultProps = {
		title: 'Solucione o reCaptcha',
		cancelLabel: 'Cancelar',
	}

	state: State = {
		visible: false,
		visibleLoaded: false,
		invisibleLoaded: false,
		invisibleVerify: false,
		invisibleKey: 1,
		resolve: undefined,
		reject: undefined,
	}

	static getDerivedStateFromProps(props: Props, state: State) {
		if (!props.attemptInvisibleVerification && state.invisibleLoaded) {
			return {
				invisibleLoaded: false,
				invisibleVerify: false,
			}
		}
		return null
	}

	get type(): string {
		return 'recaptcha'
	}

	async verify(): Promise<string> {
		return new Promise((resolve, reject) => {
			if (this.props.attemptInvisibleVerification) {
				this.setState({
					invisibleVerify: true,
					resolve,
					reject,
				})
			} else {
				this.setState({
					visible: true,
					visibleLoaded: false,
					resolve,
					reject,
				})
			}
		})
	}

	_reset(...args: any): void { }

	private onVisibleLoad = () => {
		this.setState({ visibleLoaded: true })
	}

	private onInvisibleLoad = () => {
		this.setState({ invisibleLoaded: true })
	}

	private onFullChallenge = async () => {
		this.setState({
			invisibleVerify: false,
			visible: true,
		})
	}

	private onError = () => {
		const { reject } = this.state
		if (reject) { reject(new CodedError('ERR_FIREBASE_RECAPTCHA_ERROR', 'Failed to load reCAPTCHA')) }

		this.setState({
			visible: false,
			invisibleVerify: false,
		})
	}

	private onVerify = (token: string) => {
		const { resolve } = this.state
		if (resolve) { resolve(token) }

		this.setState((state) => ({
			visible: false,
			invisibleVerify: false,
			invisibleLoaded: false,
			invisibleKey: state.invisibleKey + 1,
		}))
	}

	cancel = () => {
		const { reject } = this.state
		if (reject) { reject(new CodedError('ERR_FIREBASE_RECAPTCHA_CANCEL', 'Cancelled by user')) }
		this.setState({ visible: false })
	}

	onDismiss = () => {
		if (this.state.visible) { this.cancel() }
	}

	render() {
		const { title, cancelLabel, attemptInvisibleVerification, ...otherProps } = this.props
		const { visible, visibleLoaded, invisibleLoaded, invisibleVerify, invisibleKey } = this.state
		return (
			<Container >
				{attemptInvisibleVerification && (
					<CustomRecaptcha
						{...otherProps}
						key={`invisible${invisibleKey}`}
						style={styles.invisible}
						onLoad={this.onInvisibleLoad}
						onError={this.onError}
						onVerify={this.onVerify}
						onFullChallenge={this.onFullChallenge}
						invisible
						verify={invisibleLoaded && invisibleVerify}
					/>
				)}
				<Modal
					visible={visible}
					animationType={'slide'}
					presentationStyle={'pageSheet'}
					onRequestClose={this.cancel}
					onDismiss={this.onDismiss}
				>
					<ContainerModal>
						<Header>
							<Title >{title}</Title>
							<CancelContainer>
								<CancelButton
									title={cancelLabel || CustomRecaptchaModal.defaultProps.cancelLabel}
									onPress={this.cancel}
								/>
							</CancelContainer>
						</Header>
						<Content >
							<CustomRecaptcha
								{...otherProps}
								style={styles.content}
								onLoad={this.onVisibleLoad}
								onError={this.onError}
								onVerify={this.onVerify}
							/>
							{!visibleLoaded ? (
								<LoaderContainer >
									<ActivityIndicator size={'large'} />
								</LoaderContainer>
							) : undefined}
						</Content>
					</ContainerModal>
				</Modal>
			</Container>
		)
	}
}

export { CustomRecaptchaModal }

const styles = StyleSheet.create({
	invisible: {
		width: 300,
		height: 300,
	},
	content: { flex: 1 }
})
