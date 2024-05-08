import { PetitionEntity } from '../entity/types'

async function createPetitionSubscriptionReportDM(petitionData: PetitionEntity) {
	try {
		return `
			<html lang={'pt-br'}>
				${renderHtmlHeader()}
				<div class='body'>
					${renderPetitionHeader(petitionData)}
					${renderPetitionSubscriptions()}
					${renderPetitionFooter()}
				</div>
			</html>
		`
	} catch (error: any) {
		console.log(error)
		throw new Error(error)
	}
}

function renderHtmlHeader() {
	return (
		`
			<head>
				<meta charset='UTF-8' />
				<meta name='viewport' content='width=device-width; initial-scale=1.0;' />
				<title>Relatório de resultados</title>
				${getReportStyles()}
			</head>
		`
	)
}

function renderPetitionHeader(petitionData: PetitionEntity) {
	const numberOfResponses = ` ${petitionData.privateResponses!.length}`

	const getRangeLabel = () => {
		switch (petitionData.range) {
			case 'near': return 'Bairro'
			case 'city': return 'Cidade'
			case 'country': return 'País'
			default: return 'Indisponível'
		}
	}

	return `
		<svg width="138" height="36" viewBox="0 0 138 36" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path fill-rule="evenodd" clip-rule="evenodd"
				d="M137.235 26.8056C137.235 29.2392 136.259 31.5741 134.526 33.2945C132.785 35.0156 130.431 35.9823 127.975 35.9823H118.711C117.373 35.9823 116.062 35.695 114.864 35.1528C113.155 35.6909 111.333 35.9823 109.444 35.9823H100.181C97.7529 35.9823 95.4418 35.5023 93.3313 34.635C92.3548 35.4746 91.0795 35.9823 89.6875 35.9823H55.7241C55.1891 35.9823 54.6726 35.9079 54.184 35.768C53.2758 35.9086 52.3451 35.9823 51.3973 35.9823H42.135C39.6117 35.9823 37.2105 35.4631 35.0331 34.5302C32.8543 35.4631 30.4538 35.9823 27.9318 35.9823H18.6689C8.78776 35.9823 0.764648 28.0332 0.764648 18.2408C0.764648 8.44902 8.78776 0.5 18.6689 0.5H27.9318C30.4538 0.5 32.8543 1.01781 35.0331 1.95271C37.2105 1.01781 39.6117 0.5 42.135 0.5H51.3973C52.9128 0.5 54.3846 0.68725 55.7903 1.03944C56.5183 0.693334 57.3331 0.5 58.1942 0.5H95.8574C96.393 0.5 96.9075 0.574359 97.3974 0.713614C98.3029 0.573007 99.233 0.5 100.181 0.5H109.444C119.117 0.5 127.009 8.11845 127.338 17.627H127.975C130.431 17.627 132.785 18.5937 134.526 20.3141C136.259 22.0351 137.235 24.3687 137.235 26.8023V26.8056C137.235 28.8329 137.235 28.8309 137.235 26.8056Z"
				fill="black" />
			<path fill-rule="evenodd" clip-rule="evenodd"
				d="M118.472 23.0113C117.476 23.0113 116.519 23.4062 115.817 24.1092C115.113 24.8129 114.717 25.767 114.717 26.7625V26.7653C114.717 27.7608 115.113 28.7149 115.817 29.4179C116.519 30.1216 117.476 30.5172 118.472 30.5172C119.467 30.5172 120.42 30.1216 121.126 29.4179C121.83 28.7149 122.223 27.7608 122.223 26.7653V26.7612C122.223 25.767 121.83 24.8129 121.126 24.1092C120.42 23.4062 119.467 23.0113 118.472 23.0113ZM42.0067 5.95215C35.2268 5.95215 29.7232 11.4562 29.7232 18.2347C29.7232 25.0131 35.2268 30.5172 42.0067 30.5172C48.7852 30.5172 54.2881 25.0131 54.2881 18.2347C54.2881 11.4562 48.7852 5.95215 42.0067 5.95215ZM61.7375 26.8311H64.2405V30.5172H55.4813V26.8311H57.9842V5.95215H61.7375V9.46454C63.995 7.29237 67.0863 5.95215 70.4933 5.95215V9.63826C65.6607 9.63826 61.7375 13.49 61.7375 18.2347V26.8311ZM77.7805 9.46454C80.038 7.29237 83.1272 5.95215 86.5363 5.95215V9.63826C81.7036 9.63826 77.7805 13.49 77.7805 18.2347V26.8311H80.2827V30.5172H71.5249V26.8311H74.0271V5.95215H77.7805V9.46454ZM28.4257 25.6042C26.1737 28.5859 22.5908 30.5172 18.5593 30.5172C11.7501 30.5172 6.22266 25.0131 6.22266 18.2347C6.22266 11.4562 11.7501 5.95215 18.5593 5.95215C22.5908 5.95215 26.1737 7.88139 28.4257 10.8638L25.464 13.076C23.8883 10.9893 21.3806 9.63826 18.5593 9.63826C13.7935 9.63826 9.92488 13.49 9.92488 18.2347C9.92488 22.9794 13.7935 26.8311 18.5593 26.8311C21.3806 26.8311 23.8883 25.48 25.464 23.3933L28.4257 25.6042ZM91.6117 20.0771C92.4523 23.9369 95.8948 26.8311 100.006 26.8311C102.818 26.8311 105.313 25.4786 106.883 23.3906L109.832 25.6028C107.588 28.5859 104.023 30.5172 100.006 30.5172C93.2269 30.5172 87.724 25.0131 87.724 18.2347C87.724 11.4562 93.2269 5.95215 100.006 5.95215C106.785 5.95215 112.289 11.4562 112.289 18.2347H112.282L112.289 18.2381V20.0771H91.6117ZM42.0067 9.63826C46.7507 9.63826 50.6022 13.49 50.6022 18.2347C50.6022 22.9794 46.7507 26.8311 42.0067 26.8311C37.2613 26.8311 33.4091 22.9794 33.4091 18.2347C33.4091 13.49 37.2613 9.63826 42.0067 9.63826ZM108.405 16.3909H91.6117C92.4523 12.5318 95.8948 9.63826 100.006 9.63826C104.118 9.63826 107.561 12.5318 108.405 16.3909Z"
				fill="white" />
		</svg>
		<br/>
		<br/>
		<h2 class='petition-title'>Enquete - ${petitionData.title}</h2>
		<p class='petition-description'>${petitionData.description}</p>
		<p class='petition-info'>Autor: <b>${petitionData.owner.name}</b></p>
		<p class='petition-info'>Local da enquete: <b>Bairro ${petitionData.location.district}, ${petitionData.location.city} - ${petitionData.location.state}</b></p>
		<p class='petition-info'>Alcance: <b>${getRangeLabel()}</b></p>
		<p class='petition-info'>Data e publicação: <b>${petitionData.createdAt.toLocaleDateString()}</b></p>
		<p class='responses-number'>
			Total de respostas: <b>${numberOfResponses}</b>
		</p>
	`
}

