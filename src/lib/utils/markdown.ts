import { micromark } from 'micromark'
import { gfm, gfmHtml } from 'micromark-extension-gfm'

export function markdownToHtml(markdown: string) {
  return micromark(markdown, {
    extensions: [gfm()],
    htmlExtensions: [gfmHtml()],
  })
}

interface Heading {
  id: string
  text: string
  depth: number
}

export const generateTOC = (html: string): string => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')

  const headings = Array.from(
    doc.querySelectorAll<HTMLElement>('h1, h2, h3, h4, h5, h6')
  )
  const toc: Heading[] = []

  headings.forEach((heading) => {
    const id = heading.getAttribute('id') || ''
    const text = heading.textContent || ''
    const depth = parseInt(heading.tagName[1])

    toc.push({ id, text, depth })
  })

  let tocHTML = ''
  let previousDepth = 0

  toc.forEach((heading) => {
    if (heading.depth > previousDepth) {
      tocHTML += '<ul>'
    } else if (heading.depth < previousDepth) {
      tocHTML += '</ul>'.repeat(previousDepth - heading.depth)
    }

    tocHTML += `<li><a href="#${heading.id}">${heading.text}</a></li>`
    previousDepth = heading.depth
  })

  return tocHTML
}
