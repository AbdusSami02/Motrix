import { useStore } from '../store'
import { formatPrice } from '../utils'

// Product list. onAdd / onEdit open the form popup (handled in Admin.jsx).
export default function ProductsTab({ onAdd, onEdit }) {
  const { products, setProducts } = useStore()

  const deleteProduct = (product) => {
    if (confirm('Delete?')) {
      setProducts(products.filter((p) => p.id !== product.id))
    }
  }

  return (
    <>
      <div className="sec">
        <h1>PRODUCTS</h1>
        <button className="btn dark" onClick={onAdd}>
          + Add product
        </button>
      </div>

      <div className="panel">
        <table>
          <thead>
            <tr>
              <th />
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  <img src={product.img} width="48" alt="" />
                </td>
                <td>
                  {product.brand} {product.name}
                </td>
                <td>{formatPrice(product.price)}</td>
                <td>{product.stock}</td>
                <td>
                  <a onClick={() => onEdit(product)}>Edit</a> ·{' '}
                  <a className="err" onClick={() => deleteProduct(product)}>
                    Delete
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
