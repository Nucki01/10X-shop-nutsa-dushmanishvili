import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { Container } from '../ui/Container'

// Shared Layout Component (supports both Light and Dark Velvety themes)
// Also scrolls to the top whenever the route pathname changes (PRD P0.1).
export function Layout() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="min-h-screen bg-velvety-cream dark:bg-[#121814] text-velvety-ink dark:text-[#edf1ec] flex flex-col transition-colors">
      <Header />
      <main className="flex-1 py-8">
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
    </div>
  )
}
