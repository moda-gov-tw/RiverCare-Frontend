export default function CreateRiverLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="w-full">
      <div className="MainText mb-6 mt-4 font-monda text-5xl font-bold text-title">
        Create River
      </div>
      {/* <div className="mt-2 font-monda">Create RiverCreate RiverCreate RiverCreate River</div> */}
      {children}
    </section>
  )
}
