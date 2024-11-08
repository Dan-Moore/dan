import Link from "next/link"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "@/components/web-components"

const inter = Inter({ subsets: ["latin"] })

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        className={`antialiased min-h-screen bg-stone-100 dark:bg-gray-900 text-slate-900 dark:text-slate-50 ${inter.className}`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <div className="max-w-2xl mx-auto py-10 px-4">
            <header>
              <div className="flex items-center justify-between space-x-6">
                {/* Left Bar */}
                <Link href="/">Home</Link>

                {/* Center Bar */}
                <nav className="ml-auto text-sm font-medium space-x-6">
                  <Link href="/pages">Pages</Link>
                  <Link href="/posts">Posts</Link>
                  <Link href="/about">About</Link>
                </nav>

                {/* Right Bar */}
                <ModeToggle />
              </div>
            </header>
            <main>{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}