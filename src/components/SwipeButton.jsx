import { useRef, useState } from 'react'
import { ChevronIcon } from './Icons'

const KNOB_SIZE = 56 // px, must match .knob in styles.css
const UNLOCK_AT = 0.8 // drag past 80% of the track to confirm

// "Swipe to add to cart" slider.
// onDone runs once the knob is dragged far enough; done switches it to the "Added" look.
export default function SwipeButton({ onDone, done, label }) {
  const track = useRef()
  const [x, setX] = useState(0) // knob position in px
  const [dragging, setDragging] = useState(false)

  // furthest the knob can travel
  const maxX = () => track.current.offsetWidth - KNOB_SIZE

  const handleMove = (e) => {
    if (!dragging || done) return

    const trackLeft = track.current.getBoundingClientRect().left
    // subtract half the knob so the pointer stays in its centre
    const position = e.clientX - trackLeft - KNOB_SIZE / 2
    setX(Math.min(Math.max(0, position), maxX()))
  }

  // Let go: snap to the end if far enough, otherwise spring back to the start
  const handleRelease = () => {
    if (!dragging) return
    setDragging(false)

    if (x > maxX() * UNLOCK_AT) {
      setX(maxX())
      onDone()
    } else {
      setX(0)
    }
  }

  const handleGrab = (e) => {
    if (done) return
    setDragging(true)
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  // orange fill that follows the knob while dragging
  const fillStyle =
    !done && x > 0
      ? {
          background: `linear-gradient(90deg,#f59e0b ${x + KNOB_SIZE / 2}px,#111 ${x + KNOB_SIZE / 2}px)`,
        }
      : undefined

  const knobStyle = {
    transform: done ? `translateX(calc(100cqw - ${KNOB_SIZE}px))` : `translateX(${x}px)`,
    // no animation while the finger is down, otherwise the knob would lag behind
    transition: dragging ? 'none' : 'transform .4s cubic-bezier(.2,.8,.2,1)',
  }

  return (
    <div
      ref={track}
      className={'swipe ' + (done ? 'done' : '')}
      style={fillStyle}
      onPointerMove={handleMove}
      onPointerUp={handleRelease}
      onPointerLeave={handleRelease}
    >
      <span>{done ? 'Added to cart' : label + ' >>>'}</span>

      <div className="knob" style={knobStyle} onPointerDown={handleGrab}>
        {done ? '✓' : <ChevronIcon direction="right" />}
      </div>
    </div>
  )
}
