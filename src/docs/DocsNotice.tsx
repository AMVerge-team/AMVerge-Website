import { FiAlertTriangle, FiFileText, FiRefreshCw, FiWifiOff } from 'react-icons/fi'

type Variant = 'offline' | 'empty' | 'notfound'

type DocsNoticeProps = {
  variant: Variant
  /** compact = sidebar inline version; default = full content panel */
  compact?: boolean
  detail?: string
  onRetry?: () => void
}

const COPY: Record<Variant, { icon: typeof FiWifiOff; title: string; body: string }> = {
  offline: {
    icon: FiWifiOff,
    title: 'Docs are offline',
    body: "We can't reach the documentation service right now. It may be down or restarting. Please try again in a moment.",
  },
  empty: {
    icon: FiFileText,
    title: 'No documentation yet',
    body: 'Pages published from the admin will show up here.',
  },
  notfound: {
    icon: FiAlertTriangle,
    title: 'Page not found',
    body: 'This documentation page does not exist or is not published.',
  },
}

export default function DocsNotice({ variant, compact, detail, onRetry }: DocsNoticeProps) {
  const { icon: Icon, title, body } = COPY[variant]

  if (compact) {
    return (
      <div className="docs-notice docs-notice-compact">
        <Icon className="docs-notice-icon" />
        <span>{title}</span>
        {onRetry && (
          <button type="button" className="docs-notice-retry-sm" onClick={onRetry} aria-label="Retry">
            <FiRefreshCw />
          </button>
        )}
      </div>
    )
  }

  return (
    <div className={`docs-notice docs-notice-${variant}`}>
      <Icon className="docs-notice-icon" />
      <h1 className="docs-notice-title">{title}</h1>
      <p className="docs-notice-body">{body}</p>
      {detail && <p className="docs-notice-detail">{detail}</p>}
      {onRetry && (
        <button type="button" className="docs-notice-retry" onClick={onRetry}>
          <FiRefreshCw /> Try again
        </button>
      )}
    </div>
  )
}
