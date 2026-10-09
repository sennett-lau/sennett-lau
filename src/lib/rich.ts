// Inline markup for content strings: `**strong**` and `[label](url)`.
// Anything else is literal text. See decision.md DR-5 of the ascii-redesign plan.

export type RichSegment =
  | { kind: 'text'; text: string }
  | { kind: 'strong'; text: string }
  | { kind: 'link'; text: string; href: string }

const TOKEN = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g

export const parseRich = (input: string): RichSegment[] => {
  const segments: RichSegment[] = []
  let cursor = 0
  for (const match of input.matchAll(TOKEN)) {
    const start = match.index ?? 0
    if (start > cursor) segments.push({ kind: 'text', text: input.slice(cursor, start) })
    if (match[1] !== undefined) {
      segments.push({ kind: 'strong', text: match[1] })
    } else {
      segments.push({ kind: 'link', text: match[2], href: match[3] })
    }
    cursor = start + match[0].length
  }
  if (cursor < input.length) segments.push({ kind: 'text', text: input.slice(cursor) })
  return segments
}
