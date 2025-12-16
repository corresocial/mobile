function isValidDate(input: string | Date) {
    if (typeof input === 'string' || input instanceof String) {
        const date = new Date(input)
        return !isNaN(date.getTime())
    } else if (input instanceof Date) {
        return !isNaN(input.getTime())
    }
    return false
}

function formatDate(date: Date) {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
}

function getDateRange(rangeMounths?: number) {
    const currentDate = new Date()
    const startDate = formatDate(currentDate)
    const endDate = new Date(currentDate)
    endDate.setMonth(endDate.getMonth() + (rangeMounths || 2))
    const formattedEndDate = formatDate(endDate)

    return { startDate, endDate: formattedEndDate }
}

export { isValidDate, formatDate, getDateRange }