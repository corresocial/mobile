import styled from 'styled-components/native'

export const Container = styled.View`
	width: 0;
	height: 0;
`
export const ContainerModal = styled.SafeAreaView`
	flex: 1;
`

export const Header = styled.View`
	background-color: '#FBFBFB';
	height: 44px;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	border-bottom-color: '#CECECE';
`

export const Title = styled.Text`
	font-weight: bold;
`

export const CancelContainer = styled.View`
	position: absolute;
	left: 8px;
	justify-content: center;
`

export const CancelButton = styled.Button``

export const Content = styled.View`
	flex: 1;
`

export const LoaderContainer = styled.View`
	position: absolute;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
	padding-top: 20px;
	justify-content: flex-start;
	align-items: center;
`
