import React, { ReactElement } from 'react';
import { Container } from './styles';

interface FormContainerProps {
    children: ReactElement | ReactElement[]
    backgroundColor: string
}

function FormContainer({ children, backgroundColor }: FormContainerProps) {
    return (
        <Container style={{backgroundColor}}>
            {children}
        </Container>
    );
}

export { FormContainer }