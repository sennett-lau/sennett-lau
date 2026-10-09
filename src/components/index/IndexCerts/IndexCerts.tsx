import Section from '@/components/index/Section'
import { CERTS } from '@/content/certs'

const IndexCerts = () => (
  <Section id="certs" index="04" title="certs" command="cat certs.csv | column -t">
    <div className="overflow-hidden border border-line">
      <div className="hidden grid-cols-[minmax(0,1fr)_8rem] border-b border-line bg-panel/60 px-4 py-2 text-xs text-dim md:grid">
        <span>name</span>
        <span className="text-right">issued</span>
      </div>
      <ul>
        {CERTS.map((cert) => (
          <li
            key={cert.name}
            className="grid gap-1 border-b border-line px-4 py-5 last:border-b-0 md:grid-cols-[minmax(0,1fr)_8rem] md:gap-6"
          >
            <div>
              <p className="font-display text-lg font-semibold md:text-xl">{cert.name}</p>
              {cert.description && (
                <p className="mt-2 max-w-3xl text-sm text-ink/70">{cert.description}</p>
              )}
            </div>
            <p className="order-first text-xs text-amber md:order-none md:text-right md:text-sm">
              {cert.date}
            </p>
          </li>
        ))}
      </ul>
    </div>
  </Section>
)

export default IndexCerts
