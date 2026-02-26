import { useEffect } from 'react'

const EASE = 0.18
const STOP_THRESHOLD = 0.5

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
    const isWindows = /Win/i.test(navigator.userAgent)
    if (!isWindows) {
      return
    }

    let currentY = window.scrollY
    let targetY = window.scrollY
    let animationFrameId: number | null = null

    const getMaxScroll = () =>
      Math.max(0, document.documentElement.scrollHeight - window.innerHeight)

    const getLineHeight = () => {
      const lineHeight = Number.parseFloat(
        window.getComputedStyle(document.documentElement).lineHeight
      )
      return Number.isFinite(lineHeight) ? lineHeight : 16
    }

    const normalizeDeltaY = (event: WheelEvent) => {
      if (event.deltaMode === WheelEvent.DOM_DELTA_LINE) {
        return event.deltaY * getLineHeight()
      }

      if (event.deltaMode === WheelEvent.DOM_DELTA_PAGE) {
        return event.deltaY * window.innerHeight
      }

      return event.deltaY
    }

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

      // Keep native precision touchpad momentum on Windows.
      if (event.deltaMode === WheelEvent.DOM_DELTA_PIXEL) {
        return
      }

      if (hasNestedScrollableParent(event.target)) {
        return
      }

      event.preventDefault()

      const nextTarget = targetY + normalizeDeltaY(event)
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
