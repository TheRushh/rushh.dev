import '@testing-library/jest-dom'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

function createStorageMock(): Storage {
  const store = new Map<string, string>()

  return {
    getItem: key => store.get(key) ?? null,
    setItem: (key, value) => {
      store.set(key, String(value))
    },
    removeItem: key => {
      store.delete(key)
    },
    clear: () => {
      store.clear()
    },
    key: index => Array.from(store.keys())[index] ?? null,
    get length() {
      return store.size
    },
  }
}

function ensureLocalStorage(): void {
  const storage = globalThis.localStorage as Partial<Storage> | undefined
  const hasStorageApi =
    storage &&
    typeof storage.getItem === 'function' &&
    typeof storage.setItem === 'function' &&
    typeof storage.removeItem === 'function' &&
    typeof storage.clear === 'function'

  if (!hasStorageApi) {
    const mockStorage = createStorageMock()
    Object.defineProperty(globalThis, 'localStorage', {
      value: mockStorage,
      configurable: true,
      writable: true,
    })
  }
}

ensureLocalStorage()

// Cleanup after each test
afterEach(() => {
  cleanup()
})
