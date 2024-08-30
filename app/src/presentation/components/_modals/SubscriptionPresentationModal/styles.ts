import styled from 'styled-components/native'

export const Body = styled.View`
	width: 100%;
`

export const ImageDescription = styled.View`
	width: 100%;
	justify-content: space-between;
	align-items: center;
	flex-direction: row;
`

export const ImageContainer = styled.View`
	width: 48%;
	height: 100%;

`

export const ProfilePictureContainer = styled.ImageBackground`
	flex: 1;
	align-items: center;
	justify-content: center;
`

interface DescriptionProps {
	fullWidth?: boolean
}

export const Description = styled.Text<DescriptionProps>`
	width: ${({ fullWidth }) => (fullWidth ? '100%' : '48%')};
	font-family: Arvo_400Regular;
	font-size: ${({ theme }) => theme.fontSizes[2]}px;
	text-align: center;
`
