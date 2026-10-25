import { useState } from 'react'
import { Link } from '../router'
import { useStore } from '../store'
import { DEFAULT_SIZE } from '../data'
import { formatPrice } from '../utils'
import { BagIcon } from './Icons'

// One helmet tile, used on the home page and the shop page
export default function ProductCard({ product }) {
  const { addToCart } = useStore()
  const [justAdded, setJustAdded] = useState(false)

  // The little bag button adds a Medium straight away and flashes for a moment
  const handleQuickAdd = (e) => {
    // the whole card is a link, so stop the click from opening the product page
    e.preventDefault()
    e.stopPropagation()

    addToCart(product, DEFAULT_SIZE)
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1200)
  }

  // some products can have a custom background gradient: bg = [colorFrom, colorTo]
  const background = product.bg && {
    background: `linear-gradient(${product.bg[0]},${product.bg[1]})`,
  }

  return (
    <Link to={'/product/' + product.slug} className="card reveal" style={background}>
      <img src={product.img} alt={product.name} />
      <span className="price">{formatPrice(product.price)}</span>

      <div className="cname">
        <b>{product.brand}</b>
        <b>{product.name}</b>
      </div>

      <button className={`cbtn ${justAdded ? 'ok' : ''}`} onClick={handleQuickAdd}>
        <BagIcon />
      </button>
    </Link>
  )
}
