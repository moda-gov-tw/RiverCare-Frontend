import Sorting from "@/components/sorting"
import RiverCard from "@/components/river/river-card"

export default function RiverList() {
  return (
    <main className="">
      <div className="text-2xl text-title">River List</div>
      <div className="text-lg">RivercareRivercareRivercare</div>
      <Sorting />
      {Array.from(Array(10).keys()).map((temp, i) => (
        <RiverCard key={i} id={i} />
      ))}
    </main>
  )
}
