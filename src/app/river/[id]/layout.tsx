import Sorting from "@/components/sorting"

export default function RiverLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="w-full">
      <div className="text-2xl text-title">River Name</div>
      <Sorting />
      {/* <nav className="z-60 fixed left-0 border">123</nav> */}
      {children}
    </section>
  )
}
