import styled from 'styled-components/native'

export const Container = styled.View`
    flex: 1;
`

interface ButtonsContainerProps {
	numberOfChildrens: number
}

export const ButtonsContainer = styled.View<ButtonsContainerProps>`
	padding: ${({ numberOfChildrens }) => {
		switch (numberOfChildrens) {
			case 2: return '20%'
			case 3: return '10%'
			default: return '10%'
		}
	}} 0px;
	width: 100%;
	height: 100%;
	justify-content: space-around;
`
