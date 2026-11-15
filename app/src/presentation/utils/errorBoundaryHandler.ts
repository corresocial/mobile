// O Sentry.ErrorBoundary já envia a exceção ao Sentry; aqui fica só o log local.
// (Antes este handler também mandava o erro ao Notion e ao Discord; os dois foram removidos.)
export const errorBoundaryHandler = (error: unknown, stackTrace: unknown) => {
	console.log(error)
	console.log(stackTrace)
}
