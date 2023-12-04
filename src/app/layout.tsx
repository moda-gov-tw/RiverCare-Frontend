import Header from "@/components/header"
import "./globals.css"
import type { Metadata } from "next"
import localFont from "next/font/local"
import Footer from "@/components/footer"
import { ContextProvider } from "@/context"
import { headers } from "next/headers"

export const metadata: Metadata = {
  title: "Rivercare",
  description: "River care"
}

const monda = localFont({
  src: [
    {
      path: "../../public/font/Monda-Regular.ttf",
      weight: "400"
    },
    {
      path: "../../public/font/Monda-Bold.ttf",
      weight: "700"
    }
  ],
  variable: "--font-monda"
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const nonce = headers().get("x-nonce")
  return (
    <html lang="en">
      <body className={`${monda.variable}`}>
        <ContextProvider>
          <Header />
          <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between p-4">
            {children}
          </div>
          <div className="fixed left-0 top-0 -z-10 h-screen w-screen bg-mainBg bg-cover bg-no-repeat"></div>
        </ContextProvider>
      </body>
    </html>
  )
}
