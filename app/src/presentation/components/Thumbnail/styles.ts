import styled from 'styled-components/native'

interface ContainerProps {
	active: boolean
}

export const ThumbnailContainer = styled.TouchableOpacity<ContainerProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 7px;
    margin-right: 7px;
    width: 70px;
    height: 70px;
    border-radius: 23px;
    border-width: 3px;
    border-color: ${(props) => (props.active ? 'white' : 'rgba(0,0,0,0)')};
    background-color: rgba(0,0,0,0);
`

export const ThumbnailImage = styled.Image`
    width: 85%;
    height: 85%;
    border-radius: 16px;
`

export const VideoIcon = styled.View`
    flex: 1;
    width: 100%;
    height: 100%;
    position: absolute;
    align-items: center;
    justify-content: center;
    z-index: 2;
`
