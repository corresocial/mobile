#!/usr/bin/env node
/* eslint-disable */
/**
 * Auditoria estática da migração para Expo 57 / React Native 0.86 / React 19.
 *
 * Procura erros que o TypeScript e o ESLint não pegam e que só quebram em runtime, principalmente no Android
 * (onde um estilo inválido derruba a tela em vez de ser ignorado, como acontece no iOS):
 *   STYLE-SYNTAX   chave/aspas sobrando em CSS do styled-components (ex.: `${x}px};`)
 *   STYLE-ENUM     valores inválidos em propriedades com lista fechada (align-items: column, justify-content: start...)
 *   STYLE-NUMBER   tamanhos passados como texto (fontSize: '16')
 *   THEME-REF      theme.fonts.X, theme.colors.X[n], theme.fontSizes[n] que não existem no tema
 *   RN-REMOVED     APIs removidas ou sem efeito no RN 0.86 / Android edge-to-edge / React 19
 *   KEYBOARD       KeyboardAvoidingView com behavior 'height' (não funciona no Android edge-to-edge)
 *   IMPORT         pacote importado que não está no package.json
 *
 * Uso (na pasta app/):  node scripts/audit-expo57.mjs [--json] [--no-warn]
 * Código de saída: 1 se houver erros (ERROR), 0 caso contrário.
 */
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs'
import { join, relative, extname } from 'node:path'
import { builtinModules } from 'node:module'

const ROOT = process.cwd()
const SRC = join(ROOT, 'src')
const args = new Set(process.argv.slice(2))
const findings = []

const report = (severity, rule, file, line, message) => findings.push({ severity, rule, file: relative(ROOT, file), line, message })

const walk = (dir) => readdirSync(dir).flatMap((name) => {
	const full = join(dir, name)
	if (name === 'node_modules' || name.startsWith('.')) return []
	return statSync(full).isDirectory() ? walk(full) : ['.ts', '.tsx', '.js', '.jsx'].includes(extname(full)) ? [full] : []
})

const files = walk(SRC)
const read = (file) => readFileSync(file, 'utf8')

// ---------- tema ----------
const themeSource = read(join(SRC, 'presentation/common/theme/index.ts'))
const block = (name, from = themeSource) => {
	const start = from.indexOf(`${name}: {`)
	if (start < 0) return ''
	let depth = 0
	for (let i = from.indexOf('{', start); i < from.length; i++) {
		if (from[i] === '{') depth++
		if (from[i] === '}' && --depth === 0) return from.slice(from.indexOf('{', start) + 1, i)
	}
	return ''
}
const themeColors = {}
const colorsBlock = block('colors')
for (const m of colorsBlock.matchAll(/(\w+):\s*\{([^}]*)\}/g)) {
	themeColors[m[1]] = new Set([...m[2].matchAll(/^\s*(\d+):/gm)].map((x) => x[1]))
}
const themeFonts = new Set([...block('fonts').matchAll(/^\s*(\w+):/gm)].map((x) => x[1]))
const themeFontSizes = new Set([...block('fontSizes').matchAll(/^\s*(\d+):/gm)].map((x) => x[1]))
const themeShadow = new Set([...block('shadowSize').matchAll(/^\s*(\w+):/gm)].map((x) => x[1]))

// ---------- listas válidas ----------
const ENUMS = {
	'align-items': ['flex-start', 'flex-end', 'center', 'stretch', 'baseline'],
	'align-self': ['auto', 'flex-start', 'flex-end', 'center', 'stretch', 'baseline'],
	'align-content': ['flex-start', 'flex-end', 'center', 'stretch', 'space-between', 'space-around', 'space-evenly'],
	'justify-content': ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'],
	'flex-direction': ['row', 'row-reverse', 'column', 'column-reverse'],
	'flex-wrap': ['nowrap', 'wrap', 'wrap-reverse'],
	position: ['absolute', 'relative', 'static'],
	overflow: ['visible', 'hidden', 'scroll'],
	display: ['flex', 'none', 'contents'],
	'text-align': ['auto', 'left', 'right', 'center', 'justify'],
	'text-align-vertical': ['auto', 'top', 'bottom', 'center'],
	'text-transform': ['none', 'uppercase', 'lowercase', 'capitalize'],
	'font-style': ['normal', 'italic'],
	'resize-mode': ['cover', 'contain', 'stretch', 'repeat', 'center'],
}
const camelToKebab = (s) => s.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)
const NUMERIC_PROPS = ['fontSize', 'lineHeight', 'letterSpacing', 'borderRadius', 'borderWidth', 'zIndex', 'opacity', 'flex', 'elevation']

