import { useState } from 'react'
import { Link } from '../router'
import { useStore } from '../store'
import { formatPrice } from '../utils'
import { ChevronIcon } from '../components/Icons'

export default function Checkout() {
  const { cart, cartTotal, placeOrder } = useStore()

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
  })
  const [orderId, setOrderId] = useState('')

  // returns an onChange handler for one field of the form
  const updateField = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()

    const id = placeOrder({
      name: form.name,
      email: form.email,
      phone: form.phone,
      address: [form.address, form.city, form.state].join(', '),
    })
    setOrderId(id)
  }

  // This check has to come first: placing the order empties the cart,
  // so the "cart is empty" screen below would show instead of the thank-you.
  if (orderId) {
    return (
      <div className="center">
        <h1>THANK YOU!</h1>
        <p>
          Your order <b>{orderId}</b> has been placed.
        </p>
        <Link to="/track" className="btn dark">
          Track order
        </Link>
      </div>
    )
  }

  if (!cart.length) {
    return (
      <div className="center">
        <h1>CHECKOUT</h1>
        <p className="muted">Your cart is empty.</p>
        <Link to="/shop" className="btn dark">
          Shop helmets
        </Link>
      </div>
    )
  }

  return (
    <>
      <Link to="/cart" className="back">
        <span className="bk">
          <ChevronIcon direction="left" />
        </span>
        Back to cart
      </Link>
      <h1 className="h1">CHECKOUT</h1>

      <form className="co" onSubmit={handleSubmit}>
        {/* left: customer details */}
        <div className="panel">
          <h3>
            <i>1</i> YOUR DETAILS
          </h3>
          <div className="f2">
            <label>
              Full name
              <input
                required
                placeholder="Alex Rider"
                value={form.name}
                onChange={updateField('name')}
              />
            </label>
            <label>
              Email
              <input
                required
                type="email"
                placeholder="you@email.com"
                value={form.email}
                onChange={updateField('email')}
              />
            </label>
          </div>
          <label>
            Phone
            <input
              required
              placeholder="+1 555 000 0000"
              value={form.phone}
              onChange={updateField('phone')}
            />
          </label>

          <h3>
            <i>2</i> DELIVERY ADDRESS
          </h3>
          <label>
            Street address
            <input
              required
              placeholder="House no., street, area"
              value={form.address}
              onChange={updateField('address')}
            />
          </label>
          <div className="f2">
            <label>
              City
              <input required placeholder="City" value={form.city} onChange={updateField('city')} />
            </label>
            <label>
              State / Province
              <input
                required
                placeholder="State"
                value={form.state}
                onChange={updateField('state')}
              />
            </label>
          </div>
        </div>

        {/* right: order summary */}
        <div className="sum">
          <h3>ORDER SUMMARY</h3>

          {cart.map((item, index) => (
            <div key={index} className="si">
              <img src={item.img} alt="" />
              <div>
                <b>{item.name}</b>
                <small>
                  {item.size} · Qty {item.qty}
                </small>
              </div>
              <span>{formatPrice(item.price * item.qty)}</span>
            </div>
          ))}

          <div className="tot">
            <span>Subtotal</span>
            <span>{formatPrice(cartTotal)}</span>
          </div>
          <div className="tot">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="tot big2">
            <span>Total</span>
            <b>{formatPrice(cartTotal)}</b>
          </div>

          <button className="btn accent">Place order</button>
          <small className="c">30-day returns on every helmet.</small>
        </div>
      </form>
    </>
  )
}
