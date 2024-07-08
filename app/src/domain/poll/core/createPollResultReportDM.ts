import { formatDate } from '@domain/shared/utils/datetime'

import { PollEntity, PollQuestion, PollQuestionType, PollResponse, SatisfactionType } from '../entity/types'

async function createPollResultReportDM(pollData: PollEntity) {
	try {
		const binaryResponses = groupQuestionsByQuestionType(pollData, 'binary')
		const numericalResponses = groupQuestionsByQuestionType(pollData, 'numerical')
		const satisfactionResponses = groupQuestionsByQuestionType(pollData, 'satisfaction')
		const textualResponses = groupQuestionsByQuestionType(pollData, 'textual')
		const selectResponses = groupQuestionsByQuestionType(pollData, 'select')

		const pollHasResponses = pollData && pollData.privateResponses && pollData.privateResponses.length

		return `
			<html lang='pt-br'>
				${renderHtmlHeader()}
				<div class='body'>
					${renderPollHeader(pollData)}
					${pollHasResponses && (`
						${renderBinaryGraph(binaryResponses)}
						${renderNumericalGraph(numericalResponses)}
						${renderSatisfactionGraph(satisfactionResponses)}
						${renderSelectGraph(selectResponses)}
						${renderTextualResponses(textualResponses)}
						${renderTextualResponses(selectResponses, 'select')}
					`)}
					${renderPollFooter()}
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

function renderPollHeader(pollData: PollEntity) {
	const numberOfResponses = ` ${pollData.privateResponses!.length}`

	const getRangeLabel = () => {
		switch (pollData.range) {
			case 'near': return 'Bairro'
			case 'city': return 'Cidade'
			case 'country': return 'País'
			default: return 'Indisponível'
		}
	}

	return `
		<svg width="100" height="100" viewBox="0 0 250 215" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path fill-rule="evenodd" clip-rule="evenodd" d="M0 158.824V78.0862C0 72.464 4.54751 67.9052 10.181 67.9052H22.3756V41.1112C22.3756 35.4891 26.9457 30.9303 32.5566 30.9303H111.923V10.928C111.923 5.30588 116.493 0.74707 122.104 0.74707H187.24C192.873 0.74707 197.421 5.30588 197.421 10.928V26.5229H239.819C242.511 26.5229 245.113 27.5954 247.014 29.5049C248.914 31.4144 250 34.0048 250 36.7039V154.751V196.884C250 197.016 250 197.149 250 197.28C250 201.02 248.19 206.108 245.023 209.283C241.833 212.464 237.534 214.253 233.032 214.253C232.557 214.253 216.538 214.253 216.063 214.253C213.597 214.253 211.199 213.719 209.005 212.719C205.882 213.715 202.534 214.253 199.072 214.253H182.104C177.67 214.253 173.439 213.366 169.57 211.76C167.783 213.312 165.452 214.253 162.896 214.253H100.679C99.6833 214.253 98.7557 214.113 97.8507 213.855C96.1991 214.117 94.4796 214.253 92.7376 214.253H75.7692C71.1538 214.253 66.7647 213.294 62.7602 211.566C58.7783 213.294 54.3891 214.253 49.7511 214.253H32.7828C14.6833 214.253 0 199.554 0 181.448V158.824Z" fill="black"/>
			<path fill-rule="evenodd" clip-rule="evenodd" d="M215.995 190.495C214.194 190.495 212.47 191.211 211.194 192.484C209.923 193.756 209.208 195.483 209.208 197.283C209.208 197.284 209.208 197.286 209.208 197.288C209.208 199.088 209.923 200.814 211.194 202.087C212.47 203.36 214.194 204.075 215.995 204.075C217.796 204.075 219.525 203.36 220.796 202.087C222.068 200.815 222.783 199.088 222.783 197.289C222.783 197.286 222.783 197.284 222.783 197.282C222.783 195.482 222.068 193.756 220.796 192.483C219.525 191.211 217.796 190.495 215.995 190.495ZM75.715 158.826C63.2353 158.826 53.0996 168.964 53.0996 181.451C53.0996 193.937 63.2353 204.075 75.715 204.075C88.1991 204.075 98.3348 193.937 98.3348 181.451C98.3348 168.964 88.1991 158.826 75.715 158.826ZM111.923 197.285H116.448V204.075H100.611V197.285H105.136V158.826H111.923V165.297C116.004 161.295 121.593 158.826 127.751 158.826V165.616C119.018 165.616 111.923 172.711 111.923 181.451V197.285ZM141.335 165.297C145.416 161.295 151.004 158.826 157.163 158.826V165.616C148.43 165.616 141.335 172.711 141.335 181.451V197.285H145.86V204.075H130.023V197.285H134.547V158.826H141.335V165.297ZM50.8191 195.027C46.6924 200.52 40.1223 204.075 32.7286 204.075C20.249 204.075 10.1133 193.937 10.1133 181.451C10.1133 168.964 20.249 158.826 32.7286 158.826C40.1223 158.826 46.6924 162.381 50.8191 167.875L45.3892 171.949C42.5023 168.104 37.9051 165.616 32.7286 165.616C23.9956 165.616 16.9006 172.711 16.9006 181.451C16.9006 190.19 23.9956 197.285 32.7286 197.285C37.9051 197.285 42.5023 194.797 45.3892 190.952L50.8191 195.027ZM166.588 184.846C168.14 191.955 174.479 197.285 182.05 197.285C187.226 197.285 191.823 194.795 194.715 190.948L200.14 195.022C196.013 200.518 189.443 204.075 182.05 204.075C169.57 204.075 159.434 193.937 159.434 181.451C159.434 168.964 169.57 158.826 182.05 158.826C194.534 158.826 204.669 168.964 204.669 181.451H204.66L204.669 181.459V184.846H166.588ZM75.715 165.616C84.4525 165.616 91.5475 172.711 91.5475 181.451C91.5475 190.19 84.4525 197.285 75.715 197.285C66.9819 197.285 59.8869 190.19 59.8869 181.451C59.8869 172.711 66.9819 165.616 75.715 165.616ZM197.516 178.056H166.588C168.14 170.946 174.479 165.616 182.05 165.616C189.624 165.616 195.959 170.946 197.516 178.056Z" fill="white"/>
			<path fill-rule="evenodd" clip-rule="evenodd" d="M14.8768 148.643L14.8768 127.056H50.0554L50.0554 148.643H54.8525L54.8525 89.2811H32.4664V78.0879H10.0799L10.0799 148.643H14.8768ZM37.2585 109.273H14.8709V115.669H37.2585V109.273ZM18.0698 110.869H16.4688V114.067H18.0698V110.869ZM24.47 86.0846H18.0727V92.4806H24.47V86.0846ZM21.2719 87.6811H19.6731V90.8791H21.2719V87.6811ZM38.855 109.273H50.0479V115.669H38.855V109.273ZM40.4527 110.869H42.0519V114.067H40.4527V110.869Z" fill="#B274F0"/>
			<path fill-rule="evenodd" clip-rule="evenodd" d="M118.686 78.0908H73.912V100.477H118.686V78.0908ZM88.308 85.2882H81.912V91.6842H88.308V85.2882ZM85.1088 86.8847H83.5097V90.0827H85.1088V86.8847ZM104.296 85.2882H110.692V88.4862H104.296V85.2882Z" fill="#FB9C37"/>
			<path d="M222.793 36.707H220.394V62.1248H222.793V36.707Z" fill="#88D0AC"/>
			<path d="M158.049 36.7041H155.649V62.1218H158.049V36.7041Z" fill="#88D0AC"/>
			<path d="M179.569 36.707H177.17V62.1247H179.569V36.707Z" fill="#88D0AC"/>
			<path d="M201.18 36.709H198.781V62.1267H201.18V36.709Z" fill="#88D0AC"/>
			<path d="M99.6531 42.457H96.4551L96.4551 65.3554H99.6531L99.6531 42.457Z" fill="#F3A797"/>
			<path fill-rule="evenodd" clip-rule="evenodd" d="M66.1127 44.3133V63.5011H99.6874V74.6956H32.5381V41.1143H99.6874V44.3133H96.4974H66.1127ZM54.9137 50.7115H43.7372V57.1074H54.9137V50.7115ZM46.9272 52.3065V55.5056H45.3209V52.3065H46.9272Z" fill="#E84F30"/>
			<path fill-rule="evenodd" clip-rule="evenodd" d="M152.197 78.0879H122.016V10.9297H170.183V33.312H155.59C153.712 33.312 152.197 34.83 152.197 36.7033V78.0879ZM137.966 63.6965H131.201V68.4906H130.025V70.0879H131.201V70.0924H137.966V70.0879H139.142V68.4906H137.966V63.6965ZM160.998 18.9229H154.255V23.7193H153.079V25.3188H154.255H160.998H162.197V23.7193H160.998V18.9229ZM131.201 18.9229V23.7193H130.025V25.3188H131.201H137.966H139.142V23.7193H137.966V18.9229H131.201ZM137.966 41.3097H131.201V46.1061H130.025V47.7056H131.201H137.966H139.142V46.1061H137.966V41.3097Z" fill="#C9731D"/>
			<path fill-rule="evenodd" clip-rule="evenodd" d="M197.187 100.472V88.4784C197.187 87.2046 196.689 85.9851 195.784 85.0869C194.879 84.1865 193.68 83.682 192.391 83.682C191.124 83.682 189.902 84.1865 188.997 85.0869C188.115 85.9851 187.594 87.2046 187.594 88.4784V100.472H155.626V59.0915H222.775V148.639H197.21V100.472H197.187ZM167.617 65.4875C166.554 65.4875 165.535 65.9083 164.789 66.6594C164.042 67.4083 163.612 68.4241 163.612 69.4852H168.409V65.4875H167.617ZM170.015 71.0848V75.0803H174.811V71.0848H170.015ZM181.214 69.4852C181.214 68.4241 180.784 67.4083 180.038 66.6594C179.291 65.9083 178.273 65.4875 177.21 65.4875H176.418V69.4852H181.214ZM168.409 71.0848H163.612C163.612 72.1436 164.042 73.1616 164.789 73.9105C165.535 74.6594 166.554 75.0803 167.617 75.0803H168.409V71.0848ZM174.811 65.4875H170.015V69.4852H174.811V65.4875ZM214.789 71.0848H209.992V75.0803H210.784C211.848 75.0803 212.866 74.6594 213.612 73.9105C214.359 73.1616 214.789 72.1436 214.789 71.0848ZM176.418 71.0848V75.0803H177.21C178.273 75.0803 179.291 74.6594 180.038 73.9105C180.784 73.1616 181.214 72.1436 181.214 71.0848H176.418ZM209.992 65.4875V69.4852H214.789C214.789 68.4241 214.359 67.4083 213.612 66.6594C212.866 65.9083 211.848 65.4875 210.784 65.4875H209.992ZM207.594 65.4875C206.531 65.4875 205.513 65.9083 204.766 66.6594C204.02 67.4083 203.59 68.4241 203.59 69.4852H208.386V65.4875H207.594ZM208.386 71.0848H203.59C203.59 72.1436 204.02 73.1616 204.766 73.9105C205.513 74.6594 206.531 75.0803 207.594 75.0803H208.386V71.0848ZM222.798 36.707V39.9039H155.626V36.707H222.798ZM191.599 91.872C191.825 91.872 192.029 91.9557 192.164 92.1073C192.323 92.2566 192.413 92.4602 192.413 92.6729C192.413 92.8833 192.323 93.0869 192.164 93.2385C192.029 93.3878 191.825 93.4716 191.599 93.4716H190.015C189.789 93.4716 189.585 93.3878 189.45 93.2385C189.291 93.0869 189.201 92.8833 189.201 92.6729C189.201 92.4602 189.291 92.2566 189.45 92.1073C189.585 91.9557 189.789 91.872 190.015 91.872H191.599Z" fill="#12A159"/>
			<path fill-rule="evenodd" clip-rule="evenodd" d="M122.042 81.4824H125.232V84.6815H128.445V87.8805H131.635V91.0774H134.825V94.2742H138.037V97.471H141.228V100.672H144.44V103.869H166.816V148.643H148.829V136.254C148.829 133.824 146.861 131.856 144.44 131.856C141.997 131.856 140.028 133.824 140.028 136.254V148.643H122.042V81.4824ZM130.843 115.865V120.661H129.237V122.261H130.843V122.263H137.223V122.261H138.829V120.661H137.223V115.865C137.223 115.019 136.906 114.204 136.295 113.604C135.707 113.005 134.893 112.668 134.033 112.668C133.196 112.668 132.381 113.005 131.77 113.604C131.182 114.204 130.843 115.019 130.843 115.865ZM132.427 115.862C132.427 114.98 133.151 114.265 134.033 114.265V119.061H132.427V115.862ZM159.621 120.661H158.015V115.867C158.015 115.018 157.675 114.204 157.087 113.604C156.476 113.005 155.662 112.668 154.825 112.668C153.06 112.668 151.612 114.1 151.612 115.867V120.661H150.028V122.261H151.612V122.263H158.015V122.261H159.621V120.661ZM154.825 114.265V119.061H153.218V115.862C153.218 114.98 153.942 114.265 154.825 114.265ZM146.273 139.98C146.703 139.98 147.065 140.337 147.065 140.781C147.065 141.222 146.703 141.579 146.273 141.579C145.82 141.579 145.458 141.222 145.458 140.781C145.458 140.337 145.82 139.98 146.273 139.98Z" fill="#FBCE37"/>
			<path fill-rule="evenodd" clip-rule="evenodd" d="M103.044 103.867V148.641H84.6732V131.851H75.8723V148.641H58.2705V103.867H103.044ZM64.6732 112.664V121.458H73.4741V112.664H64.6732ZM70.2841 114.259H71.8678V119.856H70.2841V114.259ZM95.8497 112.664H87.0714V121.458H95.8497V112.664ZM94.266 114.259V119.856H92.6596V114.259H94.266ZM81.0986 139.182V140.781H77.9085V139.182H81.0986Z" fill="#FF8F68"/>
		</svg>
		<br/>
		<h2 class='poll-title'>Enquete - ${pollData.title}</h2>
		<p class='poll-description'>${pollData.description}</p>
		<p class='poll-info'>Autor: <b>${pollData.owner.name}</b></p>
		<p class='poll-info'>Local da enquete: <b>Bairro ${pollData.location.district}, ${pollData.location.city} - ${pollData.location.state}</b></p>
		<p class='poll-info'>Alcance: <b>${getRangeLabel()}</b></p>
		<p class='poll-info'>Data e publicação: <b>${formatDate(pollData.createdAt)}</b></p>
		<p class='responses-number'>
			Total de respostas: <b>${numberOfResponses}</b>
		</p>
	`
}

type PollQuestionWithResponses = (PollQuestion & { responses: PollResponse[] })[]

function groupQuestionsByQuestionType(pollData: PollEntity, questionType: PollQuestionType) {
	const allResponses = pollData.privateResponses!.map((poll) => poll.responses)
	const emptyArray: PollResponse[] = []
	const listOfResponses = emptyArray.concat(...allResponses)

	type GroupedQuestionResponses = { [key: string]: (PollResponse)[] }
	const groupedByQuestionId = listOfResponses.reduce((total, response) => {
		const { questionId, ...rest } = response
		const newGroupState = { ...total }
		newGroupState[questionId] = total[questionId] || []
		newGroupState[questionId].push(rest as PollResponse)
		return newGroupState
	}, {} as GroupedQuestionResponses)

	const allResponsesByQuestion = pollData.questions.reduce((total: PollEntity['questions'], poll) => {
		if (poll.questionType !== questionType) return total
		return (
			[
				...total,
				{ ...poll, responses: groupedByQuestionId[poll.questionId] }
			]
		)
	}, [])

	return allResponsesByQuestion as PollQuestionWithResponses
}

function renderBinaryGraph(allResponsesByQuestion: PollQuestionWithResponses) {
	type BinaryGraphIterator = [BinaryLabelOptions, number, string][]
	type BinaryLabelOptions = 'Sim' | 'Não'

	const binaryLabels = ['Sim', 'Não']

	return allResponsesByQuestion.map((questionWithResponses, index) => {
		const binaryValues: BinaryGraphIterator = binaryLabels.map((label) => {
			const responses = questionWithResponses.responses.filter((response: PollResponse) => {
				const responseLabel = response.response ? 'Sim' : 'Não'
				return responseLabel === label
			})
			const percentage = (responses.length / questionWithResponses.responses.length) * 100
			return [label as BinaryLabelOptions, (responses.length as number) || 0, `${percentage.toFixed(2)}%`]
		})

		const getBinaryValueStyle = (value: BinaryLabelOptions) => {
			if (value === 'Sim') return ' green3'
			return ' red3'
		}

		const renderBinaryBars = () => {
			return binaryValues.map((binaryValue, i, values) => {
				const isFirstItem = i === 0
				const isLastItem = i === values.length - 1

				return (
					`
						<div class="bar" >
							<div class="bar-label">${binaryValue[0]}</div>
							<div class="bar-base ${isFirstItem ? ' bar-base-first' : ''} ${isLastItem ? ' bar-base-last' : ''}"></div>
							<div class="bar-progress">
								<div class='bar-progress-inner ${getBinaryValueStyle(binaryValue[0])}' style="width: ${binaryValue[2]};"></div>
							</div>
							<div class="bar-progress-text">${binaryValue[1]}</div>
							<div class="bar-progress-text">${binaryValue[2]}</div>
						</div>
					`
				)
			}).join('')
		}

		return `
			<div class="card">
				<div class="card-content">
					<h3 class="card-title">${questionWithResponses.question}</h3>
					${renderBinaryBars()}
				</div>
			</div>
		`
	}).join('')
}

function renderNumericalGraph(allResponsesByQuestion: PollQuestionWithResponses) {
	type NumericalGraphIterator = [string | number, number, string][]

	return allResponsesByQuestion.map((questionWithResponses, index) => {
		const ordenedResponses = questionWithResponses.responses.sort((a, b) => (a.response as number) - (b.response as number))

		const numericalValues = ordenedResponses.reduce((acc: NumericalGraphIterator, response: PollResponse) => {
			const responses = questionWithResponses.responses.filter((currentResponse) => currentResponse.response === response.response)
			const percentage = (responses.length / questionWithResponses.responses.length) * 100

			if (acc.find((item) => item[0] === response.response)) {
				return [...acc]
			}

			return [...acc, [response.response, responses.length as number, `${percentage.toFixed(2)}%`]] as NumericalGraphIterator
		}, [] as NumericalGraphIterator)

		const renderNumericalBars = () => {
			return numericalValues.map((item, i, values) => {
				const isFirstItem = i === 0
				const isLastItem = i === values.length - 1

				return (
					`
						<div class="bar">
							<div class="bar-label">${item[0] || '(em branco)'}</div>
							<div class="bar-base ${isFirstItem ? ' bar-base-first' : ''} ${isLastItem ? ' bar-base-last' : ''}"></div>
							<div class="bar-progress">
								<div class="bar-progress-inner orange3" style="width: ${item[2]}"></div>
							</div>
							<div class="bar-progress-text">${item[1]}</div>
							<div class="bar-progress-text">${item[2]}</div>
						</div>
					`
				)
			}).join('')
		}

		return (
			`
				<div class="card" >
					<div class="card-content">
					<h3 class="card-title">${questionWithResponses.question}</h3>
					${renderNumericalBars()}
					</div>
				</div>
			`
		)
	}).join('')
}

function renderSelectGraph(allResponsesByQuestion: PollQuestionWithResponses) {
	type NumericalGraphIterator = [string, number, string][]

	return allResponsesByQuestion.map((questionWithResponses) => {
		const ordenedOptions = questionWithResponses.options?.sort((a: any, b: any) => a.response > b.response as any)

		const selectValues = (ordenedOptions || ['']).reduce((acc: NumericalGraphIterator, option: string) => {
			const responses = questionWithResponses.responses.filter((currentResponse) => (currentResponse.response as string[]).includes(option))
			const allSelectedOptions = [].concat(...(questionWithResponses.responses || ['']).map(({ response }) => response) as any[])
			const percentage = (responses.length / allSelectedOptions.length) * 100

			if (acc.find((item) => option.includes(item[0] as string))) {
				return [...acc]
			}
			const numberOfSelections = allSelectedOptions.filter((opt) => opt === option).length

			return [...acc, [option, numberOfSelections as number, `${percentage.toFixed(2)}%`]] as NumericalGraphIterator
		}, [] as NumericalGraphIterator)

		const renderNumericalBars = () => {
			return selectValues.map((item, i, values) => {
				const isFirstItem = i === 0
				const isLastItem = i === values.length - 1

				return (
					`
						<div class="bar">
							<div class="bar-label">${item[0] || '(em branco)'}</div>
							<div class="bar-base ${isFirstItem ? ' bar-base-first' : ''} ${isLastItem ? ' bar-base-last' : ''}"></div>
							<div class="bar-progress">
								<div class="bar-progress-inner orange3" style="width: ${item[2]}"></div>
							</div>
							<div class="bar-progress-text">${item[1]}</div>
							<div class="bar-progress-text">${item[2]}</div>
						</div>
					`
				)
			}).join('')
		}

		return (
			`
				<div class="card" >
					<div class="card-content">
					<h3 class="card-title">${questionWithResponses.question}</h3>
					${renderNumericalBars()}
					</div>
				</div>
			`
		)
	}).join('')
}

function renderSatisfactionGraph(allResponsesByQuestion: PollQuestionWithResponses) {
	type SatisfactionValue = SatisfactionType
	type SatisfactionLabel = 'Muito satisfeito' | 'Satisfeito' | 'Mais ou menos' | 'Insatisfeito' | 'Muito insatisfeito'
	type SatisfactionGraphIterator = [SatisfactionLabel, number, string][]

	const satisfactionLabels: SatisfactionLabel[] = ['Muito satisfeito', 'Satisfeito', 'Mais ou menos', 'Insatisfeito', 'Muito insatisfeito']

	const getSatisfactionBarColor = (satisactionLabel: SatisfactionLabel) => {
		if (satisactionLabel === 'Muito satisfeito') return ' green3'
		if (satisactionLabel === 'Satisfeito') return ' green1'
		if (satisactionLabel === 'Mais ou menos') return ' yellow3'
		if (satisactionLabel === 'Insatisfeito') return ' red1'
		if (satisactionLabel === 'Muito insatisfeito') return ' red3'
		return ' orange3'
	}

	const getSatisfactionLabel = (satisfactionValue: SatisfactionValue) => {
		if (satisfactionValue === 1) return 'Muito insatisfeito'
		if (satisfactionValue === 2) return 'Insatisfeito'
		if (satisfactionValue === 3) return 'Mais ou menos'
		if (satisfactionValue === 4) return 'Satisfeito'
		if (satisfactionValue === 5) return 'Muito satisfeito'
		return 'Não avaliado'
	}

	const renderSatisfactionIcon = (satisactionLabel: SatisfactionLabel) => {
		if (satisactionLabel === 'Muito satisfeito') {
			return (`
				<svg width="27" height="23" viewBox="0 0 27 23" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M14.25 22.5C14.3755 22.5 14.5005 22.4979 14.625 22.4939C14.7495 22.4979 14.8745 22.5 15 22.5C21.2132 22.5 26.2499 17.4632 26.2499 11.25C26.2499 5.0368 21.2132 0 15 0C14.8745 0 14.7495 0.00205469 14.625 0.00613228C14.5005 0.00205469 14.3755 0 14.25 0C14.1245 0 13.9995 0.00205469 13.875 0.00613228C13.7505 0.0020547 13.6255 0 13.5 0C13.3745 0 13.2495 0.00205467 13.125 0.00613225C13.0005 0.00205468 12.8755 0 12.75 0C12.6245 0 12.4995 0.0020547 12.375 0.00613229C12.2505 0.0020547 12.1255 0 12 0C11.8745 0 11.7495 0.00205469 11.625 0.00613227C11.5005 0.00205469 11.3755 0 11.25 0C5.03678 0 0 5.0368 0 11.25C0 17.4632 5.03678 22.5 11.25 22.5C11.3755 22.5 11.5005 22.4979 11.625 22.4939C11.7495 22.4979 11.8745 22.5 12 22.5C12.1255 22.5 12.2505 22.4979 12.375 22.4939C12.4995 22.4979 12.6245 22.5 12.75 22.5C12.8755 22.5 13.0005 22.4979 13.125 22.4939C13.2495 22.4979 13.3745 22.5 13.5 22.5C13.6255 22.5 13.7505 22.4979 13.875 22.4939C13.9995 22.4979 14.1245 22.5 14.25 22.5Z" fill="black"/>
					<path fill-rule="evenodd" clip-rule="evenodd" d="M11.25 21C16.6347 21 21 16.6348 21 11.25C21 5.86522 16.6347 1.5 11.25 1.5C5.86521 1.5 1.5 5.86522 1.5 11.25C1.5 16.6348 5.86521 21 11.25 21ZM8.43766 9.75C8.95543 9.75 9.37516 9.33027 9.37516 8.8125C9.37516 8.29473 8.95543 7.875 8.43766 7.875C7.9199 7.875 7.50017 8.29473 7.50017 8.8125C7.50017 9.33027 7.9199 9.75 8.43766 9.75ZM15.7541 13.1156C15.8711 12.8331 15.961 12.5409 16.0229 12.243C16.1354 11.7023 15.6774 11.25 15.1251 11.25H7.37517C6.82288 11.25 6.36488 11.7023 6.47738 12.243C6.53936 12.5409 6.62925 12.8331 6.74626 13.1156C6.99125 13.707 7.35034 14.2445 7.80302 14.6971C8.2557 15.1498 8.79312 15.5089 9.38458 15.7539C9.97604 15.9989 10.61 16.125 11.2502 16.125C11.8904 16.125 12.5243 15.9989 13.1157 15.7539C13.7072 15.5089 14.2446 15.1498 14.6973 14.6971C15.15 14.2445 15.5091 13.707 15.7541 13.1156ZM15.0001 8.8125C15.0001 9.33027 14.5804 9.75 14.0627 9.75C13.5449 9.75 13.1252 9.33027 13.1252 8.8125C13.1252 8.29473 13.5449 7.875 14.0627 7.875C14.5804 7.875 15.0001 8.29473 15.0001 8.8125Z" fill="white"/>
				</svg>
	`)
		}
		if (satisactionLabel === 'Satisfeito') {
			return (`
				<svg width="27" height="23" viewBox="0 0 27 23" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M14.25 22.875C14.3755 22.875 14.5005 22.8729 14.625 22.8689C14.7495 22.8729 14.8745 22.875 15 22.875C21.2132 22.875 26.2499 17.8382 26.2499 11.625C26.2499 5.4118 21.2132 0.375 15 0.375C14.8745 0.375 14.7495 0.377055 14.625 0.381132C14.5005 0.377055 14.3755 0.375 14.25 0.375C14.1245 0.375 13.9995 0.377055 13.875 0.381132C13.7505 0.377055 13.6255 0.375 13.5 0.375C13.3745 0.375 13.2495 0.377055 13.125 0.381132C13.0005 0.377055 12.8755 0.375 12.75 0.375C12.6245 0.375 12.4995 0.377055 12.375 0.381132C12.2505 0.377055 12.1255 0.375 12 0.375C11.8745 0.375 11.7495 0.377055 11.625 0.381132C11.5005 0.377055 11.3755 0.375 11.25 0.375C5.03678 0.375 0 5.4118 0 11.625C0 17.8382 5.03678 22.875 11.25 22.875C11.3755 22.875 11.5005 22.8729 11.625 22.8689C11.7495 22.8729 11.8745 22.875 12 22.875C12.1255 22.875 12.2505 22.8729 12.375 22.8689C12.4995 22.8729 12.6245 22.875 12.75 22.875C12.8755 22.875 13.0005 22.8729 13.125 22.8689C13.2495 22.8729 13.3745 22.875 13.5 22.875C13.6255 22.875 13.7505 22.8729 13.875 22.8689C13.9995 22.8729 14.1245 22.875 14.25 22.875Z" fill="black"/>
					<path fill-rule="evenodd" clip-rule="evenodd" d="M11.25 21.375C16.6347 21.375 20.9999 17.0098 20.9999 11.625C20.9999 6.24022 16.6347 1.875 11.25 1.875C5.86521 1.875 1.5 6.24022 1.5 11.625C1.5 17.0098 5.86521 21.375 11.25 21.375ZM8.43767 10.125C8.95543 10.125 9.37516 9.70527 9.37516 9.1875C9.37516 8.66973 8.95543 8.25 8.43767 8.25C7.9199 8.25 7.50017 8.66973 7.50017 9.1875C7.50017 9.70527 7.9199 10.125 8.43767 10.125ZM11.2502 16.5C12.2913 16.5 13.2982 16.1669 14.1282 15.5598C14.4626 15.3152 14.4598 14.8347 14.1669 14.5417C13.8739 14.2488 13.402 14.2575 13.0516 14.4787C12.5166 14.8164 11.8929 14.9997 11.2502 14.9997C10.6075 14.9997 9.98367 14.8164 9.4487 14.4787C9.09836 14.2575 8.62641 14.2488 8.33346 14.5417C8.04051 14.8347 8.03772 15.3152 8.37211 15.5598C9.20216 16.1669 10.209 16.5 11.2502 16.5ZM15.0001 9.1875C15.0001 9.70527 14.5804 10.125 14.0627 10.125C13.5449 10.125 13.1252 9.70527 13.1252 9.1875C13.1252 8.66973 13.5449 8.25 14.0627 8.25C14.5804 8.25 15.0001 8.66973 15.0001 9.1875Z" fill="white"/>
				</svg>
			`)
		}
		if (satisactionLabel === 'Mais ou menos') {
			return (`
				<svg width="27" height="24" viewBox="0 0 27 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M14.25 23.25C14.3755 23.25 14.5005 23.2479 14.625 23.2439C14.7495 23.2479 14.8745 23.25 15 23.25C21.2132 23.25 26.2499 18.2132 26.2499 12C26.2499 5.7868 21.2132 0.75 15 0.75C14.8745 0.75 14.7495 0.752055 14.625 0.756132C14.5005 0.752055 14.3755 0.75 14.25 0.75C14.1245 0.75 13.9995 0.752055 13.875 0.756132C13.7505 0.752055 13.6255 0.75 13.5 0.75C13.3745 0.75 13.2495 0.752055 13.125 0.756132C13.0005 0.752055 12.8755 0.75 12.75 0.75C12.6245 0.75 12.4995 0.752055 12.375 0.756132C12.2505 0.752055 12.1255 0.75 12 0.75C11.8745 0.75 11.7495 0.752055 11.625 0.756132C11.5005 0.752055 11.3755 0.75 11.25 0.75C5.03678 0.75 0 5.7868 0 12C0 18.2132 5.03678 23.25 11.25 23.25C11.3755 23.25 11.5005 23.2479 11.625 23.2439C11.7495 23.2479 11.8745 23.25 12 23.25C12.1255 23.25 12.2505 23.2479 12.375 23.2439C12.4995 23.2479 12.6245 23.25 12.75 23.25C12.8755 23.25 13.0005 23.2479 13.125 23.2439C13.2495 23.2479 13.3745 23.25 13.5 23.25C13.6255 23.25 13.7505 23.2479 13.875 23.2439C13.9995 23.2479 14.1245 23.25 14.25 23.25Z" fill="black"/>
					<path fill-rule="evenodd" clip-rule="evenodd" d="M11.25 21.75C16.6347 21.75 21 17.3848 21 12C21 6.61522 16.6347 2.25 11.25 2.25C5.86521 2.25 1.5 6.61522 1.5 12C1.5 17.3848 5.86521 21.75 11.25 21.75ZM8.4384 10.5C8.95616 10.5 9.37589 10.0803 9.37589 9.5625C9.37589 9.04473 8.95616 8.625 8.4384 8.625C7.92063 8.625 7.5009 9.04473 7.5009 9.5625C7.5009 10.0803 7.92063 10.5 8.4384 10.5ZM14.0634 10.5C14.5811 10.5 15.0009 10.0803 15.0009 9.5625C15.0009 9.04473 14.5811 8.625 14.0634 8.625C13.5456 8.625 13.1259 9.04473 13.1259 9.5625C13.1259 10.0803 13.5456 10.5 14.0634 10.5ZM6.37517 14.625C6.37517 14.2108 6.71096 13.875 7.12517 13.875H15.3751C15.7894 13.875 16.1251 14.2108 16.1251 14.625C16.1251 15.0392 15.7894 15.375 15.3751 15.375H7.12517C6.71096 15.375 6.37517 15.0392 6.37517 14.625Z" fill="white"/>
				</svg>
			`
			)
		}
		if (satisactionLabel === 'Insatisfeito') {
			return (`
				<svg width="27" height="23" viewBox="0 0 27 23" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M14.25 22.625C14.3755 22.625 14.5005 22.6229 14.625 22.6189C14.7495 22.6229 14.8745 22.625 15 22.625C21.2132 22.625 26.2499 17.5882 26.2499 11.375C26.2499 5.1618 21.2132 0.125 15 0.125C14.8745 0.125 14.7495 0.127055 14.625 0.131132C14.5005 0.127055 14.3755 0.125 14.25 0.125C14.1245 0.125 13.9995 0.127055 13.875 0.131132C13.7505 0.127055 13.6255 0.125 13.5 0.125C13.3745 0.125 13.2495 0.127055 13.125 0.131132C13.0005 0.127055 12.8755 0.125 12.75 0.125C12.6245 0.125 12.4995 0.127055 12.375 0.131132C12.2505 0.127055 12.1255 0.125 12 0.125C11.8745 0.125 11.7495 0.127055 11.625 0.131132C11.5005 0.127055 11.3755 0.125 11.25 0.125C5.03678 0.125 0 5.1618 0 11.375C0 17.5882 5.03678 22.625 11.25 22.625C11.3755 22.625 11.5005 22.6229 11.625 22.6189C11.7495 22.6229 11.8745 22.625 12 22.625C12.1255 22.625 12.2505 22.6229 12.375 22.6189C12.4995 22.6229 12.6245 22.625 12.75 22.625C12.8755 22.625 13.0005 22.6229 13.125 22.6189C13.2495 22.6229 13.3745 22.625 13.5 22.625C13.6255 22.625 13.7505 22.6229 13.875 22.6189C13.9995 22.6229 14.1245 22.625 14.25 22.625Z" fill="black"/>
					<path fill-rule="evenodd" clip-rule="evenodd" d="M11.25 21.125C16.6347 21.125 21 16.7598 21 11.375C21 5.99022 16.6347 1.625 11.25 1.625C5.86521 1.625 1.5 5.99022 1.5 11.375C1.5 16.7598 5.86521 21.125 11.25 21.125ZM8.43766 10.2498C8.95543 10.2498 9.37516 9.83008 9.37516 9.31232C9.37516 8.79455 8.95543 8.37482 8.43766 8.37482C7.9199 8.37482 7.50017 8.79455 7.50017 9.31232C7.50017 9.83008 7.9199 10.2498 8.43766 10.2498ZM11.2502 11.7498C10.209 11.7498 9.20215 12.0829 8.37211 12.69C8.03772 12.9346 8.04051 13.4152 8.33346 13.7081C8.62641 14.0011 9.09836 13.9923 9.4487 13.7712C9.98367 13.4335 10.6075 13.2501 11.2502 13.2501C11.8929 13.2501 12.5166 13.4335 13.0516 13.7712C13.402 13.9923 13.8739 14.0011 14.1669 13.7081C14.4598 13.4152 14.4626 12.9346 14.1282 12.69C13.2982 12.0829 12.2913 11.7498 11.2502 11.7498ZM15.0001 9.31232C15.0001 9.83008 14.5804 10.2498 14.0627 10.2498C13.5449 10.2498 13.1252 9.83008 13.1252 9.31232C13.1252 8.79455 13.5449 8.37482 14.0627 8.37482C14.5804 8.37482 15.0001 8.79455 15.0001 9.31232Z" fill="white"/>
				</svg>
			`)
		}
		if (satisactionLabel === 'Muito insatisfeito') {
			return (`
				<svg width="27" height="23" viewBox="0 0 27 23" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M14.25 23C14.3755 23 14.5005 22.9979 14.625 22.9939C14.7495 22.9979 14.8745 23 15 23C21.2132 23 26.2499 17.9632 26.2499 11.75C26.2499 5.5368 21.2132 0.5 15 0.5C14.8745 0.5 14.7495 0.502055 14.625 0.506132C14.5005 0.502055 14.3755 0.5 14.25 0.5C14.1245 0.5 13.9995 0.502055 13.875 0.506132C13.7505 0.502055 13.6255 0.5 13.5 0.5C13.3745 0.5 13.2495 0.502055 13.125 0.506132C13.0005 0.502055 12.8755 0.5 12.75 0.5C12.6245 0.5 12.4995 0.502055 12.375 0.506132C12.2505 0.502055 12.1255 0.5 12 0.5C11.8745 0.5 11.7495 0.502055 11.625 0.506132C11.5005 0.502055 11.3755 0.5 11.25 0.5C5.03678 0.5 0 5.5368 0 11.75C0 17.9632 5.03678 23 11.25 23C11.3755 23 11.5005 22.9979 11.625 22.9939C11.7495 22.9979 11.8745 23 12 23C12.1255 23 12.2505 22.9979 12.375 22.9939C12.4995 22.9979 12.6245 23 12.75 23C12.8755 23 13.0005 22.9979 13.125 22.9939C13.2495 22.9979 13.3745 23 13.5 23C13.6255 23 13.7505 22.9979 13.875 22.9939C13.9995 22.9979 14.1245 23 14.25 23Z" fill="black"/>
					<path fill-rule="evenodd" clip-rule="evenodd" d="M11.25 21.5C16.6347 21.5 21 17.1348 21 11.75C21 6.36522 16.6347 2 11.25 2C5.86521 2 1.5 6.36522 1.5 11.75C1.5 17.1348 5.86521 21.5 11.25 21.5ZM8.4384 10.25C8.95616 10.25 9.37589 9.83027 9.37589 9.3125C9.37589 8.79473 8.95616 8.375 8.4384 8.375C7.92063 8.375 7.5009 8.79473 7.5009 9.3125C7.5009 9.83027 7.92063 10.25 8.4384 10.25ZM6.74626 14.7587C6.62925 15.0412 6.53936 15.3333 6.47737 15.6313C6.36488 16.172 6.82288 16.6243 7.37517 16.6243H15.1251C15.6774 16.6243 16.1354 16.172 16.0229 15.6313C15.961 15.3333 15.8711 15.0412 15.7541 14.7587C15.5091 14.1672 15.15 13.6298 14.6973 13.1771C14.2446 12.7244 13.7072 12.3653 13.1157 12.1204C12.5243 11.8754 11.8903 11.7493 11.2502 11.7493C10.61 11.7493 9.97604 11.8754 9.38458 12.1204C8.79312 12.3653 8.2557 12.7244 7.80302 13.1771C7.35034 13.6298 6.99125 14.1672 6.74626 14.7587ZM15.0009 9.3125C15.0009 9.83027 14.5811 10.25 14.0634 10.25C13.5456 10.25 13.1259 9.83027 13.1259 9.3125C13.1259 8.79473 13.5456 8.375 14.0634 8.375C14.5811 8.375 15.0009 8.79473 15.0009 9.3125Z" fill="white"/>
				</svg>
			`)
		}
	}

	return allResponsesByQuestion.map((questionWithResponses, index) => {
		const satisfactionValues: SatisfactionGraphIterator = satisfactionLabels.map((label) => {
			const responses = questionWithResponses.responses.filter((response) => getSatisfactionLabel(response.response as SatisfactionValue) === label)
			const percentage = (responses.length / questionWithResponses.responses.length) * 100
			return [label, responses.length as number, `${percentage.toFixed(2)}%`]
		})

		const renderSatisfactionBars = () => {
			return satisfactionValues.map((satisfaction, i, values) => {
				const isFirstItem = i === 0
				const isLastItem = i === values.length - 1
				return (
					`
						<div class="bar">
							<div class="bar-label bar-label-spaced">
								${satisfaction[0]}
								${renderSatisfactionIcon(satisfaction[0])}
							</div>
							<div class="bar-base ${isFirstItem ? ' bar-base-first' : ''} ${isLastItem ? ' bar-base-last' : ''}"></div>
							<div class="bar-progress">
								<div class="bar-progress-inner ${getSatisfactionBarColor(satisfaction[0])}" style="width: ${satisfaction[2]}"></div>
							</div>
							<div class="bar-progress-text">${satisfaction[1]}</div>
							<div class="bar-progress-text">${satisfaction[2]}</div>
						</div>
					`
				)
			}).join('')
		}

		return (`
			<div class="card">
				<div class="card-content">
					<h3 class="card-title">${questionWithResponses.question}</h3>
					${renderSatisfactionBars()}
				</div>
			</div >
		`)
	}).join('')
}

const renderTextualResponses = (allResponsesByQuestion: PollQuestionWithResponses, type?: 'textual' | 'select') => {
	const renderRows = (poll: { responses: PollResponse[] }) => {
		return (poll.responses || []).map((response, index, responses) => {
			const isLastItem = index === responses.length - 1
			return (`
					<div class="long-text-container ${isLastItem ? 'last-item' : ''}">
						<ul>
							<li class="long-text"> ${type === 'select' ? (response.response as string[] || []).join(' - ') : response.response}</li>
						</ul>
					</div>
				`)
		}).join('')
	}

	return allResponsesByQuestion.map((poll, index) => {
		if (!poll.responses || !poll.responses.length) return

		return (`
		<div class="card">
			<div class="card-content" >
				<h3 class="card-title"> ${poll.question} </h3>
				${renderRows(poll)}
			</div>
		</div>
		`)
	})
}

function renderPollFooter() {
	return (`
		<h4 class="author">Formulário criado utilizando o aplicativo corre.social</h4>
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

			.poll-title {
				align-self: flex-start;
				margin-top: 0px;
				margin-bottom: 0;
			}

			.poll-description {
				align-self: flex-start;
				margin-bottom: 30px;
			}

			.poll-info {
				margin: 5px;
				align-self: flex-start;
			}

			.responses-number {
				align-self: flex-start;
			}
		</style>
	`
}

export { createPollResultReportDM }
