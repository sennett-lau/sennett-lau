import Section from '@/components/index/Section'

// TODO(visual-port): port from archive/src/component/index/IndexQuote/IndexQuote.tsx
const IndexQuote = () => {
  return (
    <Section id="quote">
      <blockquote className="max-w-3xl px-4 text-center text-2xl lg:text-4xl italic">
        “Tell me and I forget. Teach me and I remember. Involve me and I learn.”
      </blockquote>
    </Section>
  )
}

export default IndexQuote
