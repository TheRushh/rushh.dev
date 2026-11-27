import { describe, it, expect } from 'vitest'
import { isScrollbarColumn } from './scrollbarColumn'

const cols = (width: number, mobile: boolean) =>
  Array.from({ length: Math.ceil(width / 15) }, (_, x) => x).filter(x =>
    isScrollbarColumn(x, width, mobile, 15)
  )

describe('isScrollbarColumn', () => {
  it('uses last two fully visible columns when width is not a multiple of spacing', () => {
    // 1937 / 15 -> 130 cols, but col 129 center (1942.5) is off-canvas
    expect(cols(1937, false)).toEqual([0, 1, 127, 128])
  })

  it('uses last two columns when width is an exact multiple', () => {
    expect(cols(1500, false)).toEqual([0, 1, 98, 99])
  })

  it('uses single last visible column on mobile', () => {
    expect(cols(400, true)).toEqual([25])
  })
})
