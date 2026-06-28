// Minimal inline icon set (stroke style) so we avoid an extra dependency.
// Add more paths here as needed.

type IconProps = {
  name: string;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
};

const paths: Record<string, React.ReactNode> = {
  briefcase: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M3 12h18" />
    </>
  ),
  "user-search": (
    <>
      <circle cx="10" cy="8" r="4" />
      <path d="M2 20c0-3.3 3.6-6 8-6" />
      <circle cx="18" cy="16" r="3" />
      <path d="m22 20-2.5-2.5" />
    </>
  ),
  book: (
    <>
      <path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z" />
      <path d="M4 19V5" />
    </>
  ),
  smile: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <path d="M9 9h.01M15 9h.01" />
    </>
  ),
  play: <path d="M6 4v16l14-8z" fill="currentColor" stroke="none" />,
  download: (
    <>
      <path d="M12 3v12" />
      <path d="m7 11 5 5 5-5" />
      <path d="M5 21h14" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </>
  ),
  "chevron-down": <path d="m6 9 6 6 6-6" />,
};

export default function Icon({ name, size = 20, className = "", style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {paths[name] ?? null}
    </svg>
  );
}
