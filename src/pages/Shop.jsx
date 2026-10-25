import { useState } from 'react'
import { useStore } from '../store'
import ProductCard from '../components/ProductCard'

export default function Shop() {
  const { products } = useStore()
  const [search, setSearch] = useState('')

  // search matches against brand + name, ignoring upper/lower case
  const results = products.filter((product) =>
    (product.brand + product.name).toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <>
      <div className="sec">
        <h2>SHOP HELMETS</h2>
        <input
          className="search"
          placeholder="Search helmets..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid">
        {results.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {!results.length && <p className="muted">No helmets found.</p>}
    </>
  )
}
