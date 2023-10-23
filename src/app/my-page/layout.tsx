export default function MypageLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="w-full">
      <div className="MainText mb-6 mt-4 text-5xl font-bold text-title">My Page</div>
      {children}
    </section>
  )
}
