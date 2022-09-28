import React, { ReactElement } from 'react';
import { Container } from './styles';

interface FormContainerProps {
    children: ReactElement | ReactElement[]
    backgroundColor: string,
    justifyContent? : any // TODO type
}

function FormContainer({ children, backgroundColor, justifyContent }: FormContainerProps) {
    return (
        <Container style={{
            backgroundColor,
            justifyContent: justifyContent || 'space-around'
        }}>
            {children}
        </Container>
    );
}

export { FormContainer }