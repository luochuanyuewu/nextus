export const getDayMonthYearHourDate = (dateParam: Date): string => {
    const dateObject = new Date(dateParam)
    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    } as const
    return dateObject.toLocaleDateString('en-GB', options)
}
