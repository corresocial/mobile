/* eslint-disable no-undef */
import React, { ReactElement } from 'react'
import ErrorBoundary from 'react-native-error-boundary'
import { errorHandler } from '@utils/errorHandler'
import { ErrorBoundaryFallback } from '../../../screens/ErrorBoundaryFallback'

interface ErrorBoundaryContainerProps {
	children: ReactElement
}

function ErrorBoundaryContainer({ children }: ErrorBoundaryContainerProps) {
	if (!__DEV__) {
		return children
	}

	return (
		<ErrorBoundary
			FallbackComponent={ErrorBoundaryFallback}
			onError={errorHandler}
		>
			{children}
		</ErrorBoundary>

	)
}

export { ErrorBoundaryContainer }
