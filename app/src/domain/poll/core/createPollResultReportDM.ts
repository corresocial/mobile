import { PollEntity, PollQuestion, PollQuestionType, PollResponse } from '../entity/types'

async function createPollResultReportDM(pollData: PollEntity) {
	try {
		return `
			<html lang={'pt-br'}>
				${renderHtmlHeader()}
				<div class='body'>
					${renderPollHeader(pollData)}
					${renderBinaryGraph(pollData)}
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
	const numberOfResponses = ` ${pollData.privateResponses.length}`

	return `
		<h2 class='poll-title'>${pollData.title}</h2>
		<p class='poll-description'>${pollData.description}</p>
		<p class='responses-number'>
			Total de respostas: <b>${numberOfResponses}</b>
		</p>
	`
}

function groupQuestionsByQuestionType(pollData: PollEntity, questionType: PollQuestionType) {
	const allResponses = pollData.privateResponses.map((poll) => poll.responses)
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

	type PollQuestionWithResponses = (PollQuestion & { responses: PollResponse[] })[]
	return allResponsesByQuestion as PollQuestionWithResponses
}

type BinaryGraphIterator = [BinaryLabelOptions, number, string][]
type BinaryLabelOptions = 'Sim' | 'Não'

function renderBinaryGraph(pollData: PollEntity) {
	const allResponsesByQuestion = groupQuestionsByQuestionType(pollData, 'binary')
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
			console.log(value)
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

			.responses-number {
				align-self: flex-start;
			}
		</style>
	`
}

export { createPollResultReportDM }
