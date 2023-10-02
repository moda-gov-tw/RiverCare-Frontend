import Button from "@/components/button"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <main className="flex flex-col text-center">
      <div className="text-title">Rivercare</div>
      <div className="">RiverCareRiverCareRiverCareRiverCareRiverCareRiverCareRiverCareRiver</div>
      <div className="text-2xl text-white">
        <Button bgColor="action" href="/create-river">
          Create River
        </Button>
        <Button bgColor="primary" href="/river-list">
          River List
        </Button>
      </div>
    </main>
  )
}
