// Small SVG icons used in a few places

export const BagIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 7h12l1 13H5L6 7z" />
    <path d="M9 7a3 3 0 016 0" />
  </svg>
)

// direction is 'left' (back arrow) or 'right' (next arrow)
export function ChevronIcon({ direction }) {
  const path = direction === 'left' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'

  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: 'block' }}
    >
      <path d={path} />
    </svg>
  )
}
