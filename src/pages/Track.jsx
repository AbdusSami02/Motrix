import { useState } from 'react'
import { useStore } from '../store'
import { formatPrice } from '../utils'

export default function Track() {
  const { orders } = useStore()
  const [orderId, setOrderId] = useState('')

  // null = nothing searched yet, 'none' = searched but not found, otherwise the order itself
  const [result, setResult] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()

    // ignore spaces around the id and upper/lower case
    const search = orderId.trim().toLowerCase()
    const found = orders.find((order) => order.id.toLowerCase() === search)
    setResult(found || 'none')
  }

  return (
    <div className="center">
      <h1>TRACK ORDER</h1>

      <form className="row" onSubmit={handleSubmit}>
        <input
          className="search"
          placeholder="Order ID e.g. MTX-1001"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />
        <button className="btn dark">Track</button>
      </form>

      {result === 'none' && <p className="muted">No order found.</p>}

      {result && result !== 'none' && (
        <div className="panel left">
          <b>{result.id}</b>
          <p>
            Status: <span className="tag">{result.status}</span>
          </p>
          {result.items.map((item, index) => (
            <small key={index}>
              {item.name} · {item.size} × {item.qty}
            </small>
          ))}
          <b>Total {formatPrice(result.total)}</b>
        </div>
      )}
    </div>
  )
}
