import styled from 'styled-components/native';
import { screenHeight } from '../../../common/screenDimensions';

export const Container = styled.View`
    flex: 1;
    position: relative;
`

export const ContainerBottom = styled.View`
    flex: 1;
`

export const InputTagArea = styled.View`
    width: 100%;
    padding: 20px;
`

// TODO Break
export const TagsSelectedArea = styled.View` 
    width: 100%;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    margin-bottom: 30px;
    flexWrap: wrap;
`

export const FloatButtonContainer = styled.View`
    align-self: center;
    align-items: center;
    justify-content: center;
    width: 85%;
    height: 15%;
    position: absolute;
    bottom: 0;
`

export const Sigh = styled.View`
    height: ${screenHeight * 0.1}px;
    width: 100%;
`