function renderPetitionSubscriptions() {
	return (
		`
			<div class="card"></div>
		`
	)
}

function renderPetitionFooter() {
	return (`
		<h4 className="author">Formulário criado utilizando o aplicativo corre.social</h4>
		<svg width="138" height="36" viewBox="0 0 138 36" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path fill-rule="evenodd" clip-rule="evenodd"
				d="M137.235 26.8056C137.235 29.2392 136.259 31.5741 134.526 33.2945C132.785 35.0156 130.431 35.9823 127.975 35.9823H118.711C117.373 35.9823 116.062 35.695 114.864 35.1528C113.155 35.6909 111.333 35.9823 109.444 35.9823H100.181C97.7529 35.9823 95.4418 35.5023 93.3313 34.635C92.3548 35.4746 91.0795 35.9823 89.6875 35.9823H55.7241C55.1891 35.9823 54.6726 35.9079 54.184 35.768C53.2758 35.9086 52.3451 35.9823 51.3973 35.9823H42.135C39.6117 35.9823 37.2105 35.4631 35.0331 34.5302C32.8543 35.4631 30.4538 35.9823 27.9318 35.9823H18.6689C8.78776 35.9823 0.764648 28.0332 0.764648 18.2408C0.764648 8.44902 8.78776 0.5 18.6689 0.5H27.9318C30.4538 0.5 32.8543 1.01781 35.0331 1.95271C37.2105 1.01781 39.6117 0.5 42.135 0.5H51.3973C52.9128 0.5 54.3846 0.68725 55.7903 1.03944C56.5183 0.693334 57.3331 0.5 58.1942 0.5H95.8574C96.393 0.5 96.9075 0.574359 97.3974 0.713614C98.3029 0.573007 99.233 0.5 100.181 0.5H109.444C119.117 0.5 127.009 8.11845 127.338 17.627H127.975C130.431 17.627 132.785 18.5937 134.526 20.3141C136.259 22.0351 137.235 24.3687 137.235 26.8023V26.8056C137.235 28.8329 137.235 28.8309 137.235 26.8056Z"
				fill="black" />
			<path fill-rule="evenodd" clip-rule="evenodd"
				d="M118.472 23.0113C117.476 23.0113 116.519 23.4062 115.817 24.1092C115.113 24.8129 114.717 25.767 114.717 26.7625V26.7653C114.717 27.7608 115.113 28.7149 115.817 29.4179C116.519 30.1216 117.476 30.5172 118.472 30.5172C119.467 30.5172 120.42 30.1216 121.126 29.4179C121.83 28.7149 122.223 27.7608 122.223 26.7653V26.7612C122.223 25.767 121.83 24.8129 121.126 24.1092C120.42 23.4062 119.467 23.0113 118.472 23.0113ZM42.0067 5.95215C35.2268 5.95215 29.7232 11.4562 29.7232 18.2347C29.7232 25.0131 35.2268 30.5172 42.0067 30.5172C48.7852 30.5172 54.2881 25.0131 54.2881 18.2347C54.2881 11.4562 48.7852 5.95215 42.0067 5.95215ZM61.7375 26.8311H64.2405V30.5172H55.4813V26.8311H57.9842V5.95215H61.7375V9.46454C63.995 7.29237 67.0863 5.95215 70.4933 5.95215V9.63826C65.6607 9.63826 61.7375 13.49 61.7375 18.2347V26.8311ZM77.7805 9.46454C80.038 7.29237 83.1272 5.95215 86.5363 5.95215V9.63826C81.7036 9.63826 77.7805 13.49 77.7805 18.2347V26.8311H80.2827V30.5172H71.5249V26.8311H74.0271V5.95215H77.7805V9.46454ZM28.4257 25.6042C26.1737 28.5859 22.5908 30.5172 18.5593 30.5172C11.7501 30.5172 6.22266 25.0131 6.22266 18.2347C6.22266 11.4562 11.7501 5.95215 18.5593 5.95215C22.5908 5.95215 26.1737 7.88139 28.4257 10.8638L25.464 13.076C23.8883 10.9893 21.3806 9.63826 18.5593 9.63826C13.7935 9.63826 9.92488 13.49 9.92488 18.2347C9.92488 22.9794 13.7935 26.8311 18.5593 26.8311C21.3806 26.8311 23.8883 25.48 25.464 23.3933L28.4257 25.6042ZM91.6117 20.0771C92.4523 23.9369 95.8948 26.8311 100.006 26.8311C102.818 26.8311 105.313 25.4786 106.883 23.3906L109.832 25.6028C107.588 28.5859 104.023 30.5172 100.006 30.5172C93.2269 30.5172 87.724 25.0131 87.724 18.2347C87.724 11.4562 93.2269 5.95215 100.006 5.95215C106.785 5.95215 112.289 11.4562 112.289 18.2347H112.282L112.289 18.2381V20.0771H91.6117ZM42.0067 9.63826C46.7507 9.63826 50.6022 13.49 50.6022 18.2347C50.6022 22.9794 46.7507 26.8311 42.0067 26.8311C37.2613 26.8311 33.4091 22.9794 33.4091 18.2347C33.4091 13.49 37.2613 9.63826 42.0067 9.63826ZM108.405 16.3909H91.6117C92.4523 12.5318 95.8948 9.63826 100.006 9.63826C104.118 9.63826 107.561 12.5318 108.405 16.3909Z"
				fill="white" />
		</svg>
	`)
}

