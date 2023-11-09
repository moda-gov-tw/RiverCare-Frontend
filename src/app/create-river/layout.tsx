"use client"
import { Language } from "@/utils/language"
export default function CreateRiverLayout({ children }: { children: React.ReactNode }) {
  const lang = Language()
  return (
    <section className="w-full">
      <div className="MainText mb-6 mt-4 font-monda text-5xl font-bold text-title">
        {lang.createRiver.title}
      </div>
      {/* <div className="mt-2 font-monda">Create RiverCreate RiverCreate RiverCreate River</div> */}
      {children}
    </section>
  )
}
