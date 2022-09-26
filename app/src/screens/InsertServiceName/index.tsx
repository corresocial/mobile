import React from 'react'
import { Text} from 'react-native'

import {  Container} from './styles';
import { InsertServiceNameScreenProps } from '../../routes/Stack/stackScreenProps';

function InsertServiceName({ navigation, route }: InsertServiceNameScreenProps) {

    return (
        <Container >
            <Text>This is InsertServiceName</Text>
        </Container>
    );
}

export { InsertServiceName }