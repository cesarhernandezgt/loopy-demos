import { useRef, useLayoutEffect } from "react"

const isBrowser = typeof window !== `undefined`

function getScrollPosition() {
  if (!isBrowser) return { x: 0, y: 0 }

  const position = document.body.getBoundingClientRect()

  return { x: position.left, y: position.top }
}

const useScrollPosition = (effect, deps) => {
  const position = useRef(getScrollPosition())

  let throttleTimeout = null

  const callBack = () => {
    const currPos = getScrollPosition()
    effect({ prevPos: position.current, currPos })
    position.current = currPos
    throttleTimeout = null
  }

  useLayoutEffect(() => {
    const handleScroll = () => {
      if (throttleTimeout === null) {
        throttleTimeout = setTimeout(callBack, 200)
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => window.removeEventListener("scroll", handleScroll)
  }, deps)
}

export default useScrollPosition
