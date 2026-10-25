import { useEffect } from 'react'
import { useRoute } from './router'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Track from './pages/Track'
import Contact from './pages/Contact'
import Admin from './admin/Admin'

// Fade-in on scroll: anything with the "reveal" class gets the "in" class
// (see styles.css) once it scrolls into view.
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('in')
        })
      },
      { threshold: 0.08 },
    )

    const watchNewElements = () => {
      document.querySelectorAll('.reveal:not(.in)').forEach((el) => observer.observe(el))
    }
    watchNewElements()

    // pages change without a reload, so keep looking for new .reveal elements
    const mutationObserver = new MutationObserver(watchNewElements)
    mutationObserver.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      mutationObserver.disconnect()
    }
  }, [])
}

export default function App() {
  const path = useRoute()
  useScrollReveal()

  // the admin panel has its own layout, without the store header / footer
  if (path.startsWith('/admin')) return <Admin />

  // unknown URLs fall back to the home page
  let page = <Home />

  if (path === '/shop') page = <Shop />
  else if (path.startsWith('/product/')) page = <Product key={path} slug={path.split('/')[2]} />
  else if (path === '/cart') page = <Cart />
  else if (path === '/checkout') page = <Checkout />
  else if (path === '/track') page = <Track />
  else if (path === '/contact') page = <Contact />

  return (
    <>
      <Nav path={path} />
      <main key={path} className="page">
        {page}
      </main>
      <Footer />
    </>
  )
}
