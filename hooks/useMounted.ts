import { useEffect, useState } from 'react'

/**
 * Hook to track if component has mounted on client
 * Use this to defer rendering of locale-dependent content until after hydration
 */
export function useMounted() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return mounted
}
