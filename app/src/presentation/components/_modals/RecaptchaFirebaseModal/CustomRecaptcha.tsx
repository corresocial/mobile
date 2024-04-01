import { CodedError } from 'expo-modules-core'
import * as React from 'react'
import { WebView } from 'react-native-webview'

interface Props extends React.ComponentProps<typeof WebView> {
	firebaseConfig?: FirebaseOptions;
	firebaseVersion?: string;
	appVerificationDisabledForTesting?: boolean;
	languageCode?: string;
	onLoad?: () => any;
	onError?: () => any;
	onVerify: (token: string) => any;
	onFullChallenge?: () => any;
	invisible?: boolean;
	verify?: boolean;
}

type FirebaseOptions = {
	appId?: string | undefined;
	apiKey?: string | undefined;
	databaseURL?: string | undefined;
	trackingId?: string | undefined;
	messagingSenderId?: string | undefined;
	storageBucket?: string | undefined;
	projectId?: string | undefined;
	authDomain?: string | undefined;
	measurementId?: string | undefined;
}

function getWebviewSource(
	firebaseConfig: FirebaseOptions,
	firebaseVersion?: string,
	appVerificationDisabledForTesting?: boolean,
	languageCode?: string,
	invisible?: boolean
) {
	return {
		baseUrl: `https://${firebaseConfig.authDomain}`,
		html: `
<!DOCTYPE html><html>
<head>
	<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="HandheldFriendly" content="true">
	<script src="https://www.gstatic.com/firebasejs/8.0.0/firebase-app.js"></script>
	<script src="https://www.gstatic.com/firebasejs/8.0.0/firebase-auth.js"></script>
	<script type="text/javascript">firebase.initializeApp(${JSON.stringify(firebaseConfig)});</script>
	<style>
	html, body {
	height: 100%;
	${invisible ? 'padding: 0; margin: 0;' : ''}}
	#recaptcha-btn {
	width: 100%;
	height: 100%;
	padding: 0;
	margin: 0;
	border: 0;
	user-select: none;
	-webkit-user-select: none;
	}
	</style>
</head>
<body>
${invisible
		? '<button id="recaptcha-btn" type="button" onclick="onClickButton()">Confirm reCAPTCHA</button>'
		: '<div id="recaptcha-cont" class="g-recaptcha"/></div>'}
<script>
var fullChallengeTimer;
function onVerify(token) {
	if (fullChallengeTimer) {
		clearInterval(fullChallengeTimer);
		fullChallengeTimer = undefined;
	}
	window.ReactNativeWebView.postMessage(JSON.stringify({
		type: 'verify',
		token: token
	}));
}
function onLoad() {
	window.ReactNativeWebView.postMessage(JSON.stringify({
		type: 'load'
	}));

	// firebase.auth().settings.appVerificationDisabledForTesting = ${appVerificationDisabledForTesting};

	try{
		window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier("${invisible ? 'recaptcha-btn' : 'recaptcha-cont'}", {
			size: "${'normal'}",
			callback: onVerify
		});

		window.recaptchaVerifier.render();
	}catch(err){
		window.alert(err)
	}
}
function onError() {
window.ReactNativeWebView.postMessage(JSON.stringify({
	type: 'error'
}));
}

function onClickButton() {
	if (!fullChallengeTimer) {
		fullChallengeTimer = setInterval(function() {
		var iframes = document.getElementsByTagName("iframe");
		var isFullChallenge = false;
		for (i = 0; i < iframes.length; i++) {
			var parentWindow = iframes[i].parentNode ? iframes[i].parentNode.parentNode : undefined;
			var isHidden = parentWindow && parentWindow.style.opacity == 0;
			isFullChallenge = isFullChallenge || (
			!isHidden &&
			((iframes[i].title === 'recaptcha challenge') ||
				(iframes[i].src.indexOf('google.com/recaptcha/api2/bframe') >= 0)));
		}
		if (isFullChallenge) {
			clearInterval(fullChallengeTimer);
			fullChallengeTimer = undefined;
			window.ReactNativeWebView.postMessage(JSON.stringify({
			type: 'fullChallenge'
			}));
		}
		}, 100);
	}
}
window.addEventListener('message', function(event) {
if (event.data.verify) {
	document.getElementById('recaptcha-btn').click();
}
});
</script>
<script src="https://www.google.com/recaptcha/api.js?onload=onLoad&render=explicit&hl=${languageCode ?? ''}" onerror="onError()"></script>
</body></html>`
	}
}

function validateFirebaseConfig(firebaseConfig?: FirebaseOptions) {
	if (!firebaseConfig) {
		throw new CodedError(
			'ERR_FIREBASE_RECAPTCHA_CONFIG',
			'Missing firebase web configuration. Please set the "expo.web.config.firebase" field in "app.json" or use the "firebaseConfig" prop.'
		)
	}
	const { authDomain } = firebaseConfig
	if (!authDomain) {
		throw new CodedError(
			'ERR_FIREBASE_RECAPTCHA_CONFIG',
			'Missing "authDomain" in firebase web configuration.'
		)
	}
}

function CustomRecaptcha(props: Props) {
	const {
		firebaseConfig,
		firebaseVersion,
		appVerificationDisabledForTesting,
		languageCode,
		onVerify,
		onLoad,
		onError,
		onFullChallenge,
		invisible,
		verify,
		...otherProps
	} = props

	const webview = React.useRef<WebView>(null)
	const [loaded, setLoaded] = React.useState(false)

	React.useEffect(() => {
		if (webview.current && loaded && verify) {
			webview.current.injectJavaScript(`
				(function(){
				window.dispatchEvent(new MessageEvent('message', {data: { verify: true }}));
				})();
				true;
				`)
		}
	}, [webview, verify, loaded])

	validateFirebaseConfig(firebaseConfig)

	if (!firebaseConfig) {
		console.error('FirebaseRecaptcha: Missing firebase web configuration. Please set the "expo.web.config.firebase" field in "app.json" or use the "firebaseConfig" prop.')
		return null
	}

	return (
		<WebView
			ref={webview}
			javaScriptEnabled
			automaticallyAdjustContentInsets
			scalesPageToFit
			mixedContentMode={'always'}
			source={getWebviewSource(
				firebaseConfig,
				firebaseVersion,
				appVerificationDisabledForTesting,
				languageCode,
				invisible
			)}
			onError={onError}
			onMessage={(event) => {
				const data = JSON.parse(event.nativeEvent.data)
				switch (data.type) {
					case 'load':
						if (onLoad) {
							setLoaded(true)
							onLoad()
						}
						break
					case 'error':
						if (onError) {
							onError()
						}
						break
					case 'verify':
						onVerify(data.token)
						break
					case 'fullChallenge':
						if (onFullChallenge) {
							onFullChallenge()
						}
						break
				}
			}}
			{...otherProps}
		/>
	)
}

export { CustomRecaptcha }
