import { Link } from '../router'
import { useStore } from '../store'
import { formatPrice } from '../utils'

// Cart items store the name as "BRAND MODEL NAME" in capitals.
// Split it back into "Brand" and "MODEL NAME" for display.
function splitName(fullName) {
  const [brand, ...model] = fullName.split(' ')

  return {
    brand: brand[0] + brand.slice(1).toLowerCase(),
    model: model.join(' '),
  }
}

export default function Cart() {
  const { cart, changeQuantity, removeFromCart, cartTotal } = useStore()

  return (
    <>
      <small className="lead">Review your</small>
      <h1 className="h1">CART</h1>

      {!cart.length ? (
        <div className="center">
          <p className="muted">Your cart is empty.</p>
          <Link to="/shop" className="btn dark">
            Shop helmets
          </Link>
        </div>
      ) : (
        <div className="cartgrid">
          <div className="clist">
            {cart.map((item, index) => {
              const { brand, model } = splitName(item.name)

              return (
                <div key={index} className="crow">
                  <img src={item.img} alt="" />

                  <div className="cinfo">
                    <small>
                      {brand} · {item.size}
                    </small>
                    <h4>{model}</h4>
                    <small className="dk">{formatPrice(item.price)} each</small>

                    <div className="q">
                      <button onClick={() => changeQuantity(index, -1)}>−</button>
                      <span>{item.qty}</span>
                      <button onClick={() => changeQuantity(index, 1)}>+</button>
                      <b>{formatPrice(item.price * item.qty)}</b>
                    </div>
                  </div>

                  <button
                    className="trash"
                    onClick={() => removeFromCart(index)}
                    aria-label="Remove"
                  >
                    🗑
                  </button>
                </div>
              )
            })}
          </div>

          <div className="sum">
            <div className="tot">
              <span>Subtotal</span>
              <span>{formatPrice(cartTotal)}</span>
            </div>
            <div className="tot">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <hr />
            <div className="tot big2">
              <span>Total</span>
              <b>{formatPrice(cartTotal)}</b>
            </div>
            <Link to="/checkout" className="btn accent">
              Checkout
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
