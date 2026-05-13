import Section from '@/components/index/Section'

// TODO(visual-port): port full timeline from archive/src/component/index/IndexExprience/*.
// Subsection ids (preserved for scroll-driven subsection tracking in App.tsx):
//   experience-9gag, experience-qookia, experience-ozaru, experience-krglobal
const IndexExperience = () => {
  return (
    <Section id="experience">
      <div className="max-w-3xl px-4 w-full">
        <h2 className="text-5xl lg:text-7xl font-bold mb-8">Experience</h2>
        <ul className="space-y-12">
          <li id="experience-9gag" className="border-l-4 pl-6">
            <h3 className="text-2xl font-bold">9GAG</h3>
            <p className="text-sm opacity-70">port from IndexExperience9Gag.tsx</p>
          </li>
          <li id="experience-qookia" className="border-l-4 pl-6">
            <h3 className="text-2xl font-bold">Qookia</h3>
            <p className="text-sm opacity-70">port from IndexExperienceQookia.tsx</p>
          </li>
          <li id="experience-ozaru" className="border-l-4 pl-6">
            <h3 className="text-2xl font-bold">Ozaru</h3>
            <p className="text-sm opacity-70">port from IndexExperienceOzaru.tsx</p>
          </li>
          <li id="experience-krglobal" className="border-l-4 pl-6">
            <h3 className="text-2xl font-bold">KR Global</h3>
            <p className="text-sm opacity-70">port from IndexExperienceKRGlobal.tsx</p>
          </li>
        </ul>
      </div>
    </Section>
  )
}

export default IndexExperience
