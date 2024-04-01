import { ReactNode } from 'react'

export interface LoaderProviderProps {
	children: ReactNode;
}

export type LoaderContextType = {
	loaderIsVisible: boolean;
	setLoaderIsVisible: (visibility: boolean) => void;
};
