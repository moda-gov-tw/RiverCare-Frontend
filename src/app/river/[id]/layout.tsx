import Dropdown from "@/components/dropdown"

export default function RiverLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <div className="text-2xl text-title">Rivercare</div>
      <Dropdown />
      {/* <nav className="z-60 fixed left-0 border">123</nav> */}
      {children}
    </section>
  )
}
