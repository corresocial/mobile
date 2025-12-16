import axios from 'axios'
import { Cheerio, Element, CheerioAPI, load as loadPage, load } from 'cheerio'

import { ExternalEvent, PageData } from "../types/externalTypes"
import { limitPerPage } from '../..'

async function getEventCardElements(url: string) {
    try {
        const { data } = await axios.get(url, { timeout: 10000 })
        const pageRef = loadPage(data)
        const eventElements = pageRef("div[class^=CustomGridstyle__CustomGridCardType]")
        return { eventElements, pageRef }
    } catch (error) {
        console.log(error)
        return undefined
    }
}

function getEventLinks(pageRef: CheerioAPI, eventElements: Cheerio<Element>) {
    const links = eventElements.slice(0, limitPerPage).map((i, event) => {
        return pageRef(event).find('a').attr('href') as string
    })
    return links.get()
}

interface EventDetails {
    detalhedEvents: ExternalEvent[]
    eventLimitReached?: boolean
}

async function getEventDetails(eventLinks: string[], dateLimit: Date): Promise<EventDetails> {
    const detalhedEvents: ExternalEvent[] = []
    let eventLimitReached = false

    for (const eventUrl of eventLinks) {
        try {
            const { data } = await axios.get(eventUrl)

            if (!data) throw new Error(`Evento não encontrado ${eventUrl}`)

            const eventPage = loadPage(data)
            const scriptTagElement = eventPage('script#__NEXT_DATA__')

            if (!scriptTagElement || !Object.keys(scriptTagElement).length) {
                console.log('Script tag not found')
                continue
            }

            const pageDataJson = (scriptTagElement as any).html().trim()
            const pageData: PageData = JSON.parse(pageDataJson)

            const event = pageData.props.pageProps.hydrationData.eventHydration.event as ExternalEvent

            const eventStartDate = new Date(event.startDate)

            console.log(`${eventStartDate.getDate()}/${eventStartDate.getMonth() + 1}`, '-', event.name)

            // if (eventStartDate.getTime() > dateLimit.getTime()) {
            //     console.log('eventLimitReached')
            //     eventLimitReached = true
            //     break
            // }

            detalhedEvents.push(event)
        } catch (error) {
            console.log(`Evento não encontrado ${eventUrl}`)
        }
    }

    return { detalhedEvents, eventLimitReached }
}


function extractTextFromHTML(element: string) {
    const $ = load(element)

    function getTextFromElement(element: any) {
        return $(element).text().trim()
    }

    let result = ''

    // Função para adicionar texto ao resultado, incluindo novas linhas
    function addText(text: string) {
        if (text) {
            result += text + '\n\n'
        }
    }

    // Extrair texto de tags específicas
    $('h3').each((i: number, el: any) => {
        addText(getTextFromElement(el))
    })

    $('div').each((i: number, el: any) => {
        addText(getTextFromElement(el))
    })

    $('p').each((i: number, el: any) => {
        addText(getTextFromElement(el))
    })

    $('ul li').each((i: number, el: any) => {
        result += getTextFromElement(el) + '\n'
    })

    // Extrair texto de tags de nível mais alto (body)
    const bodyText = $('body').contents().filter(function () {
        return this.nodeType === 3 // Node type 3 é um texto
    }).text().trim()

    addText(bodyText)

    return result.trim()
}


export { getEventCardElements, getEventLinks, getEventDetails, extractTextFromHTML }