import { Fragment } from 'react'

import { parseRich } from '@/lib/rich'

type Props = {
  text: string
}

// Hyphenated words ("AI-native", "back-end") stay on one line: browsers
// otherwise break at the hyphen and strand half the word.
const keepHyphens = (text: string) =>
  text.split(/(\S+-\S+)/).map((part, i) =>
    i % 2 === 1 ? (
      // biome-ignore lint/suspicious/noArrayIndexKey: parts are positional and static
      <span key={i} className="whitespace-nowrap">
        {part}
      </span>
    ) : (
      part
    ),
  )

// Renders content markup (**strong**, [label](url)). Strong text is bright ink,
// like bold in a terminal; amber is kept for links.
const RichText = ({ text }: Props) => (
  <>
    {parseRich(text).map((seg, i) => {
      const key = `${i}-${seg.text}`
      if (seg.kind === 'strong') {
        return (
          <strong key={key} className="font-semibold text-ink">
            {keepHyphens(seg.text)}
          </strong>
        )
      }
      if (seg.kind === 'link') {
        return (
          <a
            key={key}
            href={seg.href}
            target="_blank"
            rel="noreferrer"
            className="font-medium text-amber underline decoration-amber/40 underline-offset-4 hover:decoration-amber"
          >
            {keepHyphens(seg.text)}
          </a>
        )
      }
      return <Fragment key={key}>{keepHyphens(seg.text)}</Fragment>
    })}
  </>
)

export default RichText
