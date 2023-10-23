import Header from "@/components/header"
import "./globals.css"
import type { Metadata } from "next"
import localFont from "@next/font/local"
import Footer from "@/components/footer"
import { ContextProvider } from "@/context"

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
  return (
    <html lang="en">
      <body className={`h-screen bg-mainBg bg-cover bg-no-repeat ${monda.variable}`}>
        <ContextProvider>
          <Header />
          <div className="flex flex-col items-center justify-between p-4 ">{children}</div>
        </ContextProvider>
      </body>
    </html>
  )
}
