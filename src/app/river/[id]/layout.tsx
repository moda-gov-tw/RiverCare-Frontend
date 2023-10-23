export default function RiverLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="w-full bg-white xl:w-2/5">
      <div className="MainText mb-6 mt-4 font-monda text-5xl font-bold text-title">River Name</div>
      {children}
    </section>
  )
}
