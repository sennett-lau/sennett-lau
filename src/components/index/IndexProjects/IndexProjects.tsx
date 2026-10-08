import { motion } from 'framer-motion'

import AsciiImage from '@/components/ascii/AsciiImage'
import RichText from '@/components/common/RichText'
import Section from '@/components/index/Section'
import { PROJECTS, type Project } from '@/content/projects'

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const flip = index % 2 === 1
  const number = String(index + 1).padStart(2, '0')

  return (
    <motion.article
      id={`project-${project.slug}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      // overflow-hidden clips the image glow at the card edge.
      className="overflow-hidden border border-line bg-panel/40"
    >
      <header className="flex items-center gap-3 border-b border-line px-4 py-2 text-xs text-dim">
        <span className="text-amber">[{number}]</span>
        <span className="text-ink">{project.slug}</span>
        <span className="hidden sm:inline">~/projects/{project.slug}</span>
        <span className="ml-auto flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-ok" />
          live
        </span>
      </header>

      <div className="grid gap-8 p-4 md:p-8 lg:grid-cols-2 lg:gap-12">
        <AsciiImage
          src={project.image.src}
          alt={project.image.alt}
          width={project.image.width}
          height={project.image.height}
          tone={project.image.tone}
          fontSize={5}
          className={flip ? 'lg:order-2' : ''}
        />

        <div className="flex min-w-0 flex-col">
          <p className="text-xs text-dim">
            {project.years} · {project.role}
          </p>
          <h3 className="mt-2 font-display text-3xl font-bold [font-stretch:112.5%] md:text-5xl">
            {project.name}
          </h3>
          {project.aka && <p className="mt-3 text-sm text-amber">{project.aka}</p>}
          <p className="mt-4 text-lg text-ink">{project.tagline}</p>

          <div className="mt-4 space-y-3 text-[15px] leading-relaxed text-ink/65">
            {project.body.map((paragraph) => (
              <p key={paragraph}>
                <RichText text={paragraph} />
              </p>
            ))}
          </div>

          {project.features && (
            <dl className="mt-5 space-y-2 text-sm">
              {project.features.map((feature) => (
                <div
                  key={feature.name}
                  className="grid gap-x-3 sm:grid-cols-[7.5rem_minmax(0,1fr)]"
                >
                  <dt className="text-amber">{feature.name}</dt>
                  <dd className="text-ink/65">{feature.text}</dd>
                </div>
              ))}
            </dl>
          )}

          {project.releases && (
            <div className="mt-6">
              <p className="text-xs text-dim">releases</p>
              <ol className="mt-2 space-y-1 text-sm">
                {project.releases.map((release, i) => (
                  <li
                    key={release.version}
                    className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-3"
                  >
                    <span className={i === 0 ? 'text-amber' : 'text-dim'}>{release.version}</span>
                    <span className={i === 0 ? 'text-ink' : 'text-ink/50'}>
                      {release.summary}
                      {i === 0 && <span className="text-ok"> (latest)</span>}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* items-baseline: the stat value is text-base, so top alignment
              leaves the xs "stat" label above the line. */}
          <dl className="mt-6 grid grid-cols-[4.5rem_minmax(0,1fr)] items-baseline gap-x-3 gap-y-2 border-t border-line pt-4 text-xs">
            <dt className="text-dim">stack</dt>
            <dd>{project.stack.join(' · ')}</dd>
            {project.stat && (
              <>
                <dt className="text-dim">stat</dt>
                <dd>
                  <span className="font-display text-base font-bold text-amber">
                    {project.stat.value}
                  </span>{' '}
                  {project.stat.label}
                </dd>
              </>
            )}
          </dl>

          <div className="mt-6 flex flex-wrap gap-3 lg:mt-auto lg:pt-6">
            {project.links.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className={`term-btn ${i === 0 ? 'term-btn-primary' : ''}`}
              >
                [ {link.label} -&gt; ]
              </a>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  )
}

const IndexProjects = () => (
  <Section id="projects" index="03" title="projects" command="ls -l ~/projects">
    <div className="space-y-10 md:space-y-16">
      {PROJECTS.map((project, i) => (
        <ProjectCard key={project.slug} project={project} index={i} />
      ))}
    </div>
  </Section>
)

export default IndexProjects
