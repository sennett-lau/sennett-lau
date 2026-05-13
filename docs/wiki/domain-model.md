# Domain model

The site has one piece of meaningful domain state: a **color scheme** that follows the user's scroll position. Everything else (modal open/closed, header visibility) is straightforward UI state.

## ColorScheme

```ts
type ColorScheme = 'light' | 'dark' | 'ultraDark'
```

## State machine — scroll position → color scheme

`App.tsx` runs a `useEffect` keyed on `scrollPosition` (from `useScroll`). On each scroll delta it computes the top of each section anchor (`getBoundingClientRect().top`), pairs each with a `ColorScheme`, and picks the **last** section whose offset is ≤ 0 (i.e. has reached the trigger line, 300px above the viewport top for non-hero sections).

```
hero        position = 0                       → light
quote       top('quote')      - 300            → ultraDark
about       top('about')      - 300            → dark
experience  top('experience') - 300            → light
projects    top('projects')   - 300            → dark
certs       top('certs')      - 300            → light
contact     top('contact')    - 300            → dark
```

Walks the list **in reverse** to find the last triggered entry. Dispatch `setColorScheme({ colorScheme })` + `setCurrSectionId({ currSectionId })`.

## Subsection tracker

For finer-grained tracking within `experience` and `projects`, App.tsx also maintains a `subsectionId` driven by inner anchors:

```
experience-9gag-t1      top('experience-9gag')     - 400
experience-9gag-t2      top('experience-9gag')     - 300
experience-qookia-t1    top('experience-qookia')   - 400
experience-qookia-t2    top('experience-qookia')   - 300
experience-ozaru-t1     top('experience-ozaru')    - 400
experience-ozaru-t2     top('experience-ozaru')    - 300
experience-krglobal-t1  top('experience-krglobal') - 400
experience-krglobal-t2  top('experience-krglobal') - 300
projects-hero           top('projects')            - 300
projects-quote          top('projects-quote')      - 700
projects-duo            top('projects-duo')        - 300
projects-extra          top('projects-extra')      - 500
```

Same reverse-find logic. Result lands in `controlSlice.subsectionId`. Currently used by sub-components (when fully ported) to swap between active timeline entries, animate inner ribbon highlights, etc.

## Header visibility

`showHeader = scrollPosition > window.innerHeight` — header reveals once user scrolls past the hero section.

## Modal

`isImageModalOpen` + `imageModalSrc`. `<ImageModal>` (not yet ported — see `archive/src/component/modal/ImageModal.tsx`) reads both and renders a fullscreen image viewer over the current page.

## Anchor invariants

The following DOM ids are load-bearing — the App.tsx scroll logic queries them by id and will silently fail (no transition fires) if they're missing or renamed:

**Sections:** `hero`, `quote`, `about`, `experience`, `projects`, `certs`, `contact`.

**Subsections:** `experience-9gag`, `experience-qookia`, `experience-ozaru`, `experience-krglobal`, `projects-quote`, `projects-duo`, `projects-extra`.

(The `*-t1` / `*-t2` ids in the subSectionPositions array are not anchored to DOM — they're calculated offsets relative to the parent anchor.)
