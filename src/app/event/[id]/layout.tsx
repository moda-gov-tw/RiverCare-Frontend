export default function EventLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="w-full">
      <div className="text-2xl text-title">Event Name</div>
      {/* <nav className="z-60 fixed left-0 border">123</nav> */}
      {children}
    </section>
  )
}
