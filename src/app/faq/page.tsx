export default function FAQ() {
  return (
    <main className="w-full">
      <div className="text-2xl text-title">River List</div>
      {Array.from(Array(5).keys()).map((temp, i) => (
        <div key={i} className="w-full text-left">
          Q:
          <br />
          A:
        </div>
      ))}
    </main>
  )
}
