import { useInView } from 'framer-motion'
import { type CSSProperties, type PointerEvent, useEffect, useMemo, useRef, useState } from 'react'

import { scrambleFrame, useAnimatedText } from '@/hooks/useAnimatedText'
import { FLOOD_MS, useRevealTrail } from '@/hooks/useRevealTrail'
import { type AsciiOptions, gridSize, toAscii } from '@/lib/ascii'

const MAX_COLS = 200

type Props = {
  src: string
  alt: string
  // Intrinsic size of the image file; sets the frame's aspect ratio.
  width: number
  height: number
  // Glyph size in px. Smaller = more detail.
  fontSize?: number
  // Tone mapping for this image; see AsciiOptions.
  tone?: Omit<AsciiOptions, 'ramp'>
  glyphClassName?: string
  className?: string
}

// Glyph advance width / font size for the ASCII font, measured once fonts load.
const measureCellAspect = () => {
  const ctx = document.createElement('canvas').getContext('2d')
  if (!ctx) return 0.6
  ctx.font = '100px "IBM Plex Mono", monospace'
  return ctx.measureText('M'.repeat(50)).width / 50 / 100
}

// Downsample in halving steps: one big drawImage jump aliases badly.
const samplePixels = (image: HTMLImageElement, cols: number, rows: number) => {
  let source: CanvasImageSource = image
  let w = image.naturalWidth
  let h = image.naturalHeight
  while (w / 2 >= cols * 2 && h / 2 >= rows * 2) {
    w = Math.floor(w / 2)
    h = Math.floor(h / 2)
    const step = document.createElement('canvas')
    step.width = w
    step.height = h
    step.getContext('2d')?.drawImage(source, 0, 0, w, h)
    source = step
  }
  const out = document.createElement('canvas')
  out.width = cols
  out.height = rows
  const ctx = out.getContext('2d', { willReadFrequently: true })
  if (!ctx) return null
  ctx.imageSmoothingQuality = 'high'
  ctx.drawImage(source, 0, 0, cols, rows)
  return ctx.getImageData(0, 0, cols, rows).data
}

// Fades the frame's edges into whatever is behind it, so the art has no box.
const FEATHER = 'linear-gradient(to right, transparent, #000 9%, #000 91%, transparent)'
const FEATHER_V = 'linear-gradient(to bottom, transparent, #000 9%, #000 91%, transparent)'
const featherMask: CSSProperties = {
  maskImage: `${FEATHER}, ${FEATHER_V}`,
  maskComposite: 'intersect',
  WebkitMaskImage: `${FEATHER}, ${FEATHER_V}`,
  WebkitMaskComposite: 'source-in',
}