const REMOVED = [
	[/\bBackHandler\.removeEventListener\b/, 'BackHandler.removeEventListener foi removido; use o objeto retornado por addEventListener(...).remove()'],
	[/\bKeyboard\.removeListener\b/, 'Keyboard.removeListener foi removido; use subscription.remove()'],
	[/\bViewPropTypes\b|\bColorPropType\b|\bPointPropType\b/, 'PropTypes do RN foram removidos'],
	[/\.defaultProps\s*=/, 'defaultProps em componente de função é ignorado no React 19; use parâmetros com valor padrão'],
	[/\bfindDOMNode\b|\bReact\.createFactory\b/, 'API removida no React 19'],
	[/\bref=["']/, 'string refs foram removidas no React 19'],
	[/from ['"]react-native['"]/, null],
	[/\bStatusBar\b[^>]*\b(?:translucent|backgroundColor)=/, 'StatusBar.backgroundColor/translucent não têm efeito no Android com tela de ponta a ponta (API 35+); a cor vem da view atrás da barra'],
	[/\bexpo-av\b/, 'expo-av foi removido nas versões recentes do Expo; use expo-audio / expo-video'],
	[/\bexpo-permissions\b/, 'expo-permissions foi removido; use a API de permissões de cada módulo'],
	[/\bAsyncStorage\b[^;\n]*from ['"]react-native['"]/, 'AsyncStorage saiu do react-native; use @react-native-async-storage/async-storage'],
]
const RN_REMOVED_COMPONENTS = ['Picker', 'Slider', 'Clipboard', 'ProgressBarAndroid', 'ProgressViewIOS', 'DatePickerIOS', 'ImagePickerIOS', 'NetInfo', 'Geolocation', 'SafeAreaView']

// ---------- dependências ----------
const pkg = JSON.parse(read(join(ROOT, 'package.json')))
const deps = new Set([...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.devDependencies || {})])
const aliasRoots = new Set(['@globalTypes', '@contexts', '@data', '@services', '@domain', '@infrastructure', '@presentation', '@assets', '@common', '@components', '@newComponents', '@routes', '@screens', '@utils', '@newutils', '@utils-ui', '@adapters', '@env'])
const builtins = new Set([...builtinModules, ...builtinModules.map((m) => `node:${m}`)])

const pkgNameOf = (spec) => (spec.startsWith('@') ? spec.split('/').slice(0, 2).join('/') : spec.split('/')[0])

// ---------- varredura ----------
for (const file of files) {
	const text = read(file)
	const lines = text.split('\n')
	const isStyleFile = /styled[.(]|css`/.test(text)

	lines.forEach((raw, i) => {
		const n = i + 1
		const line = raw.trim()
		if (line.startsWith('//') || line.startsWith('*')) return

		// STYLE-SYNTAX: `${...}px}` (chave sobrando) e `;;`
		if (/\}px\}/.test(raw) || /\bpx\};/.test(raw)) report('ERROR', 'STYLE-SYNTAX', file, n, `chave sobrando depois de "px" (vira um tamanho inválido e derruba o Text no Android): ${line.slice(0, 90)}`)

		// STYLE-ENUM em CSS (styled) e em objetos de estilo
		const cssDecl = line.match(/^([a-z-]+):\s*([^;${}`]+?)\s*;\s*$/) // declaração CSS: termina em ';' (objetos JS terminam em ',')
		if (cssDecl && ENUMS[cssDecl[1]] && isStyleFile) {
			const value = cssDecl[2].trim()
			if (!ENUMS[cssDecl[1]].includes(value) && !value.includes('${')) report('ERROR', 'STYLE-ENUM', file, n, `${cssDecl[1]}: ${value} não é válido no RN (válidos: ${ENUMS[cssDecl[1]].join(', ')})`)
		}
		const objDecl = line.match(/^([a-zA-Z]+):\s*['"]([^'"]+)['"],?$/)
		if (objDecl) {
			const kebab = camelToKebab(objDecl[1])
			if (ENUMS[kebab] && !ENUMS[kebab].includes(objDecl[2])) report('ERROR', 'STYLE-ENUM', file, n, `${objDecl[1]}: '${objDecl[2]}' não é válido no RN (válidos: ${ENUMS[kebab].join(', ')})`)
			if (NUMERIC_PROPS.includes(objDecl[1]) && /^[0-9.]+$/.test(objDecl[2])) report('ERROR', 'STYLE-NUMBER', file, n, `${objDecl[1]} recebe texto '${objDecl[2]}'; o Android exige número`)
		}
		const jsxProp = line.match(/\b(fontSize|lineHeight)=\{?['"]([0-9.]+)['"]\}?/)
		if (jsxProp) report('ERROR', 'STYLE-NUMBER', file, n, `${jsxProp[1]} recebe texto '${jsxProp[2]}'; o Android exige número`)

		// THEME-REF
		for (const m of raw.matchAll(/theme\.fonts\.(\w+)/g)) if (!themeFonts.has(m[1])) report('ERROR', 'THEME-REF', file, n, `theme.fonts.${m[1]} não existe (fontes: ${[...themeFonts].join(', ')})`)
		for (const m of raw.matchAll(/theme\.fontSizes\[(\d+)\]/g)) if (!themeFontSizes.has(m[1])) report('ERROR', 'THEME-REF', file, n, `theme.fontSizes[${m[1]}] fora do tema (0 a ${Math.max(...themeFontSizes)})`)
		for (const m of raw.matchAll(/theme\.colors\.(\w+)\[(\d+)\]/g)) {
			if (!themeColors[m[1]]) report('ERROR', 'THEME-REF', file, n, `theme.colors.${m[1]} não existe`)
			else if (!themeColors[m[1]].has(m[2])) report('ERROR', 'THEME-REF', file, n, `theme.colors.${m[1]}[${m[2]}] não existe (índices: ${[...themeColors[m[1]]].join(', ')})`)
		}
		for (const m of raw.matchAll(/theme\.shadowSize\.(\w+)/g)) if (!themeShadow.has(m[1])) report('ERROR', 'THEME-REF', file, n, `theme.shadowSize.${m[1]} não existe`)

		// RN-REMOVED
		for (const [re, message] of REMOVED) if (message && re.test(raw)) report('WARN', 'RN-REMOVED', file, n, message)
		const rnImport = raw.match(/import\s*\{([^}]*)\}\s*from\s*['"]react-native['"]/)
		if (rnImport) {
			const names = rnImport[1].split(',').map((s) => s.trim().split(/\s+as\s+/)[0])
			for (const name of names) if (RN_REMOVED_COMPONENTS.includes(name)) report('WARN', 'RN-REMOVED', file, n, `${name} importado de 'react-native' está removido/obsoleto${name === 'SafeAreaView' ? ' (use react-native-safe-area-context)' : ''}`)
		}

		// KEYBOARD
		if (/behavior=\{?.*['"]height['"]/.test(raw)) report('WARN', 'KEYBOARD', file, n, "KeyboardAvoidingView com behavior 'height' não funciona no Android edge-to-edge; use 'padding'")

		// IMPORT
		const imp = raw.match(/(?:import[^'"]*from|require\()\s*['"]([^'"]+)['"]/)
		if (imp) {
			const spec = imp[1]
			if (spec.startsWith('.') || spec.startsWith('/')) return
			const root = pkgNameOf(spec)
			if (spec.startsWith('src/') || aliasRoots.has(spec.split('/')[0]) || aliasRoots.has(root) || builtins.has(spec) || deps.has(root) || root === 'react-native') return
			report('ERROR', 'IMPORT', file, n, `"${spec}" não está no package.json`)
		}
	})
}

// ---------- resultado ----------
const shown = args.has('--no-warn') ? findings.filter((f) => f.severity === 'ERROR') : findings
if (args.has('--json')) {
	console.log(JSON.stringify(shown, null, 2))
} else {
	const byRule = {}
	for (const f of shown) (byRule[f.rule] ||= []).push(f)
	const limit = args.has('--all') ? Infinity : 12
	const order = (list) => (list[0].severity === 'ERROR' ? 0 : 1)
	for (const [rule, list] of Object.entries(byRule).sort((a, b) => order(a[1]) - order(b[1]) || a[1].length - b[1].length)) {
		console.log(`\n== ${rule} (${list.length}) ==`)
		for (const f of list.slice(0, limit)) console.log(`${f.severity.padEnd(5)} ${f.file}:${f.line}  ${f.message}`)
		if (list.length > limit) console.log(`      ... e mais ${list.length - limit} (use --all para listar tudo)`)
	}
	const errors = findings.filter((f) => f.severity === 'ERROR').length
	console.log(`\n${files.length} arquivos analisados: ${errors} erro(s), ${findings.length - errors} aviso(s).`)
}
process.exit(findings.some((f) => f.severity === 'ERROR') ? 1 : 0)
