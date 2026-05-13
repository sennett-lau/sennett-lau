import Section from '@/components/index/Section'

// TODO(visual-port): full Hero with Desktop + Mobile variants, nav, scroll hint.
// Archive references: archive/src/component/index/IndexHero/{IndexHero,IndexHeroDesktop,IndexHeroMobile,IndexHeroNav,ScrollHint}.tsx
const IndexHero = () => {
  return (
    <Section id="hero">
      <div className="text-center px-4">
        <h1 className="font-zarathustra text-6xl lg:text-9xl mb-4">Sennett Lau</h1>
        <p className="text-xl lg:text-2xl">A FullStack Developer.</p>
      </div>
    </Section>
  )
}

export default IndexHero
