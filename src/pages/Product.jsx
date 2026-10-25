import { useState } from 'react'
import { Link } from '../router'
import { useStore } from '../store'
import { DEFAULT_SIZE } from '../data'
import { formatPrice } from '../utils'
import { ChevronIcon } from '../components/Icons'
import SwipeButton from '../components/SwipeButton'

// Product detail page. slug comes from the URL: /product/<slug>
export default function Product({ slug }) {
  const { products, addToCart } = useStore()
  const product = products.find((p) => p.slug === slug)

  const [size, setSize] = useState(DEFAULT_SIZE)
  const [added, setAdded] = useState(false) // true after the swipe is completed
  const [imageIndex, setImageIndex] = useState(0)
  const [favourite, setFavourite] = useState(false)

  if (!product) return <p className="muted">Product not found.</p>

  // products added from the admin panel may not have extra images
  const images = product.images?.length ? product.images : [product.img]
  const hasMultipleImages = images.length > 1

  const showNextImage = () => setImageIndex((imageIndex + 1) % images.length)

  const handleSizeChange = (newSize) => {
    setSize(newSize)
    setAdded(false) // picking another size means a new item can be added
  }

  const handleSwipeDone = () => {
    addToCart(product, size)
    setAdded(true)
  }

  return (
    <div className="pdp">
      {/* left: image gallery */}
      <div className="pimg reveal">
        <img key={imageIndex} src={images[imageIndex]} alt={product.name} />

        <Link to="/shop" className="rb tl" aria-label="Back">
          <ChevronIcon direction="left" />
        </Link>

        <button
          className={'rb tr ' + (favourite ? 'fav' : '')}
          onClick={() => setFavourite(!favourite)}
        >
          {favourite ? '♥' : '♡'}
        </button>

        <em>
          <i />
          {product.stock > 0 ? 'In stock' : 'Sold out'}
        </em>

        {hasMultipleImages && (
          <>
            <button className="rb mr" onClick={showNextImage} aria-label="Next">
              <ChevronIcon direction="right" />
            </button>

            <div className="dots">
              {images.map((_, i) => (
                <u key={i} className={i === imageIndex ? 'on' : ''} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* right: details, size picker and the swipe button */}
      <div className="pinfo reveal">
        <small>
          {product.brand} · {product.cert}
        </small>
        <h1>{product.name}</h1>
        <p>{product.desc}</p>

        <small>Size</small>
        <div className="sizes">
          {product.sizes.map((s) => (
            <button key={s} className={s === size ? 'on' : ''} onClick={() => handleSizeChange(s)}>
              {s}
            </button>
          ))}
        </div>

        <small>Price</small>
        <div className="big">
          {formatPrice(product.price)}
          {added && (
            <Link to="/cart" className="u">
              View cart
            </Link>
          )}
        </div>

        {/* the key resets the slider whenever the size or "added" state changes */}
        <SwipeButton
          key={size + added}
          done={added}
          label="Swipe to add to cart"
          onDone={handleSwipeDone}
        />
      </div>
    </div>
  )
}