// An image drawn as ASCII art. Moving the mouse over it paints a liquid trail
// that shows the photo underneath, toned like the ASCII (grayscale, inverted
// when the tone is) and dissolving behind the cursor; a click or tap floods the
// frame with the full-colour photo. See useRevealTrail and
// docs/plans/archive/2026-10-07_ascii-redesign/decision.md DR-1, DR-2.
const AsciiImage = ({
  src,
  alt,
  width,
  height,
  fontSize = 6,
  tone = {},
  glyphClassName = 'text-ink/80',
  className = '',
}: Props) => {
  const frameRef = useRef<HTMLButtonElement>(null)
  const trailRef = useRef<HTMLCanvasElement>(null)
  const inView = useInView(frameRef, { once: true, amount: 0.25 })
  const [frameWidth, setFrameWidth] = useState(0)
  const [cellAspect, setCellAspect] = useState(0.6)
  const [image, setImage] = useState<HTMLImageElement | null>(null)
  const [failed, setFailed] = useState(false)
  const [revealed, setRevealed] = useState(false)
  // Keep true colour until a closing flood has drained, then re-tone.
  const [closing, setClosing] = useState(false)

  useEffect(() => {
    const el = frameRef.current
    if (!el) return
    const observer = new ResizeObserver(([entry]) => setFrameWidth(entry.contentRect.width))
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.fonts.ready.then(() => setCellAspect(measureCellAspect()))
  }, [])

  useEffect(() => {
    let cancelled = false
    setFailed(false)
    const img = new Image()
    img.src = src
    img
      .decode()
      .then(() => {
        if (!cancelled) setImage(img)
      })
      .catch((err) => {
        console.error(`AsciiImage: could not decode ${src}`, err)
        // Fall back to the plain <img>, which retries the load on its own.
        if (!cancelled) setFailed(true)
      })
    return () => {
      cancelled = true
    }
  }, [src])

  useEffect(() => {
    if (!closing) return
    const id = window.setTimeout(() => setClosing(false), FLOOD_MS)
    return () => window.clearTimeout(id)
  }, [closing])

  const cols = Math.min(MAX_COLS, Math.floor(frameWidth / (fontSize * cellAspect)))
  // Grow glyphs slightly so the grid spans the frame exactly (cols is floored/capped).
  const glyphSize = cols > 0 ? frameWidth / (cols * cellAspect) : fontSize

  const { invert, normalize, blackPoint, gamma } = tone
  const ascii = useMemo(() => {
    if (!image || cols < 1) return ''
    const { rows } = gridSize(width, height, cols, cellAspect)
    const pixels = samplePixels(image, cols, rows)
    return pixels ? toAscii(pixels, cols, rows, { invert, normalize, blackPoint, gamma }) : ''
  }, [image, cols, cellAspect, width, height, invert, normalize, blackPoint, gamma])

  const glyphs = useAnimatedText<HTMLSpanElement>(
    ascii,
    inView && ascii !== '',
    scrambleFrame,
    1400,
  )

  const trail = useRevealTrail({
    canvas: trailRef,
    image,
    width: frameWidth,
    height: (frameWidth * height) / width,
    revealed,
  })

  const local = (e: PointerEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    return [e.clientX - rect.left, e.clientY - rect.top] as const
  }

  const toggle = () => {
    if (revealed) setClosing(true)
    setRevealed(!revealed)
  }

  // In the trail the photo matches the ASCII: grayscale, and for inverted tones
  // a partial negative: invert(0.92) puts a white page at ~8% grey (the frame's
  // own tone) and dark text near the ink colour, so only the content shows.
  const toned = invert ? 'grayscale(1) invert(0.92)' : 'grayscale(1)'
  // Ambient glow: the photo's own colours, blurred, spilling past the frame.
  // Light screenshots are dimmed hard so their white pages don't haze the page.
  const glow = `blur(48px) saturate(1.8) brightness(${invert ? 0.45 : 0.8})`

  return (
    <figure className={className}>
      <div className="relative isolate">
        <img
          src={src}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="pointer-events-none absolute -left-[12%] -top-[12%] -z-10 h-[124%] w-[124%] max-w-none object-cover opacity-20"
          style={{ filter: glow }}
        />
        <button
          ref={frameRef}
          type="button"
          aria-pressed={revealed}
          aria-label={`${alt} Toggle between ASCII and photo.`}
          onClick={toggle}
          onPointerDown={(e) => trail.aim(...local(e))}
          onPointerMove={(e) => {
            if (e.pointerType === 'mouse') trail.move(...local(e))
          }}
          onPointerLeave={trail.leave}
          className="relative block w-full cursor-crosshair select-none"
          style={{ aspectRatio: `${width} / ${height}` }}
        >
          {/* The mask sits on this wrapper, not the button, so the focus ring stays visible. */}
          <span className="absolute inset-0 block overflow-hidden" style={featherMask}>
            {/* <span>, not <pre>: a <button> may only contain phrasing content. */}
            <span
              ref={glyphs}
              aria-hidden="true"
              className={`ascii absolute left-0 top-0 block ${glyphClassName}`}
              style={{ fontSize: glyphSize }}
            />
            {/* No aria-hidden needed: the button's aria-label names it, and a canvas has no text. */}
            <canvas
              ref={trailRef}
              className="pointer-events-none absolute inset-0 h-full w-full"
              style={{ filter: revealed || closing ? 'none' : toned }}
            />
            {failed && (
              <img
                src={src}
                alt=""
                width={width}
                height={height}
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}
          </span>
          {!ascii && !failed && (
            <span className="absolute inset-0 flex items-center justify-center text-xs text-dim">
              [ decoding {src.split('/').pop()} ... ]
            </span>
          )}
        </button>
      </div>
      <figcaption className="mt-2 flex justify-between gap-4 text-[11px] tracking-wide text-dim">
        <span>
          {src.split('/').pop()} {ascii ? `-> ${cols}x${ascii.split('\n').length} ascii` : ''}
        </span>
        <span className="hidden sm:inline">{revealed ? 'click for ascii' : 'hover / click'}</span>
        <span className="sm:hidden">{revealed ? 'tap for ascii' : 'tap for photo'}</span>
      </figcaption>
    </figure>
  )
}

export default AsciiImage
