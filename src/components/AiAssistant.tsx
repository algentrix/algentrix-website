import { useEffect, useId, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

type QuickAction = {
  label: string
  href?: string
}

type PageContext = {
  name: string
  description: string
  panelTitle: string
  actions: QuickAction[]
}

/** No assistant API is configured. Do not invent replies. */
const COMING_SOON =
  'This action is ready to connect. A live assistant is not connected yet, so it will not generate an answer.'

const tradeConnectActions: QuickAction[] = [
  { label: 'Summarize this page' },
  { label: 'What is TradeConnect?' },
  { label: 'How does TradeConnect work?' },
  { label: 'Who is TradeConnect for?' },
  { label: 'Key benefits' },
  { label: 'Ask about this page' },
]

const siteActions: QuickAction[] = [
  { label: 'Summarize this page' },
  { label: 'What does Algentrix build?' },
  { label: 'See our work', href: '/works' },
  { label: 'Talk to Algentrix', href: '/contact' },
]

function pageContext(pathname: string): PageContext {
  if (pathname === '/tradeconnect') {
    return {
      name: 'TradeConnect',
      description: 'WhatsApp-first trading operations for B2B commodity businesses.',
      panelTitle: 'Understand TradeConnect',
      actions: tradeConnectActions,
    }
  }

  if (pathname === '/works') {
    return {
      name: 'Works',
      description: 'Practical digital products and business systems, including TradeConnect.',
      panelTitle: 'Understand this page',
      actions: siteActions,
    }
  }

  return {
    name: 'Algentrix',
    description: 'Technology consulting, analytics, and practical business systems.',
    panelTitle: 'Understand this page',
    actions: siteActions,
  }
}

export function AiAssistant() {
  const location = useLocation()
  const rootRef = useRef<HTMLDivElement>(null)
  const panelId = useId()
  const titleId = useId()
  const [open, setOpen] = useState(false)
  const [actionLabel, setActionLabel] = useState<string | null>(null)
  const page = pageContext(location.pathname)

  useEffect(() => {
    setOpen(false)
    setActionLabel(null)
  }, [location.pathname])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointer)
    }
  }, [open])

  return (
    <div
      ref={rootRef}
      className="fixed right-3 top-[5.25rem] z-[960] md:bottom-8 md:right-6 md:top-auto"
    >
      {open ? (
        <div
          id={panelId}
          role="dialog"
          aria-labelledby={titleId}
          className="absolute right-0 top-12 max-h-[min(28rem,calc(100dvh-8rem))] w-[min(20rem,calc(100vw-1.75rem))] overflow-y-auto overscroll-contain rounded-2xl border border-ag-gold/30 bg-ag-void p-4 text-ag-white shadow-[0_16px_36px_-28px_rgba(0,0,0,0.9)] md:bottom-14 md:top-auto"
        >
          <div className="flex items-start justify-between gap-3">
            <h2 id={titleId} className="font-mono text-[11px] font-semibold tracking-[0.16em] text-ag-gold">
              ✦ AI
            </h2>
            <button
              type="button"
              className="text-[11px] uppercase tracking-[0.14em] text-ag-mist hover:text-white"
              onClick={() => setOpen(false)}
            >
              Close
            </button>
          </div>
          <p className="mt-2 text-[13px] leading-relaxed text-ag-silver">{page.panelTitle}</p>
          <ul className="mt-3 space-y-1.5">
            {page.actions.map((action) =>
              action.href ? (
                <li key={action.label}>
                  <Link
                    to={action.href}
                    className="block rounded-lg border border-white/10 px-3 py-2 text-left text-sm text-ag-off hover:border-ag-gold/40 hover:text-white"
                    onClick={() => setOpen(false)}
                  >
                    {action.label}
                  </Link>
                </li>
              ) : (
                <li key={action.label}>
                  <button
                    type="button"
                    className={`block w-full rounded-lg border px-3 py-2 text-left text-sm ${
                      actionLabel === action.label
                        ? 'border-ag-gold/50 text-white'
                        : 'border-white/10 text-ag-off hover:border-ag-gold/40 hover:text-white'
                    }`}
                    aria-pressed={actionLabel === action.label}
                    onClick={() => setActionLabel(action.label)}
                  >
                    {action.label}
                  </button>
                </li>
              ),
            )}
          </ul>
          {actionLabel ? (
            <p role="status" className="mt-3 text-[12px] leading-relaxed text-ag-silver">
              “{actionLabel}” — {COMING_SOON}
            </p>
          ) : (
            <p className="mt-3 text-[11px] leading-relaxed text-ag-mist">{COMING_SOON}</p>
          )}
        </div>
      ) : null}

      <button
        type="button"
        className="flex h-10 items-center gap-1.5 rounded-full border border-ag-gold/50 bg-ag-void px-3 text-ag-gold shadow-[0_10px_24px_-18px_rgba(0,0,0,0.9)] hover:border-ag-gold hover:text-ag-gold-l"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? 'Close AI' : 'Open AI'}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="font-mono text-[11px] font-semibold tracking-[0.14em]">AI</span>
        <span className="text-[13px] leading-none" aria-hidden>
          ✦
        </span>
      </button>
    </div>
  )
}
