import { useStore } from '../store'
import { formatPrice } from '../utils'

export default function DashboardTab() {
  const { products, orders } = useStore()

  const revenue = orders.reduce((sum, order) => sum + order.total, 0)

  // anything that isn't finished yet (not delivered and not cancelled)
  const openOrders = orders.filter((order) => !['Delivered', 'Cancelled'].includes(order.status))

  const stats = [
    { label: 'Revenue', value: formatPrice(revenue) },
    { label: 'Orders', value: orders.length },
    { label: 'Products', value: products.length },
    { label: 'Pending', value: openOrders.length },
  ]

  return (
    <>
      <h1>DASHBOARD</h1>
      <div className="stats">
        {stats.map((stat) => (
          <div key={stat.label} className="panel">
            <small>{stat.label}</small>
            <div className="big">{stat.value}</div>
          </div>
        ))}
      </div>
    </>
  )
}
