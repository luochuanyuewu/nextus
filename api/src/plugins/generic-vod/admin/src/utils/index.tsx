export const copyClipboard = (entryText: string) => {
    navigator.clipboard.writeText(entryText)
}
