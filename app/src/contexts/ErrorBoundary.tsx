import React, { Component, ErrorInfo, ReactNode } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

interface Props {
    children?: ReactNode
}

interface State {
    hasError: boolean
}

class ErrorBoundary extends Component<Props, State> {
    public state = {
        hasError: false
    }

    public static getDerivedStateFromError(error: Error): State {
        // Update state so the next render will show the fallback UI.
        // console.warn('getDerivedStateFromError')
        return { hasError: true }
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // console.error('componentDidCatch')
        // console.error('Uncaught error:', error, errorInfo)
    }

    public render() {
        if (this.state.hasError) {
            return (
                <TouchableOpacity onPress={() => this.setState({ hasError: false })}
                    style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
                >
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text>Sorry.. there was an error</Text>
                    </View>
                </TouchableOpacity>
            )
        }

        return this.props.children
    }
}

export { ErrorBoundary }