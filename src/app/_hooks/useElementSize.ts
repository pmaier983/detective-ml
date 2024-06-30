import { useIsomorphicLayoutEffect } from "framer-motion"
import { useRef, useState } from "react"

/**
 * Get the width and height of reference element using observer
 */
export const useElementSize = () => {
  const elementRef = useRef(null)
  const [element, setElement] = useState<ResizeObserverEntry | null>(null)

  useIsomorphicLayoutEffect(() => {
    if (elementRef?.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        const element = entries?.at(0)
        if (element) {
          setElement(element)
        }
      })

      resizeObserver.observe(elementRef?.current)

      return () => {
        if (elementRef?.current) {
          resizeObserver.unobserve(elementRef?.current)
        }
        resizeObserver.disconnect()
      }
    }
  }, [])

  return { elementRef, element }
}
