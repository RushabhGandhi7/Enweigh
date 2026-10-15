import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { scrollToTop } from '../hooks/useSmoothScroll.js'

export default function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) return
    scrollToTop()
  }, [pathname, hash])
  return null
}
