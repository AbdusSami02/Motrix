import { useEffect, useState } from 'react'

// A tiny router built on the browser History API, so we don't need react-router.

// Change the URL without reloading the page, then let useRoute know about it
export function navigate(to) {
  history.pushState({}, '', to)
  dispatchEvent(new Event('navchange'))
  scrollTo(0, 0)
}

// Returns the current path (no trailing slash) and updates when it changes
export function useRoute() {
  const [path, setPath] = useState(location.pathname)

  useEffect(() => {
    const update = () => setPath(location.pathname)

    addEventListener('popstate', update) // browser back / forward
    addEventListener('navchange', update) // our own navigate()

    return () => {
      removeEventListener('popstate', update)
      removeEventListener('navchange', update)
    }
  }, [])

  return path.replace(/\/+$/, '') || '/'
}

// Works like <a>, but switches page without a full reload
export function Link({ to, children, onClick, ...rest }) {
  const handleClick = (e) => {
    // let ctrl/cmd + click open in a new tab like normal
    if (e.metaKey || e.ctrlKey) return

    e.preventDefault()
    onClick && onClick(e)
    navigate(to)
  }

  return (
    <a href={to} onClick={handleClick} {...rest}>
      {children}
    </a>
  )
}
