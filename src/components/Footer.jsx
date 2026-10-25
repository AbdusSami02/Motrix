import { Link } from '../router'

const EXPLORE_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/cart', label: 'Cart' },
  { to: '/track', label: 'Track order' },
]

const BRANDS = ['Serps', 'Yamaha', 'BMW', 'LS2', 'Shark']

export default function Footer() {
  return (
    <footer className="foot">
      <div className="fin">
        <div>
          <h3 className="flogo">Motrix</h3>
          <p>
            Premium helmets designed for protection, comfort and performance. Safety never goes out
            of style.
          </p>
          <Link to="/contact" className="btn accent fbtn">
            Get in touch →
          </Link>
        </div>

        <div>
          <h6>EXPLORE</h6>
          {EXPLORE_LINKS.map((link) => (
            <Link key={link.to} to={link.to}>
              {link.label}
            </Link>
          ))}
        </div>

        <div>
          <h6>BRANDS</h6>
          {BRANDS.map((brand) => (
            <Link key={brand} to="/shop">
              {brand}
            </Link>
          ))}
        </div>

        <div>
          <h6>CONTACT</h6>
          <span>✉ hello@motrix.com</span>
          <span>✆ +1 (555) 014-2290</span>
          <span>⌖ 123 Rider Street, Your City</span>
        </div>
      </div>

      <div className="copy">© 2026 Motrix. All rights reserved.</div>
    </footer>
  )
}
