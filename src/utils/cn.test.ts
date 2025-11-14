import { describe, it, expect } from 'vitest'
import { cn } from './cn'

describe('cn utility function', () => {
  it('should merge multiple class names correctly', () => {
    const result = cn('class1', 'class2', 'class3')
    expect(result).toBe('class1 class2 class3')
  })

  it('should handle Tailwind class conflicts by keeping the last one', () => {
    const result = cn('px-2', 'px-4')
    expect(result).toBe('px-4')
  })

  it('should handle undefined values', () => {
    const result = cn('class1', undefined, 'class2')
    expect(result).toBe('class1 class2')
  })

  it('should handle null values', () => {
    const result = cn('class1', null, 'class2')
    expect(result).toBe('class1 class2')
  })

  it('should handle conditional classes', () => {
    const isActive = true
    const result = cn('base', isActive && 'active')
    expect(result).toBe('base active')
  })

  it('should handle conditional classes that are false', () => {
    const isActive = false
    const result = cn('base', isActive && 'active')
    expect(result).toBe('base')
  })

  it('should handle arrays of classes', () => {
    const result = cn(['class1', 'class2'])
    expect(result).toBe('class1 class2')
  })

  it('should handle objects with boolean values', () => {
    const result = cn({
      'class1': true,
      'class2': false,
      'class3': true
    })
    expect(result).toBe('class1 class3')
  })

  it('should handle complex Tailwind merge scenarios', () => {
    const result = cn('text-sm', 'text-lg', 'font-bold')
    expect(result).toBe('text-lg font-bold')
  })

  it('should handle empty input', () => {
    const result = cn()
    expect(result).toBe('')
  })
})
