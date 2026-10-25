import { Link } from '../router'
import { useStore } from '../store'
import { BagIcon } from './Icons'

// Links in the pill menu at the top (hidden on phones)
const MENU_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/track', label: 'Track order' },
  { to: '/contact', label: 'Contact' },
]

// Links in the bottom dock on phones, each with its SVG icon path
const DOCK_LINKS = [
  { to: '/', label: 'Home', icon: 'M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z' },
  { to: '/shop', label: 'Shop', icon: 'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z' },
  { to: '/track', label: 'Track order', icon: 'M3 6h18v12H3zM3 7l9 7 9-7' },
  { to: '/cart', label: 'Cart', icon: 'M6 8h12l1 12H5zM9 8a3 3 0 0 1 6 0' },
]

export default function Nav({ path }) {
  const { cartCount } = useStore()

  return (
    <header className="nav">
      <div className="navin">
        <Link to="/" className="logo">
          MOTRIX
        </Link>

        <nav className="pill">
          {MENU_LINKS.map((link) => (
            <Link key={link.to} to={link.to} className={path === link.to ? 'on' : ''}>
              {link.label}
            </Link>
          ))}
        </nav>

        <Link to="/cart" className="bag" aria-label="Cart">
          <BagIcon />
          {/* the key makes the badge re-run its pop animation whenever the count changes */}
          {cartCount > 0 && (
            <i key={cartCount} className="badge">
              {cartCount}
            </i>
          )}
        </Link>
      </div>

      <nav className="dock">
        {DOCK_LINKS.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            aria-label={link.label}
            className={path === link.to ? 'on' : ''}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d={link.icon} />
            </svg>
            {link.to === '/cart' && cartCount > 0 && <i className="badge">{cartCount}</i>}
          </Link>
        ))}
      </nav>
    </header>
  )
}
