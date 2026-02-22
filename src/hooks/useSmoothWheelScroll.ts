import { useEffect } from 'react'

const EASE = 0.14
const STOP_THRESHOLD = 0.5
const DELTA_MULTIPLIER = 0.95

function isScrollableElement(element: Element | null): boolean {
  if (!element || !(element instanceof HTMLElement)) {
    return false
  }

  const style = window.getComputedStyle(element)
  const overflowY = style.overflowY
  const canScroll = overflowY === 'auto' || overflowY === 'scroll' || overflowY === 'overlay'

  return canScroll && element.scrollHeight > element.clientHeight
}

function hasNestedScrollableParent(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) {
    return false
  }

  let current: Element | null = target

  while (current && current !== document.body && current !== document.documentElement) {
    if (isScrollableElement(current)) {
      return true
    }
    current = current.parentElement
  }

  return false
}

export function useSmoothWheelScroll(): void {
  useEffect(() => {
    let currentY = window.scrollY
    let targetY = window.scrollY
    let animationFrameId: number | null = null

    const getMaxScroll = () =>
      Math.max(0, document.documentElement.scrollHeight - window.innerHeight)

    const animate = () => {
      currentY += (targetY - currentY) * EASE

      if (Math.abs(targetY - currentY) < STOP_THRESHOLD) {
        currentY = targetY
      }

      window.scrollTo(0, currentY)

      if (currentY !== targetY) {
        animationFrameId = window.requestAnimationFrame(animate)
      } else {
        animationFrameId = null
      }
    }

    const onWheel = (event: WheelEvent) => {
      if (event.defaultPrevented || event.ctrlKey || event.deltaY === 0) {
        return
      }

      if (hasNestedScrollableParent(event.target)) {
        return
      }

      event.preventDefault()

      const nextTarget = targetY + event.deltaY * DELTA_MULTIPLIER
      targetY = Math.min(getMaxScroll(), Math.max(0, nextTarget))

      if (animationFrameId === null) {
        animationFrameId = window.requestAnimationFrame(animate)
      }
    }

    const onScroll = () => {
      if (animationFrameId === null) {
        currentY = window.scrollY
        targetY = window.scrollY
      }
    }

    const onResize = () => {
      const maxScroll = getMaxScroll()
      targetY = Math.min(targetY, maxScroll)
      currentY = Math.min(currentY, maxScroll)
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)

      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId)
      }
    }
  }, [])
}
