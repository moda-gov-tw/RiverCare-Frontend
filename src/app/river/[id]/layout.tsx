export default function RiverLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="w-full bg-white xl:w-2/5">
      <div className="MainText text-3xl font-bold text-title">River Name</div>
      {children}
    </section>
  )
}
