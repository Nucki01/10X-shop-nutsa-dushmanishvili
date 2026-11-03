import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { Container } from '../ui/Container'

// Shared Layout Component (supports both Light and Dark Velvety themes)
export function Layout() {
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
