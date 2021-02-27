import { useRef, useEffect } from "react"

const useThrottledEffect = (callback = () => {}, deps = [], delay = 200) => {
  const lastRuntime = useRef(Date.now())

  useEffect(() => {
    const timeSinceLastRun = Date.now() - lastRuntime.current
    const timeoutId = setTimeout(() => {
      if (timeSinceLastRun >= delay) {
        callback()
        lastRuntime.current = Date.now()
      }
    }, delay - timeSinceLastRun)

    return () => {
      clearTimeout(timeoutId)
    }
  }, deps)
}

export default useThrottledEffect
