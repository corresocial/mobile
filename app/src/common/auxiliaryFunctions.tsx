import React from 'react'
import { Text } from 'react-native'

const showMessageWithHighlight = (message: string, highlightedWords?: string[]) => {
    if (!highlightedWords) return message

    const words = message.split(' ')
    
    const messageHighlighted = words.map((word: string) => {
        if (highlightedWords.includes(word as never)) return (
            <Text style={{ fontFamily: 'Arvo_700Bold' }} key={word}>
                {`${word} `}
            </Text>
        )
        return `${word} `
    })

    return messageHighlighted
}

const filterLeavingOnlyNumbers = (dirtyText: string) => {
    const cleanText =  dirtyText.match(/[0-9]/ig)?.join('')
    return cleanText
}

export {
    showMessageWithHighlight,
    filterLeavingOnlyNumbers
}