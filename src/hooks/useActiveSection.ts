import { useEffect, useState } from 'react'

// Returns the id of the section crossing the middle band of the viewport, or
// '' while none does (e.g. on the hero).
export const useActiveSection = (ids: readonly string[]) => {
  const [active, setActive] = useState('')

  useEffect(() => {
    const visible = new Set<string>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id)
          else visible.delete(entry.target.id)
        }
        setActive(ids.find((id) => visible.has(id)) ?? '')
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    for (const id of ids) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [ids])

  return active
}
