import { useEffect, useRef, useState } from 'react'

// Order statuses and the colour of the little dot next to each one
const STATUS_COLORS = {
  Pending: '#9ca3af',
  Confirmed: '#3b82f6',
  Processing: '#f59e0b',
  Shipped: '#8b5cf6',
  Delivered: '#22c55e',
  Cancelled: '#ef4444',
}

// Custom dropdown for changing an order's status.
// openUpwards makes the menu open above the button (used for the last rows of the table).
export default function StatusSelect({ value, onChange, openUpwards }) {
  const [open, setOpen] = useState(false)
  const wrapper = useRef()

  // close the menu when clicking anywhere outside of it
  useEffect(() => {
    const closeOnOutsideClick = (e) => {
      if (wrapper.current && !wrapper.current.contains(e.target)) setOpen(false)
    }

    addEventListener('mousedown', closeOnOutsideClick)
    return () => removeEventListener('mousedown', closeOnOutsideClick)
  }, [])

  const choose = (status) => {
    onChange(status)
    setOpen(false)
  }

  return (
    <div className="st" ref={wrapper}>
      <button type="button" className="stb" onClick={() => setOpen(!open)}>
        <i style={{ background: STATUS_COLORS[value] }} />
        {value}
        <span className={open ? 'flip' : ''}>▾</span>
      </button>

      {open && (
        <ul className={'stm ' + (openUpwards ? 'up' : '')}>
          {Object.keys(STATUS_COLORS).map((status) => (
            <li
              key={status}
              className={status === value ? 'on' : ''}
              onClick={() => choose(status)}
            >
              <i style={{ background: STATUS_COLORS[status] }} />
              {status}
              {status === value && <b>✓</b>}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
