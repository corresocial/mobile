import React from 'react'
import { Text } from 'react-native'

export const showMessageWithHighlight = (message: string, highlightedWords?: string[]) => {
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