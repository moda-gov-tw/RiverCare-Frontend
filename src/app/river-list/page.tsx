import Dropdown from "@/components/dropdown"
import RiverCard from "@/components/river/river-card"

export default function RiverList() {
  return (
    <main className="">
      <div className="text-2xl text-title">Rivercare</div>
      <div className="text-2xl">RivercareRivercareRivercare</div>
      <Dropdown />
      {Array.from(Array(10).keys()).map((temp, i) => (
        <RiverCard key={i} id={i} />
      ))}
    </main>
  )
}
