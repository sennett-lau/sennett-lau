import Section from '@/components/index/Section'

// TODO(visual-port): port from archive/src/component/index/IndexProjects/*.
// Subsection ids (preserved): projects-hero, projects-quote, projects-duo, projects-extra
const IndexProjects = () => {
  return (
    <Section id="projects">
      <div className="max-w-5xl px-4 w-full">
        <h2 className="text-5xl lg:text-7xl font-bold mb-8" id="projects-hero">
          Projects
        </h2>
        <div id="projects-quote" className="mb-12 italic opacity-80">
          Project tagline / quote placeholder
        </div>
        <div id="projects-duo" className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          <div className="aspect-video border rounded-lg flex items-center justify-center">
            0xBlanc placeholder
          </div>
          <div className="aspect-video border rounded-lg flex items-center justify-center">
            CBTWines placeholder
          </div>
        </div>
        <div id="projects-extra" className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="aspect-video border rounded-lg flex items-center justify-center">
            CityUGE
          </div>
          <div className="aspect-video border rounded-lg flex items-center justify-center">
            AINA
          </div>
          <div className="aspect-video border rounded-lg flex items-center justify-center">
            LCSD
          </div>
        </div>
      </div>
    </Section>
  )
}

export default IndexProjects
