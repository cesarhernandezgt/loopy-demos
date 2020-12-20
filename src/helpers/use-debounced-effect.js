import { useState, useEffect } from "react"

const useDebouncedEffect = (callback = () => {}, deps = [], timeout = 200) => {
  const [timeoutRef, setTimeoutRef] = useState(null)

  useEffect(() => {
    clearTimeout(timeoutRef)
    const timeoutId = setTimeout(callback, timeout)
    setTimeoutRef(timeoutId)
  }, deps)
}

export default useDebouncedEffect
