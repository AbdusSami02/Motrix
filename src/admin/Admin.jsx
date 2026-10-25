import { useState } from 'react'
import { useStore } from '../store'
import { DEFAULT_DESCRIPTION, SIZES, CERTIFICATION } from '../data'
import LoginForm from './LoginForm'
import DashboardTab from './DashboardTab'
import ProductsTab from './ProductsTab'
import OrdersTab from './OrdersTab'
import ProductModal from './ProductModal'

// Demo login, checked in the browser only. Anyone can read it in the page source,
// so don't treat this as real security.
const ADMIN_EMAIL = 'motrix@gmail.com'
const ADMIN_PASSWORD = 'motrix@2255'

// What the "Add product" form starts with
const EMPTY_PRODUCT = {
  brand: '',
  name: '',
  price: '',
  stock: 20,
  img: '/products/1.jpg',
  desc: DEFAULT_DESCRIPTION,
}

const TABS = [
  { id: 'dash', label: 'Dashboard' },
  { id: 'prod', label: 'Products' },
  { id: 'ord', label: 'Orders' },
]

export default function Admin() {
  const { admin, setAdmin, products, setProducts } = useStore()

  // login form
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const [tab, setTab] = useState('dash')

  // the product being added / edited in the popup (null = popup closed)
  const [form, setForm] = useState(null)

  const handleLogin = (e) => {
    e.preventDefault()

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setAdmin(true)
    } else {
      setError('Invalid email or password')
    }
  }

  // Save from the popup: update the product if it has an id, otherwise create a new one
  const saveProduct = (e) => {
    e.preventDefault()

    // "BMW" + "M Pro" -> "bmw-m-pro"
    const slug = (form.brand + '-' + form.name).toLowerCase().replace(/[^a-z0-9]+/g, '-')

    // number inputs give back strings, so convert them
    const saved = { ...form, price: +form.price, stock: +form.stock }

    if (form.id) {
      setProducts(products.map((p) => (p.id === form.id ? saved : p)))
    } else {
      const newProduct = {
        ...saved,
        id: Date.now(),
        slug,
        sizes: [...SIZES],
        cert: CERTIFICATION,
      }
      setProducts([...products, newProduct])
    }

    setForm(null)
  }

  if (!admin) {
    return (
      <LoginForm
        email={email}
        onEmailChange={setEmail}
        password={password}
        onPasswordChange={setPassword}
        error={error}
        onSubmit={handleLogin}
      />
    )
  }

  return (
    <div className="admin">
      <aside>
        <h2 className="logo">MOTRIX</h2>
        <small>Admin</small>

        {TABS.map((t) => (
          <button key={t.id} className={tab === t.id ? 'on' : ''} onClick={() => setTab(t.id)}>
            {t.label}
          </button>
        ))}

        <a href="/">View store</a>
        <button onClick={() => setAdmin(false)}>Sign out</button>
      </aside>

      <section>
        {tab === 'dash' && <DashboardTab />}
        {tab === 'prod' && (
          <ProductsTab
            onAdd={() => setForm(EMPTY_PRODUCT)}
            onEdit={(product) => setForm(product)}
          />
        )}
        {tab === 'ord' && <OrdersTab />}
      </section>

      {form && (
        <ProductModal
          form={form}
          setForm={setForm}
          onSave={saveProduct}
          onCancel={() => setForm(null)}
        />
      )}
    </div>
  )
}
