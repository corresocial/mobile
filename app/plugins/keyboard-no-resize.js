/* eslint-disable import/no-default-export, no-param-reassign */
const { withAndroidManifest } = require('expo/config-plugins')

// O app é edge-to-edge e as telas usam KeyboardAvoidingView com behavior "padding".
// Em Androids que ainda encolhem a janela por conta própria (adjustResize), o teclado era compensado duas vezes:
// aparecia um bloco em branco no lugar do campo e o input do chat sumia atrás do teclado.
// Com adjustNothing a janela nunca encolhe, em nenhuma versão do Android, e só o KeyboardAvoidingView compensa.
module.exports = (config) => {
	return withAndroidManifest(config, (manifestConfig) => {
		const activities = manifestConfig.modResults.manifest.application?.[0]?.activity || []
		activities.forEach((activity) => {
			if (activity.$['android:name'] === '.MainActivity') {
				activity.$['android:windowSoftInputMode'] = 'adjustNothing'
			}
		})
		return manifestConfig
	})
}
