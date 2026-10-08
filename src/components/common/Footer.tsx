import { OWNER } from '@/content/site'

const Footer = () => (
  <footer className="border-t border-line px-4 py-10 text-xs text-dim md:px-8">
    <div className="mx-auto flex max-w-[1200px] flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <p>
        <span className="text-ink">
          © {new Date().getFullYear()} {OWNER}
        </span>{' '}
        · Site designed and developed by {OWNER}
      </p>
      <a href="#hero" className="text-ink hover:text-amber">
        [ back to top ↑ ]
      </a>
    </div>
  </footer>
)

export default Footer
