import Header from "@/components/header"
import "./globals.css"
import type { Metadata } from "next"
import Footer from "@/components/footer"
import { ContextProvider } from "@/context"

export const metadata: Metadata = {
  title: "Rivercare",
  description: "Interface of care"
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="h-full bg-mainBg bg-cover bg-no-repeat font-monda">
        <ContextProvider>
          <Header />
          <div className="flex flex-col items-center justify-between p-4 ">{children}</div>
        </ContextProvider>
      </body>
    </html>
  )
}