function getReportStyles() {
	return `
		<style>
			* { print-color-adjust:exact !important; }
			.body {
				font-family: Arial;
				margin: 0;
				padding: 30px;
				display: flex;
				align-items: center;
				flex-direction: column;
			}
			.card {
				position: relative;
				width: 100%;
				height: auto;
				background-color: #000000;
				border: 1px solid #000000;
				border-width: 5px;
				border-radius: 25px;
				border-right-width: 15px;
				margin-bottom: 15px;
			}

			.card-content {
				padding: 20px;
				background-color: #ffffff;
				border-radius: 20px;
			}

			.card-title {
				margin-bottom: 15px;
				margin-top: 0px;
			}

			.bar {
				display: flex;
				align-items: center;
			}

			.bar-base {
				background-color: #000000;
				height: 30px;
				width: 7px;
			}

			.bar-base-first {
				border-radius: 10px 10px 0px 0px;
			}

			.bar-base-last {
				border-radius: 0px 0px 10px 10px;
			}

			.bar-label {
				text-align: right;
				padding-right: 10px;
				width: 170px;
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.bar-label-spaced {
				justify-content: space-between;
			}

			.bar-progress {
				flex: 1;
				height: 20px;
				background-color: #eeeeef;
				border-radius: 0px 10px 10px 0px;
				overflow: hidden;
			}

			.bar-progress-inner {
				height: 100%;
				border-radius: 0px 10px 10px 0px;
			}

			.orange3 {
				background-color: #FA9938;
			}

			.red3 {
				background-color: #E84F30;
			}

			.red1 {
				background-color: #F3A797;
			}

			.yellow3 {
				background-color: #FBCE37;
			}

			.green1 {
				background-color: #88D0AC;
			}

			.green3 {
				background-color: #12A159;
				border-color: #12A159;
			}

			.bar-progress-text {
				margin: 0 15px 0 15px;
				width: 60px;
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.bold {
				font-weight: bold;
			}

			.author {
				font-weight: 400;
			}

			.long-text-container {
				background-color: #eeeeef;
				padding: 5px;
				border-radius: 10px;
				margin-bottom: 15px;
			}

			.other-text-container {
				background-color: #eeeeef;
				padding: 15px;
				border-radius: 10px;
				margin-bottom: 15px;
			}

			.last-item {
				margin-bottom: 0;
			}

			.long-text {
				line-height: 23px;
			}

			.petition-title {
				align-self: flex-start;
				margin-top: 0px;
				margin-bottom: 0;
			}

			.petition-description {
				align-self: flex-start;
				margin-bottom: 30px;
			}

			.petition-info {
				margin: 5px;
				align-self: flex-start;
			}

			.responses-number {
				align-self: flex-start;
			}
		</style>
	`
}

export { createPetitionSubscriptionReportDM }
