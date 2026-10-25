import { useStore } from '../store'
import { formatPrice } from '../utils'
import StatusSelect from './StatusSelect'

export default function OrdersTab() {
  const { orders, setOrders } = useStore()

  const changeStatus = (orderId, status) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status } : order)))
  }

  // With a long list, the status menu of the last two rows would be cut off at the
  // bottom of the page, so those open upwards instead.
  const opensUpwards = (index) => orders.length > 3 && index >= orders.length - 2

  return (
    <>
      <h1>ORDERS</h1>
      <div className="panel">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>
                  {order.name}
                  <br />
                  <small>
                    {order.phone} · {order.address}
                  </small>
                </td>
                <td>
                  {order.items.map((item) => `${item.name} (${item.size}×${item.qty})`).join(', ')}
                </td>
                <td>{formatPrice(order.total)}</td>
                <td>
                  <StatusSelect
                    value={order.status}
                    openUpwards={opensUpwards(index)}
                    onChange={(status) => changeStatus(order.id, status)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
