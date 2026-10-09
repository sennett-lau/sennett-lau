import { motion } from 'framer-motion'

import RichText from '@/components/common/RichText'
import Section from '@/components/index/Section'
import { EXPERIENCE, type Role, type RoleProject } from '@/content/experience'

const bullet = {
  hidden: { opacity: 0, x: 12 },
  visible: (i: number) => ({ opacity: 1, x: 0, transition: { delay: 0.15 + i * 0.06 } }),
}

// Projects inside a role, drawn as a branch off the role's commit, latest first.
const ProjectLog = ({ projects, offset }: { projects: RoleProject[]; offset: number }) => (
  <div className="mt-8">
    <p className="text-xs text-dim">
      projects <span className="text-line">--</span> latest first
    </p>
    <ol className="mt-3 pl-5">
      {projects.map((project, i) => (
        <motion.li
          key={project.name}
          custom={offset + i}
          variants={bullet}
          className="relative py-2 md:grid md:grid-cols-[8.5rem_minmax(0,1fr)] md:gap-x-4"
        >
          {/* Branch line: runs through every project and stops at the last one's marker. */}
          <span
            aria-hidden="true"
            className={`absolute -left-5 top-0 w-px bg-line ${i === projects.length - 1 ? 'h-4' : 'bottom-0'}`}
          />
          <span
            aria-hidden="true"
            className="absolute -left-[1.6rem] top-2 bg-bg px-0.5 text-amber"
          >
            *
          </span>
          {project.href ? (
            <a
              href={project.href}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-amber underline decoration-amber/40 underline-offset-4 hover:decoration-amber"
            >
              {project.name}
            </a>
          ) : (
            <span className="font-medium text-ink">{project.name}</span>
          )}
          {/* What the product is on its own line, then what was done on it. */}
          <div className="text-[15px] leading-relaxed md:text-base">
            {project.about && <p className="text-dim">{project.about}</p>}
            <p className="text-ink/65">
              <RichText text={project.work} />
            </p>
          </div>
        </motion.li>
      ))}
    </ol>
  </div>
)

// One role as a `git log` entry. The current role is HEAD.
const Commit = ({ role }: { role: Role }) => (
  <motion.li
    id={`experience-${role.id}`}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.25 }}
    className="relative pb-14 pl-8 last:pb-0 md:pl-12"
  >
    <span aria-hidden="true" className="absolute left-0 top-0 text-amber">
      *
    </span>
    <span aria-hidden="true" className="absolute bottom-0 left-[0.3rem] top-7 w-px bg-line" />

    <p className="text-sm">
      <span className="text-amber">commit {role.id}</span>
      {role.date.endsWith('Present') && <span className="text-ok"> (HEAD -&gt; present)</span>}
    </p>
    <dl className="mt-1 grid grid-cols-[5.5rem_minmax(0,1fr)] gap-x-2 text-sm text-dim">
      <dt>Date:</dt>
      <dd className="text-ink/80">{role.date}</dd>
      <dt>Company:</dt>
      <dd className="text-ink/80">{role.company}</dd>
      <dt>Industry:</dt>
      <dd className="text-ink/80">{role.industry}</dd>
    </dl>

    <h3 className="mt-5 font-display text-2xl font-bold [font-stretch:100%] md:text-3xl">
      {role.title}
    </h3>

    <ul className="mt-5 space-y-2 text-[15px] leading-relaxed text-ink/65 md:text-base">
      {role.points.map((point, i) => (
        <motion.li key={point} custom={i} variants={bullet} className="flex gap-3">
          <span aria-hidden="true" className="select-none text-ok">
            +
          </span>
          <span>
            <RichText text={point} />
          </span>
        </motion.li>
      ))}
    </ul>

    {role.projects && <ProjectLog projects={role.projects} offset={role.points.length} />}
  </motion.li>
)

const IndexExperience = () => (
  <Section id="experience" index="02" title="experience" command="git log --career">
    <ol className="max-w-4xl">
      {EXPERIENCE.map((role) => (
        <Commit key={role.id} role={role} />
      ))}
    </ol>
  </Section>
)

export default IndexExperience
