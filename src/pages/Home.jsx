import { Link } from '../router'
import { useStore } from '../store'
import ProductCard from '../components/ProductCard'

const FEATURES = [
  { title: 'ECE 22.06', text: 'Certified impact protection on every helmet we sell.' },
  { title: 'Wind-tunnel tuned', text: 'Quiet and stable at motorway speed.' },
  {
    title: '30-day returns',
    text: 'Ride in it. If it does not fit, send it back.',
  },
]

export default function Home() {
  const { products } = useStore()

  // the hero button points at the newest product
  const newest = products[products.length - 1]

  // "M-PRO-CARBON" -> "M PRO CARBON" -> "M-Pro-Carbon" (looks nicer in the button text)
  const newestName =
    newest && newest.name.replace(/-/g, ' ').replace('M PRO CARBON', 'M-Pro-Carbon')

  return (
    <>
      <section className="hero">
        <div className="reveal">
          <h1>
            SAFETY NEVER
            <br />
            GOES OUT OF
            <br />
            STYLE
          </h1>
          <p>Ride safer with premium helmets designed for protection, comfort, and performance.</p>

          <div className="row">
            <Link to="/shop" className="btn dark">
              Shop helmets
            </Link>
            {newest && (
              <Link to={'/product/' + newest.slug} className="btn light">
                See the {newest.brand} {newestName}
              </Link>
            )}
          </div>
        </div>

        <div className="heroimg reveal">
          <img src="/hero.jpg" alt="Motrix helmet" />
        </div>
      </section>

      <div className="sec">
        <h2>FAVORITE HELMETS</h2>
        <Link to="/shop" className="u">
          View all
        </Link>
      </div>

      {/* first three products */}
      <div className="grid">
        {products.slice(0, 3).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="feats">
        {FEATURES.map((feature) => (
          <div key={feature.title} className="feat reveal">
            <h4>{feature.title}</h4>
            <p>{feature.text}</p>
          </div>
        ))}
      </div>
    </>
  )
}
